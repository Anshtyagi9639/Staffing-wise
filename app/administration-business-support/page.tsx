import type { Metadata } from "next";
import Link from "next/link";
import { SupportServicePage } from "@/components/sections/support-service-page";
import { images } from "@/lib/content/images";
import { buildMetadata } from "@/lib/seo/metadata";
import { services } from "@/lib/site";

const seoTitle = "Outsourced Administration & Business Support Staff | Staffing Wise";
const seoDescription =
  "Dedicated administration and back-office support staff for your business. Staffing Wise manages recruitment, onboarding, employment and ongoing support.";

export const metadata: Metadata = buildMetadata({ title: seoTitle, description: seoDescription, path: services.admin.path, image: images.supportHeadset });

export default function AdministrationBusinessSupportPage() {
  return (
    <SupportServicePage
      service={services.admin}
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      heading="More Capacity for Your Day-to-Day Operations"
      intro="Give your team more time to focus on customers and core business activities. Staffing Wise provides dedicated personnel to support suitable administration and back-office tasks, with training and onboarding shaped around your systems and procedures."
      heroImage={images.supportHeadset}
      tasksImage={images.adminTyping}
      tasksTitle="Back-office support shaped around your systems"
      tasksLead="Depending on your requirements, support may include:"
      tasks={[
        "Data entry and record maintenance.",
        "Order processing and document administration.",
        "Customer-service and customer-support tasks.",
        "Inbox, scheduling and general administrative support.",
        "Updating spreadsheets, databases and internal systems.",
        "Other repeatable back-office tasks suited to the role.",
      ]}
      note={
        <p>
          Not limited to these examples. If the role you need is not listed,{" "}
          <Link href="/contact-us?service=other" className="link-inline">
            contact us to discuss it
          </Link>
          .
        </p>
      }
      ctaLabel="Tell Us What Support You Need"
      ctaQuery="admin"
      audience={["Freight forwarders", "Customs agents", "Hauliers", "Logistics companies", "Small and medium-sized businesses"]}
    />
  );
}
