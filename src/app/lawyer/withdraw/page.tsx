"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  QueryClient,
  useMutation,
  useQuery,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { withdraw } from "../api/withdraw";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Withdraw() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const mutationFn = async (data: number) => {
    return withdraw(data);
  };

  const withdrawMutationFn = async (data: number) => {
    return withdraw(data);
  };

  const withdrawMutation: UseMutationResult<void, unknown, number> =
    useMutation({
      mutationFn: withdrawMutationFn,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cases"] });
        toast.success("Withdraw submitted successfully!");
      },
      onError:(e:any)=>{
        console.log(e?.response?.data?.error  );
        
        toast.error(`${e?.response?.data?.error}`);
      }
    });

  // const { mutateAsync }: UseMutationResult<void, unknown, number> = useMutation(
  //   {
  //     mutationFn,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["withdraw"] });
  //     },
  //     onError(e: any) {
  //       console.log(e.response.data.error);

  //       setMessage(e.response.data.error);
  //     },
  //   }
  // );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value) || 0); // parseFloat to convert to number, fallback to 0 if NaN
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isNaN(amount) || amount <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    try {
      await withdrawMutation.mutateAsync(amount);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen relative overflow-hidden">
      <div className="bg-white h-[100vh] w-[80%] rounded-xl m-auto p-10 relative flex flex-col gap-8">
      <div
          onClick={() => router.back()}
          className="w-20 text-center bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 cursor-pointer"
        >
          Back
        </div>

        <div className=" bg-white p-4 rounded w-1/3">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Amount</label>
              <input
                type="number"
                name="amount"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className=" w-22 text-center bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 cursor-pointer"
              >
                Withdraw
              </button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>

        {/* <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold text-[#60287a]">WithDraw history</h1>
          <div className="px-10">
            <p>
              <span className="font-semibold text-xl text-[#60287a]">
                Lawyer:
              </span>{" "}
              Ugulu banga
            </p>
            <p>
              <span className="font-semibold text-xl text-[#60287a]">
                Amount:
              </span>
              $ 546
            </p>
            <p>
              <span className="font-semibold text-xl text-[#60287a]">
                Date:
              </span>{" "}
              11/3/2024
            </p>
          </div>
        </div> */}
        <hr />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Withdraw;
