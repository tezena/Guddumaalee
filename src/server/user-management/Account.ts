import { signIn, signOut } from "next-auth/react";

export class Account {
  static async login(email: string, password: string) {
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    return;
  }

  static async logout() {
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
    return;
  }
}
