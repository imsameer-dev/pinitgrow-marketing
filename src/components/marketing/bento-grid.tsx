import { bento } from "@/lib/site";

export function BentoGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bento.map((tile) => (
        <article
          key={tile.title}
          className="rounded-xl border border-border bg-card p-6"
        >
          <h3 className="text-base font-semibold">{tile.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {tile.body}
          </p>
        </article>
      ))}
    </div>
  );
}
