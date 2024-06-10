// components/MeetingProviderWrapper.js
import React from 'react';
import { MeetingProvider } from '@videosdk.live/react-sdk';
import MeetingView from './meetingView';


interface Props{
    meetingId:string,
    authToken:string,
    onMeetingLeave:()=>void,
    
}

const MeetingProviderWrapper:React.FC<Props> = ({ meetingId, authToken, onMeetingLeave}) => {
  return (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "Guddumalle",
        debugMode: false,
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  );
};

export default MeetingProviderWrapper;
