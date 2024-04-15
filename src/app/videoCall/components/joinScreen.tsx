"use client"
import React, { useEffect, useMemo, useRef, useState } from "react";
import "../globals.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


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
     
        <Card className="h-screen flex items-center justify-center px-2">
    <CardHeader>
      <CardTitle>Meeting</CardTitle>
      <CardDescription>you can create or start meeting</CardDescription>
    </CardHeader>
    <CardContent>
    <input
          type="text"
          placeholder="Enter Meeting Id"
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
        />
    </CardContent>
    <CardFooter>
    <Button onClick={()=>onClick()}>Join</Button>
        {" or "}
        <Button onClick={()=>onClick()}>Create Meeting</Button>
    </CardFooter>
  </Card>
        
       
    );
  }
  