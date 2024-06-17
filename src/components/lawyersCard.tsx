"use client";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

export interface LawyerProps {
  id: string;
  name: string;
  des: string;
  imageUrl: string;
  rate: number;
}
const LawyersCard: React.FC<LawyerProps> = ({
  id,
  name,
  imageUrl,
  des,
  rate,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={i} color={i < rating ? "#ffd700" : "#e4e5e9"} />);
    }
    return stars;
  };
  return (
    <Link
      className="text-start mx-auto md:mx-2 my-2 bg-white rounded-lg shadow-lg overflow-hidden  w-[60%] sm:w-[40%]  lg:w-[23%] transform transition duration-500 hover:scale-105"
      href={`/client/lawyers/${id}`}
    >
      <div className="w-full">
        <Image
          src={imageUrl}
          alt="Mountain"
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
          <p className="text-gray-700 text-sm leading-tight mb-4">{des}</p>
          <div className="flex felx-row">
            <div className="flex items-center mt-2">{renderStars(rate)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LawyersCard;
