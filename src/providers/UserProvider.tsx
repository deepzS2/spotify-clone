"use client";

import { MyUserContextProvider } from "@/hooks/useUser";
import { ReactNode } from "react";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};
