"use client";
import React from "react";
import { Icon } from "@iconify/react";
import LineChart from "@/components/admincomponentd/LineChart";
import DoughnutChart from "@/components/admincomponentd/DoughnutChart";

export function Lawyer() {
  return (
    <div className="w-full font-sans min-h-screen  px-10 lg:pl-64 bg-[#f2f6fa]">
      <div className="w-full h-1/2 flex gap-4 justify-between items-center pt-8">
        <div className="w-2/5  flex flex-col gap-4">
          <div className="w-full lg:w-3/4 h-20 flex gap-3 shadow-md rounded-lg p-4 bg-white text-black items-center justify-center">
            <Icon
              icon="material-symbols:cases"
              width={30}
              height={30}
              color="#B2C129"
            />
            <p>320</p>
            <p>Total cases</p>
          </div>
          <div className="w-full lg:w-3/4 h-20 flex gap-3 shadow-md rounded-lg p-4 bg-white text-black items-center justify-center">
            <Icon
              icon="material-symbols:cases"
              width={30}
              height={30}
              color="#0E9A2F"
            />
            <p>320</p>
            <p>Complated Cases</p>
          </div>
          <div className="w-3/4 lg:w-3/4 h-20 flex gap-3 shadow-md rounded-lg p-4 bg-white text-black items-center justify-center">
            <Icon
              icon="material-symbols:cases"
              width={30}
              height={30}
              color="#678C08"
            />
            <p>320</p>
            <p>In progress</p>
          </div>
        </div>

        <div className="w-3/5 flex flex-col items-center gap-4 p-4 bg-white h-72">
          <h1 className="font-bold text-xl text-gray-700">Next Apointments</h1>

          <table className="w-full text-left rounded-xl">
            <thead>
              <tr className="bg-white text-gray-600 rounded-xl">
                <th className="py-3 px-6 ">CASE</th>
                <th className="py-3 px-6 ">CLIENT NAME</th>
                <th className="py-3 px-6">COURT PLACE</th>
                <th className="py-3 px-6">DATE</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#F4F4F4]">
                <td className="py-3 px-6 text-black">Family</td>
                <td className="py-3 px-6 text-black">Chalachew</td>
                <td className="py-3 px-6 text-black">Lideta court</td>
                <td className="py-3 px-6 text-black">12/4/2024 10:30</td>
              </tr>
            </tbody>
          </table>
          {/* <div className="w-full flex flex-row items-center justify-between px-6">
            <p className="max-w-1/4 self-left">Case</p>
            <p className="max-w-1/4 self-left">Client Name</p>
            <p className="max-w-1/4 self-left">Court place</p>
            <p className="max-w-1/4 self-left">Date</p>
          </div>
          <div className="w-full h-fit flex items-center justify-between  p-4 border-2 shadow-md rounded-md">
            
              <p className="max-w-10 self-right">Family case one </p>
              <div className="max-w-20 self-right align-middle">
              <p >Selemon chalachew ffffffffff ffffffff fffffd</p>

              </div>
              <p className="max-w-1/5 self-left">Lideta court jjjjjjjjjjjjj jjjjjjjjj jjjjjjjjjjjjjjjj</p>
            
            <p className="m-w-1/4 self-right">12/3/2024</p>
          </div> */}
        </div>
      </div>

      <div className="w-full flex gap-4 justify-between mt-10">
      <div className="w-3/4 lg:w-1/2 h-40 border-2 border-gray-300 px-10 p-2 bg-white">
          <DoughnutChart data={[40, 80, 120]} />
        </div>
        <div className="w-3/4 lg:w-1/2 h-full border-2 border-gray-300 px-10 p-2 bg-white">
          <LineChart data={[40, 60, 80, 81, 95, 98, 120]} />
        </div>
      </div>
    </div>
  );
}

export default Lawyer;
