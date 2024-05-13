"use client"
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"


export default function JoinScreen({
    getMeetingAndToken,
  }: {
    getMeetingAndToken: (meeting?: string) => void;
  
  }) {
    const [meetingId, setMeetingId] = useState<string | undefined>();
    const onClick = async () => {
      getMeetingAndToken(meetingId);
  
    };
    return (
     
        <Card className=" flex md:flex-row flex-col md:items-center    p-4 my-4 w-1/2 h-1/2 min-h-96 mt-24  shadow-lg">
        <div className="md:w-1/2 w-full px-2 flex flex-col gap-y-5 md:pl-4 mx-auto">
        <h1 className="text-4xl font-bold text-black ">Meeting</h1>
      <h5 className="text-lg font-semibold text-black/75">you can create or start meeting</h5>
      <Input type="text" placeholder="Enter meeting id to join" onChange={(e) => {
            setMeetingId(e.target.value);
          }}
          className=" shadow-md"
           />
        </div>
       
        <div className="md:w-1/2 w-full px-2 flex flex-col md:gap-y-10 gap-y-5 items-center my-auto"> 
        <Button onClick={()=>onClick()} className="md:w-3/4 w-full shadow-xl bg-[#7B3B99] ">Join</Button>
        <Button onClick={()=>onClick()} className="md:w-3/4 w-full  shadow-xl bg-[#7B3B99]">Create Meeting</Button>
    </div>
  </Card>
        
       
    );
  }
  