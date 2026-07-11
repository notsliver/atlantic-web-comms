"use client";

import { FormEvent, useState } from "react";
import { careerRoles } from "@/lib/atlantic";

const inquiryTypes = [
  "Partnership",
  "Careers",
  "Studio support",
  "Game operations",
  "General",
];

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [requestType, setRequestType] = useState("");
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const isCareer = requestType === "Careers";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("type", requestType);
    const payload = Object.fromEntries(formData.entries());

    if (!requestType) {
      setStatus("error");
      setMessage("Please choose a request type.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to send request.");
      }

      setStatus("success");
      setMessage("Request sent. We will review it and get back to you.");
      form.reset();
      setRequestType("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <div className="mt-10 max-w-4xl">
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-lg border border-white/10 bg-black/35 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
      >
        <div className="grid border-b border-white/10 sm:grid-cols-2">
          <Field label="Name" name="name" placeholder="Your name" required />
          <Field
            label="Email"
            name="email"
            placeholder="you@studio.com"
            required
            type="email"
          />
          {isCareer ? (
            <SelectField label="Role" name="role" options={careerRoles} required />
          ) : (
            <Field label="Company / Studio" name="company" placeholder="Studio name" />
          )}
          <div
            className="relative block border-t border-white/10 p-4 sm:border-l"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setTypeMenuOpen(false);
              }
            }}
          >
            <span className="text-xs font-medium text-white/45">
              Request type
            </span>
            <div className="relative mt-2">
              <input name="type" value={requestType} readOnly hidden />
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={typeMenuOpen}
                className="flex h-10 w-full items-center justify-between rounded-md border border-white/12 bg-white/[0.04] px-3 text-left text-sm text-white outline-none transition hover:border-white/22 focus:border-white/38"
                onClick={() => setTypeMenuOpen((open) => !open)}
              >
                <span className={requestType ? "text-white" : "text-white/35"}>
                  {requestType || "Select one"}
                </span>
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rotate-45 border-r border-b border-white/55 transition ${
                    typeMenuOpen ? "-translate-y-0 rotate-[225deg]" : "-translate-y-0.5"
                  }`}
                />
              </button>
              {typeMenuOpen ? (
                <div className="absolute top-full right-0 left-0 z-20 mt-2 overflow-hidden rounded-md border border-white/12 bg-[#0b0b0b] p-1 shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
                  <div role="listbox" aria-label="Request type">
                    {inquiryTypes.map((type) => {
                      const selected = requestType === type;

                      return (
                        <button
                          key={type}
                          type="button"
                          role="option"
                          aria-selected={selected}
                          className={`flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-left text-sm transition ${
                            selected
                              ? "bg-white/12 text-white"
                              : "text-white/70 hover:bg-white/7 hover:text-white"
                          }`}
                          onClick={() => {
                            setRequestType(type);
                            setTypeMenuOpen(false);
                          }}
                        >
                          {type}
                          {selected ? (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          {isCareer ? (
            <>
              <Field label="Timezone" name="timezone" placeholder="e.g. UTC−5 / EST" required />
              <Field label="Portfolio / Past Work" name="portfolio" placeholder="https://..." type="url" required />
              <Field label="Showreel / Showcase Video" name="showreel" placeholder="YouTube, Vimeo, Drive…" type="url" />
              <Field label="Availability" name="availability" placeholder="Hours per week / start date" required />
            </>
          ) : (
            <>
              <Field label="Project / Game Link" name="projectLink" placeholder="https://..." type="url" />
              <Field label="Timeline" name="timeline" placeholder="Deadline or ideal start" />
            </>
          )}
        </div>

        <label className="block p-4">
          <span className="text-xs font-medium text-white/45">
            {isCareer ? "Experience and best work" : "Request details"}
          </span>
          <textarea
            name="details"
            required
            rows={6}
            placeholder={isCareer ? "Tell us about your experience, your contribution to your best work, and why you want to join Atlantic." : "What are you building, what do you need help with, and what should we know before replying?"}
            className="mt-3 w-full resize-none bg-transparent text-sm leading-6 text-white outline-none placeholder:text-white/28"
          />
        </label>

        <div className="flex flex-col gap-4 border-t border-white/10 bg-white/[0.025] p-4 sm:flex-row sm:items-center sm:justify-between">
          <p
            className={`text-sm ${
              status === "success"
                ? "text-white/75"
                : status === "error"
                  ? "text-red-200"
                  : "text-white/42"
            }`}
            aria-live="polite"
          >
            {message ||
              "Tell us about the project, your timeline, and what kind of help you need."}
          </p>
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex min-w-40 items-center justify-center rounded-md border border-white/24 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-white/45 hover:bg-white/16 disabled:cursor-not-allowed disabled:opacity-55"
          >
            {status === "sending" ? "Sending..." : "Send request"}
          </button>
        </div>
      </form>
    </div>
  );
}

function SelectField({ label, name, options, required }: { label: string; name: string; options: readonly string[]; required?: boolean }) {
  return (
    <label className="block border-t border-white/10 p-4 even:sm:border-l sm:[&:nth-child(-n+2)]:border-t-0">
      <span className="text-xs font-medium text-white/45">{label}</span>
      <select name={name} required={required} defaultValue="" className="mt-2 h-9 w-full bg-transparent text-sm text-white outline-none">
        <option value="" disabled className="bg-[#0b0b0b]">Choose a role</option>
        {options.map((option) => <option key={option} className="bg-[#0b0b0b]">{option}</option>)}
      </select>
    </label>
  );
}

function Field({
  label,
  name,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block border-t border-white/10 p-4 even:sm:border-l sm:[&:nth-child(-n+2)]:border-t-0">
      <span className="text-xs font-medium text-white/45">{label}</span>
      <input
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
        className="mt-2 h-9 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/28"
      />
    </label>
  );
}
