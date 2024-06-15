"use client";
import React, { useState, createContext, ReactNode } from "react";

interface ContextProps {
  userName: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  secret: string;
  setSecret: React.Dispatch<React.SetStateAction<string>>;
  username2: string;
  setUsername2: React.Dispatch<React.SetStateAction<string>>;
  user2Id: string;
  setUser2Id: React.Dispatch<React.SetStateAction<string>>;

}

export const Context = createContext<ContextProps | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [userName, setUsername] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [username2,setUsername2]=useState<string>('');
  const [user2Id,setUser2Id]=useState<string>("");

  const value = {
    userName,
    setUsername,
    secret,
    setSecret,
    username2,
    setUsername2,
    user2Id,
    setUser2Id
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
