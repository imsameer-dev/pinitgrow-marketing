import { ArrowRight } from "lucide-react";
import { AppLink } from "@/components/marketing/app-link";
import { ProductFrame, productShots } from "@/components/marketing/product-shot";
import { Container } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { trialDays } from "@/lib/plans";
import { hero } from "@/lib/site";
import Image from "next/image";

export function Hero() {
  const shot = productShots.keywords;

  return (
    <section className="pt-12 pb-10 md:pt-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-2.5 py-1.5 text-xs font-extrabold text-[#514d48]">
            <span className="size-2 rounded-full bg-success" />
            {hero.eyebrow}
          </span>
          <h1 className="mt-4 max-w-[760px] text-5xl leading-[0.98] font-semibold tracking-tight md:text-6xl lg:text-7xl">
            {hero.headlineBefore}
            <span className="text-primary">{hero.headlineAccent}</span>
          </h1>
          <p className="mt-6 max-w-[650px] text-lg text-[#625d57] md:text-[19px]">
            {hero.sub}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <AppLink path="/register">
                Start Free Trial
                <ArrowRight className="size-4" />
              </AppLink>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="#features">See How It Works</a>
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-5 text-[13px] text-[#77716a]">
            <span className="before:mr-1.5 before:font-black before:text-success before:content-['✓']">
              No credit card required
            </span>
            <span className="before:mr-1.5 before:font-black before:text-success before:content-['✓']">
              {trialDays}-day free trial
            </span>
            <span className="before:mr-1.5 before:font-black before:text-success before:content-['✓']">
              Cancel anytime
            </span>
          </div>
        </div>
        <ProductFrame>
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            priority
            className="h-auto w-full"
          />
        </ProductFrame>
      </Container>
    </section>
  );
}
