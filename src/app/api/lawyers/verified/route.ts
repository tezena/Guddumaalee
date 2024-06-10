import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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
        updatedAt: true,
      },
      where: {
        isVerified: true,
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
