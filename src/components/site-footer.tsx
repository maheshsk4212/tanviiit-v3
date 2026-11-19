import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/brand/logo-dark.png";
import { contactHref, navGroups } from "@/content/nav";
import { buyerSnapshot, v2Site } from "@/content/site";

const address = ["4211 Pleasant Valley Road, Suite 230", "Chantilly, VA 20151"];

export function SiteFooter() {
  const identifiers = buyerSnapshot.filter((item) => ["UEI", "NAICS", "Business status"].includes(item.term));

  return (
    <footer className="border-t border-line bg-white">
      <div className="wrap py-16 lg:py-20">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label={`${v2Site.name} home`} className="inline-block">
              <Image src={logo} alt={v2Site.legalName} width={150} height={39} />
            </Link>
            <p className="display mt-6 text-xl text-ink">{v2Site.tagline}</p>
            <address className="mt-6 space-y-1 text-[0.975rem] not-italic leading-relaxed text-steel">
              {address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <a
                href={`tel:${v2Site.phone.replace(/[^+\d]/g, "")}`}
                className="mt-3 flex min-h-11 items-center font-semibold text-ink hover:text-federal sm:min-h-0"
              >
                {v2Site.phone}
              </a>
              <a
                href={`mailto:${v2Site.email}`}
                className="flex min-h-11 items-center font-semibold text-ink hover:text-federal sm:min-h-0"
              >
                {v2Site.email}
              </a>
            </address>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {navGroups.map((group) => {
              const links = group.columns[0].links;
              return (
                <div key={group.key}>
                  <Link href={group.href} className="font-semibold text-ink hover:text-federal">
                    {group.label}
                  </Link>
                  <ul className="mt-4 space-y-1">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="flex min-h-9 items-center py-1.5 text-[0.95rem] leading-snug text-steel transition-colors hover:text-ink"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    {group.key === "company" ? (
                      <>
                        <li>
                          <Link
                            href="/careers"
                            className="flex min-h-9 items-center text-[0.95rem] text-steel transition-colors hover:text-ink"
                          >
                            Careers
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={contactHref}
                            className="flex min-h-9 items-center text-[0.95rem] text-steel transition-colors hover:text-ink"
                          >
                            Contact
                          </Link>
                        </li>
                      </>
                    ) : null}
                  </ul>
                </div>
              );
            })}
          </nav>
        </div>

        <dl className="mt-14 flex flex-wrap gap-x-12 gap-y-4 border-t border-line pt-8 text-[0.95rem]">
          {identifiers.map((item) => (
            <div key={item.term} className="flex gap-2">
              <dt className="text-steel">{item.term}</dt>
              <dd className="font-semibold text-ink">{item.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-sm text-steel">
          <p>
            &copy; {v2Site.legalName} All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6">
            <li>
              <Link href="/privacy" className="flex min-h-9 items-center hover:text-ink">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="flex min-h-9 items-center hover:text-ink">
                Accessibility
              </Link>
            </li>
            <li className="flex min-h-9 items-center">Photographs: Unsplash</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
