'use client';
import React, { useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getNewLawyers } from "../api/lawyers";
import { Icon } from "@iconify/react";
import { useNotifications } from "@/app/context/NotificationContext";

export function Manage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["lawyers"],
    queryFn: getNewLawyers,
  });

  const { setLawyerNotifications } = useNotifications();

  useEffect(() => {
    if (data) {
      console.log('length',data?.lawyers?.length);
      
      setLawyerNotifications(data?.lawyers?.length);
    }
  }, [data, setLawyerNotifications]);

  if (isLoading)
    return (
      <div className="w-full font-sans min-h-screen pt-24 pl-10 lg:pl-72 bg-[#f2f6fa]">
        <div className="w-full h-full pt-28 flex gap-5 items-center justify-center m-auto">
          <Icon icon="eos-icons:loading" width="80" height="80" color="green" />
          <p className="text-2xl text-green-500">...Loading</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="w-full font-sans min-h-screen pt-24 pl-10 lg:pl-72 bg-[#f2f6fa] text-red-500 text-2xl align-middle">
        Error loading data
      </div>
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
              <img
                className="w-20 h-20 rounded-full"
                src={lawyer.identification_card}
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












// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { useQuery } from '@tanstack/react-query';
// import { getNewLawyers } from '../api/lawyers';
// import { Icon } from '@iconify/react';

// export function Manage() {
//   const { data, error, isLoading } = useQuery({
//     queryKey: ['lawyers'],
//     queryFn: getNewLawyers,
//   });

//   if (isLoading)
//     return (
//       <div className="w-full font-sans min-h-screen pt-24 pl-10 lg:pl-72 bg-[#f2f6fa]">
//         <div className="w-full h-full pt-28 flex gap-5 items-center justify-center m-auto">
//           <Icon icon="eos-icons:loading" width="80" height="80" color="green" />
//           <p className="text-2xl text-green-500">...Loading</p>
//         </div>
//       </div>
//     );
//   if (error)
//     return (
//       <div className="w-full font-sans min-h-screen pt-24 pl-10 lg:pl-72 bg-[#f2f6fa] text-red-500 text-2xl align-middle">
//         Error loading data
//       </div>
//     );

//   return (
//     <div className="w-full font-sans min-h-screen pt-28 pl-6 lg:pl-72 bg-[#f2f6fa] text-black grid grid-cols-2 gap-2 overflow-auto">
//       {data.lawyers.map((lawyer: any) => (
//         <Link
//           href={{
//             pathname: `/admin/manage/${lawyer.id}`,
//           }}
//           key={lawyer.id}
//         >
//           <div className="w-[90%] lg:w-3/4 h-30 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-between p-10 transform transition duration-500 hover:scale-105">
//             <div className="flex gap-5 items-center">
//               <img
//                 className="w-20 h-20 rounded-full"
//                 src={lawyer.identification_card}
//                 alt="lawyer"
//               />
//               <h1>{lawyer.email}</h1>
//             </div>
//             <p>{lawyer.date}</p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default Manage;












