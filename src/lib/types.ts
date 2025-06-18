import type { Timestamp } from 'firebase/firestore';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: boolean; // true for completed, false for pending
  createdAt: Timestamp;
  userId: string;
}
