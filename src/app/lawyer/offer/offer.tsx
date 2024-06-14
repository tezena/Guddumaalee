// components/OfferModal.jsx
import React, { useState } from 'react';
interface OfferModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  const OfferModal: React.FC<OfferModalProps> = ({ isOpen, onClose })=> {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [caseName,setCaseName]=useState('')

  const handleSubmit = () => {
    console.log({ caseName,description, amount });   
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Make an Offer</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            CaseName
          </label>
          <input
            type="text"
            value={caseName}
            onChange={(e) => setCaseName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-evenly">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#7B3B99] text-white rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
