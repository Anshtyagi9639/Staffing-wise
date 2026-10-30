import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/legal-page";
import { buildMetadata } from "@/lib/seo/metadata";
import { offices, site } from "@/lib/site";

const path = "/privacy-notice";
const seoTitle = "Privacy Notice | Staffing Wise";
const description = "How Staffing Wise collects and uses personal information submitted through this website, including enquiries, and your rights under GDPR.";

export const metadata: Metadata = buildMetadata({ title: seoTitle, description, path });

/*
 * DRAFT. Placeholders in [square brackets] must be completed with confirmed details and the whole notice approved by
 * the client's legal adviser before launch (docs/client-questions.md, "Legal and privacy").
 */
export default function PrivacyNoticePage() {
  return (
    <LegalPage path={path} title="Privacy Notice" seoTitle={seoTitle} description={description} updated="30 October 2026">
      <h2>Who we are</h2>
      <p>
        This website is operated by Staffing Wise ([legal entity name and company registration number to be confirmed]), {offices[0].lines.slice(0, 3).join(", ")},
        Ireland. For any question about this notice or your personal data, contact us at <a href={`mailto:${site.email}`}>{site.email}</a> or on{" "}
        <a href={site.phone.href}>{site.phone.display}</a>.
      </p>

      <h2>Information we collect through this website</h2>
      <ul>
        <li>
          <strong>Enquiries.</strong> When you submit the enquiry form we collect your name, company, work email address and, if you choose to provide them, your phone
          number and details about the role, number of staff, working hours and systems you use.
        </li>
        <li>
          <strong>Campaign source.</strong> If you arrived from a marketing link, the campaign labels in that link (such as utm_source) and the page you first landed on
          are sent with your enquiry so we can understand which channels bring enquiries.
        </li>
        <li>
          <strong>Technical data.</strong> Our hosting provider processes your IP address and browser information to deliver the website securely and to prevent abuse,
          such as repeated automated form submissions.
        </li>
        <li>
          <strong>Analytics and marketing cookies</strong>, only if you consent. See our <Link href="/cookie-policy">Cookie Policy</Link>.
        </li>
      </ul>

      <h2>How we use your information and our legal basis</h2>
      <ul>
        <li>To respond to your enquiry and discuss your staffing requirements: our legitimate interests in responding to business enquiries, and taking steps at your request before entering into a contract.</li>
        <li>To keep the website secure and prevent spam: our legitimate interests.</li>
        <li>To measure how the website and our campaigns perform: your consent, which you can withdraw at any time.</li>
      </ul>
      <p>We do not sell your personal data and we do not use it for automated decision-making.</p>

      <h2>Who we share it with</h2>
      <p>
        We use service providers to run this website and handle enquiries: [website hosting provider], [email delivery provider] and, if you consent to cookies,
        Google (analytics) [and advertising platforms, if used]. They process data on our instructions. Some providers may process data outside the European Economic
        Area; where they do, we rely on appropriate safeguards such as the European Commission’s standard contractual clauses or an adequacy decision.
      </p>

      <h2>How long we keep it</h2>
      <p>[Retention period for enquiries that do not lead to a business relationship, to be confirmed.]</p>

      <h2>Your rights</h2>
      <p>
        You have the right to access, correct or delete your personal data, to restrict or object to its use, to data portability and to withdraw consent at any time.
        To exercise these rights, email <a href={`mailto:${site.email}`}>{site.email}</a>. You can also complain to the Data Protection Commission in Ireland
        (dataprotection.ie) or, in the UK, the Information Commissioner’s Office (ico.org.uk).
      </p>

      <h2>Changes to this notice</h2>
      <p>We will update this page if the way we use personal data changes. The date at the top shows when it was last revised.</p>
    </LegalPage>
  );
}
