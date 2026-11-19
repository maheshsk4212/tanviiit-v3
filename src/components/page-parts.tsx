import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Parts every interior page shares, so the pages read as one site: the dark
 * page header that sits under the floating menu, the section heading, and a
 * numbered list for content that really is a sequence.
 */

type Crumb = { label: string; href?: string };

export function PageHero({
  kicker,
  title,
  lead,
  image,
  imageAlt = "",
  crumbs,
  children,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  image?: StaticImageData;
  imageAlt?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink pb-16 pt-32 text-white lg:pb-24 lg:pt-40">
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="-z-10 object-cover opacity-60"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(10_22_36/0.95)_0%,rgb(10_22_36/0.82)_45%,rgb(10_22_36/0.4)_100%)] max-lg:bg-ink/80"
          />
        </>
      ) : null}

      <div className="wrap">
        {crumbs ? (
          <nav aria-label="Breadcrumb" className="mb-8 animate-rise">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight aria-hidden className="size-3.5" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="max-w-[56rem]">
          {kicker ? (
            <p className="kicker animate-rise" style={{ animationDelay: "80ms" }}>
              {kicker}
            </p>
          ) : null}
          <h1
            className="display mt-4 animate-rise text-[clamp(2.4rem,1.3rem+4.2vw,4.75rem)]"
            style={{ animationDelay: "160ms" }}
          >
            {title}
          </h1>
          {lead ? (
            <p
              className="lead mt-7 max-w-[46rem] animate-rise text-white/80"
              style={{ animationDelay: "280ms" }}
            >
              {lead}
            </p>
          ) : null}
          {children ? (
            <div className="mt-9 animate-rise" style={{ animationDelay: "380ms" }}>
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function Section({
  id,
  tone = "white",
  className,
  children,
}: {
  id?: string;
  tone?: "white" | "mist" | "ink";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 lg:py-28",
        tone === "white" && "bg-white",
        tone === "mist" && "bg-mist",
        tone === "ink" && "on-dark bg-ink text-white",
        className,
      )}
    >
      <div className="wrap">{children}</div>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  lead,
  className,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {kicker ? <p className="kicker">{kicker}</p> : null}
      <h2 className={cn("h-section", kicker && "mt-4")}>{title}</h2>
      {lead ? <p className="lead mt-6 text-steel [.on-dark_&]:text-white/75">{lead}</p> : null}
    </div>
  );
}

/** A real sequence: numbered, with a line joining the steps. */
export function Steps({
  steps,
  className,
}: {
  steps: { step: string; description: string }[];
  className?: string;
}) {
  return (
    <ol className={cn("grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))]", className)} style={{ "--n": steps.length } as React.CSSProperties}>
      {steps.map((item, index) => (
        <li key={item.step} className="relative border-t border-line pt-6 [.on-dark_&]:border-white/20">
          <span aria-hidden className="absolute -top-px left-0 h-[3px] w-12 bg-signal" />
          <span className="display text-sm text-steel [.on-dark_&]:text-signal">
            Step {index + 1}
          </span>
          <h3 className="display mt-2 text-xl">{item.step}</h3>
          <p className="mt-3 text-[0.975rem] leading-relaxed text-steel [.on-dark_&]:text-white/70">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="link-draw text-federal [.on-dark_&]:text-signal">
      {children}
      <ArrowRight aria-hidden className="size-4" />
    </Link>
  );
}
