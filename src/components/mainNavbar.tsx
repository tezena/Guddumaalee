"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import SearchInput from "./searchInput";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { id: 1, text: "Message" },
    { id: 2, text: "Lawyers" },
    { id: 3, text: "Profile" },
  ];

  return (
    <div className="sticky top-0 bg-background/95 md:backdrop-blur md:text-black z-50 flex justify-between items-center h-24 min-w-screen mx-auto px-4 text-white border ">
      {/* Logo */}
      <div className="w-[25%] lg:pl-12">
        <h1 className="w-full text-3xl font-bold text-black ">Guddumalee</h1>
      </div>

      <div className="w-[30%]  md:flex hidden">
        <SearchInput />
      </div>

      <ul className="hidden md:flex items-center ">
        <li className="py-4 px-2 rounded-xl m-1 cursor-pointer duration-300 hover:text-black hover:scale-110 ">
          <MdOutlineLocalPostOffice className="w-16 h-12 text-gray-400 hover:text-[#7B3B99]" />
        </li>
        <li className="py-4 px-2 rounded-xl m-1 cursor-pointer duration-300 hover:text-black hover:scale-110  ">
          <h3 className="text-2xl group-hover:font-bolder hover:text-[#7B3B99]">
            Lawyers
          </h3>
        </li>
        <li className="py-4 px-2 rounded-xl m-1 cursor-pointer duration-300 hover:text-black hover:scale-110">
          <IoPersonCircleSharp className="text-[#7B3B99] w-16 h-16" />
        </li>
      </ul>

      <div onClick={handleNav} className="block md:hidden text-black">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <ul
        className={
          nav
            ? "backdrop-blur z-50 fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#7B3B99]  ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-white m-4">Guddumalee</h1>

        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
