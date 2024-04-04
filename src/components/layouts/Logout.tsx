"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const Logout = () => {
  return (
    <>
      <Button
        onClick={() => {
          signOut({
            redirect: true,
            callbackUrl: "/",
          });
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default Logout;
