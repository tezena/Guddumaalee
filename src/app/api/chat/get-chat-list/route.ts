import { db } from "@/lib/db";
import { authOptions } from "@/server/auth";
import { isAuthenticated } from "@/server/checkRole";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    let session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Not authenticated");
    }
    const chatList =
      //@ts-ignore
      session.user.image.type == "client"
        ? await db.message.findMany({
            where: {
              //@ts-ignore
              clientId: session.user.image.id,
            },
            orderBy: {
              createdAt: "desc",
            },
            distinct: "lawyerId",
            select: {
              lawyer: {
                select: {
                  id: true,
                  email: true,
                  photo: true,
                  full_name: true,
                },
              },
              message: true,
            },
          })
        : await db.message.findMany({
            where: {
              //@ts-ignore
              lawyerId: session.user.image.id,
            },
            orderBy: {
              createdAt: "desc",
            },
            distinct: "clientId",
            select: {
              client: {
                select: {
                  id: true,
                  email: true,
                  photo: true,
                  full_name: true,
                },
              },
              message: true,
            },
          });

    return NextResponse.json({ chatList });
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
