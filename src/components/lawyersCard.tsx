"use client"
import React from "react"
import { Rating } from 'react-simple-star-rating'


interface Props{
    id :string,
    name:string,
    des:string,
    imageUrl:string,
    rate:number
}
const LawyersCard:React.FC<Props> = ({id,name,imageUrl,des,rate})=>{

   return (
    <div className="text-start mx-2 bg-white rounded-lg shadow-lg overflow-hidden max-w-xs w-full transform transition duration-500 hover:scale-105">
        <img src="https://img.freepik.com/free-photo/portrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710288000&semt=ais" alt="Mountain" className="w-full h-64 object-cover"/>

        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
            <p className="text-gray-700 text-sm leading-tight mb-4">
              {des}
            </p>
            <div className="flex felx-row">
            {/* <Rating  initialValue={rate} readonly={true} allowFraction={true} /> */}
            
            </div>
           
        </div>
    </div>

   )

}


export default LawyersCard