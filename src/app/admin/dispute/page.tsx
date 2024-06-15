"use client";
import { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import {
  getDisputes,
  submitDispute,
  acceptDispute,
  resolveDispute,
} from "@/app/lawyer/api/dispute";
import {
  QueryClient,
  useMutation,
  useQuery,
  UseMutationResult,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
export function Dispute() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["disputes"],
    queryFn: () => getDisputes(),
  });

  const acceptMutationFn = async (id: number) => {
    return acceptDispute(id);
  };

  const resolveMutationFn = async (id: number) => {
    return resolveDispute(id);
  };

  const acceptMutation: UseMutationResult<void, unknown, number> = useMutation({
    mutationFn: acceptMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
      console.log("Dispute accepted.");
    },
  });3

  const resolveMutation: UseMutationResult<void, unknown, number> = useMutation(
    {
      mutationFn: resolveMutationFn,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["disputes"] });
        console.log("Dispute resolved.");
      },
    }
  );

  const handleResolve = async (id: number) => {
    await resolveMutation.mutateAsync(id);
  };

  const handleAccept = async (id: number) => {
    await acceptMutation.mutateAsync(id);
  };

  const pageSize = 5;
  const visiblePages = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(data?.length / pageSize);
  }, [data]);

  const startPage = useMemo(() => {
    let start = 1;
    if (totalPages > visiblePages) {
      const halfVisiblePages = Math.floor(visiblePages / 2);
      start = currentPage - halfVisiblePages;
      start = Math.max(start, 1);
      start = Math.min(start, totalPages - visiblePages + 1);
    }
    return start;
  }, [currentPage, totalPages, visiblePages]);

  const endPage = useMemo(() => {
    return Math.min(startPage + visiblePages - 1, totalPages);
  }, [startPage, totalPages, visiblePages]);

  const pages = useMemo(() => {
    const array = [];
    if (startPage > 1) {
      array.push(1);
      if (startPage > 2) {
        array.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      array.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        array.push("...");
      }
      array.push(totalPages);
    }
    return array;
  }, [startPage, endPage, totalPages]);

  const paginateddisputes = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data?.slice(startIndex, endIndex);
  }, [currentPage, data, pageSize]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="w-full font-sans min-h-screen pt-28 pl-10 lg:pl-72 bg-[#f2f6fa] text-black overflow-auto">
      dispute
      <div className="rounded-2xl overflow-auto py-10 pr-10">
        <table className="w-full text-left rounded-xl">
          <thead>
            <tr className="bg-white text-gray-600 rounded-xl">
              <th className="py-3 px-6 text-center">lawyer_id</th>
              <th className="py-3 px-6 text-center">client_id</th>
              {/* <th className="py-3 px-6">TYPE</th> */}
              <th className="py-3 px-6 text-center">DESCRIPTION</th>
              {/* <th className="py-3  text-center px-6">DATE</th> */}
              <th className="py-3 px-6 text-center">STATUS</th>
              <td className="py-3 px-6 text-center">Actions</td>
            </tr>
          </thead>
          <tbody>
            {paginateddisputes?.map((dispute: any, index: any) => (
              <tr
                className={
                  index % 2 === 0
                    ? "relative bg-[#F4F4F4]"
                    : "relative bg-white"
                }
                key={index}
              >
                <td className="py-3 px-6 text-black text-center">
                  {dispute.lawyer_id}
                </td>
                <td className="py-3 px-6 text-black text-center">
                  {dispute.client_id}
                </td>
                {/* <td className="py-3 px-6 text-black">{dispute.type}</td> */}
                <td className="py-3 px-6 text-black max-w-28 text-center">
                  {dispute.content}
                </td>
                {/* <td className="py-3 px-6 text-black">{dispute.date}</td> */}
                <td className="py-3 px-6 text-black text-center">
                  {dispute.status}
                </td>
                <td className="py-3 px-6 text-black text-center">
                  <div className="flex gap-4 items-center justify-center ">
                    <button
                      className="rounded py-2 px-6 text-lg font-semibold outline-double outline-[#7B3B99]"
                      onClick={() => handleAccept(dispute.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="rounded py-2 px-6 text-lg font-semibold bg-[#7B3B99] text-white"
                      onClick={() => handleResolve(dispute.id)}
                    >
                      Resolve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between w-full text-black bg-white p-3">
          <div className="flex items-center gap-4">
            <p>Showing Page</p>
            <div className="px-2 h-fit text-[#7B3B99] border-2">
              {currentPage}
            </div>
            <p>Out of {totalPages}</p>
          </div>
          <div className="flex items-center gap-2 text-black">
            <div onClick={prevPage} className="cursor-pointer text-black">
              <Icon icon="ep:arrow-left-bold" />
            </div>
            {pages.map((page, index) => (
              <div
                key={index}
                className={
                  currentPage === page
                    ? "px-1 bg-[#7B3B99]  border-2 rounded-lg text-white"
                    : "px-1 text-black"
                }
              >
                {page}
              </div>
            ))}
            <div onClick={nextPage} className="cursor-pointer">
              <Icon icon="ep:arrow-right-bold" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dispute;

// const disputes = [
//   {
//     from: "Client",
//     on: "Lawyer",
//     type: "Money",
//     date: "3/16/2023",
//     status: "New",
//     desc: "American Main Chain Shot bowsprit to go on account.",
//   },
//   {
//     from: "Client",
//     on: "Lawyer",
//     type: "Money",
//     date: "3/16/2023",
//     status: "New",
//     desc: "American Main Chain Shot bowsprit to go on account.",
//   },
//   {
//     from: "Client",
//     on: "Lawyer",
//     type: "Money",
//     date: "3/16/2023",
//     status: "New",
//     desc: "American Main Chain Shot bowsprit to go on account.",
//   },
//   {
//     from: "Client",
//     on: "Lawyer",
//     type: "Money",
//     date: "3/16/2023",
//     status: "New",
//     desc: "American Main Chain Shot bowsprit to go on account.",
//   },
//   {
//     from: "Client",
//     on: "Lawyer",
//     type: "Money",
//     date: "3/16/2023",
//     status: "New",
//     desc: "American Main Chain Shot bowsprit to go on account.",
//   },
//   {
//     from: "Client",
//     on: "Lawyer",
//     type: "Money",
//     date: "3/16/2023",
//     status: "New",
//     desc: "American Main Chain Shot bowsprit to go on account.",
//   },
//   {
//     from: "Client",
//     on: "Lawyer",
//     type: "Money",
//     date: "3/16/2023",
//     status: "New",
//     desc: "American Main Chain Shot bowsprit to go on account.",
//   },
//   {
//     from: "Client",
//     on: "Lawyer",
//     type: "Money",
//     date: "3/16/2023",
//     status: "New",
//     desc: "American Main Chain Shot bowsprit to go on account.",
//   },
//   {
//     from: "Client",
//     on: "Lawyer",
//     type: "Money",
//     date: "3/16/2023",
//     status: "New",
//     desc: "American Main Chain Shot bowsprit to go on account.",
//   },
//   {
//     from: "Client",
//     on: "Lawyer",
//     type: "Money",
//     date: "3/16/2023",
//     status: "New",
//     desc: "American Main Chain Shot bowsprit to go on account.",
//   },
//   {
//     from: "Client",
//     on: "Lawyer",
//     type: "Money",
//     date: "3/16/2023",
//     status: "New",
//     desc: "American Main Chain Shot bowsprit to go on account.",
//   },
// ];
