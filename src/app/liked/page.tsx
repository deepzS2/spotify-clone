import Image from "next/image";

import { getLikedSongs } from "@/actions/getLikedSongs";
import { Header } from "@/components/Header";

import { LikedContent } from "./components/LikedContent";

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();

  return (
    <div className="overflow-hidden overflow-y-auto w-full h-full rounded-lg bg-neutral-900">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col gap-x-5 items-center md:flex-row">
            <div className="relative w-32 h-32 lg:w-44 lg:h-44">
              <Image
                fill
                src="/images/liked.png"
                alt="Playlist"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden text-sm font-semibold md:block">Playlist</p>
              <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-7xl">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  );
};

export default Liked;
