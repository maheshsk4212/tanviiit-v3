"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import business from "@/assets/photos/business.jpg";
import columns from "@/assets/photos/columns.jpg";
import health from "@/assets/photos/health.jpg";
import servers from "@/assets/photos/servers.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sectorTabs } from "@/content/site";

/** Local copies of the photographs the content file assigns to each sector. */
const photos: Record<string, { src: StaticImageData; alt: string }> = {
  government: { src: columns, alt: "Classical columns of a federal building, seen from below" },
  defense: { src: servers, alt: "Rows of servers in a data center" },
  health: { src: health, alt: "A clinician working at a laptop beside a stethoscope" },
  commercial: { src: business, alt: "Colleagues reviewing figures together at a desk" },
};

export function Sectors() {
  return (
    <section id="who-we-serve" className="bg-mist py-24 lg:py-32">
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="kicker">Who we serve</p>
          <h2 className="h-section mt-4">Four sectors where downtime is not an option</h2>
        </div>

        <Tabs defaultValue={sectorTabs[0].key} className="mt-12 gap-0">
          <div className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] [scrollbar-width:none]">
            <TabsList
              variant="line"
              className="h-auto w-max min-w-full justify-start gap-0 rounded-none border-b border-line p-0 group-data-horizontal/tabs:h-auto"
            >
              {sectorTabs.map((sector) => (
                <TabsTrigger
                  key={sector.key}
                  value={sector.key}
                  className="display h-14 flex-none rounded-none px-5 text-[1.0625rem] font-semibold text-steel first:pl-0 hover:text-ink data-active:text-ink group-data-horizontal/tabs:after:bottom-[-1px] group-data-horizontal/tabs:after:h-[3px] group-data-horizontal/tabs:after:bg-signal sm:px-7 sm:text-lg"
                >
                  {sector.tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {sectorTabs.map((sector) => {
            const photo = photos[sector.key];
            return (
              <TabsContent key={sector.key} value={sector.key} className="pt-10 text-base lg:pt-12">
                <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-12">
                  <div className="relative aspect-[4/3] animate-fade overflow-hidden rounded-lg bg-line lg:col-span-7">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="animate-rise lg:col-span-5">
                    <p className="kicker">{sector.eyebrow}</p>
                    <h3 className="display mt-3 text-[clamp(1.75rem,1.3rem+1.6vw,2.6rem)]">
                      {sector.title}
                    </h3>
                    <p className="lead mt-5 text-steel">{sector.lead}</p>
                    <Link
                      href={`/who-we-serve#${sector.key}`}
                      className="link-draw mt-7 text-federal"
                    >
                      See our {sector.tab.toLowerCase()} work
                      <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
