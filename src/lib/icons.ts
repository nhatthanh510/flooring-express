import {
  BadgeCheck,
  Brush,
  Droplets,
  Gem,
  Hammer,
  History,
  Layers,
  Leaf,
  MapPin,
  Ruler,
  Search,
  TreePine,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * The one place a string maps to an icon component.
 *
 * Content is authored in a CMS, which cannot store a React component — so every
 * icon anywhere in the app is a string key resolved through this registry. The
 * keys double as the `list` options on the Sanity schema fields (see
 * `iconKeys` below), which is what stops an editor typing a name that renders
 * nothing.
 *
 * Keys are named for the *concept* from the Stitch mockups' Material Symbols,
 * not for the lucide component they happen to resolve to — `construction` and
 * `cleaning` read better to an editor picking from a dropdown than `hammer` and
 * `brush` would.
 */
export const iconRegistry = {
  "badge-check": BadgeCheck,
  cleaning: Brush,
  construction: Hammer,
  droplets: Droplets,
  gem: Gem,
  history: History,
  layers: Layers,
  leaf: Leaf,
  "map-pin": MapPin,
  ruler: Ruler,
  search: Search,
  "tree-pine": TreePine,
  users: Users,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;

/** Every valid key, for the Sanity schemas' `options.list`. */
export const iconKeys = Object.keys(iconRegistry) as IconName[];

export function isIconName(value: string): value is IconName {
  return value in iconRegistry;
}

/**
 * Falls back to `BadgeCheck` rather than throwing: a bad key should leave a
 * generic mark in the layout, not blank the page an editor is previewing.
 */
export function resolveIcon(name: string | null | undefined): LucideIcon {
  return name && isIconName(name) ? iconRegistry[name] : BadgeCheck;
}
