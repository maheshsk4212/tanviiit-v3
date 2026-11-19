"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";

import { contactRoutes as routes } from "@/content/nav";
import { v2Site } from "@/content/site";

/**
 * The contact form.
 *
 * NEEDS-DECISION: there is no server to receive submissions yet. Until one is
 * chosen, the form opens the visitor's own email program with their message
 * addressed to the company, and says so before they press the button. Swap
 * `compose` for a POST to the chosen service when there is one.
 *
 * The route is preselected from the address (/contact#government), which is
 * how the three contact cards on other pages point here.
 */
const slug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");


function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

const field =
  "mt-2 block w-full rounded-md border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-steel/70 focus:border-federal focus:outline-none focus:ring-2 focus:ring-federal/30 aria-[invalid=true]:border-destructive";

export function ContactForm() {
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1),
    () => "",
  );
  const fromAddress = routes.find((name) => slug(name) === hash);
  const [picked, setPicked] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const route = picked ?? fromAddress ?? routes[0];
  const careers = route === "Careers";

  function compose(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const organization = String(data.get("organization") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const found: Record<string, string> = {};
    if (!name) found.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) found.email = "Enter an email address, like name@agency.gov.";
    if (!message) found.message = "Tell us what you need.";
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const subject = `${route} inquiry from ${name}`;
    const body = [`Name: ${name}`, `Email: ${email}`, organization ? `Organization: ${organization}` : null, "", message]
      .filter((line) => line !== null)
      .join("\n");
    window.location.href = `mailto:${v2Site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form id="contact-form" onSubmit={compose} noValidate className="rounded-lg border border-line bg-white p-6 sm:p-9">
      <fieldset>
        <legend className="font-semibold">I am contacting you as</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 xl:grid-cols-4">
          {routes.map((name) => (
            <label
              key={name}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-line px-4 font-medium transition-colors has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-federal"
            >
              <input
                type="radio"
                name="route"
                value={name}
                checked={route === name}
                onChange={() => setPicked(name)}
                className="sr-only"
              />
              {name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" error={errors.name} />
        <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
        <div className="sm:col-span-2">
          <Field label="Organization" name="organization" autoComplete="organization" optional />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="font-semibold">
            {careers ? "Tell us about yourself and the work you're looking for" : "How can we help?"}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={field}
          />
          {errors.message ? (
            <p id="message-error" className="mt-2 text-sm font-medium text-destructive">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button type="submit" className="btn btn-ink max-sm:w-full">
          Write the email
          <ArrowRight aria-hidden className="size-4" />
        </button>
        <p className="max-w-sm text-sm leading-relaxed text-steel">
          This opens your email program with the message addressed to {v2Site.email}.
          {careers ? " Attach your résumé there before you send it." : " Nothing is sent until you press send there."}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  optional,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="font-semibold">
        {label}
        {optional ? <span className="ml-2 text-sm font-normal text-steel">Optional</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={field}
      />
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
