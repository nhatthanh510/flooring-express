"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LinkPending } from "@/components/layout/link-pending";
import { MobileNav } from "@/components/layout/mobile-nav";
import type { SiteSettings } from "@/lib/site";
import { cn } from "@/lib/utils";

export type SiteNavProps = {
  name: string;
  navItems: NonNullable<SiteSettings["navItems"]>;
};

export function SiteHeader({ name, navItems }: SiteNavProps) {
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
                      <LinkPending />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="lg" className="hidden sm:inline-flex">
              <Link href="/contact">
                Free Quote
                <LinkPending />
              </Link>
            </Button>
            <MobileNav name={name} navItems={navItems} />
          </div>
        </div>
      </div>
    </header>
  );
}
