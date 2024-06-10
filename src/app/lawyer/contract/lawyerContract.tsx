import React from 'react';
import ContractCard from '@/components/contractCard';
import lawyerContractData from '../../data/contract';

const LawyerContract = () => {
  const data = lawyerContractData;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          <ContractCard contracts={data} />
        </div>
      </div>
    </div>
  );
};

export default LawyerContract;
