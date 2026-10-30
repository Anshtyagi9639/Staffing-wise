import type { Step } from "@/components/sections/steps";

/** Homepage summary (client document, section 2 "How it works"). */
export const howItWorksSummary: Step[] = [
  { title: "Understand your requirements", body: "We discuss the role, workload, systems, working hours and the skills needed." },
  { title: "Recruit and train", body: "We identify suitable candidates and provide role-relevant initial training." },
  { title: "Onboard and integrate", body: "Your dedicated staff member learns your processes and works with your team." },
  { title: "Support and develop", body: "We remain involved to support the placement and help address changing requirements." },
];

/** Full process (client document, section 6). */
export const howItWorksDetail: Step[] = [
  {
    title: "Understand your requirements",
    body: "We begin with a conversation about your business, the work that needs to be done, the systems you use, the hours required and the experience or training needed. We agree the role and what a successful placement should look like.",
  },
  {
    title: "Recruit and train",
    body: "We identify candidates against the agreed requirements and arrange suitable initial training. The training plan depends on the role, the candidate’s existing experience and the systems or procedures they will need to use.",
  },
  {
    title: "Onboard and integrate",
    body: "Your dedicated staff member is introduced into your operation and becomes familiar with your team, systems, workflows and expectations. Responsibilities, access and reporting lines are agreed as part of onboarding.",
  },
  {
    title: "Ongoing support",
    body: "Staffing Wise remains involved after onboarding, providing a point of contact for communication, support and staff development. If your workload or requirements change, we can discuss what adjustments may be appropriate.",
  },
];

/** Customs placement process (client document, section 3). */
export const customsPlacementSteps: Step[] = [
  { title: "Discuss your operation", body: "We discuss your operation, declaration volumes, systems, working hours and the tasks you want to delegate." },
  { title: "Recruit for the role", body: "We recruit for the role and assess candidates against the skills and experience required." },
  { title: "Initial training", body: "We arrange initial training and familiarisation with the relevant customs concepts and systems." },
  { title: "Onboard into your workflows", body: "Your staff member is onboarded into your workflows and learns your specific procedures." },
  { title: "Ongoing support", body: "We maintain ongoing communication and support as the placement develops." },
];

export const staffingWiseManages = [
  "Recruitment and candidate selection.",
  "Employment arrangements.",
  "Initial training and onboarding coordination.",
  "Working infrastructure and equipment, where applicable and as agreed.",
  "Ongoing communication and support.",
];

export const clientContributes = [
  "Clear role requirements, priorities and performance expectations.",
  "Training on client-specific procedures and business context.",
  "Appropriate system access, supervision and feedback.",
  "Timely communication about changes in workload or responsibilities.",
];
