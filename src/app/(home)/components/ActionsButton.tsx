"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const ActionsButton = () => {
  const { data: session } = useSession();
  return (
    <>
      {!session && (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild>
            <Link href="/signup">
              Find Lawyers
              <span className="sr-only">Find Lawyers</span>
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/signup">
              Become a lawyer
              <span className="sr-only">Become a lawyer</span>
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default ActionsButton;
