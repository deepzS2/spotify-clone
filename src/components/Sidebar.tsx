"use client";

import { ReactNode, useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { usePlayer } from "@/hooks/usePlayer";
import { Song } from "@/types";

import { Box } from "./Box";
import { SidebarItem } from "./SidebarItem";
import { Library } from "./Library";

interface SidebarProps {
  children: ReactNode;
  songs: Song[];
}

export const Sidebar = ({ children, songs }: SidebarProps) => {
  const player = usePlayer();
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div
      className={twMerge(
        "flex h-full",
        player.activeId && `h-[calc(100%-80px)]`
      )}
    >
      <div className="hidden flex-col gap-y-2 p-2 h-full bg-black md:flex w-[300px]">
        <Box>
          <div className="flex flex-col gap-y-4 py-4 px-5">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="overflow-y-auto flex-1 py-2 h-full">{children}</main>
    </div>
  );
};
