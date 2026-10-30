import { z } from "zod";

/** Service options from the client document (section 9). Values are stable; labels are what visitors see. */
export const enquiryServices = [
  { value: "customs", label: "Customs Clearance Staffing" },
  { value: "finance", label: "Accounting & Finance" },
  { value: "admin", label: "Administration & Business Support" },
  { value: "other", label: "Other" },
] as const;

export type EnquiryServiceValue = (typeof enquiryServices)[number]["value"];
const serviceValues = enquiryServices.map((s) => s.value) as [EnquiryServiceValue, ...EnquiryServiceValue[]];

export const staffCountOptions = ["1", "2–3", "4–5", "6–10", "More than 10", "Not sure yet"] as const;

export function isEnquiryService(value: unknown): value is EnquiryServiceValue {
  return typeof value === "string" && (serviceValues as string[]).includes(value);
}

export function serviceLabel(value: string) {
  return enquiryServices.find((s) => s.value === value)?.label ?? value;
}

const optionalText = (max: number, label: string) => z.string().trim().max(max, `${label} must be ${max} characters or fewer.`);

/** Shared by the form (instant feedback) and the server action (authoritative). */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100, "Name must be 100 characters or fewer."),
  company: z.string().trim().min(2, "Enter your company name.").max(150, "Company must be 150 characters or fewer."),
  email: z.string().trim().max(200, "Email must be 200 characters or fewer.").pipe(z.email("Enter a work email address, like name@company.com.")),
  phone: optionalText(30, "Phone").regex(/^[+()\d\s.-]*$/, "Use digits, spaces and + ( ) - only."),
  service: z.enum(serviceValues, { error: "Choose the service you are interested in." }),
  staffCount: z.union([z.enum(staffCountOptions), z.literal("")]),
  message: z
    .string()
    .trim()
    .min(15, "Briefly describe the role or tasks (at least 15 characters).")
    .max(3000, "Keep the description under 3,000 characters."),
  hours: optionalText(150, "Working hours"),
  systems: optionalText(300, "Systems"),
  consent: z.literal(true, { error: "Please confirm you have read the privacy notice." }),
  /** Honeypot: hidden from people, often filled by bots. */
  website: z.string().max(200),
});

/** Non-visitor fields sent with the form: spam timing, duplicate protection and campaign attribution. */
export const enquiryMetaSchema = z.object({
  startedAt: z.number().int().nonnegative(),
  submissionId: z.string().regex(/^[a-zA-Z0-9-]{8,64}$/),
  pagePath: z.string().max(200).regex(/^\/[^\s]*$/),
  attribution: z.record(z.string().max(30), z.string().max(120)).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type EnquiryFormValues = z.input<typeof enquirySchema>;
export type EnquiryMeta = z.infer<typeof enquiryMetaSchema>;

export type EnquiryResult =
  | { ok: true }
  | { ok: false; reason: "validation" | "delivery" | "rate_limited"; message: string; fieldErrors?: Partial<Record<keyof EnquiryInput, string>> };
