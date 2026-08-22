import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مولّد الدروس الذكي" },
      { name: "description", content: "مولّد الدروس الذكي للمعلمين" },
      { property: "og:title", content: "مولّد الدروس الذكي" },
      { property: "og:description", content: "مولّد الدروس الذكي للمعلمين" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-6 text-center">
      <h1 className="text-4xl font-extrabold text-primary">مولّد الدروس الذكي</h1>
      <p className="text-muted-foreground">سجّل دخولك للبدء في إنشاء الدروس.</p>
      <Link
        to="/auth"
        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        تسجيل الدخول
      </Link>
    </main>
  );
}
