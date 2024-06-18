import axios from "axios";
import { isAdmin, isClient, isLawyer } from "../checkRole";
import { db } from "@/lib/db";

export class Payment {
  static readonly CHAPA_AUTH_KEY: string =
    process.env.NEXT_PUBLIC_CHAPA_AUTH_KEY!;
  static readonly CALLBACK_URL: string = process.env.CHAPA_CALLBACK_URL!;
  static readonly REDIRECT_URL: string = process.env.CHAPA_REDIRECT_URL!;

  static async initiate(
    email: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    case_id: number
  ) {
    const client = await isClient();
    const header = {
      headers: {
        Authorization: `Bearer ${this.CHAPA_AUTH_KEY}`,
        "Content-Type": "application/json",
      },
    };
    const TEXT_REF =
      "gudduumalee" +
      //@ts-ignore
      client.user.image.id +
      Date.now();

    const currentCase = await db.case.findUnique({
      where: {
        id: case_id,
      },
    });
    if (!currentCase) {
      throw new Error("Case doesn't exist");
    }
    const body = {
      amount: currentCase.price,
      currency: "ETB",
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      tx_ref: TEXT_REF,
      callback_url: this.CALLBACK_URL + TEXT_REF,
      return_url: this.REDIRECT_URL,
    };

    const response = await axios.post<any>(
      "https://api.chapa.co/v1/transaction/initialize",
      body,
      header
    );
    await db.case.update({
      where: {
        id: case_id,
      },
      data: {
        payment_id: TEXT_REF,
      },
    });
    return response.data.data.checkout_url;
  }

  static async verify(transactionId: string) {
    console.log(transactionId);

    const config = {
      headers: {
        Authorization: `Bearer ${this.CHAPA_AUTH_KEY}`,
      },
    };

    await axios.get(
      "https://api.chapa.co/v1/transaction/verify/" + transactionId,
      config
    );
    const acceptedCase = await db.case.update({
      where: {
        payment_id: transactionId,
      },
      data: {
        status: "ACCEPTED",
      },
    });
    await db.transaction.create({
      data: {
        payment_id: transactionId,
        case_id: acceptedCase.id,
        paid_at: new Date(),
      },
    });
    return acceptedCase;
  }
  static async getTransactionHistory() {
    await isAdmin();
    const transactionHistory = await db.transaction.findMany({
      include: {
        case: true,
      },
    });
    return transactionHistory;
  }
  static async requestWithdrawal(amount: number) {
    const lawyerSession = await isLawyer();
    const lawyer = await db.lawyer.findUnique({
      where: {
        //@ts-ignore
        id: lawyerSession.user.image.id,
      },
    });
    if (!lawyer) {
      throw new Error("Lawyer doesn't exist");
    }
    if (lawyer?.balance < amount) {
      throw new Error("Insufficient balance.");
    }
    const newWithdrawRequest = await db.withdrawRequest.create({
      data: {
        amount,
        //@ts-ignore
        lawyer_id: lawyerSession.user.image.id,
      },
    });
    return newWithdrawRequest;
  }
  static async withdrawalRequestHistory() {
    await isAdmin();
    const withdrawRequestHistory = await db.withdrawRequest.findMany();
    return withdrawRequestHistory;
  }
  static async pay(withdrawRequestId: number) {
    await isAdmin();
    const withdrawRequest = await db.withdrawRequest.findUnique({
      where: {
        id: withdrawRequestId,
        status: "PENDING",
      },
    });
    await db.lawyer.update({
      where: {
        id: withdrawRequest?.lawyer_id,
      },
      data: {
        balance: {
          decrement: withdrawRequest?.amount,
        },
      },
    });
    const acceptedWithdrawRequest = await db.withdrawRequest.update({
      where: {
        id: withdrawRequest?.id,
      },
      data: {
        status: "TRANSFERRED",
      },
    });
    return acceptedWithdrawRequest;
  }
}
