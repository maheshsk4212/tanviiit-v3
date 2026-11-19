import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import earth from "@/assets/photos/earth.jpg";
import { Contact } from "@/components/home/sections";
import { PageHero, Section } from "@/components/page-parts";
import { featuredNews } from "@/content/site";

export const metadata: Metadata = {
  title: featuredNews.title,
  description: featuredNews.body[0],
};

const article = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: featuredNews.title,
  datePublished: "2026-06-22",
  author: { "@type": "Organization", name: "Tanvi IT Solutions Inc." },
  publisher: { "@type": "Organization", name: "Tanvi IT Solutions Inc." },
};

/**
 * One announcement so far, shown in full. When there is a second, this becomes
 * an index and each announcement moves to its own page.
 */
export default function NewsPage() {
  const [first, ...rest] = featuredNews.body;
  const middle = Math.ceil(rest.length / 2);

  return (
    <>
      <PageHero
        kicker={`News. ${featuredNews.dateline}`}
        title={featuredNews.title}
        image={earth}
        crumbs={[{ label: "News" }]}
      />

      <Section>
        <article className="mx-auto max-w-[46rem]">
          <p className="lead text-ink">{first}</p>
          <div className="mt-6 space-y-6 text-[1.0625rem] leading-[1.8] text-steel">
            {rest.slice(0, middle).map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <figure className="my-12 border-l-[3px] border-signal pl-6 lg:pl-10">
            <blockquote className="display text-[clamp(1.3rem,1.1rem+0.9vw,1.75rem)] font-medium leading-snug tracking-[-0.01em]">
              <p>&ldquo;{featuredNews.quote.text}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-5 text-steel">{featuredNews.quote.attribution}</figcaption>
          </figure>

          <div className="space-y-6 text-[1.0625rem] leading-[1.8] text-steel">
            {rest.slice(middle).map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3 border-t border-line pt-10">
            <Link href="/contract-vehicles/sewp-vi" className="btn btn-ink max-sm:w-full">
              Open the SEWP VI ordering page
              <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href="/contract-vehicles" className="btn btn-outline max-sm:w-full">
              View all contract vehicles
            </Link>
          </div>
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      </Section>

      <Contact />
    </>
  );
}
