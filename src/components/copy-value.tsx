"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * An identifier a contracting officer will paste into a form: shown in full,
 * with a button that copies it. The button's name says what it copies, and the
 * confirmation is announced to screen readers.
 */
export function CopyValue({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access refused: the value is on screen to select by hand.
    }
  }

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="tabular-nums">{value}</span>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="relative -my-2 flex size-9 items-center justify-center rounded-md text-current opacity-60 transition hover:bg-white/10 hover:opacity-100 active:scale-90"
      >
        {copied ? <Check aria-hidden className="size-4 text-signal" /> : <Copy aria-hidden className="size-4" />}
      </button>
      <span role="status" className="sr-only">
        {copied ? `${label} copied` : ""}
      </span>
    </span>
  );
}
