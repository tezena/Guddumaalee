"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export function FAQ() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const FAQS = [
    {
      id: 1,
      question: `Jack six pounders spike haul wind gangplank me wherry quarter nipper
    mizzenmast. Schooner execution dock furl flogging scuttle ballast
    gangplank hornswaggle Cat o' nine tails yardarm. Pink tender knave Jolly
    Roger hands loaded to the gunwalls carouser stern reef sails aft?`,
    },
    {
      id: 2,
      question: `Jack six pounders spike haul wind gangplank me wherry quarter nipper
      mizzenmast. Schooner execution dock furl flogging scuttle ballast
      gangplank hornswaggle Cat o' nine tails yardarm. Pink tender knave Jolly
      Roger hands loaded to the gunwalls carouser stern reef sails aft?`,
    },
    {
      id: 3,
      question: `Jack six pounders spike haul wind gangplank me wherry quarter nipper
      mizzenmast. Schooner execution dock furl flogging scuttle ballast
      gangplank hornswaggle Cat o' nine tails yardarm. Pink tender knave Jolly
      Roger hands loaded to the gunwalls carouser stern reef sails aft?`,
    },
    {
      id: 4,
      question: `Jack six pounders spike haul wind gangplank me wherry quarter nipper
      mizzenmast. Schooner execution dock furl flogging scuttle ballast
      gangplank hornswaggle Cat o' nine tails yardarm. Pink tender knave Jolly
      Roger hands loaded to the gunwalls carouser stern reef sails aft?`,
    },
  ];

  const toggleShowInput = (id: number) => {
    setActiveFAQ((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full font-sans min-h-screen pt-28 pl-10 lg:pl-72 bg-[#f2f6fa] text-black overflow-auto flex flex-col gap-4">
      {FAQS.map((FAQ) => (
        <div
          className="w-full max-w-2xl lg:max-w-4xl p-8 bg-white border border-gray-300 rounded-xl shadow-md m-auto relative transform transition duration-500 hover:scale-105 "
          key={FAQ.id}
        >
          <p className="absolute left-4 top-4 text-gray-500 font-semibold">
            {FAQS.indexOf(FAQ) + 1}
          </p>
          <p className="text-gray-700 mb-4">{FAQ.question}</p>
          <div
            className="bottom-4 right-4 cursor-pointer absolute"
            onClick={() => toggleShowInput(FAQ.id)}
          >
            {activeFAQ ? (
              <Icon
                icon="ic:baseline-keyboard-arrow-up"
                style={{ color: "black" }}
                width={25}
                height={25}
              />
            ) : (
              <Icon
                icon="ic:baseline-keyboard-arrow-down"
                style={{ color: "black" }}
                width={25}
                height={25}
              />
            )}
          </div>
          {activeFAQ === FAQ.id && (
            <div className="p-4 mt-4 flex flex-col gap-4">
              <textarea
                className="w-full p-4 rounded-lg bg-gray-200 border-none resize-none h-32"
                placeholder="Enter your response here..."
              />
              <button className="px-6 p-2 rounded-2xl bg-[#7B3B99] text-white self-end">
                ANSWER
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQ;
