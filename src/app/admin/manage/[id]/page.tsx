"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { verifyLawyer, getLawyerById, rejectLawyer } from "../../api/lawyers";
import { useRouter } from "next/navigation";
import {
  LoadingComponent,
  ErrorComponent,
} from "@/components/LoadingErrorComponents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Detail() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const param = useParams();
  const { id } = param;
  const { data, isLoading, error } = useQuery({
    queryKey: ["lawyer"],
    queryFn: () => getLawyerById(id),
  });

  const VerifyMutationFn = async () => {
    return verifyLawyer(id);
  };

  const rejectMutationFn = async () => {
    return rejectLawyer(id);
  };
  const VerifyMutation: UseMutationResult<void, unknown> = useMutation({
    mutationFn: VerifyMutationFn,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["lawyers"] });
      console.log("lawyer acceptd.", data);
      toast.success("Lawyer Accepted successfully!");

      setTimeout(() => {
        router.back();
      }, 12000);
    },
    onError: () => {
      toast.error("Failed to accept the lawyer.");
    },
  });

  const rejectMutation: UseMutationResult<void, unknown> = useMutation({
    mutationFn: rejectMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lawyers"] });
      toast.success("Lawyer rejected successfully!");

      setTimeout(() => {
        router.back();
      }, 12000);
    },
    onError: () => {
      toast.error("Failed to reject the lawyer.");
    },
  });

  const handleVeryfy = async () => {
    await VerifyMutation.mutateAsync(id);
  };

  const handleReject = async () => {
    await rejectMutation.mutateAsync(id);
  };

  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );

  return (
    <div className="min-h-screen bg-[#f2f6fa] text-black flex items-center justify-center font-sans pt-24 px-10">
      <div className="w-full max-w-4xl p-8 pt-16 bg-white border border-gray-300 rounded-xl shadow-md relative">
        <Link
          href="/admin/manage"
          className="absolute left-2 top-3 cursor-pointer"
        >
          <Icon
            icon="tdesign:arrow-left"
            style={{ color: "black" }}
            width={30}
            height={27}
          />
        </Link>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Name: </h1>
            <p className="text-gray-700">{data?.email}</p>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Profile Image:</h1>
            <a
              className="text-blue-500 hover:underline"
              href={data?.resume}
              target="_blank"
            >
              {data?.resume}
            </a>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Working Language:</h1>
            <p className="text-gray-700">Amharic, Tigray, Oromifa</p>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Working Area:</h1>
            <p className="text-gray-700">Suprim Court, High Court</p>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Lawyer Document:</h1>
            <a
              className="text-blue-500 hover:underline"
              href={data?.qualification}
              target="_blank"
            >
              {data?.qualification}
            </a>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Kebele ID:</h1>
            <a
              className="text-blue-500 hover:underline"
              href={data?.identification_card}
              target="_blank"
            >
              {data?.identification_card}
            </a>
          </div>
          <hr className="border-gray-300" />
        </div>
        <div className="flex items-center justify-between p-4 mt-4 ">
          <button
            className="px-6 py-2  rounded-2xl outline outline-[#c156f3] text-[#61207f]"
            onClick={handleReject}
          >
            REJECT
          </button>
          <button
            className="px-6 py-2  rounded-2xl outline bg-[#5e207b] text-white"
            onClick={handleVeryfy}
          >
            ACCEPT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
