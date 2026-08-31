import type { Metadata } from "next";
import { FaqList } from "@/components/marketing/faq-list";
import { Section } from "@/components/marketing/section";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about PinitGrow's 3-day trial, Pinterest research tools, billing, and cloud workspace.",
};

export default function FaqPage() {
  return (
    <main>
      <Section>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">FAQ</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          Learn how the 3-day trial, research tools, and cloud workspace work.
        </p>
        <div className="mt-8">
          <FaqList items={faqs} />
        </div>
      </Section>
    </main>
  );
}
