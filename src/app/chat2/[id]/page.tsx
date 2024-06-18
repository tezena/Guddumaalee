import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Form from "./../components/Form";
import ChatComponent from "./../components/Chat";
import { db } from "@/lib/db";
import { getServerAuthSession } from "@/server/auth";
import { Context } from "@/app/context/userContext";
import ChatUserList from "../components/chatUsersList";
import { getData, getUserList } from "../components/helpers";

//@ts-ignore

type ChatProps = {
  id: string;
};

// Add
export const dynamic = "force-dynamic";

export default async function Chathomepage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerAuthSession();
  const recipentId = Number(params.id);
  //@ts-ignore
  const data = await getData(recipentId);
  const userList = await getUserList();

  if (!session) {
    redirect("/signin");
  }

  console.log(`session is: ${session.user.email}`);

  return (
    <div className=" h-screen flex flex-row relative bg-gray-200">
      <div className="w-[25%] relative">
        <ChatUserList />
      </div>
      <div className="h-[50vh] bg-gray-200 flex flex-col w-[75%] relative">
        <ChatComponent data={data as any} />
        <Form recipent_id={recipentId} />
      </div>
    </div>
  );
}
