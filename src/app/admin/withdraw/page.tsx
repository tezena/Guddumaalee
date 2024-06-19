"use client";
import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { getwithdraw } from "@/app/lawyer/api/withdraw";
import { pay } from "../api/withdraw";
import {
  LoadingComponent,
  ErrorComponent,
} from "@/components/LoadingErrorComponents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WithdrawRequestsPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["withdraw"],
    queryFn: () => getwithdraw(),
  });

  const PayMutation: UseMutationResult<void, unknown, number> = useMutation({
    mutationFn: (id: number) => pay(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["withdraw"] });
      toast.success("Pay submited successfully!");
    },
    onError: () => {
      toast.error("Failed pay tray agin later.");
    },
  });

  const handlePay = async (id: number) => {
    await PayMutation.mutateAsync(id);
  };

  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );
  return (
    <div className="w-full font-sans min-h-screen pt-28 pl-10 lg:pl-72 bg-[#f2f6fa] text-black overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Withdraw Request History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Lawyer</th>
              <th className="py-2 px-4 border-b text-left">Amount</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Created At</th>
              <th className="py-2 px-4 border-b ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((request: any, index: any) => (
              <tr
                key={request.id}
                className={`border-t ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}
              >
                <td className="py-2 px-4 border-b">{request.id}</td>
                <td className="py-2 px-4 border-b">{request.lawyer.name}</td>
                <td className="py-2 px-4 border-b">
                  ${request.amount.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b">{request.status}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(request.created_at).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-black text-center">
                  <div className="flex gap-4 items-center justify-center ">
                    <button
                      className="rounded py-2 px-6 text-lg font-semibold outline-double outline-[#7B3B99]"
                      onClick={() => handlePay(1)}
                    >
                      Pay
                    </button>
                    <button
                      className="rounded py-2 px-6 text-lg font-semibold bg-[#7B3B99] text-white"
                      // onClick={() => handleResolve(dispute.id)}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawRequestsPage;
