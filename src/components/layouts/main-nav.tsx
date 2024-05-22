"use client";

import * as React from "react";
import Link from "next/link";
import type { MainNavItem } from "@/types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface MainNavProps {
  items?: MainNavItem[];
  session: any;
}

export function MainNav({ items, session }: MainNavProps) {
  return (
    <div className="gap-6  hidden lg:flex">
      <Link aria-label="Home" href="/" className="items-center space-x-2 flex">
        <span className="font-bold inline-block">
          GUDDUUMALEE{" "}
          {session?.user
            ? session.user.image.type == "lawyer"
              ? "- LAWYER"
              : "- CLIENT"
            : ""}
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="gap-3">
          {session?.user?.image?.type == "BUYER" && (
            <NavigationMenuItem>
              <Link href="/orders">Orders</Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
