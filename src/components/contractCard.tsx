import React from 'react';

interface ContractCardProps {
  contracts: {
    id: number;
    lawyerName: string;
    clientName: string;
    contractDate: string;
    contractDetails: string;
  }[];
}

const ContractCard: React.FC<ContractCardProps> = ({ contracts }) => {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md p-4 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-black">Here is your Contract List</h2>
        {contracts.map((contract, index) => (
          <div key={index} className="bg-gray-100 rounded-lg shadow-md p-4 mb-4">
            <div className="p-6">
              <h2 className="text-xl font-normal text-gray-800 mb-2">
                <span className="font-bold">Client Name:</span> {contract.clientName}
              </h2>
              <p className="text-gray-700 text-lg leading-tight font-normal mb-2">
                <span className="font-bold">Contract Date:</span> {contract.contractDate}
              </p>
              <p className="text-gray-700 text-lg leading-tight font-normal mb-4">
                <span className="font-bold">Contract Details:</span> {contract.contractDetails}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractCard;
