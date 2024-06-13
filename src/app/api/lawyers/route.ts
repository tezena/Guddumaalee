import { db } from "@/lib/db";
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

    const hashedPassword = await bcrypt.hash(userInput.password, 10);
    const newUser = await db.lawyer.create({
      data: {
        email: userInput.email,
        password: hashedPassword,
        identification_card: userInput.id,
        qualification: userInput.qualification,
        languages: userInput.languages,
        specialties: userInput.userInput,
        courts: userInput.courts,
        photo: userInput.photo,
        description: userInput.description,
        ...(userInput.cv && { cv: userInput.cv }),
        ...(userInput.resume && { resume: userInput.resume }),
      },
    });
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
    const lawyers = await db.lawyer.findMany({
      select: {
        created_at: true,
        cv: true,
        email: true,
        id: true,
        identification_card: true,
        isVerified: true,
        qualification: true,
        resume: true,
        courts: true,
        languages: true,
        specialties: true,
        updatedAt: true,
      },
      where: {
        isVerified: false,
      },
    });
    return NextResponse.json({ id: "GET", lawyers: lawyers });
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
