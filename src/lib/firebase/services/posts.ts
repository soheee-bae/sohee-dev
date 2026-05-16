/**
 * Posts data-access layer (Firestore).
 *
 * Convention:
 *   - Reads/writes that run in the browser go through `getDb()` from
 *     `@/lib/firebase/db`.
 *   - Reads/writes that run in RSC, route handlers, or server actions go
 *     through `getAdminDb()` from `@/lib/firebase/admin` and live in their
 *     own `*.server.ts` sibling when it makes sense to split them.
 *
 * The functions in this file are intentionally empty placeholders so
 * UI work can stub against the type signatures while the Firestore
 * schema gets finalized.
 */

import type { Post, PostStatus } from "@/types/post";

export const POSTS_COLLECTION = "posts";

export interface ListPostsOptions {
  status?: PostStatus | PostStatus[];
  tag?: string;
  /** Cursor pagination — last doc id from the previous page. */
  startAfterId?: string;
  limit?: number;
}

export async function listPublishedPosts(_opts: ListPostsOptions = {}): Promise<Post[]> {
  // TODO: query(collection(db, POSTS_COLLECTION),
  //   where("status", "==", "published"),
  //   where("publishDate", "<=", Timestamp.now()),
  //   orderBy("publishDate", "desc"),
  //   limit(opts.limit ?? 20))
  return [];
}

export async function getPostBySlug(_slug: string): Promise<Post | null> {
  // TODO: query by slug field, return first doc or null.
  return null;
}

export async function getPostById(_id: string): Promise<Post | null> {
  // TODO: getDoc(doc(db, POSTS_COLLECTION, id))
  return null;
}

export async function createPost(
  _data: Omit<Post, "id" | "createdAt" | "updatedAt" | "views" | "likes">
): Promise<string> {
  // TODO: addDoc(...) — returns the new document id.
  throw new Error("createPost: not implemented");
}

export async function updatePost(_id: string, _patch: Partial<Post>): Promise<void> {
  // TODO: updateDoc(doc(db, POSTS_COLLECTION, id), patch)
  throw new Error("updatePost: not implemented");
}

export async function deletePost(_id: string): Promise<void> {
  // TODO: deleteDoc(doc(db, POSTS_COLLECTION, id))
  throw new Error("deletePost: not implemented");
}

export async function incrementPostViews(_id: string): Promise<void> {
  // TODO: updateDoc with increment(1) on the `views` field.
}
