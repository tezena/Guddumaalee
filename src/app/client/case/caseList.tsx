import React from 'react';
import Link from 'next/link';
import { cases, Case } from './mockData';

const Cases: React.FC = () => {
  const { currentCase, recentCases } = cases;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">Client Cases</h1>

        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-blue-600">Current Case</h2>
          <Link href={`/client/case/${currentCase.id}`}>
            <div className="block p-6 bg-white rounded-lg shadow-lg hover:bg-blue-50">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">{currentCase.title}</h3>
              <p className="text-gray-700 mb-4">{currentCase.description}</p>
              <p className="text-gray-500 text-sm">{currentCase.date}</p>
            </div>
          </Link>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4 text-blue-600">Recent Cases</h2>
          <div className="space-y-6">
            {recentCases.map((caseItem: Case) => (
              <Link key={caseItem.id} href={`/client/case/${caseItem.id}`}>
                <div className="block p-6 bg-white rounded-lg shadow-lg hover:bg-blue-50">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">{caseItem.title}</h3>
                  <p className="text-gray-700 mb-4">{caseItem.description}</p>
                  <p className="text-gray-500 text-sm">{caseItem.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cases;
