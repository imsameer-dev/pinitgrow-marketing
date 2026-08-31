import { CtaBanner } from "@/components/marketing/cta-banner";
import { ProductShot } from "@/components/marketing/product-shot";
import { Section } from "@/components/marketing/section";
import { tools } from "@/lib/site";

export default function FeaturesPage() {
  return (
    <main>
      <Section>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Every research tool in one workspace.
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          Cloud access, not a desktop install.
        </p>
      </Section>
      {tools.map((tool, index) => (
        <Section key={tool.title}>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className={index % 2 ? "md:order-2" : undefined}>
              <h2 className="text-xl font-semibold tracking-tight">{tool.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">You type: </span>
                {tool.input}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">You get: </span>
                {tool.output}
              </p>
            </div>
            <ProductShot name={tool.shot} />
          </div>
          {tool.title === "Top Pins" ? (
            <div className="mt-12">
              <CtaBanner
                title="Try Top Pins on your niche"
                body="Open the 3-day trial and run a keyword you already publish."
              />
            </div>
          ) : null}
        </Section>
      ))}
      <Section>
        <CtaBanner
          title="The workspace is on app.pinitgrow.com"
          body="Create an account in the app. This site does not take passwords."
        />
      </Section>
    </main>
  );
}
