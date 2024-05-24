"use client";
import React, { useEffect } from "react";
import Chart1 from "@/components/admincomponentd/bar";
import Chart2 from "@/components/admincomponentd/LineChart";
import Chart3 from "@/components/admincomponentd/DoughnutChart";

import BarChart from "@/components/admincomponentd/BarChart";

import { useState } from "react";

export function Admin() {
  useEffect(() => {}, []);

  const data = [200, 300, 400];

  // const [count, setCount] = useState(0);
  return (
    <div className="min-w-max min-h-screen pt-24 pl-10 lg:pl-72 bg-[#f2f6fa]        ">
      <div className="w-full h-fit text-black p-4">
        <h1 className="font-bold text-3xl ">Dashboard</h1>
      </div>

      <div className="w-full h-[400px] lg:h-72 flex  flex-col lg:flex-row gap-4 justify-between">
        <div className="w-3/4 lg:w-1/2 h-full border-2 border-gray-300 px-10 p-2 bg-white">
          <BarChart data={data} />
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-1/2 lg:px-10">
          <div className="bg-white  w-3/4  lg:w-1/2 h-20 text-black flex gap-4 items-center px-10 lg:m-auto">
            <svg
              className="w-8 h-8 text-red-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <p>Total clients</p>
            <p>530</p>
          </div>

          <div className="bg-white w-3/4 lg:w-1/2 h-20 flex gap-4 text-black items-center px-10 lg:m-auto">
            <svg
              className="w-8 h-8 text-blue-300 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <p>Total clients</p>
            <p>530</p>
          </div>

          <div className="bg-white  w-3/4 lg:w-1/2 h-20 flex text-black gap-4 items-center px-10 lg:m-auto">
            <svg
              className="w-8 h-8 text-green-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <p>Total clients</p>
            <p>530</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;

{
  /* <div className="flex flex-col gap-10 lg:flex-row justify-between px-10">
<div className="w-3/4 lg:w-1/2 h-72 flex justify-between shadow-md rounded-lg  bg-white items-center pr-10 py-4 ">
  <div className="flex gap-4 p-4 ">
    <svg
      className="w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 18"
    >
      <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
    </svg>
    <p>Total clients</p>
    <p>530</p>
  </div>

  <div className="w-1/3 h-full p-4 flex justify-evenly ">
    <Chart1 />
  </div>
</div>
{/* lg:justify-center */
}

{
  /* <div className="w-3/4 lg:w-1/4 h-72 flex flex-row justify-between  lg:flex-col   lg:gap-3 shadow-md rounded-lg py-4 bg-white items-center ">
  <div className="flex gap-4 p-4">
    <svg
      className="w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 18"
    >
      <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
    </svg>
    <p>Total_Lawyers</p>
    <p>420</p>
  </div>

  <div className="w-3/4 lg:w-full p-4 h-full lg:h-4/5 flex justify-evenly">
    <Chart2 />
  </div>
</div>
</div> */
}

{
  /* <div className="w-full h-fit p-4 flex flex-col lg:flex lg:flex-row gap-8 lg:gap-20 justify-evenly"> */
}
{
  /* <div className="w-3/4 lg:w-1/2 h-64 flex  justify-between  gap-3 shadow-md rounded-lg p-4  bg-white items-center">
  <div className="flex gap-4">
    <svg
      className="w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 18"
    >
      <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
    </svg>
    <p>Total Cases</p>
    <p>420</p>
  </div>

  <div className="w-full h-64 p-4 flex justify-evenly">
    <Chart3 />
  </div>
</div> */
}
{
  /* </div> */
}
