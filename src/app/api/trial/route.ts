import { db } from "@/lib/db";
import { Case } from "@/server/case-management/Case";
import { Client } from "@/server/user-management/Client";
import { Faq } from "@/server/user-management/Faq";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const userInput = await req.json();
    if (!userInput.trial_date || !userInput.case_id || !userInput.location) {
      throw new Error("Please provide all the necessary information.");
    }
    const newTrial = await Case.addTrialDates(
      userInput.trial_date,
      userInput.case_id,
      userInput.description,
      userInput.location
    );
    return NextResponse.json(
      { message: "New trial added", newTrial },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Couldn't add trial" }, { status: 500 });
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const faqs = await Faq.getUnanswered();
    return NextResponse.json({ id: "GET", faqs });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't get lawyers" },
      { status: 500 }
    );
  }
}
