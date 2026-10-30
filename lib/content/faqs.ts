/**
 * FAQs, from the client document (section 8), wording kept as supplied.
 * Customs questions also appear on the Customs Clearance Staffing page (client requirement).
 * FAQPage structured data is generated from these same records, so the markup always matches the visible text.
 */
export type Faq = { id: string; question: string; answer: string };

export const generalFaqs: Faq[] = [
  {
    id: "services",
    question: "What services does Staffing Wise provide?",
    answer:
      "Staffing Wise provides dedicated overseas personnel for suitable business roles. Current service areas include customs-clearance staffing, accounting and finance support, and administration and business support. If your requirement is not listed, contact us to discuss it.",
  },
  {
    id: "model",
    question: "How does the dedicated staffing model work?",
    answer:
      "We discuss your requirements, recruit for the role, arrange initial training and support onboarding. The staff member works exclusively for your business, while Staffing Wise manages the agreed employment arrangements and provides ongoing support.",
  },
  {
    id: "vs-agency",
    question: "How is Staffing Wise different from a traditional recruitment agency?",
    answer:
      "Rather than simply introducing a candidate and stepping away, Staffing Wise manages the placement model around recruitment, employment, onboarding and ongoing support. The exact responsibilities are agreed with each client.",
  },
  {
    id: "exclusive",
    question: "Will the staff member work exclusively for my business?",
    answer: "The model is designed around dedicated personnel who work exclusively for the client they are assigned to.",
  },
  {
    id: "employer",
    question: "Who employs the staff?",
    answer:
      "Staffing Wise manages the employment side of the arrangement. The contractual structure and responsibilities will be explained during discussions and set out in the relevant agreement.",
  },
  {
    id: "hours",
    question: "What are the typical working hours?",
    answer:
      "Working hours are agreed based on the role and your operational requirements. Many placements are designed around a full-time working week, often approximately 40 hours, but the arrangement should be confirmed for each placement.",
  },
  {
    id: "tailored",
    question: "Can the service be tailored to my business?",
    answer:
      "Yes. We start by understanding your tasks, systems, working hours and required skills, then discuss a role and training plan suited to your operation.",
  },
  {
    id: "start",
    question: "How quickly can a staff member start?",
    answer:
      "Timescales depend on the role, skills required, candidate availability and training or onboarding needs. We will discuss a realistic timeline once we understand your requirements.",
  },
  {
    id: "leaves",
    question: "What happens if a staff member leaves or is not suitable?",
    answer:
      "Contact Staffing Wise to discuss the situation. The appropriate next steps will depend on the circumstances and the terms of the service agreement, and any replacement process is confirmed during the initial discussions.",
  },
  {
    id: "systems",
    question: "Can staff use our software and systems?",
    answer:
      "Staff can be trained on relevant client systems and procedures, subject to the role, access arrangements and training required. System access should be provided by the client in line with its security policies.",
  },
  {
    id: "confidentiality",
    question: "How do you handle confidentiality and data security?",
    answer:
      "Confidentiality, access permissions and data-handling requirements should be agreed before work begins. We can discuss your requirements and confirm the applicable contractual and operational controls as part of onboarding.",
  },
  {
    id: "other-roles",
    question: "Can you provide staff for roles not listed on the website?",
    answer:
      "Yes, you can contact us to discuss other suitable roles. We will review the tasks, skills and working arrangement required before confirming whether we can support the position.",
  },
];

export const customsFaqs: Faq[] = [
  {
    id: "customs-work",
    question: "What customs-clearance work can staff undertake?",
    answer:
      "Depending on the role, experience and training, staff may support import and export declaration processing, documentation checks and related customs administration. Specific responsibilities are agreed with the client.",
  },
  {
    id: "customs-uk-ie",
    question: "Do staff have experience with UK and Irish customs procedures?",
    answer:
      "We recruit and train for the requirements of the placement. The relevant UK or Irish procedures and the candidate’s existing experience should be discussed and confirmed for each role.",
  },
  {
    id: "customs-systems",
    question: "Which customs systems can staff work with?",
    answer:
      "Relevant systems may include Thyme IT, CDS and AIS/AES, depending on the role and training. We will discuss the systems your operation uses before defining the placement.",
  },
  {
    id: "customs-procedures",
    question: "Can staff be trained on our own procedures?",
    answer:
      "Yes. Initial preparation can be tailored to the role, and the client should provide onboarding and guidance on its own workflows, procedures and quality standards.",
  },
  {
    id: "customs-import-export",
    question: "Can staff support both import and export declarations?",
    answer:
      "The scope can include import and export support where this matches the role, the staff member’s training and your operating requirements.",
  },
  {
    id: "customs-cheds",
    question: "Can staff assist with CHEDs, IPAFFS and HSE-related clearances?",
    answer:
      "Where relevant to the role, staff may support these processes following appropriate training and in line with the client’s procedures and applicable requirements.",
  },
  {
    id: "customs-training",
    question: "How are staff trained before they begin?",
    answer:
      "The training approach depends on the role and candidate. We discuss the required knowledge and systems, arrange suitable initial training and work with the client on the role-specific onboarding needed.",
  },
  {
    id: "customs-exclusive",
    question: "Will the customs staff member work exclusively for our business?",
    answer: "Yes. The model is designed for a dedicated staff member assigned to work exclusively for your business.",
  },
  {
    id: "customs-begin",
    question: "How does a customs-clearance placement begin?",
    answer:
      "We discuss declaration volumes, the systems you use, the tasks to be covered, working hours and the skills required. We then agree the role, recruitment approach, training and onboarding plan.",
  },
];

/** A short selection for the homepage. */
export const homeFaqs: Faq[] = [generalFaqs[1], generalFaqs[2], generalFaqs[3], customsFaqs[0], generalFaqs[7], generalFaqs[10]];
