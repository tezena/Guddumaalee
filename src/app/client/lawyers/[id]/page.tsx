'use client'
import React, { useEffect, useState } from "react";
import LawyerDetail from "./LawyerDetail";
import { useParams } from "next/navigation";
import { data } from "@/app/data/lawyersMockData";
import { LawyerProps } from "@/components/lawyersCard";

const Page: React.FC = () => {
  const [lawyer, setLawyer] = useState<LawyerProps>({} as LawyerProps);
  const params = useParams();

  function searchById(id: string) {
    const lyr = data.find((indi) => indi.id === id);
    if (lyr) {
      setLawyer(lyr);
    }
  }

  useEffect(() => {
    searchById(params.id as string);
  }, [params]);

  return (
    <div>
      <LawyerDetail lawyer={lawyer} lawyers={data} />
    </div>
  );
};

export default Page;
