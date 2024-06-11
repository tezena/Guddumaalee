"use client";
import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { getVerifiedLawyers } from "../api/lawyers";
import { useQuery } from "@tanstack/react-query";
// import getLawyers from "./api/lawyers"
export function Lawyers() {

  const {data,error,isLoading}= useQuery({
    queryKey:['lawyers'],
    queryFn:getVerifiedLawyers
  })

  // const Lawyers = [
  //   { name: "Abebe Kebede", phone: "0912345467", email: "abebe33@gmail.com" ,status:'ACTIVE'},
  //   { name: "Abebe Kebede", phone: "0912345467", email: "abebe33@gmail.com" ,status:'INACTIVE'},
  //   { name: "Abebe Kebede", phone: "0912345467", email: "abebe33@gmail.com" ,status:'ACTIVE'},
  //   { name: "Abebe Kebede", phone: "0912345467", email: "abebe33@gmail.com" ,status:'INACTIVE'},
  //   { name: "Abebe Kebede", phone: "0912345467", email: "abebe33@gmail.com" ,status:'ACTIVE'},
  //   { name: "Abebe Kebede", phone: "0912345467", email: "abebe33@gmail.com" ,status:'INACTIVE'},
  //   { name: "Abebe Kebede", phone: "0912345467", email: "abebe33@gmail.com" ,status:'ACTIVE'},
  //   { name: "Abebe Kebede", phone: "0912345467", email: "abebe33@gmail.com" ,status:'INACTIVE'},
  //   { name: "Abebe Kebede", phone: "0912345467", email: "abebe33@gmail.com" ,status:'ACTIVE'},
  //   { name: "Abebe Kebede", phone: "0912345467", email: "abebe33@gmail.com" ,status:'INACTIVE'},
  //   { name: "Abebe Kebede", phone: "0912345467", email: "abebe33@gmail.com" ,status:'ACTIVE'},
  // ];

  const pageSize = 5;
  const visiblePages = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(Lawyers.length / pageSize);
  }, [data?.lawyers]);

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

  const paginatedLawyers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data?.lawyers?.slice(startIndex, endIndex);
  }, [currentPage, data?.lawyers, pageSize]);

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





  if (isLoading) return <div className="w-full font-sans min-h-screen pt-24 pl-10 lg:pl-72 bg-[#f2f6fa]">
     <div
      
          className="w-full h-full pt-28 flex gap-5 items-center justify-center m-auto"
        >
          <Icon icon="eos-icons:loading" width="80" height="80" color="green" />
          <p className="text-2xl text-green-500">...Loading</p>
        </div>
  </div>;
  if (error) return <div className="w-full font-sans min-h-screen pt-24 pl-10 lg:pl-72 bg-[#f2f6fa]">Error loading data</div>;
  return (
    <>
      <div className="w-full font-sans min-h-screen pt-24 pl-10 lg:pl-72 bg-[#f2f6fa]">
        <div className="w-full p-4">
          <h1 className="font-bold text-3xl  text-black">Lawyers</h1>
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
            <p>Active Lawyers</p>
          </div>
          <div className="w-3/4 lg:w-1/4 h-20 flex gap-3 shadow-md rounded-lg p-4 bg-white text-black items-center justify-center">
            <Icon
              icon="icon-park-solid:peoples"
              width={30}
              height={30}
              color="#BE73E0"
            />
            <p>320</p>
            <p>Inactive Lawyers</p>
          </div>
        </div>

        <div className="rounded-2xl overflow-auto py-10 pr-10">
          <table className="w-full text-left rounded-xl">
            <thead>
              <tr className="bg-white text-gray-600 rounded-xl">
                <th className="py-3 px-6 ">NAME</th>
                <th className="py-3 px-6 ">PHONE</th>
                <th className="py-3 px-6">EMAIL</th>
                <th className="py-3 px-6">STATUS</th>
                <th className="py-3 px-6 ">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLawyers.map((lawyer:any, index:any) => (
                <tr
                  className={
                    index % 2 === 0
                      ? "relative bg-[#F4F4F4]"
                      : "relative bg-white"
                  }
                  key={index}
                >
                  <td className="py-3 px-6 text-black">{lawyer.name}</td>
                  <td className="py-3 px-6 text-black">{lawyer.phone}</td>
                  <td className="py-3 px-6 text-black">{lawyer.email}</td>
                  <td className="py-3 px-6 text-black">
                    <button className={ lawyer.isVerified ? 'w-[100px] px-4 py-2 rounded-full outline outline-[#7B3B99]':'w-[100px] px-4 py-2 bg-[#7B3B99] text-white rounded-full '   } >

                      Active
                    </button>
                  </td>

                  <td className="py-3 px-6 text-black flex gap-4 items-center ">
                    <div>
                      <Icon
                        icon="material-symbols-light:delete-outline"
                        style={{ color: "#7B3B99", cursor: "pointer" }}
                        width={30}
                        height={30}
                      />
                    </div>
                    <div>
                      <Icon
                        icon="fa-regular:edit"
                        style={{ color: "#5C0584", cursor: "pointer" }}
                        width={25}
                        height={25}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between w-full bg-white p-3">
            <div className="flex items-center text-black gap-4">
              <p>Showing Page</p>
              <div className="px-2 h-fit text-[#7B3B99] border-2">
                {currentPage}
              </div>
              <p>Out of {totalPages}</p>
            </div>
            <div className="flex items-center gap-2  text-black">
              <div onClick={prevPage} className="cursor-pointer">
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
    </>
  );
}

export default Lawyers;
