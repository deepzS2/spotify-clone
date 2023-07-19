"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import { useOnPlay } from "@/hooks/useOnPlay";
import { MediaItem } from "@/components/MediaItem";
import { LikeButton } from "@/components/LikeButton";

interface LikedContentProps {
  songs: Song[];
}

export const LikedContent = ({ songs }: LikedContentProps) => {
  const router = useRouter();
  const onPlay = useOnPlay(songs);
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (!songs.length) {
    return (
      <div className="flex flex-col gap-y-2 px-6 w-full text-neutral-400">
        No liked songs.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 p-6 w-full">
      {songs.map((song) => (
        <div key={song.id} className="flex gap-x-4 items-center w-full">
          <div className="flex-1">
            <MediaItem onClick={onPlay} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};
