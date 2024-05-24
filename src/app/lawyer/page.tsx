"use client";
import React from "react";
import { Icon } from "@iconify/react";
import LineChart from "@/components/admincomponentd/LineChart";
import DoughnutChart from "@/components/admincomponentd/DoughnutChart";

export function Lawyer() {
  const apointments = [
    {
      case: "Family",
      clientname: "solomon",
      place: "Lideta Court",
      date: "10/04/2024 5:30",
    },
    {
      case: "Family",
      clientname: "solomon",
      place: "Lideta Court",
      date: "10/04/2024 5:30",
    },
    {
      case: "Family",
      clientname: "solomon",
      place: "Lideta Court",
      date: "10/04/2024 5:30",
    },
    {
      case: "Family",
      clientname: "solomon",
      place: "Lideta Court",
      date: "10/04/2024 5:30",
    },
    {
      case: "Family",
      clientname: "solomon",
      place: "Lideta Court",
      date: "10/04/2024 5:30",
    },
    {
      case: "Family",
      clientname: "solomon",
      place: "Lideta Court",
      date: "10/04/2024 5:30",
    },
  ];

  return (
    <div className="w-full font-sans min-h-screen  px-10 lg:pl-64 bg-[#f2f6fa]">
      <div className="w-full h-1/2 flex gap-4 justify-between items-center pt-6">
        <div className="w-1/3  flex flex-col gap-4">
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
            <p>Pending case</p>
          </div>
        </div>

        <div className="w-2/3 flex flex-col items-center gap-4 p-4 bg-white h-72">
          <h1 className="font-bold text-xl text-gray-700">Next Apointments</h1>

          <div className="w-full h-4/5 overflow-auto">
            <table className="w-full text-left rounded-xl ">
              <thead className="sticky top-0 bg-white z-40">
                <tr className="bg-white text-gray-600 rounded-xl">
                  <th className="py-3 px-6 ">CASE</th>
                  <th className="py-3 px-6 ">CLIENT NAME</th>
                  <th className="py-3 px-6">COURT PLACE</th>
                  <th className="py-3 px-6">DATE</th>
                </tr>
              </thead>
              <tbody>
                {apointments.map((apointment: any, index: any) => (
                  <tr
                    className={
                      index % 2 === 0
                        ? "relative bg-[#F4F4F4]"
                        : "relative bg-white"
                    }
                    key={index}
                  >
                    <td className="py-3 px-6 text-black">{apointment.case}</td>
                    <td className="py-3 px-6 text-black">
                      {apointment.clientname}
                    </td>
                    <td className="py-3 px-6 text-black">{apointment.place}</td>
                    <td className="py-3 px-6 text-black">{apointment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      <div className="w-full flex gap-4 justify-between mt-6">
        <div className="w-3/4 lg:w-1/2 h-full border-2 border-gray-300 px-2  bg-white flex justify-center ">
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
