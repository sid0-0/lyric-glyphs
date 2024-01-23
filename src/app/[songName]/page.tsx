import { api } from "@/trpc/server";
import React from "react";
import ClientPage from "./ClientPage";

interface propTypes {
  params: { songName: string };
}

const LyricsPage = async ({ params }: propTypes) => {
  const lyrics = await api.lyrics.bySong.query(params.songName);
  return (
    <main className="mx-auto flex h-[100vh] flex-col items-center">
      <ClientPage lines={lyrics} />
    </main>
  );
};

export default LyricsPage;
