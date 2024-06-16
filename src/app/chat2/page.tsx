import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Form from "./components/Form";
import ChatComponent from "./components/Chat";
import { db } from "@/lib/db";
import { getServerAuthSession } from "@/server/auth";
import { Context } from "@/app/context/userContext";
import ChatUserList from "./components/chatUsersList";
import { getData, getUserList } from "./components/helpers";

type ChatProps = {
  id: string;
};

// Add
export const dynamic = "force-dynamic";

export default async function Chathomepage() {


  const session = await getServerAuthSession();
  const userList = await getUserList();

  if (!session) {
    redirect("/signin");
  }

  console.log(`session is: ${session.user.email}`);

  return (
    <div className=" h-screen flex flex-row relative">
      <div className="w-[25%] relative">
        <ChatUserList data={userList} />
      </div>
      <div className="h-screen bg-gray-200 flex justify-center w-[75%] relative items-center">
        <h1 className="font-bold text-3xl text-slate-500 ">Select user to chat </h1>
      </div>{" "}
    </div>
  );
}
