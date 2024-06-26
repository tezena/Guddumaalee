import { db } from "@/lib/db";
import { Account } from "./Account";
import bcrypt from "bcrypt";
import { isAdmin, isAuthenticated, isLawyer } from "../checkRole";
import { Court, Language, Specialty } from "@prisma/client";

export class Lawyer extends Account {
  static async add(
    email: string,
    password: string,
    identification_card: string,
    qualification: string,
    languages: Language[],
    specialties: Specialty[],
    courts: Court[],
    photo: string,
    description: string,
    full_name: string,
    phone_number: string,
    cv: string | undefined,
    resume: string | undefined
  ) {
    const emailUsed =
      (await db.client.findFirst({ where: { email } })) ||
      (await db.lawyer.findFirst({ where: { email } }));
    if (emailUsed) {
      throw new Error("Email already used");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.lawyer.create({
      data: {
        phone_number,
        full_name,
        email: email,
        password: hashedPassword,
        identification_card: identification_card,
        qualification: qualification,
        languages: languages,
        specialties: specialties,
        courts: courts,
        photo: photo,
        description: description,
        ...(cv && { cv: cv }),
        ...(resume && { resume: resume }),
      },
    });
    return newUser;
  }

  static async dashboard() {
    const lawyerSession = await isLawyer();
    const lawyer = await db.lawyer.findUnique({
      where: {
        //@ts-ignore
        id: lawyerSession.user.image.id,
      },
    });
    const totalCases = await db.case.count({
      where: {
        lawyer_id: lawyer?.id,
      },
    });
    const completedCases = await db.case.count({
      where: {
        lawyer_id: lawyer?.id,
        status: "FINISHED",
      },
    });

    const inProgressCases = await db.case.count({
      where: {
        lawyer_id: lawyer?.id,
        status: "ACCEPTED",
      },
    });

    const incomePerMonth = await db.transaction.findMany({
      where: {
        status: "TRANSFERRED",
        case: {
          //@ts-ignore
          id: lawyerSession.user.image.id,
        },
      },
      include: {
        case: true,
      },
    });

    const groupedData = new Map();

    incomePerMonth.forEach((entry) => {
      const date = new Date(entry.created_at).toISOString().split("T")[0]; // Extract yyyy-mm-dd
      if (groupedData.has(date)) {
        groupedData.get(date).ticket_count +=
          entry.case.price - entry.case.price * 0.2;
      } else {
        groupedData.set(date, {
          date,
          ticket_count: entry.case.price - entry.case.price * 0.2,
        });
      }
    });

    // Convert Map values to an array
    const filteredIncomePerMonth = Array.from(groupedData.values());

    return {
      inProgressCases,
      completedCases,
      totalCases,
      filteredIncomePerMonth,
    };
  }
  static async getUnverified() {
    await isAdmin();
    const lawyers = await db.lawyer.findMany({
      select: {
        created_at: true,
        cv: true,
        email: true,
        phone_number: true,
        photo: true,
        full_name: true,
        description: true,
        id: true,
        identification_card: true,
        isVerified: true,
        qualification: true,
        resume: true,
        courts: true,
        languages: true,
        specialties: true,
        updatedAt: true,
        balance: true,
      },
      where: {
        isVerified: "PENDING",
      },
    });
    return lawyers;
  }

  static async getVerified() {
    await isAuthenticated();
    const lawyers = await db.lawyer.findMany({
      select: {
        created_at: true,
        cv: true,
        email: true,
        phone_number: true,
        photo: true,
        full_name: true,
        description: true,
        id: true,
        identification_card: true,
        isVerified: true,
        qualification: true,
        resume: true,
        courts: true,
        languages: true,
        specialties: true,
        updatedAt: true,
        balance: true,
        ratings: {
          select: {
            rate: true,
          },
        },
      },
      where: {
        isVerified: "VERIFIED",
      },
    });
    return lawyers;
  }
  static async verify(id: number) {
    await isAdmin();
    const lawyer = await db.lawyer.update({
      where: {
        id,
      },
      data: {
        isVerified: "VERIFIED",
      },
    });
    return lawyer;
  }
  static async reject(id: number) {
    await isAdmin();
    const lawyer = await db.lawyer.update({
      where: {
        id,
      },
      data: {
        isVerified: "REJECTED",
      },
    });
    return lawyer;
  }
  static async update(
    full_name: string | undefined,
    phone_number: string | undefined,
    photo: string | undefined,
    description: string | undefined,
    languages: Language[] | undefined,
    resume: string | undefined
  ) {
    const lawyer = await isLawyer();
    const lawyerUpdated = await db.lawyer.update({
      data: {
        ...(full_name && { full_name }),
        ...(phone_number && { phone_number }),
        ...(photo && { photo }),
        ...(languages?.length && { languages }),
        ...(description && { description }),
        ...(resume && { resume }),
      },
      where: {
        //@ts-ignore
        id: lawyer.user.image.id,
      },
    });
    return lawyerUpdated;
  }
}
