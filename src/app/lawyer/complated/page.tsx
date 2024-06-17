"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import {
  QueryClient,
  useMutation,
  useQuery,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getLawyerCaeses } from "../api/offer";

function Complated() {
  const { data: session } = useSession();

  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["lawyercases"],

    // @ts-ignore
    queryFn: () => getLawyerCaeses(session?.user?.image?.id),
  });


  const complatedCases = data?.filter(
    (clientcase: any) => clientcase.status === "DELIVERED"
  );
 
  return (
    <div className="w-full font-sans min-h-screen pt-8 pl-10 lg:pl-60 bg-gray-100 flex flex-col gap-2">
      <div className="w-4/5 mx-auto mb-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Summary</h2>
        <p className="text-gray-600">Total Cases: {complatedCases?.length}</p>
       
      </div>

      {complatedCases?.map((onecase: any, index: any) => (
        <Link
          href={{
            pathname: `/lawyer/cases/${onecase.id}`,
          }}
          key={index}
        >
          <div className="w-4/5 bg-white rounded-lg shadow-md border-2 p-8 m-auto mb-4 transition-transform transform hover:scale-105">
            <div className="flex justify-between">
              <div className="flex items-center gap-4 w-1/3">
                <p className="text-lg text-gray-700 font-semibold">Case</p>
                <p className="text-gray-800">{onecase.title}</p>
              </div>

              <div className="flex items-center gap-4 w-1/3">
                <p className="text-lg text-gray-700 font-semibold">Client_id</p>
                <p className="text-gray-800">{onecase.client_id}</p>
              </div>

              <div className="flex items-center  gap-4 w-1/3">
                <p className="text-lg text-gray-700 font-semibold">Date</p>
                <p className="text-gray-800">{new Date( onecase.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-lg text-gray-700 font-semibold">Summary</p>
              <p className="text-gray-800">{onecase.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Complated;

// const cases = [
//   {
//     id: 1,
//     case: "family",
//     client: "chubaw",
//     date: "13/04/2024",
//     summary: "This is a family case involving custody issues.",
//   },
//   {
//     id: 2,
//     case: "family",
//     client: "chubaw",
//     date: "13/04/2024",
//     summary: "This is a family case involving divorce settlements.",
//   },
//   {
//     id: 3,
//     case: "family",
//     client: "chubaw",
//     date: "13/04/2024",
//     summary: "This is a family case regarding property division.",
//   },
//   {
//     id: 4,
//     case: "family",
//     client: "chubaw",
//     date: "13/04/2024",
//     summary: "This is a family case related to alimony.",
//   },
//   {
//     id: 5,
//     case: "family",
//     client: "chubaw",
//     date: "13/04/2024",
//     summary: "This is a family case concerning child support.",
//   },
//   {
//     id: 6,
//     case: "family",
//     client: "chubaw",
//     date: "13/04/2024",
//     summary: "This is a family case about adoption procedures.",
//   },
//   {
//     id: 7,
//     case: "family",
//     client: "chubaw",
//     date: "13/04/2024",
//     summary: "This is a family case involving guardianship.",
//   },
// ];4
