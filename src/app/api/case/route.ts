import { db } from "@/lib/db";
import { Case } from "@/server/case-management/Case";
import { Client } from "@/server/user-management/Client";
import { Faq } from "@/server/user-management/Faq";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const userInput = await req.json();
    if (
      !userInput.client_id ||
      !userInput.lawyer_id ||
      !userInput.title ||
      !userInput.description ||
      !userInput.price
    ) {
      throw new Error("Please provide all the necessary information.");
    }
    const newCase = await Case.create(
      userInput.client_id,
      userInput.lawyer_id,
      userInput.title,
      userInput.description,
      userInput.price
    );
    return NextResponse.json(
      { message: "New case created", newCase },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't create case" },
      { status: 500 }
    );
  }
}
