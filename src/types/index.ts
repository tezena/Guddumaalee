export interface NavItem {
  title: string;
  href?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  subCategories: NavItem[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  subCategories?: NavItem[];
}

export type MainNavItem = NavItemWithOptionalChildren;
