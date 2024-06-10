"use client"
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";




export default function ParticipantView({ participantId }: { participantId: string }) {
    const micRef = useRef<HTMLAudioElement | null>(null)
    // const micRef = useRef < HTMLAudioElement || null > (null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
      useParticipant(participantId);
  
    const videoStream = useMemo(() => {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);
        return mediaStream;
      }
    }, [webcamStream, webcamOn]);
  
    useEffect(() => {
      if (micRef.current) {
        if (micOn && micStream) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(micStream.track);
  
          micRef.current.srcObject = mediaStream;
          micRef.current
            .play()
            .catch((error) =>
              console.error("videoElem.current.play() failed", error)
            );
        } else {
          micRef.current.srcObject = null;
        }
      }
    }, [micStream, micOn]);
  
    return (
      <div key={participantId}>
        <p className="mt-6">
         <span className="text-xl font-semibold font-mono text-[#7B3B99]"> {displayName}</span> 
        </p>
        <audio ref={micRef} autoPlay muted={isLocal} />
        {webcamOn && (
          <ReactPlayer
            //
            playsinline // extremely crucial prop
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            //
            url={videoStream}
            //
            height={"95%"}
            width={"95%"}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
            
            style={{borderRadius:"40px"}}
         
          />
        )}
      </div>
    );
  }