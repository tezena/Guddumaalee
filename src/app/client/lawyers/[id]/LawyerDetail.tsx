import { motion } from "framer-motion";
import { LawyerProps } from "@/components/lawyersCard";
import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import Link from "next/link";
import { reviewData } from "@/app/data/reviewData";
import ReviewSectionCard from "@/components/reviewCard";
import { useContext } from "react";
import { Context } from "@/app/context/userContext";
import { getLawyerById } from "@/app/admin/api/lawyers";
import { useParams } from "next/navigation";
import {
  QueryClient,
  useMutation,
  useQuery,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { languages } from "@/lib/utils";

const LawyerDetail: React.FC<{
  lawyer: LawyerProps;
  lawyers: LawyerProps[];
}> = ({ lawyer, lawyers }) => {
  
  const param = useParams();
  const { id } = param;
const {data,isLoading,error} = useQuery({
  queryKey:['clientlawyer'],
  queryFn:()=>getLawyerById(id)
})


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
  const myContext=useContext(Context)
  const {setUsername2}=myContext

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
              <div onClick={()=>setUsername2("test2@gmail.com")}  >
                <Link
                  href="/chat"
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
                  src={data?.photo}
                  alt={data?.full_name}
                  className="w-full object-cover rounded-t-lg"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute bottom-0 left-0 p-6 bg-gray-800 bg-opacity-75 rounded-br-lg">
                  <h2 className="text-3xl font-semibold text-white">
                    {data?.full_name}
                  </h2>
                </div>
              </motion.div>
              <div className="p-4 md:p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Personal Information
                </h3>
                <p className="text-gray-600 mt-2">{data?.description}</p>
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

                <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                 Languages
                </h3>
                  {
                    data?.languages?.map((language:any)=>(
                      <ul key={language}>
                        <li>{language}</li>
                      </ul>
                    ))
                  }
                 
                </div>
                
                <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Specialties
                </h3>
                  {
                    data?.specialties?.map((specialtie:any)=>(
                      <ul key={specialtie}>
                        <li>{specialtie}</li>
                      </ul>
                    ))
                  }
                 
                </div>
                <hr className="my-6 border-t border-gray-200" />
                <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Courts
                </h3>
                  {
                    data?.courts?.map((courts:any)=>(
                      <ul key={courts}>
                        <li>{courts}</li>
                      </ul>
                    ))
                  }
                 
                </div>
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
