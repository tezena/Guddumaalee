import { db } from "@/lib/db";
import { Case } from "@/server/case-management/Case";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    const caseById = await db.case.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json({ caseById }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Couldn't get case" }, { status: 500 });
  }
}
