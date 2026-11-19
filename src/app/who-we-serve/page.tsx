import type { Metadata } from "next";
import Image from "next/image";

import columns from "@/assets/photos/columns.jpg";
import { Contact } from "@/components/home/sections";
import { PageHero, Section, TextLink } from "@/components/page-parts";
import { industryNames, sectorPhotos } from "@/content/photos";
import { customerGroups, sectorTabs } from "@/content/site";

export const metadata: Metadata = {
  title: "Who we serve",
  description:
    "Tanvi IT Solutions serves federal, state and local government, defense and intelligence programs, health systems and regulated commercial sectors.",
};

/**
 * NEEDS-CONTENT: per-industry summaries. The content file points each sector
 * at industry entries kept in a separate file that was not supplied, so only
 * the industry names are shown.
 */
export default function WhoWeServePage() {
  return (
    <>
      <PageHero
        kicker="Who we serve"
        title="Delivering solutions for government agencies and enterprises"
        lead="Four sectors with one thing in common: the systems cannot stop while they are being improved."
        image={columns}
        crumbs={[{ label: "Who we serve" }]}
      >
        <ul className="flex flex-wrap gap-2">
          {sectorTabs.map((sector) => (
            <li key={sector.key}>
              <a
                href={`#${sector.key}`}
                className="flex min-h-11 items-center rounded-full border border-white/30 px-5 font-semibold transition-colors hover:border-signal hover:text-signal"
              >
                {sector.tab}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {sectorTabs.map((sector, index) => {
        const photo = sectorPhotos[sector.key];
        return (
          <Section key={sector.key} id={sector.key} tone={index % 2 ? "mist" : "white"}>
            <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-12">
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-lg lg:col-span-6 ${index % 2 ? "lg:order-2" : ""}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-6">
                <p className="kicker">{sector.eyebrow}</p>
                <h2 className="h-section mt-4">{sector.title}</h2>
                <p className="lead mt-6 text-steel">{sector.lead}</p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {sector.industrySlugs.map((slug) => (
                    <li
                      key={slug}
                      className={`rounded-full px-4 py-2 text-[0.95rem] font-medium ${index % 2 ? "bg-white" : "bg-mist"}`}
                    >
                      {industryNames[slug] ?? slug}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <TextLink href={`/contact#${sector.key === "commercial" ? "commercial" : "government"}`}>
                    Talk to us about {sector.tab.toLowerCase()} work
                  </TextLink>
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      <Section>
        <h2 className="display text-2xl">Organizations our teams have delivered for</h2>
        <div className="mt-10 grid gap-x-16 gap-y-10 lg:grid-cols-12">
          {customerGroups.map((group, index) => (
            <div key={group.heading} className={index === 0 ? "lg:col-span-4" : "lg:col-span-8"}>
              <h3 className="border-b border-ink pb-3 text-sm font-semibold text-federal">
                {group.heading}
              </h3>
              <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                {group.customers.map((customer) => (
                  <li key={customer.name}>
                    <span className="display block text-2xl">{customer.name}</span>
                    {customer.detail ? (
                      <span className="mt-1 block text-sm text-steel">{customer.detail}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Contact />
    </>
  );
}
