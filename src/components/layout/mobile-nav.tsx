"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
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

      <SheetContent side="right" className="w-full max-w-sm">
        <SheetHeader>
          <SheetTitle className="font-display text-headline-md font-bold text-primary">
            {siteConfig.name}
          </SheetTitle>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-3 font-display text-headline-md text-muted-foreground transition-colors hover:bg-muted hover:text-primary",
                    isActive && "bg-muted font-semibold text-primary",
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-4 border-t border-border p-4">
          <a
            href={siteConfig.contact.phoneHref}
            className="flex items-center gap-3 text-body-md text-muted-foreground transition-colors hover:text-primary"
          >
            <Phone className="size-4 text-secondary" />
            {siteConfig.contact.phone}
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-3 text-body-md text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail className="size-4 text-secondary" />
            {siteConfig.contact.email}
          </a>
          <SheetClose asChild>
            <Button asChild size="xl" className="w-full">
              <Link href="/contact">Request a Free Quote</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
