"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import {
  QueryClient,
  useMutation,
  useQuery,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { answerFaq, getFaqs } from "../api/faq";

import { LoadingComponent, ErrorComponent } from '@/components/LoadingErrorComponents';

export function FAQ() {
  const queryClient = useQueryClient()
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [answer, setAnswer] = useState<string>("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["faqs"],
    queryFn: () => getFaqs(),
    refetchInterval: 3000,
  });

  const mutationFn = async ({ id, answer }: { id: number; answer: string }): Promise<void> => {
    await answerFaq(id, answer);
  };

  const { mutateAsync }: UseMutationResult<void, unknown, { id: number; answer: string }> = useMutation({
    mutationFn,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      console.log("Answer submitted successfully.");
    },
  });

  

  const toggleShowInput = (id: number) => {
    setActiveFAQ((prev) => (prev === id ? null : id));
  };

  const handleChange = (e: any) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    if (activeFAQ !== null) {
      try {
        await mutateAsync({ id: activeFAQ, answer });
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );

  return (
    <div className="w-full font-sans min-h-screen pt-28 pl-10 lg:pl-72 bg-[#f2f6fa] text-black overflow-auto flex flex-col gap-4">
      {data?.map((FAQ:any) => (
        <div
          className="w-full max-w-2xl lg:max-w-4xl p-8 bg-white border border-gray-300 rounded-xl shadow-md mx-auto relative transform transition duration-500 hover:scale-105 "
          key={FAQ.id}
        >
          <p className="absolute left-4 top-4 text-gray-500 font-semibold">
            {data.indexOf(FAQ) + 1}
          </p>
          <p className="text-gray-700 mb-4">{FAQ.question}</p>
          <div
            className="bottom-4 right-4 cursor-pointer absolute"
            onClick={() => toggleShowInput(FAQ.id)}
          >
            {activeFAQ === FAQ.id ? (
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
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-200 border-none resize-none h-32"
                placeholder="Enter your response here..."
              />
              <button
                className="px-6 p-2 rounded-2xl bg-[#7B3B99] text-white self-end"
                onClick={handleSubmit}
              >
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


// const FAQS = [
//   {
//     id: 1,
//     question: `Jack six pounders spike haul wind gangplank me wherry quarter nipper
//   mizzenmast. Schooner execution dock furl flogging scuttle ballast
//   gangplank hornswaggle Cat o' nine tails yardarm. Pink tender knave Jolly
//   Roger hands loaded to the gunwalls carouser stern reef sails aft?`,
//   },
//   {
//     id: 2,
//     question: `Jack six pounders spike haul wind gangplank me wherry quarter nipper
//     mizzenmast. Schooner execution dock furl flogging scuttle ballast
//     gangplank hornswaggle Cat o' nine tails yardarm. Pink tender knave Jolly
//     Roger hands loaded to the gunwalls carouser stern reef sails aft?`,
//   },
//   {
//     id: 3,
//     question: `Jack six pounders spike haul wind gangplank me wherry quarter nipper
//     mizzenmast. Schooner execution dock furl flogging scuttle ballast
//     gangplank hornswaggle Cat o' nine tails yardarm. Pink tender knave Jolly
//     Roger hands loaded to the gunwalls carouser stern reef sails aft?`,
//   },
//   {
//     id: 4,
//     question: `Jack six pounders spike haul wind gangplank me wherry quarter nipper
//     mizzenmast. Schooner execution dock furl flogging scuttle ballast
//     gangplank hornswaggle Cat o' nine tails yardarm. Pink tender knave Jolly
//     Roger hands loaded to the gunwalls carouser stern reef sails aft?`,
//   },
// ];