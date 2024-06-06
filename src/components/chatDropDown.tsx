import { MessageSquareText, Video } from "lucide-react";

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
import { MdOutlineLocalPostOffice } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";

export function ChatDropdown() {
  const { data: session } = useSession();
  const userType = session?.user?.image?.type;
  const privateKey =process.env.NEXT_PUBLIC_CHAT_KEY

  const router = useRouter();

  const HandleChat = async () => {
    
    await axios
      .put(
        "https://api.chatengine.io/users/",
        {
          username: session?.user?.email,
          secret: session?.user?.email,
        },
        { headers: { "PRIVATE-KEY": `${privateKey}` } }
      )
      .then((res) => {
        console.log(res.data);

        router.push("/chat");
      })
      .catch((e) => {
        console.log(e.message);
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
            <Link href="/videoCall">
              {" "}
              <span>Video Call </span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
