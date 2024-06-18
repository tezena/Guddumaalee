// components/OfferModal.jsx
import React, { useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  UseMutationResult,
} from "@tanstack/react-query";
import { createOffer } from "@/app/lawyer/api/offer";
import { join } from "path";
import { useSession } from "next-auth/react";

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOffer: () => void;
  client_id: number;
}
const OfferModal: React.FC<OfferModalProps> = ({
  isOpen,
  onClose,
  setOffer,
  client_id,
}) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [caseName, setCaseName] = useState("");
  const { data: session } = useSession();

  //@ts-ignore
  const lawyer_id = session?.user?.image?.id;

  const [inputData, setInputData] = useState({
    description: "",
    price: 0,
    title: "",
  });
  const { data: sesstion } = useSession();

  //@ts-ignore
  const lawyer_id = sesstion?.user?.image?.id;

  const handleChange = (e: any) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    console.log({ caseName, description, amount });
    const data = {
      ...inputData,
      price: Number(inputData.price),
      lawyer_id: lawyer_id,

      client_id: client_id,
    };
    mutateAsync(data);
  };

  const { mutateAsync }: UseMutationResult<void, unknown, Object> = useMutation(
    {
      mutationFn: (data) => createOffer(data),
      onSuccess: () => {
        onClose();
      },
    }
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Make an Offer</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            name="title"
            type="text"
            value={inputData.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            name="description"
            type="text"
            value={inputData.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            name="price"
            type="number"
            value={inputData.price}
            onChange={handleChange}
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
