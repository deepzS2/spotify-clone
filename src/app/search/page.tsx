import { getSongsByTitle } from "@/actions/getSongsByTitle";
import { Header } from "@/components/Header";
import { SearchInput } from "@/components/SearchInput";

import { SearchContent } from "./components/SearchContent";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div className="overflow-hidden overflow-y-auto w-full h-full rounded-lg bg-neutral-900">
      <Header className="from-bg-neutral-900">
        <div className="flex flex-col gap-y-6 mb-2">
          <h1 className="text-3xl font-semibold text-white">Search</h1>
          <SearchInput />
        </div>
        <SearchContent songs={songs} />
      </Header>
    </div>
  );
};

export default Search;
