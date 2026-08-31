import { testimonials } from "@/lib/site";

export function TestimonialMarquee() {
  return (
    <div>
      <p className="mb-4 text-xs text-muted-foreground">
        Illustrative quotes — replace when customer names are available.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <blockquote
            key={item.name}
            className="rounded-xl border border-border bg-card p-5 text-sm leading-6"
          >
            <p>{item.quote}</p>
            <footer className="mt-3 text-xs text-muted-foreground">
              {item.name}
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
