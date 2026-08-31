import { howItWorks } from "@/lib/site";

export function HowItWorks() {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {howItWorks.map((item) => (
        <li
          key={item.step}
          className="rounded-xl border border-border bg-card p-6"
        >
          <p className="font-mono text-sm text-primary">{item.step}</p>
          <h3 className="mt-2 text-base font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {item.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
