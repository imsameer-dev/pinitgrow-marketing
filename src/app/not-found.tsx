import Link from "next/link";
import { AppLink } from "@/components/marketing/app-link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        That URL is not part of the PinitGrow marketing site.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button variant="outline" asChild>
          <AppLink path="/register">Start free trial</AppLink>
        </Button>
      </div>
    </main>
  );
}
