import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  Timestamp,
  onSnapshot,
  type Unsubscribe
} from 'firebase/firestore';
import { db } from './config';
import type { Task } from '@/lib/types';

const TASKS_COLLECTION = 'tasks';

// Add a new task
export const addTask = async (userId: string, title: string, description: string): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, TASKS_COLLECTION), {
      userId,
      title,
      description,
      status: false, // New tasks are pending by default
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding task: ", error);
    throw new Error("Failed to add task.");
  }
};

// Get all tasks for a user (one-time fetch)
export const getTasks = async (userId: string): Promise<Task[]> => {
  try {
    const q = query(
      collection(db, TASKS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const tasks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Task));
    return tasks;
  } catch (error) {
    console.error("Error getting tasks: ", error);
    throw new Error("Failed to get tasks.");
  }
};

// Listen for real-time task updates
export const onTasksUpdate = (userId: string, callback: (tasks: Task[]) => void): Unsubscribe => {
  const q = query(
    collection(db, TASKS_COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const tasks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Task));
    callback(tasks);
  }, (error) => {
    console.error("Error listening to tasks: ", error);
    // Optionally, you could inform the user about the error via the callback or another mechanism
  });

  return unsubscribe;
};


// Update task status
export const updateTaskStatus = async (taskId: string, status: boolean): Promise<void> => {
  try {
    const taskDocRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskDocRef, { status });
  } catch (error) {
    console.error("Error updating task status: ", error);
    throw new Error("Failed to update task status.");
  }
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    const taskDocRef = doc(db, TASKS_COLLECTION, taskId);
    await deleteDoc(taskDocRef);
  } catch (error) {
    console.error("Error deleting task: ", error);
    throw new Error("Failed to delete task.");
  }
};
