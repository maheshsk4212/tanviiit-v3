import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  HeartPulse,
  PiggyBank,
  ShieldPlus,
  Smile,
  Umbrella,
  type LucideIcon,
} from "lucide-react";

import team from "@/assets/photos/team.jpg";
import { PageHero, Section, SectionHeading } from "@/components/page-parts";
import { careers, employeeBenefits } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description: careers.body,
};

const benefitIcons: Record<string, LucideIcon> = {
  medical: HeartPulse,
  dental: Smile,
  vision: Eye,
  disability: ShieldPlus,
  life: Umbrella,
  retirement: PiggyBank,
};

/**
 * No job listings are published, on the client's instruction, so there is no
 * "open positions" section. Candidates are sent to the contact form, with the
 * Careers route already chosen.
 *
 * Benefits wording is the client's and deliberately hedged. Do not tighten it.
 */
export default function CareersPage() {
  return (
    <>
      <PageHero
        kicker="Careers"
        title={careers.headline}
        lead={careers.body}
        image={team}
        crumbs={[{ label: "Careers" }]}
      >
        <p className="font-semibold text-signal">{careers.strapline}</p>
        <Link href="/contact#careers" className="btn btn-signal mt-7 max-sm:w-full">
          Send your résumé
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </PageHero>

      <Section id="benefits">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <SectionHeading kicker="Benefits" title={employeeBenefits.headline} className="lg:col-span-5" />
          <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-steel lg:col-span-7 lg:pt-10">
            {employeeBenefits.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {employeeBenefits.items.map((item) => {
            const Icon = benefitIcons[item.icon] ?? HeartPulse;
            return (
              <li key={item.name} className="bg-white p-8">
                <span className="flex size-12 items-center justify-center rounded-md bg-mist">
                  <Icon aria-hidden className="size-6" strokeWidth={1.6} />
                </span>
                <h3 className="display mt-8 text-xl">{item.name}</h3>
                <p className="mt-3 leading-relaxed text-steel">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="mist">
        <div className="grid gap-x-16 gap-y-6 lg:grid-cols-12">
          <SectionHeading title={employeeBenefits.investing.heading} className="lg:col-span-5" />
          <p className="lead text-steel lg:col-span-7">{employeeBenefits.investing.body}</p>
        </div>
      </Section>

      <Section tone="ink">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
          <div className="max-w-2xl">
            <h2 className="h-section">{employeeBenefits.closing.heading}</h2>
            <p className="lead mt-5 text-white/75">{employeeBenefits.closing.body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact#careers" className="btn btn-signal max-sm:w-full">
              Send your résumé
              <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href="/about" className="btn btn-ghost-light max-sm:w-full">
              Read about the company
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
