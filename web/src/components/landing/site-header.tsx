"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#services", label: "Flooring" },
  { href: "#work", label: "Our work" },
  { href: "#ranges", label: "Products" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="#top"
          className="flex items-baseline gap-2 font-semibold tracking-tight"
        >
          <span className="text-lg">{site.name}</span>
          <span
            aria-hidden
            className="hidden h-4 w-8 rounded-sm plank-band sm:inline-block"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-1.5 font-mono text-sm text-foreground transition-colors hover:text-primary"
          >
            <Phone className="size-4" aria-hidden />
            {site.phone}
          </a>
          <Button asChild className="h-10 px-4">
            <a href="#quote">Free quote</a>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/70 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav
          className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-4"
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-base text-foreground transition-colors hover:bg-muted"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 rounded-lg px-2 py-2.5 font-mono text-base text-foreground"
          >
            <Phone className="size-4" aria-hidden />
            {site.phone}
          </a>
          <Button asChild className="mt-2 h-11 w-full">
            <a href="#quote" onClick={() => setOpen(false)}>
              Get a free quote
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
