"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";

interface iAppProps {
  data: {
    clientId:number
    message: string;
    lawyerId:number
  }[];
}

export default function ChatComponent({ data }: iAppProps) {
  const [totalComments, setTotalComments] = useState(data);
  const messageEndRef = useRef<HTMLInputElement>(null);
  const {data:session}=useSession()

  const userId=session?.user?.id
  const userEmail=session?.user?.email

  console.log(`this is toke: ${process.env.NEXT_PUBLIC_PUSHER_KEY}`)

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

  console.log(totalComments)
  

  return (
    <div className="p-6 flex-grow max-h-screen overflow-y-auto py-32">
      <div className="flex flex-col gap-4">
        {totalComments.map((message, index) => (
          <div key={index}>
            {
              
             //@ts-ignore
             message.sender_email== userEmail ?
               
              <div className="flex items-center justify-end ">
              <div className="rounded-lg bg-white p-4 shadow-md self-start mr-4">
                {message.message}
              </div>
              <img
                src="https://img.freepik.com/free-photo/portrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710288000&semt=ais"
                alt="Profile image of user"
                className="w-12 h-12 object-cover rounded-lg "
                width={50}
                height={50}
              />
              
            </div> :  <div className="flex items-center  ">
             
              <img
                src="https://img.freepik.com/free-photo/portrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710288000&semt=ais"
                alt="Profile image of user"
                className="w-12 h-12 object-cover rounded-lg mr-4"
                width={50}
                height={50}
              />
               <div className="rounded-lg bg-white p-4 shadow-md self-start">
                {message.message}
              </div>
            </div>
            }
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
    </div>
  );
}
