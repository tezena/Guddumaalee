"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChatUserList() {
  const { data, status } = useSession();
  const router = useRouter();

  const { data: chat, isLoading } = useQuery({
    queryKey: ["chat-list"],
    queryFn: async () => {
      const res = await axios.get("/api/chat/get-chat-list");
      return res.data.chatList;
    },
  });

  const chatList = chat ? chat : [];
  if (isLoading || status == "loading")
    return <Loader2 className="animate-spin" />;
  return (
    <div className="flex flex-col bg-white shadow-md items-start m-3 h-[85vh] overflow-scroll rounded-md">
      {chatList.map((chat: any, i: number) => (
        <div
          className="flex p-3 border-b w-full gap-3  cursor-pointer"
          key={i}
          onClick={() => {
            router.push(
              `/chat2/${
                //@ts-ignore
                data?.user.image.type == "client"
                  ? chat.lawyer.id
                  : chat.client.id
              }`
            );
          }}
        >
          <Image
            src={
              //@ts-ignore
              data?.user.image.type == "client"
                ? chat.lawyer.photo
                : chat.client.photo || "/banner1.jpg"
            }
            width={80}
            height={80}
            className="w-16 h-16 rounded-full object-cover shadow-md"
            alt="chat-picture"
          />
          <div className="flex flex-col items-start">
            <div className="text-lg font-semibold">
              {
                //@ts-ignore
                data?.user.image.type == "lawyer"
                  ? chat.client.full_name
                  : chat.lawyer.full_name
              }
            </div>
            <div className="text-gray-500 text-sm">{chat.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
