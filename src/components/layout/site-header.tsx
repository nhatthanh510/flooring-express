"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { navItems, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-surface/90 backdrop-blur-sm">
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-headline-md font-bold tracking-tight text-primary"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
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
          <Button asChild size="lg" className="hidden sm:inline-flex">
            <Link href="/contact">Free Quote</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
