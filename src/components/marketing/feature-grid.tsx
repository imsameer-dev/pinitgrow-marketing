import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/marketing/section";
import { features } from "@/lib/site";
import { productShots } from "@/lib/product-shots";
import { featurePath } from "@/lib/feature-pages";

const stories = [
  { id: "keyword-explorer", number: "01", label: "FIND THE OPPORTUNITY", title: "Great content starts with a better question.", body: "Go from a broad topic to the specific things people are searching for. Uncover long-tail keywords and relevant ideas before you invest in creating.", points: ["Expand any seed across A–Z and 0–9", "Compare search intent and popularity", "Save your shortlist or export to CSV"], link: "Explore Keyword Explorer", shot: "keyword-explorer" },
  { id: "top-pins", number: "02", label: "UNDERSTAND WHAT WORKS", title: "See the strategy behind the scroll.", body: "The best research goes beyond a pretty pin. Study the content that ranks, compare public engagement, and find patterns you can bring to your next brief.", points: ["Inspect top-ranking pins in your niche", "Compare saves, titles, and source domains", "Explore the accounts and boards behind them"], link: "Explore Top Pins", shot: "top-pins" },
  { id: "rank-tracker", number: "03", label: "BUILD ON WHAT YOU LEARN", title: "A clearer view of your next move.", body: "Keep your research connected. Follow keyword positions over time, spot shifting search results, and return to saved projects when it’s time to plan again.", points: ["Track keyword positions for your domain", "Compare scheduled search snapshots", "Keep keywords and pins in saved lists"], link: "Explore Rank Tracker", shot: "rank-tracker" },
] as const;

export function FeatureGrid() {
  return <section id="features" className="feature-section"><Container>
    <div className="section-intro"><p className="eyebrow">LESS GUESSWORK. MORE DIRECTION.</p><h2>Know what to create.<br /><span className="text-muted-foreground">And why it’s worth creating.</span></h2><p>From the first keyword to your next content plan.<br />One connected workspace for every research decision.</p></div>
    <div className="feature-stories">{stories.map((story) => {
      const shot = productShots[story.shot];
      return <article className="feature-story" key={story.id}>
        <div className="story-copy"><p className="eyebrow"><span className="story-number">{story.number}</span>{story.label}</p><h3>{story.title}</h3><p className="story-body">{story.body}</p><ul>{story.points.map((point) => <li key={point}><Check />{point}</li>)}</ul><Link href={featurePath(story.id)} className="text-link">{story.link}<ArrowRight /></Link></div>
        <div className={`story-visual story-visual-${story.number}`}><div className="story-image"><Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(min-width: 1024px) 800px, 120vw" /></div><span className="story-visual-label"><span /> {story.shot === "keyword-explorer" ? "From one topic to new possibilities" : story.shot === "top-pins" ? "Real pins. Useful context." : "Make progress part of the plan"}</span></div>
      </article>;
    })}</div>
    <div className="tool-directory"><div className="directory-heading"><div><p className="eyebrow">THE COMPLETE TOOLKIT</p><h3>Everything you need.<br />All in one place.</h3></div><Link className="text-link" href="/features">Compare all 11 tools <ArrowRight /></Link></div><div className="directory-links">{features.map((feature) => <Link key={feature.id} href={featurePath(feature.id)}><span>{feature.title}</span><ArrowUpRight /></Link>)}</div></div>
  </Container></section>;
}
