"use client";
import React, { type KeyboardEventHandler, useCallback, useState } from "react";
import _debounce, { type DebouncedFunc } from "lodash-es/debounce";
import { Input } from "./ui/input";
import { api } from "@/trpc/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const SongSearchInput = () => {
  const [st, sst] = useState("");
  const tracks = api.tracks.search.useQuery({ searchTerm: st });
  const fetchSongs = async (searchTerm: string) => {
    // update options in some store (can do with context too here)
    console.log("making call", searchTerm);
    sst(searchTerm);
  };

  const debouncedFetchSongs: DebouncedFunc<typeof fetchSongs> = _debounce(
    fetchSongs,
    1000,
  );

  const handleInputChange: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      void debouncedFetchSongs(target.value);
    },
    [debouncedFetchSongs],
  );

  return (
    <div className="w-[50vw] min-w-52">
      <Input
        type="search"
        onKeyUp={handleInputChange}
        placeholder="Try `King Kunta`"
      />
      {tracks.data?.map((track) => (
        <div
          key={track.url}
          className="width-full my-4 rounded-md border border-solid border-black p-4 text-center"
        >
          {track.autocomplete}
        </div>
      ))}
    </div>
  );
};
