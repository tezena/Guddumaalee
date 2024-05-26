import {
 
  MessageSquareText,
  
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { HandleChat } from "@/app/chat/handleChat";
import { MdOutlineLocalPostOffice } from "react-icons/md";

export function ChatDropdown() {
  const { data: session } = useSession();
  const userType = session?.user?.image?.type;

  const handleLogOut = () => {
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
        <MdOutlineLocalPostOffice className="w-12 h-10 text-gray-400 hover:text-[#7B3B99]" />
        </div>
       
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <MessageSquareText className="mr-2 h-4 w-4" />
            <span onClick={HandleChat}> Chat </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Video className="mr-2 h-4 w-4" />
            <Link href="/videoCall">  <span>Video Call </span></Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
