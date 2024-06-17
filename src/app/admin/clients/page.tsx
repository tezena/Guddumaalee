"use client";
import { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { getClients } from "../api/clients";
import { useQuery } from "@tanstack/react-query";
import {
  LoadingComponent,
  ErrorComponent,
} from "@/components/LoadingErrorComponents";
export function Clients() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["client"],
    queryFn: getClients,
  });

  const pageSize = 5;
  const visiblePages = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(data?.clients.length / pageSize);
  }, [data?.clients]);

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

  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data?.clients?.slice(startIndex, endIndex);
  }, [currentPage, data?.clients, pageSize]);

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

  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );
 
  return (
    <div className="w-full font-sans min-h-screen pt-24 pl-10 lg:pl-72 bg-[#f2f6fa]">
      <div className="w-full p-4">
        <h1 className="font-bold text-3xl  text-black">Clients</h1>
      </div>
      <div className="w-full flex gap-20">
        <div className="w-3/4 lg:w-1/4 h-20 flex gap-3 shadow-md rounded-lg p-4 bg-white text-black items-center justify-center">
          <Icon
            icon="icon-park-solid:peoples"
            width={30}
            height={30}
            color="#634670"
          />
          <p>320</p>
          <p>Active Clients</p>
        </div>
        <div className="w-3/4 lg:w-1/4 h-20 flex gap-3 shadow-md rounded-lg p-4 bg-white text-black items-center justify-center">
          <Icon
            icon="icon-park-solid:peoples"
            width={30}
            height={30}
            color="#be75e0"
          />
          <p>320</p>
          <p>Not Active Clients</p>
        </div>
      </div>

      <div className="rounded-2xl overflow-auto py-10 pr-10">
        <table className="w-full text-left rounded-xl">
          <thead>
            <tr className="bg-white text-gray-600 rounded-xl">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Email</th>
            </tr>
          </thead>
          <tbody>
            {paginatedClients.map((client: any, index: any) => (
              <tr
                className={
                  index % 2 === 0
                    ? "relative bg-[#F4F4F4]"
                    : "relative bg-white"
                }
                key={index}
              >
                <td className="py-3 px-6 text-black">{client.full_name}</td>
                <td className="py-3 px-6 text-black">{client.phone_number}</td>
                <td className="py-3 px-6 text-black">{client.email}</td>
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

export default Clients;
