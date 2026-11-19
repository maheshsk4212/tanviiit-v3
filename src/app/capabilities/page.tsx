import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import code from "@/assets/photos/code.jpg";
import { Contact } from "@/components/home/sections";
import { PageHero, Section, SectionHeading, Steps } from "@/components/page-parts";
import { VehiclesBand } from "@/components/vehicles-band";
import { solutionPhotos } from "@/content/photos";
import { capabilitiesHero, howWeDeliver, outcomes, solutionAreas } from "@/content/site";

export const metadata: Metadata = {
  title: "Capabilities",
  description: capabilitiesHero.supporting,
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        kicker={capabilitiesHero.eyebrow}
        title={capabilitiesHero.headline}
        lead={capabilitiesHero.supporting}
        image={code}
        crumbs={[{ label: "Capabilities" }]}
      />

      <Section>
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <SectionHeading
            kicker="Solution areas"
            title="Six areas, from the first line of code to the last test"
            className="lg:col-span-6"
          />
          <p className="lead text-steel lg:col-span-6 lg:pt-10">{capabilitiesHero.statement}</p>
        </div>

        <ul className="mt-16 space-y-6">
          {solutionAreas.map((area, index) => {
            const photo = solutionPhotos[area.slug];
            return (
              <li key={area.slug}>
                <article className="group grid overflow-hidden rounded-lg border border-line bg-white lg:grid-cols-12">
                  <div
                    className={`relative min-h-64 overflow-hidden lg:col-span-5 ${index % 2 ? "lg:order-2" : ""}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-7 lg:col-span-7 lg:p-12">
                    <h3 className="display text-[clamp(1.5rem,1.2rem+1.2vw,2.1rem)]">
                      <Link href={`/capabilities/${area.slug}`} className="hover:text-federal">
                        {area.name}
                      </Link>
                    </h3>
                    <p className="lead mt-4 text-steel">{area.description}</p>
                    <ul className="mt-7 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {area.services.map((service) => (
                        <li key={service} className="flex items-start gap-3 text-[0.975rem] font-medium">
                          <Check aria-hidden className="mt-1 size-4 shrink-0 text-signal-deep" />
                          {service}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/capabilities/${area.slug}`} className="link-draw mt-8 text-federal">
                      Explore this area
                      <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </Section>

      <VehiclesBand />

      <Section>
        <SectionHeading kicker="Outcomes" title="What the work is meant to change" />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((outcome) => (
            <li key={outcome.name} className="bg-white p-8">
              <h3 className="display text-2xl">{outcome.name}</h3>
              <p className="mt-3 leading-relaxed text-steel">{outcome.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="how-we-deliver" tone="ink">
        <SectionHeading kicker="How we deliver" title="Five steps, repeated for as long as the system lives" />
        <Steps steps={howWeDeliver} className="mt-14" />
      </Section>

      <Contact />
    </>
  );
}
