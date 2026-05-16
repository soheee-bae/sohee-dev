import type { Timestamp } from "firebase/firestore";

export interface Idea {
  id: string;
  title: string;
  note?: string;
  tags?: string[];
  promotedToPostId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
