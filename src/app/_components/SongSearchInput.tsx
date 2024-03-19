"use client";
import React, {
  type KeyboardEventHandler,
  useCallback,
  useState,
  useMemo,
} from "react";
import _debounce, { type DebouncedFunc } from "lodash-es/debounce";
import { Input } from "./ui/input";
import { api } from "@/trpc/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export const SongSearchInput = () => {
  const [st, sst] = useState("");
  const tracks = api.tracks.search.useQuery({ searchTerm: st });

  const debouncedFetchSongs = useMemo(() => _debounce(sst, 1000), [sst]);

  const handleInputChange: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      void debouncedFetchSongs(target.value);
    },
    [debouncedFetchSongs],
  );

  const handleOptionClick = useCallback((event: React.MouseEvent) => {
    // console.log(event.currentTarget);
    // console.log(event.currentTarget.getAttribute("data-key"));
    console.log("redirecting");
    // redirect("./test");
  }, []);

  return (
    <div className="w-full min-w-52">
      <Input
        type="search"
        onKeyUp={handleInputChange}
        placeholder="Try `King Kunta`"
        className="h-16 w-full text-xl"
      />
      {tracks.data?.map((track) => (
        <Link key={track.id} href={`${track.url}`}>
          <div
            key={track.id}
            className="width-full box-border cursor-pointer border border-solid border-black p-4 text-center hover:bg-gray-200"
          >
            {track.name} - {track.artist}
          </div>
        </Link>
      ))}
      {/* <Link key={"estelle/americanboy"} href={"estelle/americanboy"}>
        <div
          // onClick={handleOptionClick}
          className="width-full box-border cursor-pointer border border-solid border-black p-4 text-center hover:bg-gray-200"
        >
          American Boy - Estelle
        </div>
      </Link> */}
    </div>
  );
};
