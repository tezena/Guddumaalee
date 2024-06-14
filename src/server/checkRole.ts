import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function isAuthenticated() {
  let session = await getServerSession(authOptions);
  if (session) {
    return true;
  }
  if (!session) {
    throw new Error("You're not authenticated!");
  }
}

export async function isLawyer() {
  let session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("You're not authenticated!");
  }
  //@ts-ignore
  if (session.user.image.type !== "lawyer") {
    throw new Error("You're not authorized!");
  }
  return session;
}

export async function isClient() {
  let session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("You're not authenticated!");
  }
  //@ts-ignore
  if (session.user.image.type !== "client") {
    throw new Error("You're not authorized!");
  }
  return session;
}

export async function isAdmin() {
  let session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("You're not authenticated!");
  }
  //@ts-ignore
  if (session.user.image.type !== "admin") {
    throw new Error("You're not authorized!");
  }
}
