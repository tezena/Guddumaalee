"use client";
import React from "react";
import ReactStars from "react-rating-stars-component";

interface Props {
  id: string;
  name: string;
  des: string;
  imageUrl: string;
  rate: number;
}
const LawyersCard: React.FC<Props> = ({ id, name, imageUrl, des, rate }) => {
  return (
    <div className="text-start mx-auto md:mx-2 my-2 bg-white rounded-lg shadow-lg overflow-hidden  w-[60%] sm:w-[40%]  lg:w-[23%] transform transition duration-500 hover:scale-105">
      <img
        src="https://img.freepik.com/free-photo/portrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710288000&semt=ais"
        alt="Mountain"
        className="w-full h-64 object-cover"
      />

      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-700 text-sm leading-tight mb-4">{des}</p>
        <div className="flex felx-row">
          <ReactStars
            count={5}
            value={rate}
            edit={false}
            size={24}
            activeColor="#ffd700"
          />
        </div>
      </div>
    </div>
  );
};

export default LawyersCard;
