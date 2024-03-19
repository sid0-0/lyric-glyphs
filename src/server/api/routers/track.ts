import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "@/env";
import { randomUUID } from "crypto";

type songType = {
  id: string;
  url: string;
  name: string;
  artist: string;
};
type tracksType = {
  term: string;
  songs: songType[];
  lyrics: string[];
};

const getKeyFromUrl = (url: string) =>
  new URLSearchParams(url.split("lyrics/")[1]?.split(".")[0] ?? "")
    .toString()
    .slice(0, -1);

const mutateUrlToKey = (v: songType[]) =>
  v.map((datum) => ({
    ...datum,
    url: getKeyFromUrl(datum.url),
  }));

const populateExtraData = (v: songType[]) =>
  v.map((songObj) => {
    return {
      ...songObj,
      name: songObj.autocomplete.split('"')[1] ?? "",
      artist: songObj.autocomplete.split("- ")[1] ?? "",
    };
  });

const parseTracksList = (v: string) => {
  const songObject = z.object({ url: z.string(), autocomplete: z.string() });
  const tracksSchema = z.object({
    term: z.string(),
    songs: z.array(songObject),
    lyrics: z.array(songObject),
  });
  const parsed = tracksSchema.parse(v);
  return [...parsed.lyrics, ...parsed.songs].map(
    (v) => <songType>{ ...v, id: randomUUID(), name: "", artist: "" },
  );
};

export const trackRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ searchTerm: z.string() }))
    .query(async ({ input }) => {
      const { searchTerm } = input;

      if (searchTerm.length === 0) return [];

      const tracksList = await fetch(
        `${env.SUPER_SPECIAL_TRACKS_URL}${new URLSearchParams(searchTerm).toString()}`,
        { method: "GET" },
      )
        .then((v) => v.json())
        .then(parseTracksList)
        .then(populateExtraData)
        .then(mutateUrlToKey)
        .catch(() => {
          console.error("Failed to fetch tracks");
          return [];
        });

      return tracksList;
    }),
  albumArtUrl: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const { name } = input;
      const imgRegex = /img data-src="(.*)"/;
      const imgUrl = await fetch(
        `https://www.discogs.com/search/?q=${name}&type=master`,
      )
        .then((d) => d.text())
        // .then((v) => {
        //   console.log(`https://www.discogs.com/search/?q=${name}&type=master`);
        //   return v;
        // })
        .then((html) => html.match(imgRegex)?.[1])
        .catch(() => "");
      console.log(imgUrl);
      return imgUrl;
    }),
});
