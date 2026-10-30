import type { Metadata } from "next";
import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";
import { LegalPage } from "@/components/sections/legal-page";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";
import { hasAnalyticsTools, hasMarketingTools } from "@/lib/tracking-config";

const path = "/cookie-policy";
const seoTitle = "Cookie Policy | Staffing Wise";
const description = "Which cookies the Staffing Wise website uses, why, and how to change your cookie choices.";

export const metadata: Metadata = buildMetadata({ title: seoTitle, description, path });

export default function CookiePolicyPage() {
  return (
    <LegalPage path={path} title="Cookie Policy" seoTitle={seoTitle} description={description} updated="30 October 2026">
      <p>
        Cookies are small files stored by your browser. We use essential cookies to run this website. We only use analytics or marketing cookies if you agree to
        them, and you can change your choice at any time.
      </p>

      <h2>Essential</h2>
      <div role="region" aria-label="Essential cookies" tabIndex={0} className="my-4 overflow-x-auto rounded-brand border border-line">
        <table className="w-full min-w-[34rem] border-collapse text-[0.93rem]">
          <thead className="bg-navy-900 text-left text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Purpose</th>
              <th className="px-4 py-3">Duration</th>
            </tr>
          </thead>
          <tbody className="text-ink-soft">
            <tr className="border-t border-line">
              <td className="px-4 py-3 font-semibold text-ink">sw_consent</td>
              <td className="px-4 py-3">Remembers your cookie choices.</td>
              <td className="px-4 py-3">180 days</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        We also use your browser’s session storage (not a cookie) to remember, for the current tab only, the campaign link you arrived from, which is sent with an
        enquiry if you choose to submit one. It is deleted when you close the tab.
      </p>

      <h2>Analytics (only with your consent)</h2>
      <p>
        {hasAnalyticsTools
          ? "Google Analytics 4 sets cookies such as _ga and _ga_<ID> (up to 2 years) to count visits and understand how the website is used, including which pages lead to enquiries. Google Analytics is configured not to collect form contents or other personal details you type into the site."
          : "No analytics tools are active on this website at present. If we add them, they will only run with your consent and this policy will list them."}
      </p>

      <h2>Marketing (only with your consent)</h2>
      <p>
        {hasMarketingTools
          ? "We may use advertising measurement tools (such as Google Ads conversion tracking or the LinkedIn Insight Tag) to understand which campaigns lead to enquiries. These set cookies controlled by the advertising platform. [List the exact tools and cookies before launch.]"
          : "No marketing or advertising cookies are used on this website at present."}
      </p>

      <h2>Changing your choice</h2>
      <p>
        {hasAnalyticsTools || hasMarketingTools ? (
          <>
            You can change or withdraw consent at any time:{" "}
            <CookieSettingsButton label="open cookie settings" className="font-semibold text-navy-800 underline decoration-ember decoration-2 underline-offset-4" />. You
            can also delete cookies in your browser settings.
          </>
        ) : (
          "You can delete cookies at any time in your browser settings."
        )}
      </p>

      <h2>Contact</h2>
      <p>
        Questions about cookies: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
