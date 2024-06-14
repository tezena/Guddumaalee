"use client";
import { Button } from "@/components/ui/button";
import { url } from "inspector";
import { useSession } from "next-auth/react";
import Link from "next/link";

const HeroSection = () => {
  const { data: session } = useSession();
  return (
    <section
      className={` bg-cover bg-center bg-no-repeat  bg-hero-section w-full  relative `}
    >
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 sm:bg-gradient-to-r h-full"></div>

      <div className="relative mx-auto max-w-screen-2xl px-4 py-24 lg:py-6 sm:px-6 lg:flex lg:h-[calc(100vh-82px)] lg:items-center lg:px-8">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Your Bridge to
            <strong className="block font-extrabold text-[#7B3B99]">
              {" "}
              Legal Expertise.{" "}
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Empowering You with Comprehensive Legal Solutions and Expertise,
            Bridging the Gap Between Legal Complexity and Your Peace of Mind !
          </p>

          <>
            {!session && (
              <div className="mt-8 flex flex-wrap gap-4 text-center">
                <Button className="block w-full rounded bg-[#7B3B99] px-12 py-3 text-sm font-medium text-white shadow  focus:outline-none focus:ring  sm:w-auto">
                  Get Lawyers
                </Button>
                <Link
                  href="/signup"
                  className="block w-full rounded bg-[#7B3B99] px-12 py-3 text-sm font-medium text-white shadow hover:text-white focus:outline-none focus:ring  sm:w-auto"
                >
                  Become a Lawyer
                </Link>
              </div>
            )}
          </>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
