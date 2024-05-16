"use client";
import { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
export function Dispute() {
  const disputes = [
    { from: "Client",on:'Lawyer', type: "Money", date: "3/16/2023",status:'New' ,desc:'American Main Chain Shot bowsprit to go on account.'},
    { from: "Client",on:'Lawyer', type: "Money", date: "3/16/2023",status:'New' ,desc:'American Main Chain Shot bowsprit to go on account.'},
    { from: "Client",on:'Lawyer', type: "Money", date: "3/16/2023",status:'New' ,desc:'American Main Chain Shot bowsprit to go on account.'},
    { from: "Client",on:'Lawyer', type: "Money", date: "3/16/2023",status:'New' ,desc:'American Main Chain Shot bowsprit to go on account.'},
    { from: "Client",on:'Lawyer', type: "Money", date: "3/16/2023",status:'New' ,desc:'American Main Chain Shot bowsprit to go on account.'},
    { from: "Client",on:'Lawyer', type: "Money", date: "3/16/2023",status:'New' ,desc:'American Main Chain Shot bowsprit to go on account.'},
    { from: "Client",on:'Lawyer', type: "Money", date: "3/16/2023",status:'New' ,desc:'American Main Chain Shot bowsprit to go on account.'},
    { from: "Client",on:'Lawyer', type: "Money", date: "3/16/2023",status:'New' ,desc:'American Main Chain Shot bowsprit to go on account.'},
    { from: "Client",on:'Lawyer', type: "Money", date: "3/16/2023",status:'New' ,desc:'American Main Chain Shot bowsprit to go on account.'},
    { from: "Client",on:'Lawyer', type: "Money", date: "3/16/2023",status:'New' ,desc:'American Main Chain Shot bowsprit to go on account.'},
    { from: "Client",on:'Lawyer', type: "Money", date: "3/16/2023",status:'New' ,desc:'American Main Chain Shot bowsprit to go on account.'},
  ];

  const pageSize = 5;
  const visiblePages = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(disputes.length / pageSize);
  }, [disputes]);

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
    return disputes.slice(startIndex, endIndex);
  }, [currentPage, disputes, pageSize]);

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
              <th className="py-3 px-6">FROM</th>
              <th className="py-3 px-6">ON</th>
              <th className="py-3 px-6">TYPE</th>
              <th className="py-3 px-6">DESCRIPTION</th>
              <th className="py-3 px-6">DATE</th>
              <th className="py-3 px-6">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {paginateddisputes.map((dispute, index) => (
              <tr
                className={
                  index % 2 === 0
                    ? "relative bg-[#F4F4F4]"
                    : "relative bg-white"
                }
                key={index}
              >
                <td className="py-3 px-6 text-black">{dispute.from}</td>
                <td className="py-3 px-6 text-black">{dispute.on}</td>
                <td className="py-3 px-6 text-black">{dispute.type}</td>
                <td className="py-3 px-6 text-black max-w-28">{dispute.desc}</td>
                <td className="py-3 px-6 text-black">{dispute.date}</td>
                <td className="py-3 px-6 text-black">{dispute.status}</td>
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
