// pages/index.jsx
'use client'
import React, { useState } from 'react';
import OfferModal from './offer';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Offer
      </button>
      <OfferModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Home;
