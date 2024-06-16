import { Rating } from "@/server/user-management/Rating";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const userInput = await req.json();
    if (
      !userInput.lawyer_id ||
      !userInput.case_id ||
      !userInput.rate ||
      !userInput.comment
    ) {
      throw new Error("Please provide all the necessary information.");
    }
    const newRating = await Rating.rateLawyer(
      userInput.lawyer_id,
      userInput.case_id,
      userInput.rate,
      userInput.comment
    );
    return NextResponse.json(
      { message: "New rating created", newRating },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't rate lawyer" },
      { status: 500 }
    );
  }
}
