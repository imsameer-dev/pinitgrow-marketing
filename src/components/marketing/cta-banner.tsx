import { AppLink } from "@/components/marketing/app-link";
import { Button } from "@/components/ui/button";

export function CtaBanner({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card px-6 py-12 text-center">
      <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
        {body}
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button asChild>
          <AppLink path="/register">Start free trial</AppLink>
        </Button>
        <Button variant="outline" asChild>
          <AppLink path="/login">Log in</AppLink>
        </Button>
      </div>
    </div>
  );
}
