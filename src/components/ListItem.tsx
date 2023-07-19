"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

export const ListItem = ({ href, name, image }: ListItemProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className="flex overflow-hidden relative gap-x-4 items-center pr-4 rounded-md transition group bg-neutral-100/10 hover:bg-neutral-100/20"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image className="object-cover" fill src={image} alt="Image" />
      </div>
      <p className="py-5 font-medium truncate">{name}</p>
      <div className="flex absolute right-5 justify-center items-center p-4 bg-green-500 rounded-full opacity-0 transition group-hover:opacity-100 hover:scale-110 drop-shadow-md">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};
