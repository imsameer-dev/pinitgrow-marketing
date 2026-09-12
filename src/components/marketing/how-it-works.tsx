import { ArrowRight } from "lucide-react";
import { Container } from "@/components/marketing/section";
import { AppLink } from "@/components/marketing/app-link";

export function HowItWorks() {
  return <section id="usecases" className="usecases-section"><Container><div className="usecases-heading"><div><p className="eyebrow">YOUR NICHE. YOUR NEXT CHAPTER.</p><h2>Built for the work<br />behind the growth.</h2></div><p>Whether you’re planning your next post or your next client campaign, start with a clearer picture of the opportunity.</p></div><div className="usecase-columns">{[
    { num: "01", audience: "Creators & publishers", title: "Make your next post count.", body: "Find searchable topics and fresh angles for your editorial calendar. Spend less time collecting ideas and more time creating with a purpose." },
    { num: "02", audience: "Ecommerce & brands", title: "Meet your next customer’s search.", body: "Understand how people discover products like yours. Explore relevant keywords, seasonal interest, and the visual content that gets attention." },
    { num: "03", audience: "Agencies & strategists", title: "Bring evidence to every brief.", body: "Research client niches, study competitors, and organize findings into projects. Give every recommendation a clear starting point." },
  ].map((item) => <article key={item.num}><span className="usecase-number">{item.num}</span><p className="usecase-audience">{item.audience}</p><h3>{item.title}</h3><p>{item.body}</p></article>)}</div><AppLink path="/register" className="text-link">Find your next opportunity <ArrowRight /></AppLink></Container></section>;
}
