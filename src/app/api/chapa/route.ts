import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
 


const CHAPA_AUTH_KEY="CHASECK_TEST-7l9kRRN26RO31Kdt8klmRM7Yzfet2EZ3"


export  async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {

  console.log("reached here 1.")
  try {
    const {
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
    } = req.body;

   
    const header = {
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH_KEY}`,
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
      return_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60", 
    };
    let resp:any = "";

  console.log("reached here 2.")
    
    await axios
      .post("https://api.chapa.co/v1/transaction/initialize", body, header)
      .then((response) => {

        resp = response;
        console.log(response.data)
      })
      .catch((error) => {
        
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        return NextResponse.json({ message:error }, { status: 400 });
        
      
      });
      console.log("reached here 3.")

      console.log(resp)
      return NextResponse.json({ data:resp }, { status: 200 });



  } catch (error:any) {

    return NextResponse.json({ message:error.message,error_code:error.code }, { status: 400 });

   
  }
}