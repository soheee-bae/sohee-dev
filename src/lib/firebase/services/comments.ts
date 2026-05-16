/**
 * Comments data-access layer (Firestore).
 *
 * Stored as a top-level `comments` collection keyed by `postId` and
 * `parentId` for threaded discussions. Soft-delete via `isDeleted` so
 * children of a removed comment can still render an "[deleted]" stub.
 *
 * Placeholder file — implement once Firestore rules + indexes are wired.
 */

import type { Comment } from "@/types/comment";

export const COMMENTS_COLLECTION = "comments";

export async function listCommentsForPost(_postId: string): Promise<Comment[]> {
  // TODO: query(collection(db, COMMENTS_COLLECTION),
  //   where("postId", "==", postId),
  //   orderBy("createdAt", "asc"))
  return [];
}

export async function addComment(
  _data: Omit<Comment, "id" | "createdAt" | "updatedAt" | "isDeleted">
): Promise<string> {
  throw new Error("addComment: not implemented");
}

export async function softDeleteComment(_id: string): Promise<void> {
  // TODO: updateDoc(..., { isDeleted: true, body: "" })
  throw new Error("softDeleteComment: not implemented");
}
