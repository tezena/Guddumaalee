import { slugify } from "@/lib/utils";
import { navbarOptions } from "./navOptions";
import type { MainNavItem, NavItem } from "@/types";

export const siteConfig = {
  name: "",
  description: ".",
  mainNav: [
    ...navbarOptions.map((option) => ({
      title: option.title,
      subCategories: [
        ...option.subCategories.map((subCategory) => ({
          title: subCategory.title,
          href: `/${slugify(option.title)}/${slugify(subCategory.title)}`,
          description: subCategory.description,
        })),
      ],
    })),
  ] satisfies NavItem[],
};
