import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeatureDetail } from "@/components/marketing/feature-detail";
import { featureStaticParams, getFeaturePage } from "@/lib/feature-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return featureStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getFeaturePage(slug);
  if (!page) return { title: "Features" };

  return {
    title: page.title,
    description: page.lead,
  };
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getFeaturePage(slug);
  if (!page) notFound();

  return <FeatureDetail page={page} />;
}
