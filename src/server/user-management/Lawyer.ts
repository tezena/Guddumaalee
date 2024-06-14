import { db } from "@/lib/db";
import { Account } from "./Account";
import bcrypt from "bcrypt";
import { isAdmin, isAuthenticated } from "../checkRole";

export class Lawyer extends Account {
  static async add(email: string, password: string) {
    const emailUsed =
      (await db.client.findFirst({ where: { email } })) ||
      (await db.lawyer.findFirst({ where: { email } }));
    if (emailUsed) {
      throw new Error("Email already used");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.client.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
    return newUser;
  }

  static async getAll() {
    await isAdmin();
    const clients = await db.client.findMany({
      select: {
        created_at: true,
        email: true,
        id: true,
        updatedAt: true,
      },
    });
    return clients;
  }
}
