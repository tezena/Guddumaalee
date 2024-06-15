import { Case } from "@/server/case-management/Case";
import { Dispute } from "@/server/dispute-resolution/Dispute";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    const disputes = await Dispute.getForClient(Number(id));
    return NextResponse.json({ disputes });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't get disputes" },
      { status: 500 }
    );
  }
}
