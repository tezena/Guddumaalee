import { Shell } from "@/components/shells/shell";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import ActionsButton from "./components/ActionsButton";
import { SiteHeader } from "@/components/layouts/header";
import HeroSection from "./components/hersoSection";
import FAQ from "./components/FAQ";

const LandingPage = async () => {
  let session: any = await getServerSession(authOptions);

  if (session?.user?.image?.type === "admin") {
    console.log(session?.user?.image?.type);
    
    redirect("/admin");
  }
  return (
    <div className=" h-full  flex flex-col w-full ">
      <HeroSection />
      <FAQ />
    </div>
  );
};

export default LandingPage;
