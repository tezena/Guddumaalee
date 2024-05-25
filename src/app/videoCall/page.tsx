"use client";
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import { authToken, createMeeting } from "./api";
import "../globals.css";
import JoinScreen from "./components/joinScreen";

// Dynamically import MeetingProviderWrapper
const DynamicMeetingProviderWrapper = dynamic(() => import('./components/MeetingProviderWrapper'), { ssr: false });
const DynamicJoinScreen = dynamic(() => import('./components/joinScreen'), { ssr: false });

const VideoCall = () => {
  const [meetingId, setMeetingId] = useState<string | null>(null);

  // Getting the meeting id by calling the API we just wrote
  const getMeetingAndToken = async (id?: string) => {
    const meetingId = id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  // This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <div className="h-auto flex items-center justify-center px-2">
      <DynamicMeetingProviderWrapper meetingId={meetingId} authToken={authToken} onMeetingLeave={onMeetingLeave} />
    </div>
  ) : (
    <div className="px-2 h-full w-full min-h-screen flex justify-center">
      <DynamicJoinScreen getMeetingAndToken={getMeetingAndToken} />
    </div>
  );
};

export default VideoCall;
