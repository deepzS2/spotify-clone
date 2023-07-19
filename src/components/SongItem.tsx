import Image from "next/image";

import { useLoadImage } from "@/hooks/useLoadImage";
import { Song } from "@/types";

import { PlayButton } from "./PlayButton";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

export const SongItem = ({ data, onClick }: SongItemProps) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      onClick={() => onClick(data.id)}
      className="flex overflow-hidden relative flex-col gap-x-4 justify-center items-center p-3 rounded-md transition cursor-pointer group bg-neutral-400/5 hover:bg-neutral-400/10"
    >
      <div className="overflow-hidden relative w-full h-full rounded-md aspect-square">
        <Image
          className="object-cover"
          src={imagePath || "/images/liked.png"}
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col gap-y-1 items-start pt-4 w-full">
        <p className="w-full font-semibold truncate">{data.title}</p>
        <p className="pb-4 w-full text-sm text-neutral-400 truncate">
          By {data.author}
        </p>
      </div>
      <div className="absolute right-5 bottom-24">
        <PlayButton />
      </div>
    </div>
  );
};
