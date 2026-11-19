import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Blocks,
  Building2,
  ChartColumn,
  ClipboardCheck,
  CloudCog,
  Code,
  Handshake,
  Headset,
  Landmark,
  Layers,
  Lock,
  Mail,
  Network,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import earth from "@/assets/photos/earth.jpg";
import team from "@/assets/photos/team.jpg";
import { CopyValue } from "@/components/copy-value";
import {
  about,
  capabilities,
  careers,
  contactPaths,
  customerGroups,
  featuredNews,
  homeHero,
  sewpVi,
  v2Certifications,
  v2Site,
  valueProposition,
  vehicleProfiles,
  vehiclesHeading,
  contractNumber,
} from "@/content/site";

/* ------------------------------------------------------------------ Approach */

export function Approach() {
  const customers = customerGroups.flatMap((group) => group.customers);

  return (
    <section id="approach" className="bg-white py-24 lg:py-32">
      <div className="wrap">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="kicker">Why Tanvi IT</p>
            <h2 className="h-section mt-4">A partner measured by your mission, not by the task order</h2>
            <p className="lead mt-8 max-w-[44rem] text-ink">{homeHero.statement}</p>
          </div>
          <div className="space-y-5 text-[1.0625rem] leading-relaxed text-steel lg:col-span-5 lg:pt-12">
            {valueProposition.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <Link href="/about" className="link-draw text-federal">
              Read our story
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-20 border-t border-line pt-8">
          <p className="text-sm font-semibold text-steel">
            Organizations our teams have delivered for
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {customers.map((customer) => (
              <li
                key={customer.name}
                className="display text-xl text-ink/80 sm:text-2xl"
                title={customer.detail || undefined}
              >
                {customer.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Capabilities */

const capabilityIcons: Record<string, LucideIcon> = {
  "Application Modernization": Layers,
  "Data & Analytics": ChartColumn,
  "Cloud & DevSecOps": CloudCog,
  Cybersecurity: ShieldCheck,
  "Enterprise Architecture": Network,
  "Software Engineering": Code,
  "Quality Engineering": ClipboardCheck,
  "Emerging Technologies": Sparkles,
};

export function Capabilities() {
  return (
    <section id="capabilities" className="bg-mist py-24 lg:py-32">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="kicker">Capabilities</p>
            <h2 className="h-section mt-4">Eight disciplines, one accountable team</h2>
          </div>
          <Link href="/capabilities" className="btn btn-outline">
            See all capabilities
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        {/* One sheet divided by hairlines, not eight separate cards. */}
        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability) => {
            const Icon = capabilityIcons[capability.name] ?? Blocks;
            return (
              <li key={capability.name} className="bg-white">
                <Link
                  href="/capabilities"
                  className="group relative flex h-full flex-col p-7 transition-colors duration-300 hover:bg-ink hover:text-white lg:p-8"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-mist text-ink transition-colors duration-300 group-hover:bg-signal">
                    <Icon aria-hidden className="size-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="display mt-10 text-[1.35rem] leading-tight">{capability.name}</h3>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-steel transition-colors duration-300 group-hover:text-white/75">
                    {capability.description}
                  </p>
                  <ArrowUpRight
                    aria-hidden
                    className="absolute right-6 top-7 size-5 -translate-x-1 translate-y-1 text-signal opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ SEWP VI */

const copyable = new Set(["Contract number", "UEI"]);

export function SewpSpotlight() {
  const vehicle = vehicleProfiles[0];
  const manager = sewpVi.managers[0];

  return (
    <section id="sewp-vi" className="on-dark relative isolate overflow-hidden bg-ink py-24 text-white lg:py-32">
      <Image
        src={earth}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-10 object-cover object-[50%_30%] opacity-55"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(10_22_36/0.96)_0%,rgb(10_22_36/0.82)_45%,rgb(10_22_36/0.55)_100%)]"
      />

      <div className="wrap grid gap-x-16 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="kicker">Featured contract vehicle</p>
          <h2 className="h-section mt-4">NASA SEWP VI, Category C, open to every federal agency</h2>
          <p className="lead mt-7 max-w-[40rem] text-white/80">{vehicle.summary}</p>

          <dl className="mt-10 grid border-t border-white/20 sm:grid-cols-2">
            {vehicle.facts.map((fact) => (
              <div
                key={fact.term}
                className="border-b border-white/20 py-4 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"
              >
                <dt className="text-sm text-white/65">{fact.term}</dt>
                <dd className="mt-1 text-[1.0625rem] font-semibold">
                  {copyable.has(fact.term) ? (
                    <CopyValue value={fact.detail} label={fact.term} />
                  ) : (
                    fact.detail
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contract-vehicles/sewp-vi" className="btn btn-signal max-sm:w-full">
              Open the ordering page
              <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href="/contract-vehicles" className="btn btn-ghost-light max-sm:w-full">
              View contract vehicles
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-lg border border-white/15 bg-ink/60 p-7 backdrop-blur-md lg:p-8">
            <h3 className="display text-2xl">How an order reaches award</h3>
            <ol className="mt-7">
              {sewpVi.ordering.map((step, index) => (
                <li key={step.step} className="relative flex gap-5 pb-6 last:pb-0">
                  {index < sewpVi.ordering.length - 1 ? (
                    <span aria-hidden className="absolute bottom-0 left-[1.0625rem] top-9 w-px bg-white/20" />
                  ) : null}
                  <span className="display flex size-9 shrink-0 items-center justify-center rounded-full border border-signal/70 text-sm text-signal">
                    {index + 1}
                  </span>
                  <span className="pt-1.5 text-[1.0625rem] font-semibold leading-snug">{step.step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="text-sm text-white/65">{manager.role}</p>
              <p className="mt-1 text-lg font-semibold">{manager.name}</p>
              <p className="mt-3 flex flex-col gap-1 text-[0.975rem]">
                <a href={`tel:+1${manager.phone.replace(/\D/g, "")}`} className="flex min-h-11 items-center gap-3 hover:text-signal sm:min-h-0">
                  <Phone aria-hidden className="size-4 text-signal" />
                  {manager.phone}
                </a>
                <a href={`mailto:${manager.email}`} className="flex min-h-11 items-center gap-3 hover:text-signal sm:min-h-0">
                  <Mail aria-hidden className="size-4 text-signal" />
                  {manager.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- Vehicles and credentials */

const certificationIcons: Record<string, LucideIcon> = {
  quality: BadgeCheck,
  service: Headset,
  security: Lock,
  development: Workflow,
  services: Handshake,
  federal: Landmark,
  ownership: Users,
};

export function Credentials() {
  return (
    <section id="credentials" className="bg-white py-24 lg:py-32">
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="kicker">Contract vehicles and credentials</p>
          <h2 className="h-section mt-4">{vehiclesHeading.title}</h2>
          <p className="lead mt-6 text-steel">{vehiclesHeading.lead}</p>
        </div>

        <div className="mt-16 grid gap-x-16 gap-y-16 lg:grid-cols-2">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-ink pb-4">
              <h3 className="display text-2xl">Contract vehicles</h3>
              <Link href="/contract-vehicles" className="link-draw whitespace-nowrap text-sm text-federal">
                Compare both
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
            <ul>
              {vehicleProfiles.map((vehicle) => {
                const naics = vehicle.facts.find((fact) => fact.term === "NAICS")?.detail;
                return (
                  <li key={vehicle.id} className="border-b border-line">
                    <Link
                      href={"href" in vehicle && vehicle.href ? vehicle.href : `/contract-vehicles#${vehicle.id}`}
                      className="group flex items-start justify-between gap-6 py-6"
                    >
                      <span>
                        <span className="display block text-2xl">{vehicle.name}</span>
                        <span className="mt-1 block text-[0.95rem] text-steel">{vehicle.kind}</span>
                        <span className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[0.95rem]">
                          <span>
                            <span className="text-steel">Contract </span>
                            <span className="font-semibold tabular-nums">{contractNumber(vehicle)}</span>
                          </span>
                          {naics ? (
                            <span>
                              <span className="text-steel">NAICS </span>
                              <span className="font-semibold tabular-nums">{naics.split(" ")[0]}</span>
                            </span>
                          ) : null}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="mt-2 size-5 shrink-0 text-steel transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-federal"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-ink pb-4">
              <h3 className="display text-2xl">Certifications and appraisals</h3>
              <Link href="/about#certifications" className="link-draw text-sm text-federal">
                Details
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
            <ul>
              {v2Certifications.map((certification) => {
                const Icon = certificationIcons[certification.icon] ?? Award;
                return (
                  <li key={certification.name} className="flex items-center gap-5 border-b border-line py-3.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-mist text-ink">
                      <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                    </span>
                    <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-6">
                      <span className="text-[1.0625rem] font-semibold">{certification.name}</span>
                      <span className="text-[0.95rem] text-steel">{certification.detail}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- News */

export function News() {
  return (
    <section id="news" className="bg-white py-24 lg:py-32">
      <div className="wrap grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="kicker">News</p>
          <h2 className="h-section mt-4">{featuredNews.title}</h2>
          <p className="mt-6 text-sm font-semibold text-steel">{featuredNews.dateline}</p>
          <p className="mt-4 max-w-[36rem] text-[1.0625rem] leading-relaxed text-steel">
            {featuredNews.body[1]}
          </p>
          <Link href="/news" className="btn btn-outline mt-8">
            Read the announcement
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        <figure className="relative rounded-lg bg-mist p-8 lg:col-span-6 lg:p-12">
          <span aria-hidden className="absolute left-8 top-0 h-1 w-20 bg-signal lg:left-12" />
          <blockquote className="display text-[clamp(1.25rem,1rem+0.9vw,1.75rem)] font-medium leading-snug tracking-[-0.01em] text-ink">
            <p>&ldquo;{featuredNews.quote.text}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-8 text-[0.975rem] text-steel">
            {featuredNews.quote.attribution}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Careers */

export function Careers() {
  return (
    <section id="careers" className="bg-mist">
      <div className="grid lg:grid-cols-2">
        <div className="group relative min-h-[22rem] overflow-hidden lg:min-h-[36rem]">
          <Image
            src={team}
            alt="Engineers working on laptops around a shared table"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition duration-[1200ms] group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex items-center py-20 lg:py-24">
          <div className="w-full max-w-[42rem] px-[var(--gutter)] lg:pl-16">
            <p className="kicker">Careers</p>
            <h2 className="h-section mt-4">{careers.headline}</h2>
            <p className="lead mt-6 text-steel">{careers.body}</p>
            <p className="mt-6 font-semibold text-ink">{careers.strapline}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/careers" className="btn btn-ink max-sm:w-full">
                Explore careers
                <ArrowRight aria-hidden className="size-4" />
              </Link>
              <Link href="/contact#careers" className="btn btn-outline max-sm:w-full">
                Send your résumé
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Contact */

const pathIcons: Record<string, LucideIcon> = {
  Government: Landmark,
  "Prime contractor": Handshake,
  Commercial: Building2,
};

export function Contact() {
  return (
    <section id="contact" className="on-dark bg-ink py-24 text-white lg:py-32">
      <div className="wrap">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <h2 className="display text-[clamp(2.5rem,1.4rem+4.4vw,5rem)] lg:col-span-7">
            {about.closing.headline}
          </h2>
          <p className="lead text-white/75 lg:col-span-5 lg:pt-4">{about.closing.body}</p>
        </div>

        <ul className="mt-16 grid gap-4 lg:grid-cols-3">
          {contactPaths.map((path) => {
            const Icon = pathIcons[path.name] ?? Building2;
            return (
              <li key={path.name}>
                <Link
                  href={`/contact#${path.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group flex h-full flex-col rounded-lg border border-white/15 bg-ink-2 p-7 transition duration-300 hover:-translate-y-0.5 hover:border-signal lg:p-8"
                >
                  <span className="flex items-center justify-between">
                    <Icon aria-hidden className="size-7 text-signal" strokeWidth={1.5} />
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 text-white/50 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                    />
                  </span>
                  <span className="display mt-10 text-2xl">{path.name}</span>
                  <span className="mt-3 text-[0.975rem] leading-relaxed text-white/70">
                    {path.description}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 flex flex-wrap gap-x-10 gap-y-2 text-[1.0625rem]">
          <a href={`tel:${v2Site.phone.replace(/[^+\d]/g, "")}`} className="flex min-h-11 items-center gap-3 font-semibold hover:text-signal">
            <Phone aria-hidden className="size-5 text-signal" />
            {v2Site.phone}
          </a>
          <a href={`mailto:${v2Site.email}`} className="flex min-h-11 items-center gap-3 font-semibold hover:text-signal">
            <Mail aria-hidden className="size-5 text-signal" />
            {v2Site.email}
          </a>
        </p>
      </div>
    </section>
  );
}
