import { api } from "@/trpc/server";
import React from "react";
import LineDisplay from "./LineDisplay";

interface propTypes {
  params: { songName: string };
}

const LyricsPage = async ({ params }: propTypes) => {
  const lyrics = await api.lyrics.bySong.query(params.songName);
  return (
    <main className="mx-auto flex h-[100vh] flex-col items-center">
      <LineDisplay lines={lyrics} />
    </main>
  );
};

export default LyricsPage;
