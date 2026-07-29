"use client";

import { useState } from "react";
import { Link } from "@/components/shared/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { SiteNavProps } from "@/components/layout/site-header";
import { cn } from "@/lib/utils";

export function MobileNav({ name, navItems, headerCta }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu />
        </Button>
      </SheetTrigger>

      {/* Full-screen overlay with centred links, per the mobile design. */}
      {/* The width overrides must carry the same `data-[side=right]:` prefix as
          shadcn's defaults, otherwise tailwind-merge treats them as a different
          group and `w-3/4` wins. */}
      <SheetContent
        side="right"
        className="border-0 bg-surface p-margin-mobile data-[side=right]:w-full data-[side=right]:sm:max-w-none"
      >
        <SheetTitle className="sr-only">{name} navigation</SheetTitle>

        <nav
          aria-label="Mobile"
          className="mt-16 flex flex-col gap-6 text-center"
        >
          {navItems.map((item) => {
            const href = item.href ?? "/";
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);
            return (
              <SheetClose asChild key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "font-display text-body-md text-primary transition-colors hover:text-secondary",
                    isActive && "font-semibold text-secondary",
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}

          {headerCta?.label && (
            <SheetClose asChild>
              <Button asChild size="xl" className="mt-4 w-full font-display">
                <Link href={headerCta.href ?? "/contact"}>
                  {headerCta.label}
                </Link>
              </Button>
            </SheetClose>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
