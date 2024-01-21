import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "@/env";

const getKeyFromUrl = (url: string) =>
  new URLSearchParams(url.split("lyrics/")[1]?.split(".")[0] ?? "").toString().slice(0,-1);

const mutateUrlToKey = (v: { url: string; autocomplete: string }[]) =>
  v.map((datum) => ({
    ...datum,
    url: getKeyFromUrl(datum.url),
  }));

const parseTracksList = (v: string) => {
  const tracksSchema = z.object({
    term: z.string(),
    lyrics: z.array(z.object({ url: z.string(), autocomplete: z.string() })),
  });
  return tracksSchema.parse(v).lyrics;
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
        .then(mutateUrlToKey)
        .catch(() => {
          console.error("Failed to fetch tracks");
          return [];
        });

      return tracksList;
    }),
});
