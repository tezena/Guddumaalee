import { Lawyer, data } from '@/app/data/lawyersMockData'
import { LawyerProps } from '@/components/lawyersCard'
import React, { useState } from 'react'
import ReactStars from "react-rating-stars-component";


const LawyerDetail = ({lawyer}:{lawyer:LawyerProps}) => {
  return (
   <div className='w-full'>
      <div className="container mx-auto mt-10 ">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <img
          src={lawyer.imageUrl}
          alt={lawyer.name}
          className="rounded-lg object-cover w-full h-61"
        />
        <div className="mt-8">
          <h2 className="text-3xl font-semibold">{lawyer.name}</h2>
          <p className="text-gray-600 mt-2">{lawyer.des}</p>
          <div className="flex felx-row">
          <ReactStars
            count={5}
            value={lawyer.rate}
            edit={false}
            size={24}
            activeColor="#ffd700"
          />
        </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LawyerDetail
