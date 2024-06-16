import { useSession } from "next-auth/react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { Bell } from "lucide-react";

const Notification = () => {
  // get trial notification based on session
  const { data: session } = useSession();

  const { data, isLoading, error } =
    //@ts-ignore
    session.user.image.type == "client"
      ? useQuery({
          queryKey: ["notifications"],
          queryFn: async () => {
            const res = await axios.get("/api/trial/client");
            return res.data.trials;
          },
        })
      : useQuery({
          queryKey: ["notifications"],
          queryFn: async () => {
            const res = await axios.get("/api/trial/lawyer");
            return res.data.trials;
          },
        });
  console.log(data);

  return (
    <Link
      href={`${
        //@ts-ignore
        session.user.image.type == "client" ? "/client/" : "/lawyer/"
      }notification`}
    >
      <Bell />
      {data?.length >= 1 ? (
        <span className="bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] absolute top-0 left-7">
          {data?.length}
        </span>
      ) : (
        ""
      )}
    </Link>
  );
};

export default Notification;
