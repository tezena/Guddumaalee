'use client'
import React from "react";
import { useRouter } from "next/navigation";

function Notification() {
    const router = useRouter();
  return (
    <div className="p-6 bg-gray-200 min-h-screen relative overflow-hidden">
      <div className="bg-white h-[100vh] w-[80%] rounded-xl m-auto p-10 relative flex flex-col gap-8">
      <div
          onClick={() => router.back()}
          className="w-20 text-center bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 cursor-pointer"
        >
          Back
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold text-[#60287a]">
            Trial Notfications
          </h1>
          <div className="px-10">
            <p>No Trial notification for today</p>
          </div>
        </div>
        <hr/>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold text-[#60287a]">
            Payment Notifications
          </h1>
          <div className="px-10">
          <p>No payment notification for today</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
