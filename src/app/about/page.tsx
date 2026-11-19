import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Handshake,
  Headset,
  Landmark,
  Lock,
  Mail,
  Phone,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import handshake from "@/assets/photos/handshake.jpg";
import team from "@/assets/photos/team.jpg";
import { Contact } from "@/components/home/sections";
import { PageHero, Section, SectionHeading } from "@/components/page-parts";
import {
  about,
  certificationsIntro,
  jointVenture,
  leadership,
  leadershipContacts,
  leadershipIntro,
  storyMilestones,
  v2Certifications,
} from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: about.hero.statement,
};

const certificationIcons: Record<string, LucideIcon> = {
  quality: BadgeCheck,
  service: Headset,
  security: Lock,
  development: Workflow,
  services: Handshake,
  federal: Landmark,
  ownership: Users,
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .filter((_, index, parts) => index === 0 || index === parts.length - 1)
    .join("");

export default function AboutPage() {
  const groups = [...new Set(v2Certifications.map((item) => item.group))];

  return (
    <>
      <PageHero
        kicker={about.hero.eyebrow}
        title={about.hero.headline}
        lead={about.hero.supporting}
        image={team}
        crumbs={[{ label: "About" }]}
      />

      <Section>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading kicker="Who we are" title="A technology and consulting company, since 2008" />
            <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.75] text-steel">
              {about.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <figure className="self-start rounded-lg bg-ink p-8 text-white lg:col-span-5 lg:mt-14 lg:p-10">
            <span aria-hidden className="block h-1 w-16 bg-signal" />
            <blockquote className="display mt-8 text-[clamp(1.5rem,1.2rem+1.1vw,2.1rem)] leading-tight">
              <p>{about.pullQuote}</p>
            </blockquote>
          </figure>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading kicker="Our approach" title="Three things every engagement rests on" lead={about.approachIntro} />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-3">
          {about.approach.map((item) => (
            <li key={item.name} className="bg-white p-8 lg:p-10">
              <h3 className="display text-3xl">{item.name}</h3>
              <p className="mt-4 leading-relaxed text-steel">{item.description}</p>
            </li>
          ))}
        </ul>
        <p className="display mt-12 text-center text-[clamp(1.25rem,1rem+1vw,1.75rem)] text-ink">
          {about.promise}
        </p>
      </Section>

      <Section>
        <div className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:col-span-5">
            <Image
              src={handshake}
              alt="Two people shaking hands across a desk"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-7">
            <SectionHeading kicker="Why Tanvi IT" title="What sets the work apart" />
            <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {about.whyTanvi.map((item) => (
                <li key={item.name} className="border-t border-ink pt-5">
                  <h3 className="display text-xl">{item.name}</h3>
                  <p className="mt-2 leading-relaxed text-steel">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading kicker="Our story" title={about.story[0]} />
            <div className="mt-8 space-y-5 leading-relaxed text-white/75">
              {about.story.slice(1).map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <ol className="lg:col-span-7">
            {storyMilestones.map((milestone, index) => (
              <li key={milestone.title} className="relative grid gap-x-8 pb-10 pl-8 last:pb-0 sm:grid-cols-[8rem_1fr]">
                <span aria-hidden className="absolute left-0 top-2 size-3 rounded-full bg-signal" />
                {index < storyMilestones.length - 1 ? (
                  <span aria-hidden className="absolute bottom-0 left-[5px] top-6 w-px bg-white/25" />
                ) : null}
                <span className="display text-xl text-signal">{milestone.year}</span>
                <span>
                  <span className="display block text-xl">{milestone.title}</span>
                  <span className="mt-2 block leading-relaxed text-white/70">{milestone.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="leadership">
        <SectionHeading kicker="Leadership" title="The people who run the company" lead={leadershipIntro} />
        <ul className="mt-14 grid gap-6 lg:grid-cols-2">
          {leadership.map((person) => {
            const contact = leadershipContacts[person.name];
            return (
              <li key={person.name} className="rounded-lg border border-line p-7 lg:p-10">
                <div className="flex items-center gap-5">
                  {/* NEEDS-CONTENT: portrait photographs. */}
                  <span aria-hidden className="display flex size-16 shrink-0 items-center justify-center rounded-full bg-ink text-xl text-signal">
                    {initials(person.name)}
                  </span>
                  <div>
                    <h3 className="display text-2xl leading-tight">{person.name}</h3>
                    <p className="mt-1 font-semibold text-federal">{person.role}</p>
                  </div>
                </div>
                <p className="mt-6 leading-relaxed text-steel">{person.bio}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {person.areas.map((area) => (
                    <li key={area} className="rounded-full bg-mist px-3.5 py-1.5 text-sm font-medium">
                      {area}
                    </li>
                  ))}
                </ul>
                {contact ? (
                  <p className="mt-6 flex flex-wrap gap-x-8 gap-y-1 border-t border-line pt-5 text-[0.975rem]">
                    <a href={`tel:+1${contact.phone.replace(/\D/g, "")}`} className="flex min-h-11 items-center gap-2.5 font-medium hover:text-federal">
                      <Phone aria-hidden className="size-4 text-signal-deep" />
                      {contact.phone}
                    </a>
                    <a href={`mailto:${contact.email}`} className="flex min-h-11 items-center gap-2.5 font-medium hover:text-federal">
                      <Mail aria-hidden className="size-4 text-signal-deep" />
                      {contact.email}
                    </a>
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="certifications" tone="mist">
        <SectionHeading
          kicker="Certifications and appraisals"
          title="Seven credentials, independently assessed"
          lead={certificationsIntro}
        />
        {groups.map((group) => (
          <div key={group} className="mt-12">
            <h3 className="display border-b border-ink pb-3 text-xl">{group}</h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {v2Certifications
                .filter((item) => item.group === group)
                .map((item) => {
                  const Icon = certificationIcons[item.icon] ?? Award;
                  return (
                    <li key={item.name} className="flex items-center gap-5 rounded-lg border border-line bg-white p-6">
                      {/* NEEDS-CONTENT: the issued certification mark replaces this icon. */}
                      <span className="flex size-14 shrink-0 items-center justify-center rounded-md bg-ink text-signal">
                        <Icon aria-hidden className="size-7" strokeWidth={1.5} />
                      </span>
                      <span>
                        <span className="display block text-lg leading-tight">{item.name}</span>
                        <span className="mt-1 block text-[0.95rem] text-steel">{item.detail}</span>
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </Section>

      <Section id="joint-venture">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading kicker="Joint venture" title={jointVenture.name} />
            <p className="mt-6 font-semibold">{jointVenture.partners}</p>
            <a
              href={jointVenture.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline mt-8"
            >
              Visit tafederal.com
              <ArrowUpRight aria-hidden className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-steel lg:col-span-7">
            {jointVenture.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Contact />
    </>
  );
}
