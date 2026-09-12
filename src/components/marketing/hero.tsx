import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { AppLink } from "@/components/marketing/app-link";
import { Container } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { ProductTour } from "@/components/marketing/product-tour";
import { trialDays } from "@/lib/plans";

export function Hero() {
  return (
    <section className="home-hero">
      <Container>
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> THE PINTEREST RESEARCH WORKSPACE</p>
          <h1>Your next big idea.<br />Backed by <span>Pinterest data.</span></h1>
          <p className="hero-description">Find what people search. Understand what gets saved.<br className="hidden sm:block" /> Turn Pinterest research into content worth creating.</p>
          <div className="hero-actions">
            <Button size="lg" asChild><AppLink path="/register">Start Free Trial <ArrowRight /></AppLink></Button>
            <Button size="lg" variant="secondary" asChild><a href="#product-tour">Explore the product <ArrowDown /></a></Button>
          </div>
          <p className="hero-reassurance"><span><Check /> {trialDays} days free</span><span><Check /> No credit card required</span></p>
        </div>
        <ProductTour />
      </Container>
    </section>
  );
}
