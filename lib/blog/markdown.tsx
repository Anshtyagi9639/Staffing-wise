import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Renders the Markdown subset used by blog articles into React elements (no raw HTML, so article text cannot inject markup).
 * Supported: "## " / "### " headings (with stable ids for the contents list), paragraphs, "- " bullet lists,
 * "1. " numbered lists, "> " callouts, pipe tables (first row is the header), **bold** and [text](href) links.
 */

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\*\*/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

type Block =
  | { type: "h2" | "h3" | "p" | "callout"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export function parseBlocks(source: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of source.trim().split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    const first = lines[0];
    if (first.startsWith("### ")) blocks.push({ type: "h3", text: first.slice(4) });
    else if (first.startsWith("## ")) blocks.push({ type: "h2", text: first.slice(3) });
    else if (lines.every((l) => l.startsWith("- "))) blocks.push({ type: "ul", items: lines.map((l) => l.slice(2)) });
    else if (lines.every((l) => /^\d+\.\s/.test(l))) blocks.push({ type: "ol", items: lines.map((l) => l.replace(/^\d+\.\s/, "")) });
    else if (lines.every((l) => l.startsWith(">"))) blocks.push({ type: "callout", text: lines.map((l) => l.replace(/^>\s?/, "")).join(" ") });
    else if (lines.every((l) => l.startsWith("|"))) {
      const cells = (l: string) => l.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const [head, , ...rows] = lines;
      blocks.push({ type: "table", head: cells(head), rows: rows.map(cells) });
    } else blocks.push({ type: "p", text: lines.join(" ") });
  }
  return blocks;
}

/** H2 headings, for the "In this article" contents list. */
export function headings(source: string) {
  return parseBlocks(source)
    .filter((b): b is { type: "h2"; text: string } => b.type === "h2")
    .map((b) => ({ id: slugify(b.text), text: b.text.replace(/\*\*/g, "") }));
}

/** Plain text, for reading time. */
export function plainText(source: string) {
  return source
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\s*(?:[-|>#]+|\d+\.)\s*/gm, " ")
    .replace(/[*|]/g, " ");
}

function inline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) out.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${i++}`;
    if (match[1]) out.push(<strong key={key}>{match[1]}</strong>);
    else {
      const [, , label, href] = match;
      out.push(
        href.startsWith("/") ? (
          <Link key={key} href={href}>
            {label}
          </Link>
        ) : (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ),
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ source }: { source: string }) {
  return (
    <>
      {parseBlocks(source).map((b, i) => {
        const k = `b${i}`;
        switch (b.type) {
          case "h2":
            return (
              <h2 key={k} id={slugify(b.text)} className="scroll-mt-28">
                {inline(b.text, k)}
              </h2>
            );
          case "h3":
            return <h3 key={k}>{inline(b.text, k)}</h3>;
          case "ul":
            return (
              <ul key={k}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it, `${k}-${j}`)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={k}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it, `${k}-${j}`)}</li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <div key={k} className="callout">
                <p>{inline(b.text, k)}</p>
              </div>
            );
          case "table":
            return (
              <div key={k} className="mt-6">
                <p aria-hidden className="mb-1.5 text-[0.82rem] text-slate sm:hidden">Swipe sideways to see all columns</p>
                <div className="table-sw !mt-0" role="region" aria-label="Comparison table" tabIndex={0}>
                  <table>
                    <thead>
                      <tr>
                        {b.head.map((h, j) => (
                          <th key={j} scope="col">
                            {/* An empty corner cell above the row labels still needs a name for screen readers. */}
                            {h ? inline(h, `${k}-h${j}`) : <span className="sr-only">Compared aspect</span>}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((r, j) => (
                        <tr key={j}>
                          {r.map((c, m) =>
                            m === 0 ? (
                              <th key={m} scope="row">
                                {inline(c, `${k}-${j}-${m}`)}
                              </th>
                            ) : (
                              <td key={m}>{inline(c, `${k}-${j}-${m}`)}</td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          default:
            return <p key={k}>{inline(b.text, k)}</p>;
        }
      })}
    </>
  );
}
