"use client";

import type { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteTask, updateTaskStatus } from "@/firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from 'date-fns';
import { Trash2, Edit3, CheckCircle2, Circle, CalendarDays, FileText, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      toast({ title: "Task Deleted", description: `"${task.title}" has been removed.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Error Deleting Task", description: "Could not delete the task." });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (checked: boolean) => {
    setIsUpdatingStatus(true);
    try {
      await updateTaskStatus(task.id, checked);
      toast({ title: "Task Updated", description: `"${task.title}" status changed.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Error Updating Task", description: "Could not update task status." });
    } finally {
      setIsUpdatingStatus(false);
    }
  };
  
  const formattedDate = task.createdAt ? formatDistanceToNow(task.createdAt.toDate(), { addSuffix: true }) : 'Date not available';

  return (
    <Card className={`transition-all duration-300 ease-in-out hover:shadow-lg ${task.status ? "bg-muted/50 border-green-500/30" : "bg-card"}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className={`text-xl font-semibold ${task.status ? "line-through text-muted-foreground" : "text-foreground"}`}>
            {task.title}
          </CardTitle>
          <div className="flex items-center space-x-2">
            {isUpdatingStatus ? <Loader2 className="h-5 w-5 animate-spin" /> : (
              <Checkbox
                id={`task-${task.id}`}
                checked={task.status}
                onCheckedChange={(checked) => handleStatusChange(Boolean(checked))}
                aria-label={task.status ? "Mark task as pending" : "Mark task as complete"}
                className="h-5 w-5 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-600"
              />
            )}
            {task.status ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
          </div>
        </div>
        <CardDescription className="flex items-center text-xs text-muted-foreground pt-1">
          <CalendarDays className="mr-1.5 h-3 w-3" />
          {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className={`text-sm ${task.status ? "line-through text-muted-foreground" : "text-foreground/90"}`}>
          {task.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {/* Future Edit Button - Not implemented yet
        <Button variant="outline" size="sm" disabled>
          <Edit3 className="mr-1 h-4 w-4" /> Edit
        </Button>
        */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" disabled={isDeleting}>
              {isDeleting ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Trash2 className="mr-1 h-4 w-4" />}
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the task titled &quot;{task.title}&quot;.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
