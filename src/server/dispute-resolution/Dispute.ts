import { db } from "@/lib/db";
import { isAdmin, isClient, isLawyer } from "../checkRole";

export class Dispute {
  static async create(
    client_id: number,
    lawyer_id: number,
    creator_email: string,
    content: string
  ) {
    const newDispute = await db.dispute.create({
      data: {
        client_id,
        lawyer_id,
        creator_email,
        content,
      },
    });
    return newDispute;
  }

  static async getAll() {
    await isAdmin();
    const disputes = await db.dispute.findMany({
      include: {
        lawyer: {
          select: {
            email: true,
            full_name: true,
            phone_number: true,
          },
        },
        client: {
          select: {
            email: true,
            full_name: true,
            phone_number: true,
          },
        },
      },
    });
    return disputes;
  }

  static async accept(id: number) {
    await isAdmin();
    const acceptedDispute = await db.dispute.update({
      where: { id },
      data: {
        status: "ACCEPTED",
      },
    });
    return acceptedDispute;
  }

  static async getForLawyer(lawyer_id: number) {
    await isLawyer();
    const disputes = await db.dispute.findMany({
      where: {
        lawyer_id,
      },
      include: {
        client: {
          select: {
            full_name: true,
            email: true,
            phone_number: true,
          },
        },
      },
    });
    return disputes;
  }

  static async getForClient(client_id: number) {
    await isClient();
    const disputes = await db.dispute.findMany({
      where: {
        client_id,
      },
      include: {
        lawyer: {
          select: {
            email: true,
            full_name: true,
            phone_number: true,
          },
        },
      },
    });
    return disputes;
  }
  static async resolve(id: number) {
    await isAdmin();
    const resolvedDispute = await db.dispute.update({
      where: { id },
      data: {
        status: "RESOLVED",
      },
    });
    return resolvedDispute;
  }
}
