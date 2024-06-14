import { db } from "@/lib/db";
import { Lawyer } from "@/server/user-management/Lawyer";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const userInput = await req.json();
    if (
      !userInput.email ||
      !userInput.password ||
      !userInput.id ||
      !userInput.qualification
    ) {
      throw new Error("Please provide all the necessary information.");
    }
    const newUser = await Lawyer.add(
      userInput.email,
      userInput.password,
      userInput.id,
      userInput.qualification,
      userInput.languages,
      userInput.specialties,
      userInput.courts,
      userInput.photo,
      userInput.description,
      userInput.cv,
      userInput.resume
    );
    return NextResponse.json(
      { message: "New user account created", userId: newUser.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't create user account" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const lawyers = await Lawyer.getUnverified();
    return NextResponse.json({ id: "GET", lawyers });
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

export async function PUT(req: Request, res: Response) {
  try {
    return NextResponse.json({ id: "PUT" });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't update user account" },
      { status: 500 }
    );
  }
}
