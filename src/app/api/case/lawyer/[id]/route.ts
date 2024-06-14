import { Case } from "@/server/case-management/Case";
import { Faq } from "@/server/user-management/Faq";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    const cases = await Case.getLawyerCases(Number(id));
    return NextResponse.json({ cases }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't get lawyer cases" },
      { status: 500 }
    );
  }
}
