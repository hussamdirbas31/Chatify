import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const adminApp = getApps()[0] || initializeApp({
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

const adminAuth = getAuth(adminApp);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const idToken = body.idToken;

    if (!idToken) {
      return NextResponse.json(
        { success: false, error: 'ID_TOKEN_REQUIRED', message: 'ID token is required' },
        { status: 400 }
      );
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const expiresIn = 60 * 60 * 24 * 14 * 1000; // 14 days

    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);

    return NextResponse.json(
      {
        success: true,
        expiresIn: expiresIn / 1000,
        uid: decodedClaims.uid,
      },
      {
        headers: {
          'Set-Cookie': serialize('session', sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: expiresIn / 1000,
            path: '/',
          }),
        },
      }
    );
  } catch (error: any) {
    console.error('Session creation error:', error);

    let errorCode = 'AUTH_ERROR';
    let errorMessage = 'Failed to create session';
    let statusCode = 401;

    if (error.code === 'auth/id-token-expired') {
      errorCode = 'TOKEN_EXPIRED';
      errorMessage = 'The provided token has expired';
    } else if (error.code === 'auth/argument-error') {
      errorCode = 'INVALID_TOKEN';
      errorMessage = 'Invalid token provided';
    } else if (error.code === 'auth/session-cookie-expired') {
      errorCode = 'SESSION_EXPIRED';
      errorMessage = 'Session has expired';
    }

    return NextResponse.json(
      {
        success: false,
        error: errorCode,
        message: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: statusCode }
    );
  }
}
