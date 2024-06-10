
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: { type: string; value: string }) => void;
  type: string;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, onSubmit, type }) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    onSubmit({ type, value });
    setValue('');
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl mb-4">Add {type}</h2>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Enter ${type}`}
          className="border p-2 w-full mb-4"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
        <button
          onClick={onRequestClose}
          className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
