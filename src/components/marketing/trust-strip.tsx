import { Container } from "@/components/marketing/section";
import { audiences } from "@/lib/site";

export function TrustStrip() {
  return (
    <section className="pt-9 pb-4">
      <Container>
        <p className="mb-5 text-center text-[13px] text-[#77716a]">
          Built for bloggers, niche site owners, affiliate marketers, creators and
          agencies
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {audiences.map((label) => (
            <div
              key={label}
              className="text-center text-base font-extrabold tracking-tight text-[#948f88]"
            >
              {label}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
