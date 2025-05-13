// lib/firebase/firebase-admin.ts
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n') || '';

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: privateKey,
  }),
};

const adminApp = getApps()[0] || initializeApp(firebaseAdminConfig);
const adminAuth = getAuth(adminApp);
const adminDb = getFirestore(adminApp);

export { adminApp, adminAuth, adminDb };