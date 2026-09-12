import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppLink } from "@/components/marketing/app-link";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { DataTable } from "@/components/marketing/data-table";
import { Decision } from "@/components/marketing/decision";
import { ProductShot } from "@/components/marketing/product-shot";
import { Container, Section, SectionHeading } from "@/components/marketing/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { appUrl } from "@/lib/app-url";
import {
  featurePages,
  featurePath,
  getFeaturePage,
  planLimitsForFeature,
  type FeaturePage,
  type FeatureTable,
} from "@/lib/feature-pages";

export function FeatureDetail({ page }: { page: FeaturePage }) {
  const limits = planLimitsForFeature(page.slug);
  const related = page.related
    .map((slug) => getFeaturePage(slug))
    .filter((item): item is FeaturePage => Boolean(item));

  return (
    <main>
      <Section className="py-12 md:py-16">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/features" className="transition-colors hover:text-foreground">
                  Features
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">{page.title}</li>
            </ol>
          </nav>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <Badge variant="outline">{page.badge}</Badge>
              <h1 className="mt-4 max-w-[14ch] text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] font-semibold tracking-tight">
                {page.title}
              </h1>
              <p className="mt-4 max-w-[36rem] text-[17px] leading-relaxed text-muted-foreground">
                {page.lead}
              </p>
              <Decision question={page.decision} className="mt-6 max-w-[36rem]" />
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild>
                  <AppLink path="/register">Start Free Trial</AppLink>
                </Button>
                <Button variant="outline" asChild>
                  <a href={appUrl(page.appPath)}>Open in the app</a>
                </Button>
              </div>
            </div>
            <ProductShot
              name={page.shot}
              preload
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
        </Container>
      </Section>

      <Section soft className="py-16 md:py-20">
        <Container>
          <SectionHeading kicker="Workflow" title="How it works in the app." />
          <div className="grid gap-4 md:grid-cols-3">
            <FactCard step="01" title="You start with" body={page.input} />
            <FactCard step="02" title="PinitGrow does" body={page.process} />
            <FactCard step="03" title="You get" body={page.output} />
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-20">
        <Container>
          <SectionHeading
            kicker="Complete details"
            title="Every field this tool returns."
            lead="Column names match the live PinitGrow workspace, including exports where the app provides them."
          />
          <div className="space-y-12">
            {page.tables.map((table) => (
              <div key={table.title}>
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{table.title}</h3>
                {table.caption ? (
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    {table.caption}
                  </p>
                ) : null}
                <div className="mt-5">
                  <DetailTable table={table} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {page.extras.length || page.actions.length ? (
        <Section soft className="py-16 md:py-20">
          <Container>
            <SectionHeading kicker="Also in this tool" title="Actions and extra behavior." />
            <div className="grid items-stretch gap-4 lg:grid-cols-2">
              {page.actions.length ? (
                <div className="surface-card p-6">
                  <h3 className="text-lg font-semibold">What you can do</h3>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                    {page.actions.map((action) => (
                      <li key={action} className="flex gap-2.5">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {page.extras.map((extra) => (
                <div key={extra.title} className="surface-card p-6">
                  <h3 className="text-lg font-semibold">{extra.title}</h3>
                  <p className="mt-3 max-w-[42rem] text-sm leading-relaxed text-muted-foreground">
                    {extra.body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section className="py-16 md:py-20">
        <Container>
          <SectionHeading
            kicker="Plans"
            title="What each plan includes for this tool."
            lead={
              limits.length
                ? "Limits match the live app catalog."
                : "This tool is included on every plan and does not have a separate monthly quota."
            }
          />
          {limits.length ? (
            <DataTable caption={`${page.title} plan limits`}>
              <thead>
                <tr>
                  <th scope="col">Capability</th>
                  <th scope="col">Basic</th>
                  <th scope="col">Pro</th>
                  <th scope="col">Studio</th>
                </tr>
              </thead>
              <tbody>
                {limits.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="font-medium text-foreground">
                      {row.label}
                    </th>
                    <td className="text-muted-foreground">{row.creator}</td>
                    <td className="text-muted-foreground">{row.professional}</td>
                    <td className="text-muted-foreground">{row.studio}</td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          ) : (
            <p className="text-sm text-muted-foreground">
              Daily research quotas apply to explorers and trackers. {page.title} stays
              available with your plan.
            </p>
          )}
        </Container>
      </Section>

      <Section soft className="py-16 md:pb-10">
        <Container>
          <SectionHeading kicker="Next" title="Related research tools." />
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={featurePath(item.slug)}
                className="group surface-card-interactive flex h-full flex-col p-6 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                  {item.badge}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.lead}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                  See details
                  <ArrowRight className="size-4 transition-transform duration-[var(--duration-normal)] group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            <Link href="/features" className="font-semibold text-foreground hover:underline">
              All features
            </Link>
            {" · "}
            {featurePages.length} tools in the workspace
          </p>
        </Container>
      </Section>
      <CtaBanner />
    </main>
  );
}

function FactCard({
  step,
  title,
  body,
}: {
  step: string;
  title: string;
  body: string;
}) {
  return (
    <article className="surface-card flex h-full flex-col p-6">
      <span className="text-[13px] font-semibold tracking-[0.12em] text-primary">{step}</span>
      <h3 className="mt-3 text-sm font-semibold tracking-[0.08em] text-foreground uppercase">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </article>
  );
}

function DetailTable({ table }: { table: FeatureTable }) {
  return (
    <DataTable caption={table.title}>
      <thead>
        <tr>
          <th scope="col">Column</th>
          <th scope="col">What it shows</th>
        </tr>
      </thead>
      <tbody>
        {table.columns.map((column) => (
          <tr key={column.name}>
            <th scope="row" className="whitespace-nowrap font-medium text-foreground">
              {column.name}
            </th>
            <td className="text-muted-foreground">{column.meaning}</td>
          </tr>
        ))}
      </tbody>
    </DataTable>
  );
}
