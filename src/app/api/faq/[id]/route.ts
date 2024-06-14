import { Faq } from "@/server/user-management/Faq";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const userInput = await req.json();
    const id = params.id;

    if (!userInput.reply) {
      throw new Error("Please provide the reply");
    }
    const updatedFaq = await Faq.answer(Number(id), userInput.reply);
    return NextResponse.json({ updatedFaq });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Couldn't delete faq" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    await Faq.delete(Number(id));
    return NextResponse.json({ id, message: "deleted" });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Couldn't delete faq" }, { status: 500 });
  }
}
