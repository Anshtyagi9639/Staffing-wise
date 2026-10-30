"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CircleCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { track, trackEnquiryConversion } from "@/lib/analytics";
import { readAttribution } from "@/lib/attribution";
import { submitEnquiry } from "@/lib/enquiry/actions";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils/cn";
import {
  enquirySchema,
  enquiryServices,
  isEnquiryService,
  serviceLabel,
  staffCountOptions,
  type EnquiryFormValues,
  type EnquiryInput,
  type EnquiryServiceValue,
} from "@/lib/validation/enquiry";

const FORM_NAME = "staffing_enquiry";

const inputClass =
  "block min-h-12 w-full rounded-[6px] border-[1.5px] border-line bg-white px-3 py-2.5 text-base text-ink placeholder:text-slate/80 focus:border-navy-700 focus:ring-3 focus:ring-navy-700/20 focus:outline-none aria-[invalid=true]:border-error";

function newSubmissionId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

export function EnquiryForm({ defaultService }: { defaultService?: EnquiryServiceValue }) {
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `enquiry-${name}-${uid}`;
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const meta = useRef({ startedAt: 0, submissionId: "", started: false });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues, unknown, EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      service: defaultService,
      staffCount: "",
      message: "",
      hours: "",
      systems: "",
      website: "",
    },
  });

  useEffect(() => {
    meta.current.startedAt = Date.now();
    meta.current.submissionId = newSubmissionId();
    // Service CTAs link to /contact-us?service=customs etc.; preselect it (read here so the page stays static).
    const fromQuery = new URLSearchParams(location.search).get("service");
    if (!defaultService && isEnquiryService(fromQuery)) setValue("service", fromQuery);
  }, [defaultService, setValue]);

  useEffect(() => {
    if (status === "sent") statusRef.current?.focus();
  }, [status]);

  const onFirstInteraction = () => {
    if (meta.current.started) return;
    meta.current.started = true;
    track("form_start", { form_name: FORM_NAME, service_of_interest: getValues("service") ? serviceLabel(String(getValues("service"))) : undefined });
  };

  const onSubmit = async (values: EnquiryInput) => {
    setStatus("idle");
    const result = await submitEnquiry(values, {
      startedAt: meta.current.startedAt,
      submissionId: meta.current.submissionId,
      pagePath: location.pathname,
      attribution: readAttribution(),
    }).catch(() => ({ ok: false as const, reason: "delivery" as const, message: `We couldn't send your enquiry just now. Please try again, or email ${site.email}.` }));

    if (result.ok) {
      // Only after the server has confirmed delivery.
      track("generate_lead", { form_name: FORM_NAME, service_of_interest: serviceLabel(values.service), lead_source_page: location.pathname });
      trackEnquiryConversion();
      reset();
      meta.current = { startedAt: Date.now(), submissionId: newSubmissionId(), started: false };
      setStatus("sent");
      return;
    }
    track("form_error", { form_name: FORM_NAME, error_type: result.reason });
    if ("fieldErrors" in result && result.fieldErrors) {
      for (const [field, message] of Object.entries(result.fieldErrors)) {
        setError(field as keyof EnquiryInput, { message }, { shouldFocus: true });
      }
    }
    setServerMessage(result.message);
    setStatus("error");
  };

  if (status === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-brand border border-line bg-white p-6 shadow-card sm:p-9">
        <CircleCheck aria-hidden className="size-10 text-success" />
        <h2 className="mt-4 text-[1.8rem]">Thank you, your enquiry has been sent</h2>
        <p className="mt-2 text-ink-soft">
          The Staffing Wise team has received your details and will be in touch to discuss your requirements. If your enquiry is urgent, call us on{" "}
          <a href={site.phone.href} className="link-inline">
            {site.phone.display}
          </a>
          .
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(onSubmit)(e)}
      onFocusCapture={onFirstInteraction}
      noValidate
      aria-labelledby={id("title")}
      className="rounded-brand border border-line bg-white p-5 shadow-card sm:p-8"
    >
      <h2 id={id("title")} className="text-[1.7rem]">
        Tell us about your requirements
      </h2>
      <p className="mt-1 text-[0.93rem] text-ink-soft">
        It takes about two minutes. Please don’t include confidential operational details at this stage.
      </p>

      <div className="mt-6 grid gap-x-4.5 gap-y-4.5 sm:grid-cols-2">
        <Field id={id("name")} label="Name" error={errors.name}>
          <input id={id("name")} autoComplete="name" className={inputClass} {...a11y(id("name"), errors.name)} {...register("name")} />
        </Field>
        <Field id={id("company")} label="Company" error={errors.company}>
          <input id={id("company")} autoComplete="organization" className={inputClass} {...a11y(id("company"), errors.company)} {...register("company")} />
        </Field>
        <Field id={id("email")} label="Work email" error={errors.email}>
          <input id={id("email")} type="email" autoComplete="email" inputMode="email" className={inputClass} {...a11y(id("email"), errors.email)} {...register("email")} />
        </Field>
        <Field id={id("phone")} label="Phone number" optional error={errors.phone}>
          <input id={id("phone")} type="tel" autoComplete="tel" className={inputClass} {...a11y(id("phone"), errors.phone)} {...register("phone")} />
        </Field>
        <Field id={id("service")} label="Service of interest" error={errors.service}>
          <select id={id("service")} className={inputClass} defaultValue={defaultService ?? ""} {...a11y(id("service"), errors.service)} {...register("service")}>
            <option value="" disabled>
              Choose a service
            </option>
            {enquiryServices.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id={id("staffCount")} label="Number of staff required" optional error={errors.staffCount}>
          <select id={id("staffCount")} className={inputClass} {...a11y(id("staffCount"), errors.staffCount)} {...register("staffCount")}>
            <option value="">Select if known</option>
            {staffCountOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field id={id("message")} label="Brief description of the role or tasks" error={errors.message} className="sm:col-span-2">
          <textarea
            id={id("message")}
            rows={5}
            placeholder="For example: import and export declarations for a growing freight forwarding team, plus related customs administration."
            className={cn(inputClass, "min-h-32 resize-y")}
            {...a11y(id("message"), errors.message)}
            {...register("message")}
          />
        </Field>
        <Field id={id("hours")} label="Preferred working hours or time zone" optional error={errors.hours}>
          <input id={id("hours")} placeholder="For example: 9am–5:30pm Irish time" className={inputClass} {...a11y(id("hours"), errors.hours)} {...register("hours")} />
        </Field>
        <Field id={id("systems")} label="Systems or software used" optional error={errors.systems}>
          <input id={id("systems")} placeholder="For example: CDS, AIS, Xero" className={inputClass} {...a11y(id("systems"), errors.systems)} {...register("systems")} />
        </Field>

        <div className="sm:col-span-2">
          <div className="flex gap-3">
            <input
              id={id("consent")}
              type="checkbox"
              className="mt-1 size-5 shrink-0 accent-navy-900"
              {...a11y(id("consent"), errors.consent)}
              {...register("consent")}
            />
            <label htmlFor={id("consent")} className="text-[0.93rem] text-ink-soft">
              I understand Staffing Wise will use these details to respond to my enquiry, as described in the{" "}
              <Link href="/privacy-notice" className="link-inline">
                Privacy Notice
              </Link>
              .
            </label>
          </div>
          {errors.consent?.message ? (
            <p id={`${id("consent")}-error`} className="mt-1.5 text-[0.86rem] font-semibold text-error">
              {errors.consent.message}
            </p>
          ) : null}
        </div>

        {/* Honeypot: off-screen and skipped by keyboard and screen readers */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}>Leave this field empty</label>
          <input id={id("website")} tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-5 rounded-r-[6px] border-l-4 border-error bg-mist px-4 py-3 text-[0.95rem] font-semibold text-error">
          {serverMessage}
        </p>
      ) : null}

      <Button type="submit" variant="secondary" className="mt-6 w-full sm:w-auto" disabled={isSubmitting} aria-disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            Submit Enquiry <ArrowRight aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}

function a11y(fieldId: string, error?: FieldError) {
  return { "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${fieldId}-error` : undefined };
}

function Field({ id, label, optional, error, className, children }: { id: string; label: string; optional?: boolean; error?: FieldError; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[0.92rem] font-semibold text-ink">
        {label} {optional ? <span className="font-normal text-slate">(optional)</span> : null}
      </label>
      {children}
      {error?.message ? (
        <p id={`${id}-error`} className="mt-1.5 text-[0.86rem] font-semibold text-error">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
