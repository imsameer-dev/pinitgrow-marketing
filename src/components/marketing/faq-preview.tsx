import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { Container } from "@/components/marketing/section";
import { homeFaqs } from "@/lib/site";

export function FaqPreview() {
  return <section className="faq-section"><Container className="faq-layout"><div><p className="eyebrow">A LITTLE MORE CLARITY</p><h2>Good questions.<br />Straight answers.</h2><p>Everything else you’d like to know?</p><Link href="/contact" className="text-link">Talk to our team <ArrowRight /></Link></div><div className="faq-list">{homeFaqs.slice(0, 5).map((item) => <details key={item.q}><summary>{item.q}<Plus /></summary><p>{item.a}</p></details>)}<Link href="/faq" className="text-link">View all FAQs <ArrowRight /></Link></div></Container></section>;
}
