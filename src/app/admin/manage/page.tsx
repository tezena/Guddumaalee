'use client';
import React, { useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getNewLawyers } from "../api/lawyers";
import { Icon } from "@iconify/react";
import { useNotifications } from "@/app/context/NotificationContext";
import { LoadingComponent, ErrorComponent } from '@/components/LoadingErrorComponents';
import Image from "next/image";

export function Manage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['lawyers'],
    queryFn: getNewLawyers,
    refetchInterval: 6000, // Refetch every 2 minutes
  });

  const { setLawyerNotifications } = useNotifications();

  useEffect(() => {
    if (data) {
      console.log('length',data?.lawyers?.length);
      
      setLawyerNotifications(data?.lawyers?.length);
    }
  }, [data, setLawyerNotifications]);

  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );

  return (
    <div className="w-full font-sans min-h-screen pt-28 pl-6 lg:pl-72 bg-[#f2f6fa] text-black grid   gap-[2px] grid-cols-2 overflow-auto">
      {data?.lawyers?.map((lawyer: any) => (
        <Link
          href={{
            pathname: `/admin/manage/${lawyer.id}`,
          }}
          key={lawyer.id}
          className="w-[90%] lg:w-3/4 h-40"
        >
          <div className="w-full lg:w-full h-full bg-white border-2 border-gray-300 rounded-lg flex items-center justify-between p-10 transform transition duration-500 hover:scale-105 m-0">
            <div className="flex gap-5 items-center">
              <Image
                className="w-20 h-20 rounded-full"
                src={lawyer?.photo}
                alt="lawyer"
              />
              <h1>{lawyer.email}</h1>
            </div>
            <p>{lawyer.date}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Manage;