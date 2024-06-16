"use client";
import { useParams, useRouter } from "next/navigation";
import { cases, Case } from "../mockData";
import React from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { accept, getCaesesById } from "@/app/lawyer/api/offer";

const CaseDetail: React.FC = () => {

  const queryClient = useQueryClient();

  const params = useParams();
  const router = useRouter();
  const { id } = params;


  const caseId = Number(id)
  const {data,isLoading,error} = useQuery({
       queryKey:['case'],
       queryFn:()=>getCaesesById(caseId)
  })

  const acceptMutation: UseMutationResult<void, unknown, number> = useMutation({
    mutationFn: (id: number) => accept(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
    },
  });

  const handleAccept = async (id: number) => {
    await acceptMutation.mutateAsync(id);
  };

  const caseItem: Case | undefined =
    cases.currentCase.id === Number(id)
      ? cases.currentCase
      : cases.recentCases.find((c) => c.id === Number(id));

  if (!caseItem) {
    return <p>Case not found</p>;
  }

  const handleDispute = () => {
    alert("Dispute action triggered for the current case.");
  };


  
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#7B3B99]">
          <span>Current case</span> caseItem.title
        </h1>

        <div className="block p-6 bg-white hover:bg-blue-50 relative">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.back()}
              className="mt-4 ml-4 px-4 py-2 bg-[#7B3B99] hover:bg-purple-700 text-white rounded "
            >
              Back
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={() => handleAccept(Number(id))}
                className="mt-4 ml-4 px-4 py-2 bg-[#7B3B99] hover:bg-purple-700 text-white rounded "
              >
                Accept
              </button>

              {/* {caseItem.id === cases.currentCase.id && ( */}
              <button
                onClick={() => router.push(`/client/case/${id}/dispute`)}
                className="mt-4 ml-4 px-4 py-2 bg-[#7B3B99] hover:bg-purple-700 text-white rounded "
              >
                Dispute
              </button>
              {/* )} */}
            </div>
          </div>

          <div className="flex items-center  gap-4 w-1/3 self-end absolute top-17 right-4">
            <p className="text-xl text-[#7B3B99] font-semibold">Date</p>
            <p className="text-gray-800">{data?.date}</p>
          </div>
          <div className="flex items-center gap-4 w-1/3">
            <p className="text-xl text-[#7B3B99] font-semibold">Case</p>
            <p className="text-gray-800">{data?.title}</p>
          </div>
          <div className="flex items-center gap-4 w-1/3">
            <p className="text-xl text-[#7B3B99] font-semibold">Lawyer</p>
            <p className="text-gray-800">{data?.lawyer_id}</p>
          </div>

          <div className="mt-6 flex gap-4 items-center">
            <p className="text-xl text-[#7B3B99] font-semibold">Status</p>
            <p className="text-gray-800">{data?.status}</p>
          </div>
          <div className="mt-6">
            <p className="text-xl text-[#7B3B99] font-semibold">Summary</p>
            <p className="text-gray-800">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
