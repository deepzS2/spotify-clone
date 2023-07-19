"use client";

import { SongItem } from "@/components/SongItem";
import { useOnPlay } from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface PageContentProps {
  songs: Song[];
}

export const PageContent = ({ songs }: PageContentProps) => {
  const onPlay = useOnPlay(songs);

  if (!songs.length) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
      {songs.map((song) => (
        <SongItem key={song.id} onClick={onPlay} data={song} />
      ))}
    </div>
  );
};
