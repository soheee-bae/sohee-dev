import type { Timestamp } from "firebase/firestore";

export type PostStatus =
  | "idea"
  | "writing"
  | "review"
  | "scheduled"
  | "published"
  | "private";

export interface PostAuthor {
  uid: string;
  name: string;
  avatarUrl?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  description?: string;
  body: string;
  tags: string[];
  status: PostStatus;
  author: PostAuthor;
  coverImageUrl?: string;
  publishDate?: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  views: number;
  likes: number;
}

export type DraftPost = Pick<
  Post,
  "id" | "slug" | "title" | "status" | "updatedAt" | "tags"
>;
