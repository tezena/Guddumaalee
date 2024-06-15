import { db } from "@/lib/db";
import { isAuthenticated, isClient, isLawyer } from "../checkRole";

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

  static async addTrialDates(
    trial_date: Date,
    case_id: number,
    description: string,
    location: string
  ) {
    await isLawyer();
    const newTrial = await db.trial.create({
      data: {
        case_id,
        trial_date,
        description,
        location,
      },
    });
    return newTrial;
  }

  static async getUpcomingTrials() {
    const lawyer = await isLawyer();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const trials = await db.trial.findMany({
      where: {
        trial_date: {
          gte: today,
        },
        case: {
          //@ts-ignore
          lawyer_id: lawyer.user.image.id,
        },
      },
    });
    return trials;
  }
  static async getTrialsForCase(case_id: number) {
    await isAuthenticated();
    const trials = await db.trial.findMany({
      where: {
        case_id,
      },
    });
    return trials;
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
