"use client";

import { useState } from "react";
import { Link } from "@/components/shared/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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
      {/* Full-screen overlay with centred links, per the mobile design. */}
      {/* The width overrides must carry the same `data-[side=right]:` prefix as
          shadcn's defaults, otherwise tailwind-merge treats them as a different
          group and `w-3/4` wins. */}
      <SheetContent
        side="right"
        // The built-in close button is a small icon pinned to the corner. The
        // mockup pairs a larger X with the brand on one row, so it is replaced
        // rather than positioned around.
        showCloseButton={false}
        className="border-0 bg-surface p-margin-mobile data-[side=right]:w-full data-[side=right]:sm:max-w-none"
      >
        <div className="flex items-center justify-between">
          {/* The brand doubles as the way back to the home page — without it the
              menu is a dead end on mobile, since the header logo is behind the
              overlay. It is also the sheet's accessible title, which Radix
              requires; it used to be an sr-only string. */}
          <SheetTitle className="font-display text-headline-md font-bold tracking-tight text-primary">
            <SheetClose asChild>
              <Link href="/">{name}</Link>
            </SheetClose>
          </SheetTitle>

          <SheetClose asChild>
            <Button variant="ghost" size="icon-lg" aria-label="Close menu">
              <X className="size-7" />
            </Button>
          </SheetClose>
        </div>

        <nav aria-label="Mobile" className="mt-12 flex flex-col gap-8 text-center">
          {navItems.map((item) => {
            const href = item.href ?? "/";
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);
            return (
              <SheetClose asChild key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  // 16px semibold Montserrat, measured off the mockup. The
                  // markup there reads `font-headline-lg-mobile`, which is the
                  // *font-family* utility in Stitch's config — that config
                  // defines the same keys under both `fontFamily` and
                  // `fontSize`, and these links carry no size class at all, so
                  // they sit at the 16px base.
                  className={cn(
                    "font-display text-body-md font-semibold text-primary transition-colors hover:text-secondary",
                    isActive && "text-secondary",
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}

          {headerCta?.label && (
            <div className="mt-8 border-t border-border pt-8">
              <SheetClose asChild>
                {/* Also 16px in the mockup — `font-headline-md` there is the
                    family, not the 24px size. `py-5` is what makes it tall. */}
                <Button
                  asChild
                  size="xl"
                  className="h-auto w-full py-5 font-display"
                >
                  <Link href={headerCta.href ?? "/contact"}>
                    {headerCta.label}
                  </Link>
                </Button>
              </SheetClose>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
