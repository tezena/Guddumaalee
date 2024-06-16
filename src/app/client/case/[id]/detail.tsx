'use client'
import { useParams, useRouter } from 'next/navigation';
import { cases, Case } from '../mockData';
import DisputePage from '@/app/lawyer/dispute/page';
import React from 'react';

const CaseDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const caseItem: Case | undefined =
    cases.currentCase.id === Number(id)
      ? cases.currentCase
      : cases.recentCases.find((c) => c.id === Number(id));

  if (!caseItem) {
    return <p>Case not found</p>;
  }

  const handleDispute = () => {
    alert("Dispute action triggered for the current case.");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">{caseItem.title}</h1>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <p className="text-gray-700 mb-4">{caseItem.description}</p>
          <p className="text-gray-500 text-sm mb-4">Date: {caseItem.date}</p>
          <p className="text-gray-500 text-sm mb-4">Price: {caseItem.price}</p>
          <p className="text-gray-500 text-sm mb-4">Lawyer: {caseItem.lawyer}</p>
          <p className="text-gray-500 text-sm mb-4">Trials: {caseItem.trials}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-[#7B3B99] hover:bg-purple-700 text-white rounded "
          >
            Back
          </button>
          {caseItem.id === cases.currentCase.id && (
            <button
            onClick={() => router.push(`/client/dispute`)}
              className="mt-4 ml-4 px-4 py-2 bg-[#7B3B99] hover:bg-purple-700 text-white rounded ">
              Dispute
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
