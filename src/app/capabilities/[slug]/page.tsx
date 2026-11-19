import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { Contact } from "@/components/home/sections";
import { PageHero, Section, SectionHeading, Steps } from "@/components/page-parts";
import { VehiclesBand } from "@/components/vehicles-band";
import { solutionPhotos } from "@/content/photos";
import { howWeDeliver, solutionAreas } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutionAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = solutionAreas.find((item) => item.slug === slug);
  return area ? { title: area.name, description: area.description } : {};
}

/**
 * NEEDS-CONTENT: the client's guide gives each solution area one sentence and
 * a list of services. Past-performance examples and tools for each area would
 * turn these into full pages.
 */
export default async function SolutionAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = solutionAreas.find((item) => item.slug === slug);
  if (!area) notFound();

  const photo = solutionPhotos[area.slug];
  const others = solutionAreas.filter((item) => item.slug !== area.slug);

  return (
    <>
      <PageHero
        kicker="Solution area"
        title={area.name}
        lead={area.description}
        image={photo.src}
        crumbs={[{ label: "Capabilities", href: "/capabilities" }, { label: area.name }]}
      >
        <Link href="/contact" className="btn btn-signal">
          Discuss a requirement
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </PageHero>

      <Section>
        <SectionHeading kicker="Services" title="What this area covers" />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {area.services.map((service) => (
            <li key={service} className="flex items-start gap-4 bg-white p-7">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-mist">
                <Check aria-hidden className="size-5 text-signal-deep" />
              </span>
              <span className="display pt-1 text-lg leading-snug">{service}</span>
            </li>
          ))}
        </ul>
      </Section>

      <VehiclesBand />

      <Section tone="ink">
        <SectionHeading kicker="How we deliver" title="The same five steps on every engagement" />
        <Steps steps={howWeDeliver} className="mt-14" />
      </Section>

      <Section tone="mist">
        <SectionHeading kicker="Capabilities" title="Other solution areas" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/capabilities/${item.slug}`}
                className="group flex h-full flex-col rounded-lg border border-line bg-white p-7 transition duration-300 hover:-translate-y-0.5 hover:border-ink"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="display text-xl leading-tight">{item.name}</span>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-1 size-5 shrink-0 text-steel transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-federal"
                  />
                </span>
                <span className="mt-3 text-[0.975rem] leading-relaxed text-steel">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Contact />
    </>
  );
}
