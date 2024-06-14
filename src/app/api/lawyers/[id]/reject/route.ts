import { db } from "@/lib/db";
import { Lawyer } from "@/server/user-management/Lawyer";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  if (!params.id) {
    throw new Error("Provide the lawyer id");
  }
  try {
    const lawyer = await Lawyer.reject(Number(params.id));
    return NextResponse.json({ message: "Lawyer rejected", lawyer: lawyer.id });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't reject lawyer" },
      { status: 500 }
    );
  }
}
