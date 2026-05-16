import { getApp, getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function assertConfigured(config: FirebaseOptions): void {
  const required: (keyof FirebaseOptions)[] = ["apiKey", "authDomain", "projectId", "appId"];
  const missing = required.filter((k) => !config[k]);
  if (missing.length > 0) {
    throw new Error(
      `[firebase/client] Missing env vars: ${missing
        .map((k) => `NEXT_PUBLIC_FIREBASE_${k.replace(/[A-Z]/g, (m) => `_${m}`).toUpperCase()}`)
        .join(", ")}. Copy .env.example to .env.local and fill them in.`
    );
  }
}

export function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }
  assertConfigured(firebaseConfig);
  return initializeApp(firebaseConfig);
}
