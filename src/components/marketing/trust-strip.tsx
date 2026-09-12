import { Container } from "@/components/marketing/section";
import { PenLine, Store, BookOpen, Users } from "lucide-react";

export function TrustStrip() {
  return <section className="audience-strip"><Container className="audience-inner"><p>For people who turn<br className="hidden lg:block" /> inspiration into business.</p><div><span><PenLine /> Creators & bloggers</span><span><Store /> Ecommerce brands</span><span><BookOpen /> Publishers</span><span><Users /> Agencies</span></div></Container></section>;
}
