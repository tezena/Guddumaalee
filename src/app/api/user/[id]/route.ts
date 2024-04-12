import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(params.id);

  console.log("this is from kid get");

  const user = await db.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (user != null) {
    return NextResponse.json({ user }, { status: 200 });
  } else return NextResponse.json({ message: "error on fetching user" });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await req.json();

  const profile = await db.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (profile != null) {
    try {
      const updatedProfile = await db.user.update({
        where: {
          id: profile.id,
        },
        data: {
          email: user.email,
        },
      });

      return NextResponse.json({ message: "User updated successfully", profile: updatedProfile });
    } catch (error) {
      console.error('Error updating user:', error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}
