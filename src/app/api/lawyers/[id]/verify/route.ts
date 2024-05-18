import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    throw new Error("Provide the lawyer id");
  }
  try {
    const user = await db.lawyer.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        isVerified: true,
      },
    });
    return NextResponse.json({ message: "Lawyer verified", lawyer: user.id });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't verify lawyer" },
      { status: 500 }
    );
  }
}

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   if (!params.id) {
//     throw new Error("Provide the lawyer id");
//   }
//   const user = await req.json();

//   const profile = await db.user.findUnique({
//     where: {
//       id: parseInt(params.id),
//     },
//   });

//   if (profile != null) {
//     try {
//       const updatedProfile = await db.user.update({
//         where: {
//           id: profile.id,
//         },
//         data: {
//           email: user.email,
//         },
//       });

//       return NextResponse.json({
//         message: "User updated successfully",
//         profile: updatedProfile,
//       });
//     } catch (error) {
//       console.error("Error updating user:", error);
//       return NextResponse.json(
//         { message: "Internal server error" },
//         { status: 500 }
//       );
//     }
//   } else {
//     return NextResponse.json({ message: "User not found" }, { status: 404 });
//   }
// }
