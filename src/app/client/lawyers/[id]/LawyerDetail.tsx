import { motion } from "framer-motion";
import { LawyerProps } from "@/components/lawyersCard";
import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import Link from "next/link";
import { reviewData } from "@/app/data/reviewData";
import ReviewSectionCard from "@/components/reviewCard";
const LawyerDetail: React.FC<{
  lawyer: LawyerProps;
  lawyers: LawyerProps[];
}> = ({ lawyer, lawyers }) => {
  const lawyerReviews = reviewData.filter(
    (review) => String(review.lawyerId) === lawyer.id
  );
  // const lawyerReviews=reviewData

  // Extract client names, ratings, and comments from reviews
  const clientNames = lawyerReviews.map((review) => review.clientName);
  const ratings = lawyerReviews.map((review) => review.rating);
  const comments = lawyerReviews.map((review) => review.comment);
  const [hoveredLawyer, setHoveredLawyer] = useState<LawyerProps | null>(null);
  const filteredLawyers = lawyers.filter((item) => item.id !== lawyer.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto mt-10 px-4 md:px-0"
    >
      {/* <motion.div className="flex justify-between"> */}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-gray-100 p-4 rounded-lg md:p-8 flex lg:flex-col"
      >
        <motion.div className="flex justify-between">
          <div className="md:w-1/4 md:mr-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Other Lawyers
            </h3>
            <ul>
              {filteredLawyers.map((otherLawyer) => (
                <li
                  key={otherLawyer.id}
                  className="mb-2"
                  onMouseEnter={() => setHoveredLawyer(otherLawyer)}
                  onMouseLeave={() => setHoveredLawyer(null)}
                >
                  <Link
                    href={`/client/lawyers/${otherLawyer.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {otherLawyer.name}
                  </Link>
                  {hoveredLawyer && hoveredLawyer.id === otherLawyer.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-1 bg-white shadow rounded-lg p-2"
                    >
                      <p className="text-sm text-gray-600">{otherLawyer.des}</p>
                    </motion.div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="md:w-3/4"
          >
            <div className="mb-4 flex justify-between items-center">
              <Link
                href="/client/lawyers"
                className="bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0"
              >
                Back
              </Link>
              <div>
                <Link
                  href="/client/lawyers/{id}/chat"
                  className="bg-[#7B3B99] text-white font-bold py-2 px-4 rounded hover:bg-purple-700 inline-block mr-2"
                >
                  Chat with Lawyer
                </Link>
                <button className="bg-[#7B3B99] text-white font-bold py-2 px-4 rounded hover:bg-purple-700 inline-block">
                  Review & Rate
                </button>
              </div>
            </div>

            <div className="max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="relative"
              >
                <motion.img
                  src={lawyer.imageUrl}
                  alt={lawyer.name}
                  className="w-full object-cover rounded-t-lg"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute bottom-0 left-0 p-6 bg-gray-800 bg-opacity-75 rounded-br-lg">
                  <h2 className="text-3xl font-semibold text-white">
                    {lawyer.name}
                  </h2>
                </div>
              </motion.div>
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
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Experience
                </h3>
                <ul className="list-disc list-inside">
                  <li>Position: Divorce Lawyer</li>
                  <li>
                    Practice Area: Family Lawyer, Criminal Defence, Personal
                    Injury
                  </li>
                  <li>Experience: 10 Years</li>
                </ul>
                <hr className="my-6 border-t border-gray-200" />
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Education & Court Admissions
                </h3>
                <ul className="list-disc list-inside">
                  <li>
                    Admization Institute of Law and Technology, Juzment School
                    of Management, Cambridge
                  </li>
                  <li>Academy University School of Law, Boston, MA</li>
                  <li>The Syntify High School Of New York</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="   p-4 mt-8">
          <h2 className="text-xl font-semibold mb-4 text-black text-center">
            Client Comments and Reviews
          </h2>
          {clientNames.map((clientName, index) => (
            <ReviewSectionCard
              key={index}
              clientName={clientName}
              rating={ratings[index]}
              comment={comments[index]}
            />
          ))}
        </div>
      </motion.div>

      {/* </motion.div> */}
    </motion.div>
  );
};

export default LawyerDetail;
