import type { Metadata } from "next";
import { SupportServicePage } from "@/components/sections/support-service-page";
import { images } from "@/lib/content/images";
import { buildMetadata } from "@/lib/seo/metadata";
import { services } from "@/lib/site";

const seoTitle = "Outsourced Accounting & Finance Support Staff | Staffing Wise";
const seoDescription =
  "Dedicated finance support staff for bookkeeping support, invoice processing, reconciliations and routine finance administration, tailored to your business.";

export const metadata: Metadata = buildMetadata({ title: seoTitle, description: seoDescription, path: services.finance.path, image: images.financeCalculator });

export default function AccountingFinanceSupportPage() {
  return (
    <SupportServicePage
      service={services.finance}
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      heading="Dedicated Support for Your Finance Team"
      intro="Staffing Wise helps businesses increase finance-administration capacity with dedicated personnel who work exclusively for their team. We’ll discuss the tasks, systems and experience required, then recruit and prepare a suitable staff member to support your existing processes."
      heroImage={images.financeCalculator}
      tasksImage={images.bookkeeping}
      tasksTitle="Finance administration your team can delegate"
      tasksLead="Depending on the role and the person’s training, tasks may include:"
      tasks={[
        "Invoice processing and data entry.",
        "Bookkeeping and routine accounts administration.",
        "Reconciliation support.",
        "Maintaining finance records and spreadsheets.",
        "Preparing information for review by your in-house finance team or external accountant.",
        "Other appropriate, repeatable finance-administration tasks.",
      ]}
      note={
        <p>
          Responsibilities are agreed in advance, with appropriate review, access controls and supervision for financial information and systems. This service
          supports your finance team and accountant; it is not a substitute for qualified accounting or tax advice.
        </p>
      }
      ctaLabel="Discuss Your Finance Staffing Requirements"
      ctaQuery="finance"
      audience={["Freight forwarders", "Customs agents", "Hauliers", "Logistics companies", "Small and medium-sized businesses"]}
    />
  );
}
