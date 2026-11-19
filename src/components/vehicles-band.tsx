import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/page-parts";
import { contractNumber, vehicleProfiles, vehiclesHeading } from "@/content/site";

/**
 * The two contract vehicles, as a band on the capability pages, so a buyer
 * reading about a service can see how to order it.
 */
export function VehiclesBand() {
  return (
    <Section tone="mist" className="py-16 lg:py-20">
      <div className="grid items-center gap-x-14 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="kicker">How to buy</p>
          <h2 className="display mt-3 text-[clamp(1.6rem,1.3rem+1.1vw,2.3rem)] leading-tight">
            Available through NASA SEWP VI and GSA MAS
          </h2>
          <p className="mt-4 leading-relaxed text-steel">{vehiclesHeading.lead}</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {vehicleProfiles.map((vehicle) => (
            <li key={vehicle.id}>
              <Link
                href={"href" in vehicle && vehicle.href ? vehicle.href : `/contract-vehicles#${vehicle.id}`}
                className="group flex h-full flex-col rounded-lg border border-line bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-ink"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="display text-xl">{vehicle.name}</span>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-1 size-5 shrink-0 text-steel transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-federal"
                  />
                </span>
                <span className="mt-1 text-[0.95rem] text-steel">{vehicle.kind}</span>
                <span className="mt-4 text-[0.95rem]">
                  <span className="text-steel">Contract </span>
                  <span className="font-semibold tabular-nums">{contractNumber(vehicle)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
