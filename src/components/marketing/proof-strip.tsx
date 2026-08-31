import { NumberTicker } from "@/components/animate/number-ticker";
import { proofItems } from "@/lib/site";

export function ProofStrip() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {proofItems.map((item) => (
        <li
          key={item.label}
          className="rounded-xl border border-border bg-card p-5"
        >
          <p className="text-3xl font-semibold tracking-tight">
            <NumberTicker value={item.value} suffix={item.suffix} />
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
        </li>
      ))}
    </ul>
  );
}
