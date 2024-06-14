import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { json } from "stream/consumers";
import { Payment } from "@/server/payment-management/Payment";

export async function POST(req: Request, res: Response) {
  try {
    const paymentInput = await req.json();
    if (!paymentInput.amount || !paymentInput.email || !paymentInput.case_id) {
      throw new Error("Please provide all the necessary information.");
    }
    const { amount, email, first_name, last_name, phone_number, case_id } =
      paymentInput;

    const checkout_url = await Payment.initiate(
      email,
      first_name,
      last_name,
      phone_number,
      case_id
    );

    return NextResponse.json(
      //@ts-ignore
      { checkout_url },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Couldn't do payment" }, { status: 500 });
  }
}
