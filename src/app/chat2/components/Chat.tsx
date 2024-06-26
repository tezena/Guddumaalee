"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";
//@ts-ignore
import FileViewer from "react-file-viewer";
import FileDownloader from "./fileDownloader";
import { getClientCaseById } from "@/app/lawyer/api/offer";
import { useQuery } from "@tanstack/react-query";
import OfferDisplay from "@/app/lawyer/offer/offerDisplay";

interface iAppProps {
  data: {
    messageType: string;
    fileType: string;
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
  //@ts-ignore
  const userId = session?.user?.image?.id;
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

  const onError = (e: any) => {
    console.log(e, "error in file-viewer");
  };

  return (
    <div className="p-6 flex-grow h-[80vh] overflow-y-auto py-24">
      <div className="flex flex-col gap-4">
        {totalComments?.map(
          (message, index) =>
            message.message && (
              <div key={index}>
                {
                  //@ts-ignore
                  message.sender_email == userEmail ? (
                    <div className="flex items-center justify-end ">
                      {
                        // @ts-ignore
                        message.messageType === "text" ? (
                          <div className="ml-3 rounded-lg bg-white p-4 shadow-md self-start mr-4">
                            {message.message}
                          </div>
                        ) : //@ts-ignore

                        message.messageType === "offer" ? (
                          //@ts-ignore
                          <OfferDisplay
                            caseId={Number(message.message)}
                            userType={userType}
                          />
                        ) : (
                          <div className="flex flex-col">
                            <FileViewer
                              fileType={message.fileType}
                              filePath={message.message}
                              onError={onError}
                              style={{ width: "300px", height: "200px" }}
                              className="rounded-md"
                            />
                            {
                              //@ts-ignore
                              <FileDownloader fileUrl={message.message} />
                            }
                          </div>
                        )
                      }

                      {userType == "lawyer" ? (
                        <Image
                          src={message?.lawyer?.photo || ""}
                          alt="Profile image of user"
                          className="w-12 h-12 object-cover rounded-lg "
                          width={50}
                          height={50}
                        />
                      ) : (
                        <div className="flex p-1 bg-[#7B3B99] cursor-pointer items-center justify-center h-[40px] w-[40px] rounded-full ">
                          <span className="text-xl text-white font-semibold capitalize ">
                            {message.client?.full_name?.slice(0, 1)}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center  ">
                      {userType === "lawyer" ? (
                        <Image
                          src={message?.lawyer.photo}
                          alt="Profile image of user"
                          className="w-12 h-12 object-cover rounded-lg "
                          width={50}
                          height={50}
                        />
                      ) : (
                        <div className="mr-3 flex p-1 bg-[#7B3B99] cursor-pointer items-center justify-center h-[40px] w-[40px] rounded-full ">
                          <span className="text-xl text-white font-semibold capitalize ">
                            {message.client?.full_name?.slice(0, 1)}
                          </span>
                        </div>
                      )}
                      {
                        //@ts-ignore
                        message.messageType == "text" ? (
                          <div className="rounded-lg bg-white p-4 shadow-md self-start mr-4">
                            {message.message}
                          </div>
                        ) : message.messageType === "offer" ? (
                          //@ts-ignore
                          <OfferDisplay
                            caseId={Number(message.message)}
                            userType={userType}
                          />
                        ) : (
                          <div className="flex flex-col">
                            <FileViewer
                              fileType={message.fileType}
                              filePath={message.message}
                              onError={onError}
                              style={{ width: "300px", height: "200px" }}
                              className="rounded-md"
                            />
                            {
                              //@ts-ignore
                              <FileDownloader fileUrl={message.message} />
                            }
                          </div>
                        )
                      }
                    </div>
                  )
                }
              </div>
            )
        )}
        <div ref={messageEndRef}></div>
      </div>
    </div>
  );
}
