"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface iAppProps {
  data: {
    lawyerId?: number;
    clientId?: number;
    full_name: string;
    photo?: string;
  }[];
}

export default function ChatUserList({ data }: iAppProps) {
  const [totalComments, setTotalComments] = useState(data);
  const messageEndRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  const userId = session?.user?.id;
  const userEmail = session?.user?.email;
  //@ts-ignore
  const userType = session?.user?.image?.type;

  console.log(`this is toke: ${process.env.NEXT_PUBLIC_PUSHER_KEY}`);

  useEffect(() => {
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: "mt1",
    });

    var channel = pusher.subscribe("chat");
    channel.bind("hello", function (data: any) {
      const parsedComments = JSON.parse(data.message);

      setTotalComments((prev) => [...prev, parsedComments]);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const scrollTobottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollTobottom();
  }, [totalComments]);

  console.log(totalComments);

  return (
    <div className="p-6 pl-16  max-h-screen overflow-y-auto py-4 absolute top-0">
      <div> </div>
      <div className="mb-5 ">
        <h1 className="text-bold font-bold text-xl ">chat list</h1>
      </div>
      <div className="flex flex-col gap-4">
        {
          //@ts-ignore
          totalComments.reverse().map((user, index) => (
            <div key={index}>
              <Link href={`/chat2/${user.lawyerId || user.clientId}`}>
                <div className="flex items-center ">
                  {user?.photo ? (
                    <Image
                      src={user?.photo}
                      alt="Profile image of user"
                      className="w-12 h-12 object-cover rounded-lg mr-4 rounded-full"
                      width={50}
                      height={50}
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    <div className="mr-4 flex p-1 bg-[#7B3B99] cursor-pointer items-center justify-center h-[40px] w-[40px] rounded-full ">
                      <span className="text-xl text-white font-semibold capitalize ">
                        {user.full_name?.slice(0, 1)}
                      </span>
                    </div>
                  )}

                  <div className="rounded-lg bg-white p-4 shadow-md self-start">
                    {user.full_name}
                  </div>
                </div>
              </Link>
            </div>
          ))
        }
        <div ref={messageEndRef}></div>
      </div>
    </div>
  );
}
