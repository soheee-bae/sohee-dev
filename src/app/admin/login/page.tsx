"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { useAuth } from "@/providers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading && user && isAdmin) {
      router.replace("/admin");
    }
  }, [user, isAdmin, isLoading, router]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Admin sign in</CardTitle>
          <CardDescription>
            Only allowlisted Google accounts can manage content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <GoogleSignInButton onSignedIn={() => router.replace("/admin")} />
          {user && !isAdmin ? (
            <p className="text-sm text-destructive">
              Signed in as {user.email}, but this account is not an admin.
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
