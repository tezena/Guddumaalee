import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import { json } from 'stream/consumers';
 


const CHAPA_AUTH_KEY=process.env.NEXT_PUBLIC_CHAPA_AUTH_KEY


export  async function POST(
  req: Request,
  res: Response
) {

  try {
    const paymentInput= await req.json();
   
    if(!paymentInput.amount || !paymentInput.currency || !paymentInput.tx_ref){
      throw new Error("Please provide all the necessary information.");
    }
    const {
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
    } = paymentInput;

     
   
    const header = {
      headers: {
        "Authorization": `Bearer ${CHAPA_AUTH_KEY}`,
        "Content-Type": "application/json",
      },
    };
    const body = {
      amount: amount,
      currency: currency,
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      tx_ref: tx_ref,
      return_url: "http://localhost:3000/client/lawyers", 
    };
   
    
 const response =   await axios
      .post<any>("https://api.chapa.co/v1/transaction/initialize", body, header)
      .catch((error) => {
        
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);


        return NextResponse.json({ message:error }, { status: 400 });
        
      
      });


      if ('data' in response) {
        const responseData = response.data;
  

        const responseObject = {
          data: responseData,
          status: 200
        };
        
        console.log(responseObject.data)
        return NextResponse.json(responseObject);
      }
      

  } catch (error:any) {
   
    console.log(error.message)

    return NextResponse.json({ message:error.message,error_code:error.code }, { status: 400 });

   
  }
  

}