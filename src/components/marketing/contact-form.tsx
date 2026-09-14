"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

// Web3Forms access keys are public form identifiers, intended for browser submissions.
const accessKey = "7d5c8c79-c627-4abb-8ec2-6645c388b873";
const fieldClass = "mt-2 w-full rounded-lg border border-border-strong bg-background px-3.5 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:opacity-60";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const inFlight = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) {
      setError("Please enter your name, email and message.");
      setStatus("error");
      return;
    }
    inFlight.current = true;
    setStatus("sending");
    setError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: accessKey,
          from_name: "PinitGrow Contact",
          subject: `PinitGrow enquiry: ${data.get("topic")}`,
          name, email, message,
          topic: data.get("topic"),
          botcheck: false,
        }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error("submission_failed");
      form.reset();
      setStatus("success");
    } catch {
      setError("We couldn’t confirm that your message was sent. Your details are still here. Try again, or email us directly.");
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      inFlight.current = false;
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_12px_50px_-30px_rgba(34,41,35,0.25)] sm:p-9">
      <div className="mb-7 flex items-start justify-between gap-4">
        <div><h2 className="text-2xl font-semibold tracking-tight">Send us a message</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">A question, a suggestion, or a little help getting started.</p></div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-primary" aria-hidden="true"><ArrowUpRight className="size-5" /></span>
      </div>
      {status === "success" ? (
        <div role="status" className="rounded-xl border border-border bg-surface-subtle px-6 py-10 text-center">
          <CheckCircle2 className="mx-auto mb-4 size-10 text-foreground" aria-hidden="true" />
          <h3 className="text-xl font-semibold">Message sent. Thank you!</h3>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">We’ll reply to the email address you provided. You can get back to your research in the meantime.</p>
          <Button type="button" variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>Send another message</Button>
        </div>
      ) : (
        <form onSubmit={submit} aria-label="Contact PinitGrow" aria-busy={status === "sending"}>
          <fieldset disabled={status === "sending"} className="min-w-0 space-y-5">
            <legend className="sr-only">Your contact details and message</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium" htmlFor="contact-name">Your name<input className={fieldClass} id="contact-name" name="name" autoComplete="name" placeholder="Your name" required maxLength={120} /></label>
              <label className="block text-sm font-medium" htmlFor="contact-email">Email address<input className={fieldClass} id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label>
            </div>
            <label className="block text-sm font-medium" htmlFor="contact-topic">What can we help with?
              <select className={fieldClass} id="contact-topic" name="topic" defaultValue="" required>
                <option value="" disabled>Select a topic</option>
                <option>Product support</option><option>Plans &amp; billing</option><option>Cancellation or refund</option><option>Feedback &amp; ideas</option><option>Privacy enquiry</option><option>Something else</option>
              </select>
            </label>
            <label className="block text-sm font-medium" htmlFor="contact-message">Your message<textarea className={`${fieldClass} min-h-40 resize-y`} id="contact-message" name="message" placeholder="Tell us a little about what you need…" rows={5} required maxLength={5000} aria-describedby="message-hint" /></label>
            <p id="message-hint" className="-mt-2 text-xs leading-5 text-muted-foreground">For account questions, use your account email. Please leave out passwords and payment card details.</p>
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <p className="text-xs leading-5 text-muted-foreground">We’ll use your details to respond to your enquiry. Read our <Link className="text-link" href="/privacy">Privacy Policy</Link>.</p>
            <Button type="submit" size="full" className="h-12">{status === "sending" ? <><LoaderCircle className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> Sending…</> : <>Send message <ArrowUpRight aria-hidden="true" /></>}</Button>
          </fieldset>
          {status === "error" && <div role="alert" className="mt-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm leading-6"><p>{error}</p><a className="text-link" href={`mailto:${site.email}`}>{site.email}</a></div>}
          <noscript><p className="mt-4 text-sm">Please enable JavaScript to use this form, or email <a href={`mailto:${site.email}`}>{site.email}</a>.</p></noscript>
        </form>
      )}
    </div>
  );
}
