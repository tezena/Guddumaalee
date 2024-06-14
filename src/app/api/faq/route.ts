import { db } from "@/lib/db";
import { Client } from "@/server/user-management/Client";
import { Faq } from "@/server/user-management/Faq";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const userInput = await req.json();
    if (!userInput.question) {
      throw new Error("Please provide all the necessary information.");
    }
    const newFaq = await Faq.add(userInput.question);
    return NextResponse.json(
      { message: "New Faq account created", faqId: newFaq.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Couldn't add faq" }, { status: 500 });
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const faqs = await Faq.getAll();
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
