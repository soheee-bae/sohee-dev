"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginRoute = pathname?.startsWith("/admin/login") ?? false;

  React.useEffect(() => {
    if (isLoading || isLoginRoute) return;
    if (!user || !isAdmin) {
      router.replace("/admin/login");
    }
  }, [isLoading, isLoginRoute, user, isAdmin, router]);

  if (isLoginRoute) {
    return <>{children}</>;
  }

  if (isLoading || !user || !isAdmin) {
    return (
      <div className="mx-auto max-w-5xl space-y-4 px-4 py-10">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return <>{children}</>;
}
