import {
    Cloud,
    CreditCard,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { useSession } from "next-auth/react"
  import { signOut } from "next-auth/react";
  import Link from "next/link";
  
  export function ProfileDropdown() {

    const {data:session}=useSession()
    const userType=session?.user?.image?.type

    const handleLogOut=() => {
        signOut({
          redirect: true,
          callbackUrl: "/",
        });
      }


    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <div className="flex p-1 bg-[#7B3B99] cursor-pointer items-center justify-center h-[40px] w-[40px] rounded-full ">
                      <span className="text-xl text-white font-semibold capitalize ">
                      {session?.user?.email?.slice(0, 1)}
                        </span> 
                    </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <Link href={userType == "client"? "":"/lawyer/updateProfile"}> Profile</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem >
            <LogOut className="mr-2 h-4 w-4" />
            <span onClick={handleLogOut}>Log out</span>
         
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}
  