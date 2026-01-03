import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { GoogleIcon } from "@hugeicons/core-free-icons";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  // Redirect if already logged in
  if (data?.user) {
    redirect("/dashboard");
  }

  async function signInWithGoogle() {
    "use server";
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      console.error("Error signing in with Google:", error);
      return;
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Mind Cave</h1>
          <p className="mt-2 text-muted-foreground">
            Your centralized bookmark management tool
          </p>
        </div>

        <form action={signInWithGoogle} className="mt-8">
          <Button type="submit" className="w-full" size="lg">
            <HugeiconsIcon icon={GoogleIcon} className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
