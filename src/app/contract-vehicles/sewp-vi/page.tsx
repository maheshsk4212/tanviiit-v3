import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

import earth from "@/assets/photos/earth.jpg";
import { CopyValue } from "@/components/copy-value";
import { Contact } from "@/components/home/sections";
import { PageHero, Section, SectionHeading } from "@/components/page-parts";
import { sewpVi } from "@/content/site";

export const metadata: Metadata = {
  title: "NASA SEWP VI, Category C",
  description:
    "How to order IT mission-based services from Tanvi IT Solutions through NASA SEWP VI Category C, contract 80TECH26D0642: contract details, points of contact, scope and ordering steps.",
};

const copyable = new Set(["Contract number", "UEI"]);

/**
 * NEEDS-CONTENT: the ordering guide PDF (sewpVi.orderingGuide.href). The file
 * was not supplied, so the page names the guide's version but does not link
 * to it. Add the PDF to /public and a download button here.
 */
export default function SewpViPage() {
  return (
    <>
      <PageHero
        kicker="Contract 80TECH26D0642"
        title="NASA SEWP VI, Category C"
        lead="IT mission-based services for every federal agency and their approved contractors, ordered through NASA's Solutions for Enterprise-Wide Procurement."
        image={earth}
        crumbs={[{ label: "Contract vehicles", href: "/contract-vehicles" }, { label: "NASA SEWP VI" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#ordering" className="btn btn-signal max-sm:w-full">
            See how to order
            <ArrowRight aria-hidden className="size-4" />
          </Link>
          <Link href="#contacts" className="btn btn-ghost-light max-sm:w-full">
            Find a point of contact
          </Link>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading kicker="About the program" title="What SEWP is" />
            <p className="mt-8 text-[1.0625rem] leading-[1.75] text-steel">{sewpVi.overview}</p>
          </div>
          <div className="lg:col-span-5">
            <h2 className="display border-b border-ink pb-4 text-2xl">Contract details</h2>
            <dl>
              {sewpVi.contract.map((item) => (
                <div key={item.term} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4">
                  <dt className="text-[0.95rem] text-steel">{item.term}</dt>
                  <dd className="font-semibold sm:text-right">
                    {copyable.has(item.term) ? (
                      <CopyValue value={item.detail} label={item.term} className="[&_button:hover]:bg-mist" />
                    ) : (
                      item.detail
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-steel">Ordering guide: {sewpVi.orderingGuide.version}</p>
          </div>
        </div>
      </Section>

      <Section id="ordering" tone="mist">
        <SectionHeading kicker="Ordering" title="Five steps from requirement to award" />
        <ol className="mt-14">
          {sewpVi.ordering.map((step, index) => (
            <li key={step.step} className="relative grid gap-x-10 gap-y-2 pb-10 pl-16 last:pb-0 lg:grid-cols-12 lg:pl-20">
              {index < sewpVi.ordering.length - 1 ? (
                <span aria-hidden className="absolute bottom-0 left-[1.3125rem] top-12 w-px bg-line" />
              ) : null}
              <span className="display absolute left-0 top-0 flex size-11 items-center justify-center rounded-full bg-ink text-white">
                {index + 1}
              </span>
              <h3 className="display pt-1.5 text-2xl lg:col-span-4">{step.step}</h3>
              <p className="leading-relaxed text-steel lg:col-span-8 lg:pt-2">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="contacts">
        <SectionHeading kicker="Points of contact" title="Who to reach at Tanvi IT" />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {sewpVi.managers.map((manager) => (
            <li key={manager.role} className="bg-white p-7 lg:p-8">
              <p className="text-sm font-semibold text-federal">{manager.role}</p>
              <p className="display mt-2 text-xl">{manager.name}</p>
              <p className="mt-4 flex flex-col gap-1 text-[0.975rem]">
                <a href={`tel:+1${manager.phone.replace(/\D/g, "")}`} className="flex min-h-11 items-center gap-3 font-medium hover:text-federal sm:min-h-8">
                  <Phone aria-hidden className="size-4 text-signal-deep" />
                  {manager.phone}
                </a>
                <a href={`mailto:${manager.email}`} className="flex min-h-11 items-center gap-3 font-medium hover:text-federal sm:min-h-8">
                  <Mail aria-hidden className="size-4 text-signal-deep" />
                  {manager.email}
                </a>
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-14 rounded-lg bg-mist p-7 lg:p-10">
          <h3 className="display text-2xl">NASA SEWP Program Management Office</h3>
          <dl className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
            {sewpVi.sewpContacts.map((item) => (
              <div key={item.label}>
                <dt className="text-sm text-steel">{item.label}</dt>
                <dd className="mt-1 break-words font-semibold">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading kicker="Scope" title="What can and cannot be ordered" />
        <ul className="mt-12 grid gap-x-12 gap-y-0 lg:grid-cols-2">
          {sewpVi.scope.map((item) => (
            <li key={item.slice(0, 32)} className="border-t border-line py-5 leading-relaxed text-ink">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="fair-opportunity">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading kicker="Contract language" title="Fair opportunity" />
            <p className="mt-6 text-[0.975rem] leading-relaxed text-steel">
              Reproduced as written in the contract.
            </p>
          </div>
          {/* Contract language: rendered exactly as supplied. Do not edit. */}
          <div className="space-y-5 border-l-[3px] border-signal pl-6 text-[1.0625rem] leading-[1.75] lg:col-span-8 lg:pl-10">
            {sewpVi.fairOpportunity.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Contact />
    </>
  );
}
