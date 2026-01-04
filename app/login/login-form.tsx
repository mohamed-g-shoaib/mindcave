"use client";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { GoogleIcon } from "@hugeicons/core-free-icons";
import { signInWithGoogle } from "./actions";

export function LoginForm() {
  return (
    <form action={signInWithGoogle} className="mt-8">
      <Button type="submit" className="w-full" size="lg">
        <HugeiconsIcon icon={GoogleIcon} className="mr-2 h-5 w-5" />
        Continue with Google
      </Button>
    </form>
  );
}
