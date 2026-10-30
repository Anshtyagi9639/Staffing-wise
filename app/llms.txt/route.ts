import { posts } from "@/lib/blog";
import { customsFaqs, generalFaqs } from "@/lib/content/faqs";
import { publicRoutes } from "@/lib/routes";
import { absoluteUrl, offices, services, site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt: a short, factual Markdown summary for AI assistants and search tools (llmstxt.org convention).
 * Built from the same verified data as the pages. It is a convenience, not a ranking or citation guarantee.
 */
export function GET() {
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Staffing Wise manages recruitment, initial training, employment, working infrastructure (where agreed) and ongoing support. Each staff member works exclusively for one client. Customs-clearance staffing is the specialist service; accounting & finance support and administration & business support use the same dedicated model.",
    "",
    `- Markets served: ${site.markets.join(" and ")} (open to suitable international opportunities)`,
    `- Audience: ${site.audience.join(", ")}`,
    `- Phone: ${site.phone.international}`,
    `- Email: ${site.email}`,
    `- Offices: ${offices.map((o) => o.lines.join(", ")).join("; ")}`,
    "",
    "## Services",
    "",
    ...Object.values(services).map((s) => `- [${s.name}](${absoluteUrl(s.path)}): ${s.summary}`),
    "",
    "## Pages",
    "",
    ...publicRoutes.map((r) => `- [${r.title}](${absoluteUrl(r.path)}): ${r.summary}`),
    "",
    "## Articles",
    "",
    ...posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.summary[0]}`),
    "",
    "## Frequently asked questions",
    "",
    ...[...generalFaqs, ...customsFaqs].map((f) => `- **${f.question}** ${f.answer}`),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
