export const runtime = 'nodejs'; // 👈 Add this line

import { adminAuth } from '@/lib/firebase/firebase-admin';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(session, true);
    const user = await adminAuth.getUser(decodedClaims.uid);

    return NextResponse.json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    });
  } catch (error) {
    console.error('Error verifying session:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
