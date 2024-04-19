"use client"
import React, { useEffect, useMemo, useRef, useState } from "react";
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
import {Camera,CameraOff,VideoOff,Video,Mic,MicOff} from "lucide-react"
 

export default function Controls() {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    return (
      <div className="flex flex-row min-w-96 rounded-lg py-2 px-4 mx-auto ">
        <button onClick={() => leave()}>Leave</button>
        <button onClick={() => toggleMic()}>toggleMic</button>
        <button onClick={() => toggleWebcam()}>toggleWebcam</button>
      </div>
    );
  }