"use client";
import { AddTaskForm } from "@/components/tasks/AddTaskForm";

export default function AddTaskPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4">
      <AddTaskForm />
    </div>
  );
}
