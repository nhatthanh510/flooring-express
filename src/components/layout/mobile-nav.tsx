"use client";

import { useState } from "react";
import Link from "next/link";
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
import { navItems, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function MobileNav() {
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
        <SheetTitle className="sr-only">
          {siteConfig.name} navigation
        </SheetTitle>

        <nav
          aria-label="Mobile"
          className="mt-16 flex flex-col gap-6 text-center"
        >
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
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

          <SheetClose asChild>
            <Button asChild size="xl" className="mt-4 w-full font-display">
              <Link href="/contact">Free Quote</Link>
            </Button>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
