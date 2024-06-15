import { db } from "@/lib/db";
import { Account } from "./Account";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { isAdmin, isAuthenticated } from "../checkRole";

export class Faq extends Account {
  static async add(question: string) {
    const newFaq = await db.faq.create({
      data: {
        question,
      },
    });
    return newFaq;
  }

  static async getAnswered() {
    const faqs = await db.faq.findMany({
      where: {
        NOT: {
          reply: null,
        },
      },
    });
    return faqs;
  }

  static async getUnanswered() {
    await isAdmin();
    const faqs = await db.faq.findMany({
      where: {
        reply: null,
      },
    });
    return faqs;
  }

  static async delete(id: number) {
    await isAdmin();
    await db.faq.delete({
      where: {
        id,
      },
    });
    return;
  }

  static async answer(id: number, reply: string) {
    await isAdmin();
    const faq = await db.faq.update({
      where: {
        id,
      },
      data: {
        reply,
      },
    });
    return faq;
  }
}
