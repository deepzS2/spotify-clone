"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import { useAuthModal } from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useUploadModal } from "@/hooks/useUploadModal";
import { useOnPlay } from "@/hooks/useOnPlay";
import { useSubscribeModal } from "@/hooks/useSubscribeModal";
import { Song } from "@/types";

import { MediaItem } from "./MediaItem";

interface LibraryProps {
  songs: Song[];
}

export const Library = ({ songs }: LibraryProps) => {
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user, subscription } = useUser();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) return authModal.onOpen();

    if (!subscription) return subscribeModal.onOpen();

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-5 pt-4">
        <div className="inline-flex gap-x-2 items-center">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="font-medium text-neutral-400 text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          className="transition cursor-pointer hover:text-white text-neutral-400"
          size={20}
          onClick={onClick}
        />
      </div>
      <div className="flex flex-col gap-y-2 px-3 mt-4">
        {songs.map((song) => (
          <MediaItem onClick={(id) => onPlay(id)} key={song.id} data={song} />
        ))}
      </div>
    </div>
  );
};
