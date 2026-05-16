"use client";

import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/firebase/auth";

export function GoogleSignInButton({
  onSignedIn,
}: {
  onSignedIn?: () => void;
}) {
  const [isPending, setIsPending] = React.useState(false);

  const handleClick = async () => {
    setIsPending(true);
    try {
      await signInWithGoogle();
      onSignedIn?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign-in failed";
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={isPending} className="w-full">
      <GoogleIcon className="mr-2 h-4 w-4" />
      {isPending ? "Signing in…" : "Sign in with Google"}
    </Button>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.66 4.1-5.5 4.1-3.31 0-6-2.74-6-6.1s2.69-6.1 6-6.1c1.88 0 3.14.8 3.86 1.49l2.63-2.55C16.83 3.3 14.65 2.4 12 2.4 6.91 2.4 2.8 6.5 2.8 11.6S6.91 20.8 12 20.8c6.93 0 9.27-4.86 9.27-7.36 0-.5-.05-.88-.12-1.24z"
      />
    </svg>
  );
}
