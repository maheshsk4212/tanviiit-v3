import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Page not found" };

/** Shown for any address the site does not have. */
export default function NotFound() {
  return (
    <section className="bg-mist pb-24 pt-44 lg:pb-32 lg:pt-56">
      <div className="wrap max-w-3xl">
        <p className="kicker">Page not found</p>
        <h1 className="h-section mt-4">We could not find that page</h1>
        <p className="lead mt-6 text-steel">
          The address may have changed, or the page may not exist yet. The menu above reaches every section of the site.
        </p>
        <Link href="/" className="btn btn-ink mt-9">
          Back to the homepage
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
    </section>
  );
}
