"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu } from "lucide-react";

import logo from "@/assets/brand/logo-dark.png";
import codePhoto from "@/assets/photos/code.jpg";
import columnsPhoto from "@/assets/photos/columns.jpg";
import earthPhoto from "@/assets/photos/earth.jpg";
import teamPhoto from "@/assets/photos/team.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { contactHref, navGroups, navPlain, type NavGroup } from "@/content/nav";
import { heroAward, v2Site } from "@/content/site";
import { cn } from "@/lib/utils";

/** The picture and message at the right of each open panel. */
const features: Record<
  string,
  { image: StaticImageData; alt: string; label: string; title: string; href: string }
> = {
  capabilities: {
    image: codePhoto,
    alt: "",
    label: "How we deliver",
    title: "Understand, align, engineer, validate, evolve",
    href: "/capabilities#how-we-deliver",
  },
  "who-we-serve": {
    image: columnsPhoto,
    alt: "",
    label: "Government",
    title: "Modernizing the systems citizens rely on",
    href: "/who-we-serve#government",
  },
  "contract-vehicles": {
    image: earthPhoto,
    alt: "",
    label: heroAward.label,
    title: `${heroAward.name}. ${heroAward.detail}`,
    href: heroAward.href,
  },
  company: {
    image: teamPhoto,
    alt: "",
    label: "Careers",
    title: "Build your future with Tanvi IT",
    href: "/careers",
  },
};

export function SiteHeader() {
  const [open, setOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shell = useRef<HTMLDivElement>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  }, [cancelClose]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const trigger = shell.current?.querySelector<HTMLButtonElement>(`[data-trigger="${open}"]`);
      setOpen(null);
      trigger?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!shell.current?.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const active = navGroups.find((group) => group.key === open);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3">
      <a
        href="#main"
        className="btn btn-signal absolute left-4 top-4 z-[60] -translate-y-24 focus-visible:translate-y-0"
      >
        Skip to main content
      </a>

      <div className="wrap">
        <div
          ref={shell}
          className="relative"
          onMouseLeave={scheduleClose}
          onMouseEnter={cancelClose}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(null);
          }}
        >
          <div
            className={cn(
              "flex h-16 items-center justify-between gap-6 rounded-lg border bg-white pl-5 pr-3 transition-shadow duration-300",
              scrolled || open
                ? "border-line shadow-[0_10px_30px_-12px_rgb(10_22_36/0.35)]"
                : "border-white/60 shadow-[0_6px_24px_-14px_rgb(10_22_36/0.5)]",
            )}
          >
            <Link href="/" className="flex shrink-0 items-center" aria-label={`${v2Site.name} home`}>
              <Image src={logo} alt={v2Site.legalName} width={140} height={36} priority />
            </Link>

            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-0.5 xl:gap-1">
                {navGroups.map((group) => {
                  const isOpen = open === group.key;
                  return (
                    <li key={group.key}>
                      <button
                        type="button"
                        data-trigger={group.key}
                        aria-expanded={isOpen}
                        aria-controls={`panel-${group.key}`}
                        onClick={() => setOpen(isOpen ? null : group.key)}
                        onMouseEnter={() => {
                          cancelClose();
                          setOpen(group.key);
                        }}
                        className={cn(
                          "relative flex h-11 items-center gap-1 whitespace-nowrap rounded-md px-2.5 text-[0.9rem] font-semibold text-ink transition-colors xl:gap-1.5 xl:px-3.5 xl:text-[0.95rem]",
                          "after:absolute after:inset-x-3.5 after:-bottom-[11px] after:h-[3px] after:origin-left after:rounded-full after:bg-signal after:transition-transform after:duration-300",
                          isOpen ? "bg-mist after:scale-x-100" : "after:scale-x-0 hover:bg-mist",
                        )}
                      >
                        {group.label}
                        <ChevronDown
                          aria-hidden
                          className={cn(
                            "size-4 text-steel transition-transform duration-300",
                            isOpen && "rotate-180",
                          )}
                        />
                      </button>
                    </li>
                  );
                })}
                {navPlain.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onMouseEnter={() => setOpen(null)}
                      className="flex h-11 items-center whitespace-nowrap rounded-md px-2.5 text-[0.9rem] font-semibold text-ink transition-colors hover:bg-mist xl:px-3.5 xl:text-[0.95rem]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href={contactHref}
                className="btn btn-ink hidden min-h-11 px-4 py-2 text-[0.95rem] sm:inline-flex xl:px-5"
              >
                Contact us
                <ArrowRight aria-hidden className="size-4" />
              </Link>

              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger
                  className="flex size-11 items-center justify-center rounded-md text-ink transition-colors hover:bg-mist lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu aria-hidden className="size-6" />
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="gap-0 overflow-y-auto p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-md"
                >
                  <MobileMenu onNavigate={() => setSheetOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {active ? <MegaPanel key={active.key} group={active} onNavigate={() => setOpen(null)} /> : null}
        </div>
      </div>
    </header>
  );
}

function MegaPanel({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const feature = features[group.key];
  const twoLists = group.columns.length > 1;

  return (
    <div id={`panel-${group.key}`} className="absolute inset-x-0 top-full hidden pt-2 lg:block">
      <div className="animate-panel overflow-hidden rounded-lg border border-line bg-white shadow-[0_30px_60px_-24px_rgb(10_22_36/0.45)]">
        <div className="grid grid-cols-12">
          <div className="col-span-3 flex flex-col justify-between gap-8 bg-mist p-8">
            <div>
              <p className="display text-2xl text-ink">{group.label}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-steel">{group.intro}</p>
            </div>
            <Link href={group.href} onClick={onNavigate} className="link-draw self-start text-ink">
              {group.overview}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>

          <div className={cn("p-8", twoLists ? "col-span-6" : "col-span-5")}>
            <div className={cn("grid gap-x-8", twoLists && "grid-cols-2")}>
              {group.columns.map((column) => (
                <div key={column.heading}>
                  <p className="mb-3 text-sm font-semibold text-steel">{column.heading}</p>
                  <ul>
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={onNavigate}
                          className="group -mx-3 flex items-start justify-between gap-4 rounded-md px-3 py-2.5 transition-colors hover:bg-mist"
                        >
                          <span>
                            <span className="block font-semibold leading-snug text-ink">
                              {link.label}
                            </span>
                            {link.note ? (
                              <span className="mt-0.5 block text-sm leading-snug text-steel">
                                {link.note}
                              </span>
                            ) : null}
                          </span>
                          <ArrowUpRight
                            aria-hidden
                            className="mt-1 size-4 shrink-0 -translate-x-1 text-federal opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className={cn("p-3", twoLists ? "col-span-3" : "col-span-4")}>
            <Link
              href={feature.href}
              onClick={onNavigate}
              className="group on-dark relative flex h-full min-h-64 flex-col justify-end overflow-hidden rounded-md bg-ink p-6 text-white"
            >
              <Image
                src={feature.image}
                alt={feature.alt}
                fill
                sizes="(min-width: 1024px) 28rem, 0px"
                className="object-cover opacity-70 transition duration-700 group-hover:scale-[1.03]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10"
              />
              <span className="relative text-sm font-semibold text-signal">{feature.label}</span>
              <span className="display relative mt-2 text-xl leading-tight">{feature.title}</span>
              <span className="link-draw relative mt-4 self-start text-sm">
                Take a look
                <ArrowUpRight aria-hidden className="size-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex h-[4.75rem] shrink-0 items-center border-b border-line px-5">
        <Image src={logo} alt={v2Site.legalName} width={140} height={36} />
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
      </div>

      <nav aria-label="Main" className="flex-1 px-5 py-2">
        <Accordion>
          {navGroups.map((group) => (
            <AccordionItem key={group.key} value={group.key} className="border-line">
              <AccordionTrigger className="display py-5 text-xl font-semibold text-ink hover:no-underline">
                {group.label}
              </AccordionTrigger>
              <AccordionContent className="pb-5 [&_a]:no-underline">
                {group.columns.map((column) => (
                  <div key={column.heading} className="mb-3 last:mb-0">
                    {group.columns.length > 1 ? (
                      <p className="mb-1 mt-2 text-sm font-semibold text-steel">{column.heading}</p>
                    ) : null}
                    <ul>
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            onClick={onNavigate}
                            className="flex min-h-11 items-center text-base font-medium text-ink"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Link
                  href={group.href}
                  onClick={onNavigate}
                  className="link-draw mt-2 min-h-11 text-federal"
                >
                  {group.overview}
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {navPlain.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className="display flex min-h-16 items-center border-b border-line text-xl text-ink"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="shrink-0 space-y-4 bg-mist p-5">
        <Link href={contactHref} onClick={onNavigate} className="btn btn-ink w-full">
          Contact us
          <ArrowRight aria-hidden className="size-4" />
        </Link>
        <p className="text-sm text-steel">
          <a href={`tel:${v2Site.phone.replace(/[^+\d]/g, "")}`} className="font-semibold text-ink">
            {v2Site.phone}
          </a>
          <span className="mx-2" aria-hidden>
            |
          </span>
          <a href={`mailto:${v2Site.email}`} className="font-semibold text-ink">
            {v2Site.email}
          </a>
        </p>
      </div>
    </div>
  );
}
