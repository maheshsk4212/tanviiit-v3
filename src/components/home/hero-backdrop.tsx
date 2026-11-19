"use client";

import Image, { type StaticImageData } from "next/image";
import { useSyncExternalStore } from "react";

import earthNight from "@/assets/photos/earth.jpg";
import capitol from "@/assets/photos/hero/capitol.jpg";
import earthCrescent from "@/assets/photos/hero/earth-crescent.jpg";
import liftoffPad from "@/assets/photos/hero/liftoff-pad.jpg";
import nightArc from "@/assets/photos/hero/night-arc.jpg";
import orbit from "@/assets/photos/hero/orbit.jpg";
import duskArc from "@/assets/photos/launch.jpg";
import { cn } from "@/lib/utils";

/**
 * The hero photograph, with the candidates under review.
 *
 * REVIEW ONLY: the picker at the bottom of the screen exists so the client can
 * compare photographs in place. Once one is chosen, set `DEFAULT_HERO` to its
 * id, delete the others and remove <HeroPicker /> below.
 *
 * `scrim` is how much of the left the type needs darkened: a bright daylight
 * photograph needs a strong one, a photograph that is already black on the
 * left needs almost none, which keeps it sharp.
 */
type HeroOption = {
  id: string;
  name: string;
  src: StaticImageData;
  alt: string;
  /** object-position, so the subject stays clear of the headline. */
  position: string;
  /** Mirrored left to right, to move the subject to the right of the type. */
  mirrored?: boolean;
  scrim: "strong" | "medium" | "light";
};

export const DEFAULT_HERO = "liftoff";

export const heroOptions: HeroOption[] = [
  {
    id: "liftoff",
    name: "Liftoff",
    src: liftoffPad,
    alt: "A rocket lifting off its pad in daylight, exhaust clouds rolling across the ground",
    position: "70% 62%",
    scrim: "strong",
  },
  {
    id: "night-arc",
    name: "Night arc",
    src: nightArc,
    alt: "A rocket's long-exposure trail arcing through a starry night sky over water",
    position: "50% 60%",
    mirrored: true,
    scrim: "light",
  },
  {
    id: "crescent",
    name: "Earth crescent",
    src: earthCrescent,
    alt: "A sunlit crescent of the Earth against the black of space",
    position: "62% 50%",
    scrim: "light",
  },
  {
    id: "orbit",
    name: "From orbit",
    src: orbit,
    alt: "The Earth's oceans and clouds seen from orbit, with part of a spacecraft in frame",
    position: "70% 30%",
    scrim: "strong",
  },
  {
    id: "city-lights",
    name: "City lights",
    src: earthNight,
    alt: "City lights across the Earth at night, seen from orbit",
    position: "50% 40%",
    scrim: "medium",
  },
  {
    id: "capitol",
    name: "U.S. Capitol",
    src: capitol,
    alt: "The United States Capitol dome under a blue sky",
    position: "50% 30%",
    scrim: "strong",
  },
  {
    id: "dusk-arc",
    name: "Dusk arc (previous)",
    src: duskArc,
    alt: "A rocket's long-exposure trail arcing over the coast at dusk",
    position: "72% 50%",
    scrim: "strong",
  },
];

const scrims: Record<HeroOption["scrim"], string> = {
  strong:
    "bg-[linear-gradient(90deg,rgb(10_22_36/0.9)_0%,rgb(10_22_36/0.74)_30%,rgb(10_22_36/0.22)_56%,rgb(10_22_36/0)_72%)] max-lg:bg-[linear-gradient(180deg,rgb(10_22_36/0.62)_0%,rgb(10_22_36/0.8)_100%)]",
  medium:
    "bg-[linear-gradient(90deg,rgb(10_22_36/0.78)_0%,rgb(10_22_36/0.5)_32%,rgb(10_22_36/0.1)_56%,rgb(10_22_36/0)_70%)] max-lg:bg-[linear-gradient(180deg,rgb(10_22_36/0.45)_0%,rgb(10_22_36/0.7)_100%)]",
  light:
    "bg-[linear-gradient(90deg,rgb(10_22_36/0.55)_0%,rgb(10_22_36/0.25)_34%,rgb(10_22_36/0)_56%)] max-lg:bg-[linear-gradient(180deg,rgb(10_22_36/0.35)_0%,rgb(10_22_36/0.6)_100%)]",
};

/* The choice lives in the address (#hero=night-arc), so a link can be shared. */
function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
function readHash() {
  return window.location.hash;
}
function useHeroChoice() {
  const hash = useSyncExternalStore(subscribe, readHash, () => "");
  const id = hash.match(/hero=([a-z-]+)/)?.[1];
  return heroOptions.find((option) => option.id === id) ?? heroOptions.find((option) => option.id === DEFAULT_HERO)!;
}

export function HeroBackdrop() {
  const choice = useHeroChoice();

  return (
    <div className="absolute inset-0 -z-10">
      <Image
        key={choice.id}
        src={choice.src}
        alt={choice.alt}
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        quality={85}
        style={{ objectPosition: choice.position }}
        className={cn(
          "object-cover",
          choice.mirrored ? "-scale-x-100" : "animate-settle motion-reduce:animate-none",
        )}
      />
      <div aria-hidden className={cn("absolute inset-0", scrims[choice.scrim])} />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink via-ink/80 to-transparent"
      />
    </div>
  );
}

/** REVIEW ONLY. Remove once a photograph is chosen. */
export function HeroPicker() {
  const choice = useHeroChoice();

  return (
    <aside
      aria-label="Hero photograph options (review only)"
      className="fixed inset-x-3 bottom-3 z-40 mx-auto w-fit max-w-[calc(100vw-1.5rem)] lg:inset-x-auto lg:bottom-auto lg:right-3 lg:top-1/2 lg:w-[5.5rem] lg:-translate-y-1/2 rounded-lg border border-line bg-white p-2 text-ink shadow-[0_18px_40px_-12px_rgb(10_22_36/0.55)]"
    >
      <p className="px-1 pb-1.5 text-xs font-semibold leading-tight text-steel">
        Hero photo, for review: <span className="text-ink">{choice.name}</span>
      </p>
      <ul className="flex gap-1.5 overflow-x-auto lg:flex-col lg:overflow-visible">
        {heroOptions.map((option, index) => {
          const selected = option.id === choice.id;
          return (
            <li key={option.id} className="shrink-0">
              <a
                href={`#hero=${option.id}`}
                aria-current={selected ? "true" : undefined}
                title={option.name}
                className={cn(
                  "relative block h-12 w-[4.5rem] overflow-hidden rounded-md outline-offset-2 transition",
                  selected ? "ring-[3px] ring-signal" : "opacity-75 hover:opacity-100",
                )}
              >
                <Image
                  src={option.src}
                  alt={`Option ${index + 1}: ${option.name}`}
                  fill
                  sizes="72px"
                  className={cn("object-cover", option.mirrored && "-scale-x-100")}
                />
                <span className="absolute bottom-0 left-0 rounded-tr bg-ink/80 px-1.5 text-[0.7rem] font-semibold leading-5 text-white">
                  {index + 1}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
