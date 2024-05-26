"use client";
import React from "react";
import Link from "next/link";

function Complated() {
  const cases = [
    { id: 1, case: "family", client: "chubaw", date: "13/04/2024" },
    { id: 2, case: "family", client: "chubaw", date: "13/04/2024" },
    { id: 3, case: "family", client: "chubaw", date: "13/04/2024" },
    { id: 4, case: "family", client: "chubaw", date: "13/04/2024" },
    { id: 5, case: "family", client: "chubaw", date: "13/04/2024" },
    { id: 6, case: "family", client: "chubaw", date: "13/04/2024" },
    { id: 7, case: "family", client: "chubaw", date: "13/04/2024" },
  ];
  return (
    <div className="w-full font-sans min-h-screen pt-8 pl-10 lg:pl-60 bg-white relative flex flex-col gap-4">
      {cases.map((onecase: any, index: any) => (
         <Link
         href={{
           pathname: `/lawyer/cases/${onecase.id}`,
          
         }}
         key={index}
       >

        <div
        
          className="w-4/5 h-40 bg-white rounded-lg shadow-md border-2 p-8 flex  justify-between m-auto"
        >
          <div className="flex flex-col gap-8">
            <p className="text-lg text-gray-700 font-semibold">Case</p>
            <p>{onecase.case}</p>
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-lg text-gray-700 font-semibold">Client</p>
            <p>{onecase.client}</p>
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-lg text-gray-700 font-semibold">Date</p>
            <p>{onecase.date}</p>
          </div>
        </div>

       </Link>
      ))}
    </div>
  );
}

export default Complated;
