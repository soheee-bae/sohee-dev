/**
 * Cloud Storage data-access layer.
 *
 * Note: this file is the *operations* layer (upload / delete / URL).
 * It is intentionally separate from `@/lib/firebase/storage`, which
 * is the *initializer* (`getFbStorage()`). Importers needing the raw
 * Storage instance should still go through the initializer; reach for
 * this module when you want a domain-aware helper.
 *
 * Naming guideline:
 *   - cover images   → `posts/{postId}/cover-{timestamp}.{ext}`
 *   - inline images  → `posts/{postId}/inline/{uuid}.{ext}`
 *   - user avatars   → `users/{uid}/avatar.{ext}`
 */

export interface UploadResult {
  url: string;
  path: string;
  contentType: string;
  size: number;
}

export async function uploadImage(
  _file: File,
  _path: string
): Promise<UploadResult> {
  // TODO: ref(storage, path) → uploadBytes(ref, file) → getDownloadURL(ref)
  throw new Error("uploadImage: not implemented");
}

export async function deleteFileAt(_path: string): Promise<void> {
  // TODO: deleteObject(ref(storage, path))
  throw new Error("deleteFileAt: not implemented");
}

export async function getDownloadUrlAt(_path: string): Promise<string> {
  // TODO: getDownloadURL(ref(storage, path))
  throw new Error("getDownloadUrlAt: not implemented");
}
