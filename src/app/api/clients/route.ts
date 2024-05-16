import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const userInput = await req.json();
    if (!userInput.email || !userInput.password) {
      throw new Error("Please provide all the necessary information.");
    }
    const hashedPassword = await bcrypt.hash(userInput.password, 10);
    const newUser = await db.client.create({
      data: {
        email: userInput.email,
        password: hashedPassword,
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

// export async function GET(req: Request, res: Response) {
//   const users = await db.user.findMany()
//   if(users){
//     return NextResponse.json(users);
//   } return NextResponse.json({ "message":"users not found " }, { status: 500 });
// }

export async function GET(req: Request, res: Response) {
  try {
    const clients = await db.client.findMany({
      select: {
        created_at: true,
        email: true,
        id: true,
        updatedAt: true,
      },
    });
    return NextResponse.json({ id: "GET", clients });
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

// export async function PUT(req: Request, res: Response) {
//   try {
//     return NextResponse.json({ id: "PUT" });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(`${error.message}`);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//     return NextResponse.json(
//       { error: "Couldn't update user account" },
//       { status: 500 }
//     );
//   }
// }
