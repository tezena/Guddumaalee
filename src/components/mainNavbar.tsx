"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import React, { useState, useContext } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import SearchInput from "./searchInput";
import { Context } from "@/app/context/userContext";
import { useRouter, usePathname } from "next/navigation";

import { useSession } from "next-auth/react";
import { ProfileDropdown } from "./profileDropDown";
import { ChatDropdown } from "./chatDropDown";
import { Icon } from "@iconify/react";
import { useNotifications } from "@/app/context/NotificationContext";
import Notification from "./header/Notification";
import { useQuery } from "@tanstack/react-query";
import { getLawyerById } from "@/app/admin/api/lawyers";
import AcceptOffer from "@/app/lawyer/offer/acceptOffer";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { data: session } = useSession();
  //@ts-ignore
  const userType = session?.user?.image?.type;
  //@ts-ignore
  const lawyer_id = session?.user?.image?.id;
  const [visted, setVisted] = useState(false);

  const {
    data: lawyerData,
    isLoading: lawyerLoading,
    error: lawyerError,
  } = useQuery({
    queryKey: ["lawyer"],
    queryFn: () => getLawyerById(lawyer_id),
  });

  const { handleClosePopup, handleNotificationClick } = useNotifications();

  const trialNotifications = 3;

  const handleNav = () => {
    setNav(!nav);
  };

  const context = useContext(Context);
  const router = useRouter();
  const currentRoute = usePathname();

  if (!context) {
    return null;
  }

  return (
    <div className="sticky top-0 bg-background/95 md:backdrop-blur md:text-black z-50 flex justify-between items-center h-20 min-w-screen mx-auto px-4 text-white border ">
      {/* Logo */}

      <div className="w-[15%] lg:pl-12">
        <Link href={"/client"}>
          {" "}
          <h1 className="w-full text-3xl font-bold text-black ">
            {" "}
            <span className="text-[#7B3B99]">Gudu</span>maalee
          </h1>{" "}
        </Link>
      </div>

      <>
        {session ? (
          <>
            <div className="w-[30%]  md:flex hidden">
              {userType == "client" ? <SearchInput /> : null}
            </div>

            <ul className="hidden md:flex items-center ">
              <div className="relative p-2 ">
                <Notification />
              </div>
              <li className="py-4 px-2 rounded-xl m-1 cursor-pointer duration-300 hover:text-black hover:scale-110 ">
                <ChatDropdown />
              </li>

              <li className="py-4 px-2 rounded-xl m-1 cursor-pointer duration-300 hover:text-black hover:scale-110  text-slate-500  ">
                {currentRoute == "/" ? (
                  <>
                    {" "}
                    {userType == "client" ? (
                      <Link href="/client/lawyers">
                        <h3 className="text-2xl group-hover:font-bolder hover:text-[#7B3B99]">
                          Lawyer
                        </h3>
                      </Link>
                    ) : (
                      <div className="flex gap-4">
                        <Link href="/lawyer">
                          <h3 className="text-xl group-hover:font-bolder hover:text-[#7B3B99]">
                            MyPage
                          </h3>
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex gap-4">
                    {userType == "lawyer" && (
                      <div
                        onClick={() => router.push("/lawyer/withdraw")}
                        className="  hover:text-white rounded-full p-1  hover:opacity-100 transition-opacity duration-300"
                      >
                        <p className="text-gray-400  hover:text-[#7B3B99]">
                          {lawyerData?.balance} ETB
                        </p>
                      </div>
                    )}

                    <Link href="/">
                      <h3 className="text-xl group-hover:font-bolder hover:text-[#7B3B99]">
                        Home
                      </h3>
                    </Link>
                  </div>
                )}
              </li>
              <li className="py-4 px-2 rounded-xl m-1 duration-300 hover:scale-110">
                {/* <IoPersonCircleSharp className="text-[#7B3B99] w-16 h-12" /> */}
                <ProfileDropdown />
              </li>
            </ul>

            <div onClick={handleNav} className="block md:hidden text-black">
              {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
          </>
        ) : (
          <Button
            onClick={() => router.push("/signin")}
            className=" rounded bg-[#7B3B99] px-8 py-3 text-sm font-medium text-white shadow hover:text-white focus:outline-none focus:ring  sm:w-auto"
          >
            Sign In
          </Button>
        )}
      </>

      <ul
        className={
          nav
            ? "backdrop-blur z-50 fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#7B3B99]  ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-white m-4">Guddumalee</h1>

        <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
          <Link href={"/chat2"}>Chat</Link>
        </li>

        <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
          {userType == "client" ? (
            <Link href="/client/lawyers">Lawyers</Link>
          ) : (
            <Link href="/lawyer">My Page</Link>
          )}
        </li>

        <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
          <Link
            href={userType === "client" ? "/client/profile" : "/lawyer/profile"}
          ></Link>{" "}
          Profile
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
