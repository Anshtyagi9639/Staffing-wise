"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { mainNav, primaryCta, site, type NavItem } from "@/lib/site";
import { cn } from "@/lib/utils/cn";

function isActive(item: NavItem, pathname: string) {
  if (item.kind === "menu") return item.items.some((l) => pathname === l.href);
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-area="header"
      className={cn("sticky top-0 z-50 bg-navy-900 transition-shadow duration-200", scrolled && "shadow-[0_6px_24px_-12px_rgb(4_26_33/0.6)]")}
    >
      <div className="container-site flex h-[var(--nav-h)] items-center gap-4 xl:gap-6">
        <Logo priority className="w-[92px] sm:w-[108px]" />

        <NavigationMenu.Root aria-label="Main" className="relative ml-auto hidden lg:block" delayDuration={80}>
          <NavigationMenu.List className="flex items-center gap-0.5">
            {mainNav.map((item) => {
              const active = isActive(item, pathname);
              const topClass = cn(
                "flex items-center gap-1.5 rounded px-2.5 py-2.5 text-[0.95rem] font-semibold whitespace-nowrap text-white transition-colors hover:text-sun data-[state=open]:text-sun xl:px-3",
                active && "text-sun shadow-[inset_0_-2px_0_var(--color-ember)]",
              );
              if (item.kind === "link") {
                return (
                  <NavigationMenu.Item key={item.href}>
                    <NavigationMenu.Link asChild active={active}>
                      <Link href={item.href} className={topClass} aria-current={active ? "page" : undefined}>
                        {item.label}
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                );
              }
              return (
                <NavigationMenu.Item key={item.label} className="relative">
                  <NavigationMenu.Trigger className={cn(topClass, "group")}>
                    {item.label}
                    <ChevronDown aria-hidden className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute top-[calc(100%+0.6rem)] left-0 w-[23rem] rounded-brand border border-line bg-white p-2 shadow-card data-[state=open]:animate-menu-in">
                    <ul>
                      {item.items.map((l) => (
                        <li key={l.href}>
                          <NavigationMenu.Link asChild active={pathname === l.href}>
                            <Link
                              href={l.href}
                              className="block rounded-[6px] px-3.5 py-3 transition-colors hover:bg-mist focus-visible:bg-mist"
                              aria-current={pathname === l.href ? "page" : undefined}
                            >
                              <span className="block font-semibold text-navy-900">{l.label}</span>
                              {l.description ? <span className="mt-0.5 block text-[0.88rem] leading-snug text-ink-soft">{l.description}</span> : null}
                            </Link>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              );
            })}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Click-to-call: icon only (no number shown). Opens the device's calling app with the verified number in lib/site.ts. */}
        <div className="group relative ml-auto shrink-0 lg:ml-0">
          <a
            href={site.phone.href}
            aria-label="Call Staffing Wise"
            data-area="header"
            className="grid size-12 place-items-center rounded-full border-2 border-transparent text-sun transition-colors hover:border-white/25 hover:bg-white/10 focus-visible:border-sun"
          >
            <Phone aria-hidden className="size-5" />
          </a>
          <span
            aria-hidden
            className="pointer-events-none absolute top-[calc(100%+0.4rem)] left-1/2 hidden -translate-x-1/2 rounded-[6px] bg-white px-2.5 py-1.5 text-[0.8rem] font-semibold whitespace-nowrap text-navy-900 opacity-0 shadow-card transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100 lg:block"
          >
            Call Staffing Wise
          </span>
        </div>
        <Button asChild size="sm" className="hidden shrink-0 lg:inline-flex">
          <Link href={primaryCta.href} data-cta="header">
            <span className="xl:hidden">Enquire Now</span>
            <span className="hidden xl:inline">{primaryCta.label}</span>
          </Link>
        </Button>

        <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <Dialog.Trigger asChild>
            <button type="button" className="grid size-12 place-items-center rounded text-white lg:hidden" aria-label="Open menu">
              <Menu aria-hidden className="size-6.5" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Content
              aria-describedby={undefined}
              className="fixed inset-0 z-[60] overflow-y-auto bg-navy-900 pb-[calc(1.75rem+env(safe-area-inset-bottom))] data-[state=open]:animate-menu-in lg:hidden"
            >
              <Dialog.Title className="sr-only">Site menu</Dialog.Title>
              <div className="sticky top-0 z-10 bg-navy-900">
                <div className="container-site flex h-[var(--nav-h)] items-center">
                  <div onClickCapture={() => setMobileOpen(false)}>
                    <Logo className="w-[92px] sm:w-[108px]" />
                  </div>
                  <Dialog.Close asChild>
                    <button type="button" className="ml-auto grid size-12 place-items-center rounded text-white" aria-label="Close menu">
                      <X aria-hidden className="size-6.5" />
                    </button>
                  </Dialog.Close>
                </div>
              </div>
              <nav aria-label="Mobile" className="container-site pt-2">
                <ul>
                  <li>
                    <MobileLink href="/" active={pathname === "/"} onNavigate={() => setMobileOpen(false)}>
                      Home
                    </MobileLink>
                  </li>
                  {mainNav.map((item) =>
                    item.kind === "link" ? (
                      <li key={item.href}>
                        <MobileLink href={item.href} active={isActive(item, pathname)} onNavigate={() => setMobileOpen(false)}>
                          {item.label}
                        </MobileLink>
                      </li>
                    ) : (
                      <li key={item.label}>
                        <p className="mt-1 border-t border-white/10 pt-3.5 pb-1 font-display text-[1.35rem] text-white">{item.label}</p>
                        <ul aria-label={item.label} className="pb-2">
                          {item.items.map((l) => (
                            <li key={l.href}>
                              <MobileLink href={l.href} active={pathname === l.href} sub onNavigate={() => setMobileOpen(false)}>
                                {l.label}
                              </MobileLink>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ),
                  )}
                  <li>
                    <MobileLink href="/contact-us" active={pathname === "/contact-us"} onNavigate={() => setMobileOpen(false)}>
                      Contact Us
                    </MobileLink>
                  </li>
                </ul>
                <div className="mt-6 grid gap-3">
                  <Button asChild variant="ghost" className="w-full">
                    <a href={site.phone.href}>
                      <Phone aria-hidden /> Call Staffing Wise
                    </a>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href={primaryCta.href} data-cta="mobile-menu" onClick={() => setMobileOpen(false)}>
                      {primaryCta.label}
                    </Link>
                  </Button>
                </div>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}

function MobileLink({
  href,
  active,
  sub,
  onNavigate,
  children,
}: {
  href: string;
  active: boolean;
  sub?: boolean;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "block",
        sub
          ? "py-2.5 pl-4 text-[1rem] text-on-dark hover:text-sun"
          : "mt-1 border-t border-white/10 pt-3.5 pb-2 font-display text-[1.35rem] text-white hover:text-sun",
        active && "text-sun",
      )}
    >
      {children}
    </Link>
  );
}
