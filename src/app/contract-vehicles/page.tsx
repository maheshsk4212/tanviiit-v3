import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import columns from "@/assets/photos/columns.jpg";
import { CopyValue } from "@/components/copy-value";
import { Contact } from "@/components/home/sections";
import { PageHero, Section, SectionHeading, Steps } from "@/components/page-parts";
import { buyerSnapshot, howToBuy, naicsCodes, vehicleProfiles, vehiclesHeading } from "@/content/site";

export const metadata: Metadata = {
  title: "Contract vehicles",
  description:
    "Tanvi IT Solutions holds two contract vehicles: NASA SEWP VI Category C (80TECH26D0642) and the GSA Multiple Award Schedule (47QTCA27D0018).",
};

const copyable = new Set(["Contract number", "UEI"]);

export default function ContractVehiclesPage() {
  return (
    <>
      <PageHero
        kicker="Contract vehicles"
        title={vehiclesHeading.title}
        lead={vehiclesHeading.lead}
        image={columns}
        crumbs={[{ label: "Contract vehicles" }]}
      >
        <div className="flex flex-wrap gap-3">
          {vehicleProfiles.map((vehicle, index) => (
            <Link
              key={vehicle.id}
              href={`#${vehicle.id}`}
              className={`btn max-sm:w-full ${index === 0 ? "btn-signal" : "btn-ghost-light"}`}
            >
              {vehicle.name}
              {index === 0 ? <ArrowRight aria-hidden className="size-4" /> : null}
            </Link>
          ))}
        </div>
      </PageHero>

      <Section tone="mist" className="py-14 lg:py-16">
        <h2 className="display text-2xl">What a contracting officer asks for first</h2>
        <dl className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {buyerSnapshot.map((item) => (
            <div key={item.term} className="bg-white p-6">
              <dt className="text-sm text-steel">{item.term}</dt>
              <dd className="mt-1 text-[1.0625rem] font-semibold">
                {item.term === "UEI" ? (
                  <CopyValue value={item.detail} label="UEI" className="[&_button:hover]:bg-mist" />
                ) : (
                  item.detail
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <SectionHeading kicker="Our vehicles" title="Two contract vehicles, both open to federal agencies" />
        <ul className="mt-14 space-y-6">
          {vehicleProfiles.map((vehicle, index) => {
            const dark = index === 0;
            return (
              <li key={vehicle.id} id={vehicle.id} className="scroll-mt-28">
                <article
                  className={`grid gap-x-14 gap-y-8 rounded-lg border p-7 lg:grid-cols-2 lg:p-10 ${
                    dark ? "on-dark border-ink bg-ink text-white" : "border-line bg-white"
                  }`}
                >
                  <div>
                    <p className={`text-sm font-semibold ${dark ? "text-signal" : "text-federal"}`}>
                      {vehicle.kind}
                    </p>
                    <h3 className="display mt-2 text-[clamp(1.75rem,1.4rem+1.3vw,2.5rem)]">{vehicle.name}</h3>
                    <p className={`mt-4 leading-relaxed ${dark ? "text-white/80" : "text-steel"}`}>
                      {vehicle.summary}
                    </p>
                    {"href" in vehicle && vehicle.href ? (
                      <Link href={vehicle.href} className="btn btn-signal mt-8 max-sm:w-full">
                        Open the ordering page
                        <ArrowRight aria-hidden className="size-4" />
                      </Link>
                    ) : (
                      <Link href="/contact#government" className="btn btn-ink mt-8 max-sm:w-full">
                        Request a {vehicle.name} quote
                        <ArrowRight aria-hidden className="size-4" />
                      </Link>
                    )}
                  </div>
                  <dl className={`grid content-start border-t sm:grid-cols-2 ${dark ? "border-white/20" : "border-line"}`}>
                    {vehicle.facts.map((fact) => (
                      <div
                        key={fact.term}
                        className={`border-b py-4 sm:odd:pr-6 sm:even:pl-6 ${dark ? "border-white/20" : "border-line"}`}
                      >
                        <dt className={`text-sm ${dark ? "text-white/65" : "text-steel"}`}>{fact.term}</dt>
                        <dd className="mt-1 font-semibold">
                          {copyable.has(fact.term) ? (
                            <CopyValue
                              value={fact.detail}
                              label={`${vehicle.name} ${fact.term.toLowerCase()}`}
                              className={dark ? undefined : "[&_button:hover]:bg-mist"}
                            />
                          ) : (
                            fact.detail
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="naics" tone="mist" className="py-14 lg:py-16">
        <h2 className="display text-2xl">NAICS codes</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {naicsCodes.map((code) => (
            <li key={code.code} className="rounded-lg border border-line bg-white p-6">
              <p className="display text-2xl tabular-nums">{code.code}</p>
              <p className="mt-1 font-semibold">{code.title}</p>
              <p className="mt-2 text-sm text-steel">{code.vehicle}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="how-to-buy">
        <SectionHeading kicker="How to buy" title="From requirement to award, on either vehicle" />
        <Steps steps={howToBuy} className="mt-14" />
      </Section>

      <Contact />
    </>
  );
}
