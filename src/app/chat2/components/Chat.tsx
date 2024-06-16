"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";

interface iAppProps {
  data: {
    clientId: number;
    message: string;
    lawyerId: number;
    lawyer: {
      photo: string;
    };
    client: {
      full_name: string;
    };
  }[];
}

export default function ChatComponent({ data }: iAppProps) {
  const [totalComments, setTotalComments] = useState(data);
  const messageEndRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  const userId = session?.user?.id;
  const userEmail = session?.user?.email;
  //@ts-ignore
  const userType = session?.user?.image?.type;
  console.log(`user type2 :${userType}`);

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

  return (
    <div className="p-6 flex-grow max-h-screen overflow-y-auto py-24">
      <div className="flex flex-col gap-4">
        {totalComments.map((message, index) => (
          <div key={index}>
            {
              //@ts-ignore
              message.sender_email == userEmail ? (
                <div className="flex items-center justify-end ">
                  <div className="rounded-lg bg-white p-4 shadow-md self-start mr-4">
                    {message.message}
                  </div>
                  {userType =="lawyer"? (
                    <img
                      src={message.lawyer.photo}
                      alt="Profile image of user"
                      className="w-12 h-12 object-cover rounded-lg "
                      width={50}
                      height={50}
                    />
                  ) : (
                    <div className="flex p-1 bg-[#7B3B99] cursor-pointer items-center justify-center h-[40px] w-[40px] rounded-full ">
                      <span className="text-xl text-white font-semibold capitalize ">
                        {message.client.full_name.slice(0, 1)}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center  ">
                  {userType ==="lawyer" ? (
                    <img
                      src={message.lawyer.photo}
                      alt="Profile image of user"
                      className="w-12 h-12 object-cover rounded-lg "
                      width={50}
                      height={50}
                    />
                  ) : (
                    <div className="flex p-1 bg-[#7B3B99] cursor-pointer items-center justify-center h-[40px] w-[40px] rounded-full ">
                      <span className="text-xl text-white font-semibold capitalize ">
                        {message.client.full_name.slice(0, 1)}
                      </span>
                    </div>
                  )}
                  <div className="rounded-lg bg-white p-4 shadow-md self-start">
                    {message.message}
                  </div>
                </div>
              )
            }
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
    </div>
  );
}
