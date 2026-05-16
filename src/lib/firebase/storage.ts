import { getStorage, type FirebaseStorage } from "firebase/storage";

import { getFirebaseApp } from "@/lib/firebase/client";

export function getFbStorage(): FirebaseStorage {
  return getStorage(getFirebaseApp());
}
