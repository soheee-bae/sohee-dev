import { getFirestore, type Firestore } from "firebase/firestore";

import { getFirebaseApp } from "@/lib/firebase/client";

export function getDb(): Firestore {
  return getFirestore(getFirebaseApp());
}
