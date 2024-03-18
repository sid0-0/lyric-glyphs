import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "@/env";

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

// const mutateUrlToKey = (v: songType[]) =>
//   v.map((datum) => ({
//     ...datum,
//     url: getKeyFromUrl(datum.url),
//   }));

// const populateExtraData = (v: songType[]) =>
//   v.map((songObj) => {
//     return {
//       ...songObj,
//       name: songObj.autocomplete.split('"')[1] ?? "",
//       artist: songObj.autocomplete.split("- ")[1] ?? "",
//     };
//   });

const parseTracksList = (v: string) => {
  const songObject = z.object({
    link: z.string(),
    term: z.string().optional().or(z.literal("")),
    desc: z.string().nullable(),
    category: z.string(),
    id: z.number(),
  });
  const tracksSchema = z.array(songObject);
  const parsed = tracksSchema.parse(v);
  // const parsed: { term: string; songs: songType[]; lyrics: songType[] } =
  //   JSON.parse(v);
  // return [...parsed.lyrics, ...parsed.songs];
  const filteredList = parsed
    .filter((datum) => datum.category === "Lyrics")
    .map((datum) => ({
      id: datum.id,
      name: datum.term,
      artist: datum.desc,
      url: datum.link,
    }));
  return filteredList;
};

export const trackRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ searchTerm: z.string() }))
    .query(async ({ input }) => {
      const { searchTerm } = input;

      if (searchTerm.length === 0) return [];

      const payload = new FormData();
      payload.append("action", "get_ac");
      payload.append("term", searchTerm);
      payload.append("type", "1");
      const tracksList = await fetch(env.SUPER_SPECIAL_TRACKS_URL, {
        method: "POST",
        body: payload,
      })
        .then((v) => v.json())
        // .then((v) => {
        //   console.log(v);
        //   return v;
        // })
        .then(parseTracksList)
        // .then(populateExtraData)
        // .then(mutateUrlToKey)
        .catch((e) => {
          console.error("Failed to fetch tracks: ", e.message);
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
