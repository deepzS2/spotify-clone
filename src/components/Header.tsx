"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

import { useAuthModal } from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { usePlayer } from "@/hooks/usePlayer";

import { Button } from "./Button";

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    player.reset();

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className="flex justify-between items-center mb-4 w-full">
        <div className="hidden gap-x-2 items-center md:flex">
          <button
            onClick={router.back}
            className="flex justify-center items-center bg-black rounded-full transition hover:opacity-75"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={router.forward}
            className="flex justify-center items-center bg-black rounded-full transition hover:opacity-75"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex gap-x-2 items-center md:hidden">
          <button className="flex justify-center items-center p-2 bg-white rounded-full transition hover:opacity-75">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="flex justify-center items-center p-2 bg-white rounded-full transition hover:opacity-75">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex gap-x-4 justify-between items-center">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="py-2 px-6 bg-white">
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="font-medium bg-transparent text-neutral-300"
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="py-2 px-6 bg-white"
                >
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
