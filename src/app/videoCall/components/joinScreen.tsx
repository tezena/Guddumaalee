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
     
        <Card className=" flex flex-row items-center  p-4 my-4 w-1/2 h-1/2 ">
        <div className="w-1/2 px-2 flex flex-col gap-y-5 ">
        <h1 className="text-3xl font-bold text-black ">Meeting</h1>
      <h5 className="text-lg font-semibold text-black/75">you can create or start meeting</h5>
      <Input type="text" placeholder="Enter meeting id to join" onChange={(e) => {
            setMeetingId(e.target.value);
          }}
          className=" shadow-md"
           />
        </div>
       
        <div className="w-1/2 px-2 flex flex-col gap-y-10 items-center"> 
        <Button onClick={()=>onClick()} className="w-3/4 ">Join</Button>
        <Button onClick={()=>onClick()} className="w-3/4">Create Meeting</Button>
    </div>
  </Card>
        
       
    );
  }
  