"use client";
import React, { useEffect, useState } from "react";
import LawyerDetail from "./LawyerDetail";
import { useQuery } from "@tanstack/react-query";
import { getVerifiedLawyers } from "@/app/admin/api/lawyers";

const Page: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clientlawyers"],
    queryFn: () => getVerifiedLawyers(),
  });

  return (
    <div>
      <LawyerDetail lawyers={data} />
    </div>
  );
};

export default Page;
