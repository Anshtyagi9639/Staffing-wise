import Link from "next/link";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail (BreadcrumbList JSON-LD is built from the same trail on each page). */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...trail];
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap gap-1.5 text-[0.86rem] text-on-dark">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden className="opacity-50">
                  /
                </span>
              )}
              {last ? (
                <span aria-current="page" className="text-white">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="underline-offset-4 transition-colors hover:text-sun hover:underline">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
