export const runtime = 'nodejs';

import { adminAuth } from '@/lib/firebase/firebase-admin';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    await adminAuth.updateUser(decodedToken.uid, {
      emailVerified: true
    });

    return NextResponse.json({ verified: true });
  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  }
}