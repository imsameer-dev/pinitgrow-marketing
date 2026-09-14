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
          <p className="hero-description">A subscription workspace for Pinterest keyword research, Pin comparisons, saved projects and rank tracking.<br className="hidden sm:block" /> Use public data to plan your next content test.</p>
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
