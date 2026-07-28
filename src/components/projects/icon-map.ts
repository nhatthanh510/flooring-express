import {
  BadgeCheck,
  Droplets,
  Gem,
  Layers,
  Leaf,
  Ruler,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Case-study data stores icons as strings so the content modules stay free of
 * component imports. This maps them to the lucide equivalents of the Material
 * Symbols used in the mockups.
 */
export const iconMap: Record<string, LucideIcon> = {
  droplets: Droplets,
  "badge-check": BadgeCheck,
  gem: Gem,
  users: Users,
  leaf: Leaf,
  search: Search,
  ruler: Ruler,
  layers: Layers,
};

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? BadgeCheck;
}
