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
    console.log("handle clicked")
    console.log(privateKey)
    console.log(session?.user)
    
    await axios
      .post(
        "https://api.chatengine.io/users/",
        {
          "username": "adam_la_morre",
          "first_name": "Adam",
          "last_name": "La Morre",
          "secret": "pass1234",
          "custom_json": {"high_score": 2000}
      },
        { headers: { "PRIVATE-KEY": `fd952a71-8ae3-4a5b-a090-d59b25f7e04a` } }
      )
      .then((res) => {
        console.log(res.data);

        router.push("/chat");
      })
      .catch((e) => {
        console.log(e);
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
            <span onClick={()=>HandleChat()}> Chat </span>
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
