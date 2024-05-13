"use client";
import React, {  useState } from "react";
import {
  useMeeting,
} from "@videosdk.live/react-sdk";
import Controls from "./controls";
import { Button } from "@/components/ui/button";
import {
  Card,
} from "@/components/ui/card";
import ParticipantView from "./participantView";
import Image from "next/image";
import image1 from "../../../../public/images/onlineMeeting1.png"
import { Loader } from "lucide-react";

export default function MeetingView({
  onMeetingLeave,
  meetingId,
}: {
  onMeetingLeave: () => void;
  meetingId: string;
}) {
  const [joined, setJoined] = useState<string>();
  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      onMeetingLeave();
    },
  });
  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="container w-full">
      {joined && joined == "JOINED" ? (
        <div className=" w-full relative  ">
               <div className="flex flex-row w-full ">
               {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          ))}
               </div>
              <div className="absolute bottom-10"> 
              <Controls />

                </div>
        </div>
      ) : (
        <Card className="flex flex-row    my-4 w-1/2 h-1/2 min-h-96 mt-24 shadow-xl mx-auto lg:w-3/4 ">
          <div className="w-1/2 hidden lg:flex">
            <Image
              src={image1}
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>

          <div className="lg:w-1/2 w-full mx-auto flex flex-col items-center justify-center px-2" >
            {joined && joined == "JOINING" ? (
              <div className="flex flex-col w-full ">
                <Loader className="w-1/2 h-1/2 mx-auto animate-spin "></Loader>
              

              <h3 className="mt-10 text-black mx-auto font-semibold">Joining the meeting...</h3>
               
              </div>
            ) : (
              <div className=" px-2 flex flex-col gap-y-5  lg:px-4 ">
                 <h1 className="text-4xl font-bold text-black ">Meeting Room</h1>
                 <h3 className="text-xl font-semibold text-[#7B3B99] ">Meeting Id: {meetingId}</h3>
      <h5 className=" text-sm font-semibold text-black/75 w-full">you have Created the meeting room. now you you can Enter to the room.</h5>
                
                <Button onClick={joinMeeting} className="w-full shadow-xl bg-[#7B3B99]" >Join</Button>{" "}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
