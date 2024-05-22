import { siteConfig } from "@/config/site";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import Logout from "./Logout";
import { MobileNav } from "./moblie-nav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MainNav } from "./main-nav";
import { ModeToggle } from "../theme/ThemeToggle";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
export async function SiteHeader() {
  const session: any = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} session={session} />
        {/* <MobileNav mainNavItems={siteConfig.mainNav} session={session} /> */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            {session?.user ? (
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex p-3 bg-green-500 cursor-pointer items-center justify-center h-[40px] w-[40px] rounded-full">
                      {session.user.email.slice(0, 1)}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[250px]">
                    <div className="flex flex-col gap-3">
                      <p className="text-center text-muted-foreground">
                        {" "}
                        {session.user.email}
                      </p>
                      <Logout />
                    </div>
                  </PopoverContent>
                </Popover>

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
          </nav>
        </div>
      </div>
    </header>
  );
}
