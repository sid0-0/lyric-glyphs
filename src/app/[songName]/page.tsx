import { api } from "@/trpc/server";
import React from "react";
import ClientPage from "./ClientPage";

interface propTypes {
  params: { songName: string };
}

const LyricsPage = async ({ params }: propTypes) => {
  console.log(params);
  const songData = await api.lyrics.bySong.query(params.songName);
  const { lyrics = [], artUrl = "" } = songData;
  return (
    <main className="mx-auto flex h-[100vh] flex-col items-center justify-center">
      <ClientPage lines={lyrics} artUrl={artUrl} />
    </main>
  );
};

export default LyricsPage;
