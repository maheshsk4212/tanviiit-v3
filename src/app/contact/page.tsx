import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { contactRoutes as routes } from "@/content/nav";
import { PageHero, Section } from "@/components/page-parts";
import { about, contactPaths, sewpVi, v2Site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Tanvi IT Solutions in Chantilly, Virginia about agency requirements, SEWP VI and GSA MAS quotes, careers, teaming and commercial technology work.",
};

const address = ["4211 Pleasant Valley Road, Suite 230", "Chantilly, VA 20151"];

export default function ContactPage() {
  const manager = sewpVi.managers[0];

  return (
    <>
      <PageHero
        kicker="Contact"
        title={about.closing.headline}
        lead={about.closing.body}
        crumbs={[{ label: "Contact" }]}
      />

      <Section tone="mist">
        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="sr-only">Send a message</h2>
            {/* Landing points for /contact#government and the like: each
                preselects its route in the form. */}
            {routes.map((name) => (
              <span key={name} id={name.toLowerCase().replace(/\s+/g, "-")} className="block" />
            ))}
            <ContactForm />
          </div>

          <div className="lg:col-span-5">
            <h2 className="display text-2xl">Reach us directly</h2>
            <ul className="mt-6 space-y-1 text-[1.0625rem]">
              <li>
                <a href={`tel:${v2Site.phone.replace(/[^+\d]/g, "")}`} className="flex min-h-11 items-center gap-4 font-semibold hover:text-federal">
                  <Phone aria-hidden className="size-5 text-signal-deep" />
                  {v2Site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${v2Site.email}`} className="flex min-h-11 items-center gap-4 font-semibold hover:text-federal">
                  <Mail aria-hidden className="size-5 text-signal-deep" />
                  {v2Site.email}
                </a>
              </li>
              <li className="flex gap-4 pt-2">
                <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-signal-deep" />
                <address className="not-italic leading-relaxed">
                  <span className="block font-semibold">{v2Site.legalName}</span>
                  {address.map((line) => (
                    <span key={line} className="block text-steel">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            </ul>

            <div className="mt-10 rounded-lg bg-ink p-7 text-white">
              <p className="text-sm font-semibold text-signal">NASA SEWP VI quotes and orders</p>
              <p className="display mt-2 text-xl">{manager.name}</p>
              <p className="mt-1 text-sm text-white/70">{manager.role}</p>
              <p className="mt-4 flex flex-col text-[0.975rem]">
                <a href={`tel:+1${manager.phone.replace(/\D/g, "")}`} className="flex min-h-11 items-center gap-3 hover:text-signal">
                  <Phone aria-hidden className="size-4 text-signal" />
                  {manager.phone}
                </a>
                <a href={`mailto:${manager.email}`} className="flex min-h-11 items-center gap-3 hover:text-signal">
                  <Mail aria-hidden className="size-4 text-signal" />
                  {manager.email}
                </a>
              </p>
            </div>

            <h2 className="display mt-12 text-2xl">Who should get in touch</h2>
            <dl className="mt-4">
              {contactPaths.map((path) => (
                <div key={path.name} className="border-b border-line py-4">
                  <dt className="font-semibold">{path.name}</dt>
                  <dd className="mt-1 text-[0.975rem] leading-relaxed text-steel">{path.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>
    </>
  );
}
