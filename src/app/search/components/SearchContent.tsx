"use client";

import { LikeButton } from "@/components/LikeButton";
import { MediaItem } from "@/components/MediaItem";
import { useOnPlay } from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface SearchContentProps {
  songs: Song[];
}

export const SearchContent = ({ songs }: SearchContentProps) => {
  const onPlay = useOnPlay(songs);

  if (!songs.length) {
    return (
      <div className="flex flex-col gap-y-2 px-6 w-full text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 px-6 w-full">
      {songs.map((song) => (
        <div key={song.id} className="flex gap-x-4 items-center w-full">
          <div className="flex-1">
            <MediaItem onClick={(id) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};
