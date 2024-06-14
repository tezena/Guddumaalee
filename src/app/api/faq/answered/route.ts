import { Faq } from "@/server/user-management/Faq";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const faqs = await Faq.getAnswered();
    return NextResponse.json({ id: "GET", faqs });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Couldn't get faqs" }, { status: 500 });
  }
}
