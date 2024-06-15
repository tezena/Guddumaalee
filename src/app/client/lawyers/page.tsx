'use client'
import { useState } from "react";
import FilteringOptions from "./moreFilterOptions";
import LawyersList from "./lawyersList";

const Lawyers = () => {
  const MenuItems = [
    { id: 1, text: "All", type: "" },
    { id: 2, text: "Family", type: "family" },
    { id: 3, text: "Personal Injury", type: "personal" },
    { id: 4, text: "Adoption", type: "adoption" },
    { id: 5, text: "Banking", type: "banking" },
    { id: 6, text: "Assault", type: "assault" },
    { id: 7, text: "Housing", type: "housing" },
    { id: 8, text: "Criminal", type: "criminal" },
  ];

  const [selectedType, setSelectedType] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
  const [selectedCourt, setSelectedCourt] = useState<string>("");

  return (
    <div className="min-w-full relative text-center">
      <ul className="items-center w-full justify-center border border-2 sticky top-24 z-30 backdrop:blur-lg bg-background/95">
        {MenuItems.map((item, index) => {
          return (
            <li
              key={index}
              className="p-2 md:p-4 text-sm md:text-xl rounded-xl md:m-2 cursor-pointer duration-300 hover:text-black relative inline-flex items-center justify-start overflow-hidden transition-all bg-white rounded hover:bg-white group"
              onClick={() => setSelectedSpecialization(item.type)}
            >
              <span className={selectedSpecialization === item.type ? `w-full h-full rounded bg-purple-600 absolute left-0 ease-out duration-200 transition-all text-white` : `w-0 h-0 rounded bg-purple-600 absolute left-0 ease-out duration-200 transition-all group-hover:w-full group-hover:h-full -z-1`}></span>
              <span className={selectedSpecialization === item.type ? `text-white w-full transition-colors duration-100 ease-in-out group-hover:text-white z-10` : `w-full text-black transition-colors duration-100 ease-in-out group-hover:text-white z-10`}>
                {item.text}
              </span>
            </li>
          );
        })}
        <li className="p-2 md:p-4 text-sm md:text-xl rounded-xl md:m-2 cursor-pointer duration-300 hover:text-black relative inline-flex items-center justify-start overflow-hidden transition-all bg-white rounded hover:bg-white group">
          <FilteringOptions setSelectedCourt={setSelectedCourt} setSelectedLanguage={setSelectedLanguage} setSelectedSpecialization={setSelectedSpecialization} selectedSpecialization={selectedSpecialization} />
        </li>
      </ul>

      <LawyersList selectedSpecialization={selectedSpecialization} selectedLanguage={selectedLanguage} selectedCourt={selectedCourt} />
    </div>
  );
};

export default Lawyers;
