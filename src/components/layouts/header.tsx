import { siteConfig } from "@/config/site";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import Logout from "./Logout";
import { MobileNav } from "./moblie-nav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MainNav } from "./main-nav";
import { ModeToggle } from "../theme/ThemeToggle";
export async function SiteHeader() {
  const session: any = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} session={session} />
        {/* <MobileNav mainNavItems={siteConfig.mainNav} session={session} /> */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {session?.user ? (
              <div className="flex gap-2">
                <Logout />
                {/* <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {session?.user?.email?.split("")[0]}
                  </AvatarFallback>
                </Avatar> */}
              </div>
            ) : (
              <Button asChild size="sm">
                <Link href="/signin">Sign in</Link>
              </Button>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
