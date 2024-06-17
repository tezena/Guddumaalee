"use client";
import React, { useEffect, useState } from "react";
import LawyerDetail from "./LawyerDetail";
import { useQuery } from "@tanstack/react-query";
import { getVerifiedLawyers } from "@/app/admin/api/lawyers";
import { LoadingComponent, ErrorComponent } from '@/components/LoadingErrorComponents';

const Page: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clientlawyers"],
    queryFn: () => getVerifiedLawyers(),
  });

  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );
  return (
    <div>
      <LawyerDetail lawyers={data} />
    </div>
  );
};

export default Page;
