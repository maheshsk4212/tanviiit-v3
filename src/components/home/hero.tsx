import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { CountUp } from "@/components/count-up";
import { HeroBackdrop, HeroPicker } from "@/components/home/hero-backdrop";
import { heroAward, heroFacts, homeHero } from "@/content/site";

/**
 * The homepage hero.
 *
 * One photograph does the work, chosen in hero-backdrop.tsx: its subject is
 * the client's newest award (NASA SEWP VI). The type sits in the left of the
 * frame so the subject stays whole. Everything enters once on load and rests.
 */
export function Hero() {
  const [first, second] = splitHeadline(homeHero.headline);

  return (
    <section className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
      <HeroBackdrop />
      <HeroPicker />

      <div className="wrap flex flex-1 flex-col justify-center pb-6 pt-28">
        <Link
          href={heroAward.href}
          className="group mb-7 flex w-fit animate-rise items-stretch overflow-hidden rounded-md border border-white/20 bg-ink/55 text-sm backdrop-blur-md transition-colors hover:border-white/45"
          style={{ animationDelay: "120ms" }}
        >
          <span className="flex items-center whitespace-nowrap bg-signal px-3 font-semibold text-ink max-sm:px-2.5 max-sm:text-[0.8125rem]">
            {heroAward.label}
          </span>
          <span className="flex min-h-11 items-center gap-x-3 whitespace-nowrap px-4 py-2 max-sm:px-3 max-sm:text-[0.8125rem]">
            <span className="font-semibold">{heroAward.name}</span>
            <span className="text-white/70 max-sm:hidden">{heroAward.detail}</span>
            <ArrowUpRight
              aria-hidden
              className="size-4 text-signal transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 max-sm:hidden"
            />
          </span>
        </Link>

        <h1 className="display max-w-[14ch] text-[clamp(2.6rem,min(1rem+4.7vw,10.8vh),5.5rem)]">
          <span className="block animate-rise" style={{ animationDelay: "220ms" }}>
            {first}
          </span>
          {second ? (
            <span className="block animate-rise" style={{ animationDelay: "360ms" }}>
              {second}
            </span>
          ) : null}
        </h1>

        <p
          className="lead mt-7 max-w-[38rem] animate-rise text-white/85"
          style={{ animationDelay: "520ms" }}
        >
          {homeHero.supporting}
        </p>

        <div
          className="mt-9 flex animate-rise flex-wrap gap-3"
          style={{ animationDelay: "640ms" }}
        >
          <Link href="/capabilities" className="btn btn-signal max-sm:w-full">
            Explore capabilities
            <ArrowRight aria-hidden className="size-4" />
          </Link>
          <Link href={heroAward.href} className="btn btn-ghost-light max-sm:w-full">
            Order through SEWP VI
          </Link>
        </div>
      </div>

      <div className="wrap animate-rise pb-8 lg:pb-10" style={{ animationDelay: "820ms" }}>
        <dl className="grid grid-cols-2 border-t border-white/20 lg:grid-cols-4">
          {heroFacts.map((fact, index) => (
            <div
              key={fact.label}
              className="flex flex-col-reverse justify-end gap-1 border-white/20 py-5 pr-4 max-lg:[&:nth-child(-n+2)]:border-b max-lg:[&:nth-child(even)]:pl-5 max-lg:[&:nth-child(odd)]:border-r lg:border-r lg:pl-7 lg:first:pl-0 lg:last:border-r-0"
            >
              <dt className="text-sm text-white/70 sm:text-[0.95rem]">{fact.label}</dt>
              <dd className="display text-[clamp(2rem,1.4rem+2vw,3.25rem)] tabular-nums">
                {fact.count ? (
                  <CountUp to={Number(fact.value)} delay={900 + index * 120} />
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** "A. B." becomes two lines, one sentence each. */
function splitHeadline(headline: string): [string, string | undefined] {
  const match = headline.match(/^(.+?[.!?])\s+(.+)$/);
  return match ? [match[1], match[2]] : [headline, undefined];
}
