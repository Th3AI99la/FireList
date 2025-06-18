"use client";

import { useEffect, useState } from "react";
import type { Task } from "@/lib/types";
import { onTasksUpdate } from "@/firebase/firestore";
import { TaskItem } from "./TaskItem";
import { Skeleton } from "@/components/ui/skeleton";
import { ListChecks, AlertTriangle } from "lucide-react";

interface TaskListProps {
  userId: string;
}

export function TaskList({ userId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    const unsubscribe = onTasksUpdate(userId, (updatedTasks) => {
      setTasks(updatedTasks);
      setLoading(false);
    });
    
    // Handle potential errors from onSnapshot if needed, e.g., by modifying onTasksUpdate
    // For now, we assume onTasksUpdate handles its console errors.

    return () => unsubscribe();
  }, [userId]);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center text-destructive">
        <AlertTriangle className="mb-4 h-12 w-12" />
        <h3 className="mb-2 text-xl font-semibold">Error Loading Tasks</h3>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
        <ListChecks className="mb-4 h-16 w-16 text-muted-foreground/50" />
        <h3 className="mb-2 text-xl font-semibold text-foreground">No Tasks Yet!</h3>
        <p className="text-muted-foreground">Click &quot;Add New Task&quot; to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-3 rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex justify-between">
        <Skeleton className="h-6 w-3/5 rounded" />
        <Skeleton className="h-6 w-6 rounded-sm" />
      </div>
      <Skeleton className="h-4 w-1/2 rounded" />
      <Skeleton className="h-10 w-full rounded" />
      <div className="flex justify-end space-x-2 pt-2">
        <Skeleton className="h-9 w-20 rounded-md" />
      </div>
    </div>
  );
}
