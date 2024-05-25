"use client"
import React, { useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Camera,CameraOff,VideoOff,Video,Mic,MicOff,Phone} from "lucide-react"
 

export default function Controls() {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    const [micOn,setMic]=useState(true)
    const [camOn,setCam]=useState(true)

    const handleMicToggle = () => {
      setMic(!micOn);
      toggleMic();
    };
   
    const handleCamToggle = () => {
      setCam(!camOn);
      toggleWebcam();
    };
    return (
      <div className="flex flex-row min-w-96 rounded-lg py-2 px-4 mx-auto gap-x-5 justify-center ">
        <Phone className="text-white bg-red-600/85 rounded-full p-3 cursor-pointer hover:bg-slate-300/75"   size={"50"} onClick={() => leave()}/>
        <>
        {camOn?(<Video className="text-white bg-black/50 rounded-full p-2 cursor-pointer hover:bg-slate-300/75" size={"50"} onClick={handleCamToggle} />):
           (<VideoOff className="text-white bg-black/50 rounded-full p-2 cursor-pointer hover:bg-slate-300/75" size={"50"} onClick={handleCamToggle} />)}</>
       
       <>
       {
        micOn?<Mic className="text-white bg-black/50 rounded-full p-2 cursor-pointer hover:bg-slate-300/75" size={"50"} height={"50"} onClick={handleMicToggle}/>:
        <MicOff className="text-white bg-black/50 rounded-full p-2 cursor-pointer hover:bg-slate-300/75"  size={"50"} onClick={handleMicToggle}/>
       }
       </>
      </div>
    );
  }