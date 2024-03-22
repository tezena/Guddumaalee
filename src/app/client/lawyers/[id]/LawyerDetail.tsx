import { LawyerProps } from "@/components/lawyersCard";
import React from "react";
import ReactStars from "react-rating-stars-component";
import Link from "next/link";

const LawyerDetail: React.FC<{ lawyer: LawyerProps; lawyers: LawyerProps[] }> = ({ lawyer }) => {
  return (
    <div className="container mx-auto mt-10 px-4 md:px-0">
      <div className="bg-gray-100 p-4 rounded-lg md:p-8">
        <div className="mb-4 md:flex md:items-center md:justify-between">
          <Link href="/client/lawyers"  className="bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0">
          
              Back
            
          </Link>
          <div>
            <Link href="/client/lawyers/{id}/chat" className="bg-[#7B3B99] text-white font-bold py-2 px-4 rounded hover:bg-purple-700 inline-block mr-2">
             
                Chat with Lawyer
             
            </Link>
            <button className="bg-[#7B3B99] text-white font-bold py-2 px-4 rounded hover:bg-purple-700 inline-block">
              Review & Rate
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 gap-4">
          <div className="relative">
            <img
              src={lawyer.imageUrl}
              alt={lawyer.name}
              className="w-full object-cover rounded-t-lg"
            />
            <div className="absolute bottom-0 left-0 p-6 bg-gray-800 bg-opacity-75 rounded-br-lg">
              <h2 className="text-3xl font-semibold text-white">{lawyer.name}</h2>
            </div>
          </div>
          <div className="p-4 md:p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h3>
            <p className="text-gray-600 mt-2">{lawyer.des}</p>
            <div className="flex items-center mt-4">
              <ReactStars
                count={5}
                value={lawyer.rate}
                edit={false}
                size={24}
                activeColor="#ffd700"
              />
              <span className="ml-2 text-gray-600">{lawyer.rate}/5</span>
            </div>
            <hr className="my-6 border-t border-gray-200" />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Experience</h3>
            <ul className="list-disc list-inside">
              <li>Position: Divorce Lawyer</li>
              <li>Practice Area: Family Lawyer, Criminal Defence, Personal Injury</li>
              <li>Experience: 10 Years</li>
            </ul>
            <hr className="my-6 border-t border-gray-200" />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Education & Court Admissions</h3>
            <ul className="list-disc list-inside">
              <li>Admization Institute of Law and Technology, Juzment School of Management, Cambridge</li>
              <li>Academy University School of Law, Boston, MA</li>
              <li>The Syntify High School Of New York</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerDetail;
