import { FaPlay } from "react-icons/fa";

export const PlayButton = () => {
  return (
    <button className="flex items-center p-4 bg-green-500 rounded-full opacity-0 transition translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 drop-shadow-md translate group-hover:">
      <FaPlay className="text-black" />
    </button>
  );
};
