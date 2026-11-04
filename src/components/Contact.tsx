"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { site, social } from "@/content/site";
import { topics, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";
import { SectionHeading, ExternalLink } from "./ui";
import { cn } from "@/lib/cn";

const empty: ContactInput = { name: "", email: "", company: "", topic: "", message: "" };
type Status = "idle" | "sending" | "sent" | "error";

export function Contact({ standalone = false }: { standalone?: boolean }) {
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [hp, setHp] = useState("");

  const update = (field: keyof ContactInput, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validateContact(next));
  };
  const blur = (field: keyof ContactInput) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validateContact(values));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, company: true, topic: true, message: true });
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setServerMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: hp }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: ContactErrors };
      if (res.ok && data.ok) {
        setStatus("sent");
        setValues(empty);
        setTouched({});
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerMessage(data.error ?? "Check the highlighted fields and try again.");
      setStatus("error");
    } catch {
      setServerMessage("You appear to be offline. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby={standalone ? undefined : "contact-title"}
      aria-label={standalone ? "Contact" : undefined}
      className={cn("grain bg-ink text-ivory", standalone ? "py-20 lg:py-28" : "py-28 lg:py-40")}
    >
      <div className="shell">
        {standalone ? null : (
          <SectionHeading
            id="contact-title"
            tone="ivory"
            kicker="Contact"
            title="Start a conversation with the family."
          />
        )}

        <div className={cn("grid gap-16 lg:grid-cols-12 lg:gap-12", !standalone && "mt-20")}>
          <div className="space-y-10 lg:col-span-4">
            <p className="max-w-[36ch] text-lg leading-relaxed text-ivory/70">
              For partnerships, media requests, or questions about one of our brands, send a note and the right
              person will follow up.
            </p>
            <div>
              <p className="text-sm text-ivory/45">Headquarters</p>
              <p className="display mt-2 text-2xl">{site.location}</p>
            </div>
            {social.length ? (
              <div>
                <p className="text-sm text-ivory/45">Follow us</p>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  {social.map((s) => (
                    <li key={s.href}>
                      <ExternalLink href={s.href} className="text-ivory">
                        {s.label}
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  role="status"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="border border-accent/40 p-10"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-accent text-ink">
                    <Check aria-hidden className="size-6" />
                  </span>
                  <h3 className="display mt-8 text-4xl">Message sent.</h3>
                  <p className="mt-4 max-w-[44ch] text-ivory/70">
                    Thank you for writing. A member of the Jones &amp; Sons team will reply to the email you provided.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="link-underline mt-8 text-sm font-semibold text-accent"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative grid gap-x-8 gap-y-8 sm:grid-cols-2"
                  aria-describedby={serverMessage ? "contact-server" : undefined}
                >
                  <Field label="Full name" name="name" value={values.name} error={touched.name ? errors.name : undefined} onChange={update} onBlur={blur} autoComplete="name" />
                  <Field label="Email" name="email" type="email" value={values.email} error={touched.email ? errors.email : undefined} onChange={update} onBlur={blur} autoComplete="email" />
                  <Field label="Company" optional name="company" value={values.company} error={touched.company ? errors.company : undefined} onChange={update} onBlur={blur} autoComplete="organization" />
                  <SelectField value={values.topic} error={touched.topic ? errors.topic : undefined} onChange={update} onBlur={blur} />
                  <Field label="Message" name="message" multiline value={values.message} error={touched.message ? errors.message : undefined} onChange={update} onBlur={blur} className="sm:col-span-2" />

                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Website
                      <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                    </label>
                  </div>

                  <div className="flex flex-col items-start gap-5 sm:col-span-2">
                    {status === "error" && serverMessage ? (
                      <p id="contact-server" role="alert" className="border-l-2 border-amber-400 pl-4 text-sm text-amber-200">
                        {serverMessage}
                      </p>
                    ) : null}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-7 font-semibold text-ink transition-colors duration-500 hover:bg-ivory disabled:cursor-wait disabled:opacity-70"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 aria-hidden className="size-4 animate-spin" /> Sending message
                        </>
                      ) : (
                        "Send message"
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputBase =
  "w-full border-0 border-b bg-transparent px-0 py-3 text-lg text-ivory placeholder:text-ivory/30 transition-colors focus:outline-none focus:ring-0";

type FieldProps = {
  label: string;
  name: keyof ContactInput;
  value: string;
  error?: string;
  type?: string;
  optional?: boolean;
  multiline?: boolean;
  autoComplete?: string;
  className?: string;
  onChange: (f: keyof ContactInput, v: string) => void;
  onBlur: (f: keyof ContactInput) => void;
};

function Field({ label, name, value, error, type = "text", optional, multiline, autoComplete, className, onChange, onBlur }: FieldProps) {
  const id = `contact-${name}`;
  const errId = `${id}-error`;
  const cls = cn(inputBase, error ? "border-amber-400" : "border-ivory/25 focus:border-accent");
  const shared = {
    id,
    name,
    value,
    "aria-invalid": Boolean(error) || undefined,
    "aria-describedby": error ? errId : undefined,
    "aria-required": !optional || undefined,
    onBlur: () => onBlur(name),
  };
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm text-ivory/60">
        {label}
        {optional ? <span className="text-ivory/35"> (optional)</span> : null}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} className={cn(cls, "resize-y")} onChange={(e) => onChange(name, e.target.value)} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} className={cls} onChange={(e) => onChange(name, e.target.value)} />
      )}
      {error ? (
        <p id={errId} className="mt-2 text-sm text-amber-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({ value, error, onChange, onBlur }: { value: string; error?: string; onChange: FieldProps["onChange"]; onBlur: FieldProps["onBlur"] }) {
  const id = useId();
  const errId = `${id}-error`;
  return (
    <div>
      <label htmlFor="contact-topic" className="text-sm text-ivory/60">
        Topic
      </label>
      <select
        id="contact-topic"
        name="topic"
        value={value}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? errId : undefined}
        aria-required
        onChange={(e) => onChange("topic", e.target.value)}
        onBlur={() => onBlur("topic")}
        className={cn(inputBase, "appearance-none [&>option]:bg-ink", error ? "border-amber-400" : "border-ivory/25 focus:border-accent", !value && "text-ivory/40")}
      >
        <option value="" disabled>
          Choose a topic
        </option>
        {topics.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errId} className="mt-2 text-sm text-amber-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
