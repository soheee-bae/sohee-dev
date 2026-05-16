import type { Timestamp } from "firebase/firestore";

export interface Comment {
  id: string;
  postId: string;
  parentId?: string | null;
  authorUid: string;
  authorName: string;
  authorAvatarUrl?: string;
  body: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isDeleted?: boolean;
}
