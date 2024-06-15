import { db } from "@/lib/db";
import { Account } from "./Account";
import bcrypt from "bcrypt";
import { isAdmin, isAuthenticated } from "../checkRole";
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
      },
      where: {
        isVerified: "PENDING",
      },
    });
    return lawyers;
  }

  static async getVerified() {
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
}
