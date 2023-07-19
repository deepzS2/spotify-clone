import Image from "next/image";

import { useLoadImage } from "@/hooks/useLoadImage";
import { Song } from "@/types";
import { usePlayer } from "@/hooks/usePlayer";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

export const MediaItem = ({ data, onClick }: MediaItemProps) => {
  const player = usePlayer();
  const imageUrl = useLoadImage(data);

  const handleOnClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    return player.setId(data.id);
  };

  return (
    <div
      onClick={handleOnClick}
      className="flex gap-x-3 items-center p-2 w-full rounded-md cursor-pointer hover:bg-neutral-800/50"
    >
      <div className="overflow-hidden relative rounded-md min-h-[48px] min-w-[48px]">
        <Image
          fill
          src={imageUrl || "/images/liked.png"}
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div className="flex overflow-hidden flex-col gap-y-1">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-sm text-neutral-400 truncate">{data.author}</p>
      </div>
    </div>
  );
};
