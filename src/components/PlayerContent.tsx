"use client";

import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import useSound from "use-sound";

import { usePlayer } from "@/hooks/usePlayer";
import { Song } from "@/types";

import { MediaItem } from "./MediaItem";
import { LikeButton } from "./LikeButton";
import { Slider } from "./Slider";

interface PlayerContentProps {
  songUrl: string;
  song: Song;
}

export const PlayerContent = ({ songUrl, song }: PlayerContentProps) => {
  const player = usePlayer();

  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    format: ["mp3"],
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) setVolume(1);
    else setVolume(0);
  };

  return (
    <div className="grid grid-cols-2 h-full md:grid-cols-3">
      <div className="flex justify-start w-full">
        <div className="flex gap-x-4 items-center">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex col-auto justify-end items-center w-full md:hidden">
        <div
          onClick={handlePlay}
          className="flex justify-center items-center p-1 w-10 h-10 bg-white rounded-full cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="hidden gap-x-6 justify-center items-center w-full h-full md:flex max-w-[722px]">
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="transition cursor-pointer hover:text-white text-neutral-400"
        />
        <div
          onClick={handlePlay}
          className="flex justify-center items-center p-1 w-10 h-10 bg-white rounded-full cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="transition cursor-pointer hover:text-white text-neutral-400"
        />
      </div>

      <div className="hidden justify-end pr-2 w-full md:flex">
        <div className="flex gap-x-2 items-center w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider value={volume} onChange={setVolume} />
        </div>
      </div>
    </div>
  );
};
