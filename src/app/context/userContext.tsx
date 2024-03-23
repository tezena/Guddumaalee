"use client";
import React, { useState, createContext, ReactNode } from "react";

interface ContextProps {
  userName: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  secret: string;
  setSecret: React.Dispatch<React.SetStateAction<string>>;
}

export const Context = createContext<ContextProps | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [userName, setUsername] = useState<string>("");
  const [secret, setSecret] = useState<string>("");

  const value = {
    userName,
    setUsername,
    secret,
    setSecret,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
