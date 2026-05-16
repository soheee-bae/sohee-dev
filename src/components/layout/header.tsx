"use client";

import Link from "next/link";
import * as React from "react";
import { LogOutIcon, ShieldIcon, UserIcon } from "lucide-react";

import { useAuth } from "@/providers";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/firebase/auth";
import { themeConfig } from "@/lib/theme.config";

export function Header() {
  const { user, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          {themeConfig.brand.name}
        </Link>
        <nav className="flex items-center gap-2">
          <Button render={<Link href="/blog" />} nativeButton={false} variant="ghost" size="sm">
            Blog
          </Button>
          <ThemeToggle />
          {user ? <UserMenu isAdmin={isAdmin} email={user.email ?? ""} photoURL={user.photoURL ?? undefined} /> : null}
        </nav>
      </div>
    </header>
  );
}

function UserMenu({
  isAdmin,
  email,
  photoURL,
}: {
  isAdmin: boolean;
  email: string;
  photoURL?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-7 w-7">
              <AvatarImage src={photoURL} alt={email} />
              <AvatarFallback>
                <UserIcon className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate">{email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isAdmin ? (
          <DropdownMenuItem render={<Link href="/admin" />}>
            <ShieldIcon className="mr-2 h-4 w-4" />
            Command Center
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem onClick={() => void signOut()}>
          <LogOutIcon className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
