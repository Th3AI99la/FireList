"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Mail, UserCircle, ShieldCheck } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  if (!user) {
    // This should ideally be handled by AuthGuard, but as a fallback:
    // router.push('/login');
    return null; 
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      router.push("/login");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Logout Failed", description: error.message });
    }
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24 mb-4 border-2 border-primary p-0.5">
            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || "User"} data-ai-hint="profile large_avatar"/>
            <AvatarFallback className="text-3xl">
                {user.email ? user.email.charAt(0).toUpperCase() : <UserCircle className="h-12 w-12" />}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">
            {user.displayName || "User Profile"}
          </CardTitle>
          <CardDescription>Manage your account information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3 rounded-md border p-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 rounded-md border p-3">
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Account Status</p>
              <p className="text-sm font-medium text-green-600">Verified</p>
            </div>
          </div>
          {/* Add more user details here if available and needed */}
        </CardContent>
        <CardFooter>
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
