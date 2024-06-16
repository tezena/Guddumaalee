"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ClientNotifications from "./_components/ClientNotifications";

function Notification() {
  const router = useRouter();
  return (
    <div className="p-6 bg-gray-200 h-screen relative overflow-hidden">
      <div className="bg-white w-[80%] overflow-y-scroll h-[80vh] items-center justify-center rounded-xl m-auto p-10 relative flex flex-col gap-8">
        <ClientNotifications />
      </div>
    </div>
  );
}

export default Notification;
