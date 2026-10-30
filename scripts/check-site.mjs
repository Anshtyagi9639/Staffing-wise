#!/usr/bin/env node
/**
 * Smoke test for a running Staffing Wise site. No dependencies (Node 20+ fetch).
 *   npm run test:site -- --url http://localhost:3000
 *   npm run test:site -- --url https://www.staffingwise.ie
 * Checks: robots.txt, sitemap URLs (200, unique title/description, one H1, canonical, valid JSON-LD), legacy redirects,
 * a real 404, security headers and that private project files are not served. Exits 1 on any failure.
 */
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const base = arg("url", "http://localhost:3000").replace(/\/$/, "");
const failures = [];
const warnings = [];
const ok = (cond, msg) => (cond ? console.log(`  ✓ ${msg}`) : (failures.push(msg), console.log(`  ✗ ${msg}`)));
const get = (path, init) => fetch(`${base}${path}`, { redirect: "manual", ...init });

console.log(`Checking ${base}\n\nrobots.txt and sitemap`);
const robots = await (await get("/robots.txt")).text();
const production = /Allow: \//.test(robots) && !/Disallow: \/\s*$/m.test(robots);
console.log(`  · robots mode: ${production ? "production (indexable)" : "non-production (Disallow all)"}`);
if (production) ok(/Sitemap: https?:\/\//.test(robots), "robots.txt references the sitemap");

const sitemap = await (await get("/sitemap.xml")).text();
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
ok(locs.length > 0, `sitemap lists ${locs.length} URLs`);

console.log("\nPages");
const titles = new Map();
const descriptions = new Map();
for (const loc of locs) {
  const path = new URL(loc).pathname;
  const res = await get(path);
  const html = await res.text();
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  let jsonLdOk = true;
  for (const [, block] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(block);
    } catch {
      jsonLdOk = false;
    }
  }
  const problems = [];
  if (res.status !== 200) problems.push(`status ${res.status}`);
  if (!title) problems.push("no title");
  if (!description) problems.push("no description");
  if (h1s !== 1) problems.push(`${h1s} H1s`);
  if (canonical.replace(/\/$/, "") !== loc.replace(/\/$/, "")) problems.push(`canonical ${canonical} ≠ ${loc}`);
  if (!jsonLdOk) problems.push("invalid JSON-LD");
  if (description.length > 165) warnings.push(`${path}: description ${description.length} chars`);
  titles.set(title, [...(titles.get(title) ?? []), path]);
  descriptions.set(description, [...(descriptions.get(description) ?? []), path]);
  ok(problems.length === 0, `${path}${problems.length ? ` (${problems.join(", ")})` : ""}`);
}
ok([...titles.values()].every((v) => v.length === 1), "titles are unique");
ok([...descriptions.values()].every((v) => v.length === 1), "meta descriptions are unique");

console.log("\nRedirects and errors");
for (const [from, to] of [["/about", "/about-us"], ["/services", "/customs-clearance-staffing"], ["/contact", "/contact-us"], ["/post/why-we-chose-india", "/blog"]]) {
  const res = await get(from);
  const location = res.headers.get("location") ?? "";
  ok([301, 308].includes(res.status) && new URL(location, base).pathname === to, `${from} → ${to} (${res.status})`);
}
ok((await get("/this-page-does-not-exist")).status === 404, "unknown URL returns 404");
ok((await get("/blog/this-article-does-not-exist")).status === 404, "unknown blog article returns 404");

console.log("\nNavigation");
const home = await (await get("/")).text();
ok(/href="\/blog"/.test(home), "header and footer link to /blog");
const callLink = home.match(/<a[^>]*aria-label="Call Staffing Wise"[^>]*>/)?.[0] ?? "";
ok(/href="tel:\+\d{8,15}"/.test(callLink), "navbar call icon is a tel: link labelled \"Call Staffing Wise\"");

console.log("\nPrivate files are not served");
for (const p of ["/.env", "/.env.local", "/.env.example", "/package.json", "/README.md", "/docs/client-questions.md", "/Staffing_Wise_Website_Content.docx", "/next.config.ts"]) {
  ok((await get(p)).status === 404, `${p} → 404`);
}

console.log("\nSecurity headers");
const headers = (await get("/")).headers;
for (const h of ["content-security-policy", "x-content-type-options", "x-frame-options", "referrer-policy", "permissions-policy"]) ok(headers.has(h), h);
ok(!headers.has("x-powered-by"), "no x-powered-by");
if (production) ok(headers.has("strict-transport-security"), "strict-transport-security (production)");
else ok(headers.get("x-robots-tag")?.includes("noindex"), "x-robots-tag: noindex (non-production)");

if (warnings.length) console.log(`\nWarnings:\n  ${warnings.join("\n  ")}`);
console.log(failures.length ? `\n${failures.length} check(s) failed.` : "\nAll checks passed.");
process.exit(failures.length ? 1 : 0);
