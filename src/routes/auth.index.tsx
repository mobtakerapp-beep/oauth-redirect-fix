import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth/")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول — مولّد الدروس الذكي" },
      { name: "description", content: "سجّل دخولك أو أنشئ حسابًا للوصول إلى مولّد الدروس الذكي." },
      { property: "og:title", content: "تسجيل الدخول — مولّد الدروس الذكي" },
      { property: "og:description", content: "سجّل دخولك أو أنشئ حسابًا للوصول إلى مولّد الدروس الذكي." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  );
}

const REDIRECT_URI = "https://mulakhasy-ai.mobtakerapp.workers.dev/auth/callback";

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/" });
    });
  }, [navigate]);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: REDIRECT_URI,
      });

      if (result.error) throw result.error;
      if (result.redirected) {
        // Browser will redirect to Google - just return and let it happen
        return;
      }

      // Tokens received and session set - user is authenticated
      toast.success("تم تسجيل الدخول بنجاح!");
      navigate({ to: "/" });
    } catch (error) {
      const raw = error instanceof Error ? error.message : String(error ?? "");
      console.error("Google sign-in failed:", error);
      toast.error(raw || "فشل تسجيل الدخول بجوجل");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Toaster position="top-center" />
      <Card className="w-full max-w-md rounded-3xl border-border/70 p-6 shadow-lg sm:p-8">
        <Link
          to="/"
          aria-label="الرجوع للصفحة الرئيسية"
          title="الرجوع للصفحة الرئيسية"
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Home className="size-3.5" />
          الرئيسية
        </Link>
        <div className="text-center">
          <h1 className="mt-3 text-2xl font-extrabold text-primary">تسجيل الدخول</h1>
          <p className="mt-1 text-sm text-muted-foreground">مولّد الدروس الذكي للمعلمين</p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="mt-6 w-full rounded-full"
          onClick={() => void signInWithGoogle()}
          disabled={loading}
        >
          <GoogleIcon className="me-2 h-5 w-5 shrink-0" />
          تسجيل الدخول بجوجل
        </Button>
      </Card>
    </main>
  );
}
