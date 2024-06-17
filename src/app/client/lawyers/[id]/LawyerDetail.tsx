import { motion } from "framer-motion";
import { LawyerProps } from "@/components/lawyersCard";
import React, { useState, useContext } from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { reviewData } from "@/app/data/reviewData";
import ReviewSectionCard from "@/components/reviewCard";
import { Context } from "@/app/context/userContext";
import { getLawyerById } from "@/app/admin/api/lawyers";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import RatingPopup from "@/components/ratingpop";
import { useSession } from "next-auth/react";
import { getAverageRating, getRatings } from "../../api/rating";

// lawyer: LawyerProps;

const LawyerDetail: React.FC<{ lawyers: LawyerProps[] }> = ({ lawyers }) => {
  const param = useParams();
  const { id } = param;
  const {
    data: lawyerData,
    isLoading: lawyerLoading,
    error: lawyerError,
  } = useQuery({
    queryKey: ["clientlawyer"],
    queryFn: () => getLawyerById(id),
  });

  const lawyer_id = Number(id);
  const {
    data: Lawyerratings,
    isLoading: ratingsLoading,
    error: ratingsError,
  } = useQuery({
    queryKey: ["ratings"],
    queryFn: () => getRatings(lawyer_id),
  });

  const {
    data: averageRate,
    isLoading: averageRateing,
    error: averageRater,
  } = useQuery({
    queryKey: ["average"],
    queryFn: () => getAverageRating(lawyer_id),
  });

  const { data: sesstion } = useSession();
  // @ts-ignore
  const client_id = sesstion?.user?.image?.id;

  const lawyerReviews = reviewData.filter(
    (review) => String(review.lawyerId) === lawyerData?.id
  );
  const clientNames = lawyerReviews.map((review) => review.clientName);
  const ratings = lawyerReviews.map((review) => review.rating);
  const comments = lawyerReviews.map((review) => review.comment);
  const [hoveredLawyer, setHoveredLawyer] = useState<LawyerProps | null>(null);
  const filteredLawyers = lawyers?.filter((item) => item.id !== lawyerData?.id);
  const myContext = useContext(Context);

  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={i} color={i < rating ? "#ffd700" : "#e4e5e9"} />);
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto mt-10 px-4 md:px-0"
    >
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
              {filteredLawyers?.map((otherLawyer: any) => (
                <li
                  key={otherLawyer.id}
                  className="mb-4 p-2 rounded-lg hover:bg-gray-200 transition-all"
                  onMouseEnter={() => setHoveredLawyer(otherLawyer)}
                  onMouseLeave={() => setHoveredLawyer(null)}
                >
                  <Link
                    href={`/client/lawyers/${otherLawyer.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {otherLawyer?.full_name}
                  </Link>
                  {hoveredLawyer && hoveredLawyer.id === otherLawyer.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-1 bg-white shadow rounded-lg p-2"
                    >
                      <p className="text-sm text-gray-600">
                        {otherLawyer.description}
                      </p>
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
                  href={`/chat2/${lawyerData?.id}`}
                  className="bg-[#7B3B99] text-white font-bold py-2 px-4 rounded hover:bg-purple-700 inline-block mr-2"
                >
                  Chat with Lawyer
                </Link>
                <button
                  onClick={handleOpenPopup}
                  className="bg-[#7B3B99] text-white font-bold py-2 px-4 rounded hover:bg-purple-700 inline-block"
                >
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
                  src={lawyerData?.photo}
                  alt={lawyerData?.full_name}
                  className="w-full object-cover rounded-t-lg"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute bottom-0 left-0 p-6 bg-gray-800 bg-opacity-75 rounded-br-lg">
                  <h2 className="text-3xl font-semibold text-white">
                    {lawyerData?.full_name}
                  </h2>
                </div>
              </motion.div>
              <div className="p-4 md:p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Personal Information
                </h3>
                <p className="text-gray-600 mt-2">{lawyerData?.description}</p>
                <div className="flex items-center mt-4">
                  <div className="flex items-center mt-2">
                    {renderStars(averageRate)}
                  </div>
                </div>
                <hr className="my-6 border-t border-gray-200" />

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Languages
                  </h3>
                  <ul className="list-disc pl-5">
                    {lawyerData?.languages?.map((language: any) => (
                      <li key={language} className="text-gray-600">
                        {language}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Specialties
                  </h3>
                  <ul className="list-disc pl-5">
                    {lawyerData?.specialties?.map((specialtie: any) => (
                      <li key={specialtie} className="text-gray-600">
                        {specialtie}
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="my-6 border-t border-gray-200" />

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Courts
                  </h3>
                  <ul className="list-disc pl-5">
                    {lawyerData?.courts?.map((court: any) => (
                      <li key={court} className="text-gray-600">
                        {court}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="p-4 mt-8">
          <h2 className="text-xl font-semibold mb-4 text-black text-center">
            Client Comments and Reviews
          </h2>
          {Lawyerratings?.map((clientName: any, index: any) => (
            <ReviewSectionCard
              key={index}
              clientName={clientName.name}
              rating={clientName.rate}
              comment={clientName.comment}
            />
          ))}
        </div>
      </motion.div>
      <RatingPopup
        show={showPopup}
        onClose={handleClosePopup}
        case_id={client_id}
        lawyer_id={lawyerData?.id}
      />
    </motion.div>
  );
};

export default LawyerDetail;
