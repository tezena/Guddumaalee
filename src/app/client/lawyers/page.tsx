"use client";
import { deflate } from "zlib";
import LawyersList from "./lawyersList";
import { useState } from "react";

const Lawyers = () => {
  const MenuItems = [
    { id: 1, text: "All", type: "" },
    { id: 2, text: "Family", type: "family" },
    { id: 3, text: "Personal Injury", type: "personal" },
    { id: 3, text: "Adoption", type: "adoption" },
    { id: 3, text: "Banking", type: "banking" },
    { id: 3, text: "Assult", type: "assult" },
    { id: 3, text: "Housing", type: "housing" },
    { id: 10, text: "Criminal", type: "criminal" },
  ];

  const [selectedType, setSelectedType] = useState("");

  return (
    <div className=" min-w-full relative text-center">
      <ul className="items-center  w-full justify-center border border-2 sticky top-24 z-30 backdrop:blur-lg bg-background/95">
        {MenuItems.map((item, index) => {
          return (
            <li
              key={index}
              className="p-2 md:p-4 text-sm md:text-xl  rounded-xl md:m-2 cursor-pointer duration-300 hover:text-black  relative inline-flex items-center justify-start overflow-hidden transition-all bg-white rounded hover:bg-white group"
              onClick={() => setSelectedType(item.type)}
            >
              <span className={selectedType==item.type?`w-full h-full rounded bg-purple-600 absolute  left-0 ease-out duration-200 transition-all text-white`:`w-0 h-0 rounded bg-purple-600 absolute  left-0 ease-out duration-200 transition-all group-hover:w-full group-hover:h-full -z-1`}></span>
              <span className={ selectedType==item.type?`text-white w-full transition-colors duration-100 ease-in-out group-hover:text-white z-10`: `w-full text-black transition-colors duration-100 ease-in-out group-hover:text-white z-10`}>
                {item.text}
              </span>
            </li>
          );
        })}
      </ul>

      <LawyersList selectedType={selectedType} />
    </div>
  );
};

export default Lawyers;
