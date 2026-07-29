"use client";

import { Link } from "@/components/shared/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import type { SiteSettings } from "@/lib/site";
import { cn } from "@/lib/utils";

export type SiteNavProps = {
  name: string;
  navItems: NonNullable<SiteSettings["navItems"]>;
  /** The header button. From Site settings → Navigation, not hardcoded. */
  headerCta: SiteSettings["headerCta"];
};

export function SiteHeader({ name, navItems, headerCta }: SiteNavProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-surface/90 backdrop-blur-sm">
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-headline-md font-bold tracking-tight text-primary"
        >
          {name}
        </Link>

        {/* Nav and CTA sit together on the right, as in the mockup — not spread
            across the bar by justify-between. */}
        <div className="flex items-center gap-8">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => {
                const href = item.href ?? "/";
                const isActive =
                  pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "border-b-2 border-transparent pb-1 text-label-md text-muted-foreground transition-colors hover:text-primary",
                        isActive && "border-secondary font-bold text-primary",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {headerCta?.label && (
              // The mockup's header button is `px-6 py-2.5 rounded` — wider and
              // squarer than the shared `lg` size, which is tuned for in-page
              // buttons. Overridden here rather than adding a Button size that
              // only one element would ever use.
              <Button
                asChild
                size="lg"
                className="hidden h-10 rounded-sm px-6 text-label-md sm:inline-flex"
              >
                <Link href={headerCta.href ?? "/contact"}>
                  {headerCta.label}
                </Link>
              </Button>
            )}
            <MobileNav name={name} navItems={navItems} headerCta={headerCta} />
          </div>
        </div>
      </div>
    </header>
  );
}
