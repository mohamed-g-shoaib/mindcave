import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "./login-form";
import MindCaveLogo from "@/components/mind-cave-logo";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

async function AuthCheck() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/dashboard");
  }

  return null;
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Suspense fallback={null}>
        <AuthCheck />
      </Suspense>
      <div className="w-full max-w-md px-4">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="h-4 w-4" />
          Back to home
        </Link>

        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <MindCaveLogo className="h-12 w-12" />
              <h1 className="text-4xl font-bold tracking-tight">Mind Cave</h1>
            </div>
            <p className="mt-2 text-muted-foreground">
              Your centralized bookmark management tool
            </p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-muted-foreground leading-relaxed">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="font-medium text-foreground underline underline-offset-4 hover:opacity-80"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-foreground underline underline-offset-4 hover:opacity-80"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
