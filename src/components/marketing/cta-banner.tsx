import { ArrowRight } from "lucide-react";
import { AppLink } from "@/components/marketing/app-link";
import { Container } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { trialDays } from "@/lib/plans";

export function CtaBanner() {
  return <section className="closing-section"><Container><div className="closing-inner"><div><p className="eyebrow">GOOD RESEARCH. BETTER POSSIBILITIES.</p><h2>Your next opportunity<br />is waiting to be found.</h2><p>Make your first search. See where it takes you.</p></div><div className="closing-action"><Button size="lg" asChild><AppLink path="/register">Start Free Trial <ArrowRight /></AppLink></Button><p>{trialDays} days free. No credit card required.</p></div></div></Container></section>;
}
