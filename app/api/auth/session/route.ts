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

    // Removed unused decodedToken variable (wasn't being used)
    await adminAuth.verifyIdToken(idToken);
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
  } catch (error: unknown) { // Changed from 'any' to 'unknown'
    console.error('Session creation error:', error);

    const errorCode = 'AUTH_ERROR';
    let errorMessage = 'Failed to create session';
    const statusCode = 401; // Changed to const since it's never reassigned

    if (error instanceof Error && 'code' in error) {
      switch (error.code) {
        case 'auth/id-token-expired':
          errorMessage = 'The provided token has expired';
          break;
        case 'auth/argument-error':
          errorMessage = 'Invalid token provided';
          break;
        case 'auth/session-cookie-expired':
          errorMessage = 'Session has expired';
          break;
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: errorCode,
        message: errorMessage,
        details: process.env.NODE_ENV === 'development' && error instanceof Error 
          ? error.message 
          : undefined,
      },
      { status: statusCode }
    );
  }
}