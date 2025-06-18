"use client";

import { TaskList } from "@/components/tasks/TaskList";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null; // AuthGuard should handle this, but good practice

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Your Tasks</h1>
        <Button asChild>
          <Link href="/add-task">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Task
          </Link>
        </Button>
      </div>
      <TaskList userId={user.uid} />
    </div>
  );
}
