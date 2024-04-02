import { Shell } from "@/components/shells/shell";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import ActionsButton from "./_components/ActionsButton";
import { SiteHeader } from "@/components/layouts/header";

const Home = async () => {
  let session: any = await getServerSession(authOptions);

  if (session?.user?.image?.type == "SELLER") {
    redirect("/dashboard");
  }
  return (
    <>
      <SiteHeader />
      <Shell className="max-w-7xl">
        <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 py-24 text-center md:py-32">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Gudduumalee.
          </h1>
          <p className="max-w-[42rem] text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Seamlessly connect with a diverse network of lawyers across the
            country, making finding and trading legal services effortless.
          </p>
          <ActionsButton />
        </section>
      </Shell>
    </>
  );
};

export default Home;
