"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getLawyers } from "../api/lawyers";
import { Icon } from "@iconify/react";

async function fetchLawyers() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer ....",
    },
  };

  const response = await fetch("http://localhost:3000/api/lawyers", options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export function Manage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["lawyers"],
    queryFn: getLawyers,
  });

  if (isLoading) return <div className="w-full font-sans min-h-screen pt-24 pl-10 lg:pl-72 bg-[#f2f6fa]">
     <div
      
          className="w-full h-full pt-28 flex gap-5 items-center justify-center m-auto"
        >
          <Icon icon="eos-icons:loading" width="80" height="80" color="green" />
          <p className="text-2xl text-green-500">...Loading</p>
        </div>
  </div>;
  if (error) return <div className="w-full font-sans min-h-screen pt-24 pl-10 lg:pl-72 bg-[#f2f6fa] text-red-500 text-2xl align-middle">Error loading data</div>;

  return (
    <div className="w-full font-sans min-h-screen pt-28 pl-6 lg:pl-72 bg-[#f2f6fa] text-black grid grid-cols-2 gap-2 overflow-auto">
      {data.lawyers.map((lawyer: any) => (
        <Link
          href={{
            pathname: `/admin/manage/${lawyer.id}`,
            query: {
              resume: lawyer.resume,
              qualification: lawyer.qualification,
              identification_card: lawyer.identification_card,
              id: lawyer.id,
              email: lawyer.email,
              cv: lawyer.cv,
            },
          }}
          key={lawyer.id}
        >
          <div className="w-[90%] lg:w-3/4 h-30 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-between p-10 transform transition duration-500 hover:scale-105">
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

// "use client";
// import React from "react";
// import Link from "next/link";
// export function Manage() {
//   const lawyers = [
//     { id: 1, name: "kidus", date: "1/12/2012" },
//     { id: 2, name: "kidus", date: "1/12/2012" },
//     { id: 3, name: "kidus", date: "1/12/2012" },
//     { id: 4, name: "kidus", date: "1/12/2012" },
//     { id: 5, name: "kidus", date: "1/12/2012" },
//     { id: 6, name: "kidus", date: "1/12/2012" },
//     { id: 7, name: "kidus", date: "1/12/2012" },
//     { id: 8, name: "kidus", date: "1/12/2012" },
//   ];
//   return (
//     <div className="w-full  font-sans min-h-screen pt-28 pl-6 lg:pl-72 bg-[#f2f6fa] text-black grid grid-cols-2 gap-2 overflow-auto">
//       {lawyers.map((lawyer) => (
//         <Link href={`/admin/manage/${lawyer.id}`}   key={lawyer.id}>
//           <div
//             className=" w-[90%] lg:w-3/4 h-30 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-between p-10 transform transition duration-500 hover:scale-105  "

//           >
//             <div className="flex  gap-5 items-center">
//               <img
//                 className="w-20 h-20 rounded-full"
//                 src="https://img.freepik.com/free-photo/portrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710288000&semt=ais"
//                 alt="lawyer"
//               />

//               <h1>{lawyer.name}</h1>
//             </div>
//             <p>{lawyer.date}</p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }
// export default Manage;
