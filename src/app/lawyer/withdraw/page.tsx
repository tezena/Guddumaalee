"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Withdraw() {
  const router = useRouter();
  const [showWithdraw, SetShowWithdraw] = useState(0);
  const handleChange = () => {};
  const handleSubmit = () => {};
  return (
    <div className="p-6 bg-gray-200 min-h-screen relative overflow-hidden">
      <div className="bg-white h-[100vh] w-[80%] rounded-xl m-auto p-10 relative flex flex-col gap-8">
        <div className="self-end bg-white p-4 rounded w-1/3">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Amount</label>
              <input
                type="number"
                name="amount"
                value={showWithdraw}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="self-end w-22 text-center bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 cursor-pointer"
              >
                Withdraw
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-4">
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
        </div>
        <hr />
      </div>
    </div>
  );
}

export default Withdraw;
