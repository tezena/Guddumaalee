import { db } from "@/lib/db";
import { isClient, isLawyer } from "../checkRole";

export class Case {
  static async create(
    client_id: number,
    lawyer_id: number,
    title: string,
    description: string,
    price: number
  ) {
    const newCase = await db.case.create({
      data: {
        client_id,
        lawyer_id,
        title,
        description,
        price,
      },
    });
    return newCase;
  }

  static async getClientCases(client_id: number) {
    await isClient();
    const cases = await db.case.findMany({
      where: {
        client_id,
        status: "ACCEPTED",
      },
    });
    return cases;
  }
  static async getLawyerCases(lawyer_id: number) {
    await isLawyer();
    const cases = await db.case.findMany({
      where: {
        lawyer_id,
        status: "ACCEPTED",
      },
    });
    return cases;
  }
  static async acceptOffer(case_id: number) {
    const client = await isClient();
    const acceptedCase = await db.case.updateMany({
      where: {
        //@ts-ignore
        client_id: client.user.image.id,
        id: case_id,
      },
      data: {
        status: "ACCEPTED",
      },
    });
    return acceptedCase;
  }
  static async rejectOffer(case_id: number) {
    const client = await isClient();
    const rejectedCase = await db.case.updateMany({
      where: {
        //@ts-ignore
        client_id: client.user.image.id,
        id: case_id,
      },
      data: {
        status: "REJECTED",
      },
    });
    return rejectedCase;
  }

  static async withdrawOffer(case_id: number) {
    const lawyer = await isLawyer();
    const withdrawnCase = await db.case.updateMany({
      where: {
        //@ts-ignore
        lawyer_id: lawyer.user.image.id,
        id: case_id,
      },
      data: {
        status: "WITHDRAWN",
      },
    });
    return withdrawnCase;
  }
}
