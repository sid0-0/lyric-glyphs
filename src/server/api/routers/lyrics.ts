import { z } from "zod";
import { JSDOM } from "jsdom";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "@/env";

export const lyricsRouter = createTRPCRouter({
  bySong: publicProcedure.input(z.string()).query(async ({ input }) => {
    const page = await fetch(`${env.SUPER_SPECIAL_LYRICS_URL}/${input}`)
      .then((d) => d.text())
      .then((d) => z.string().parse(d))
      .catch(() => "");

    const contentDom = new JSDOM(page)?.window?.document;
    // console.log(
    //   contentDom.window.document.getElementById("lyric-body-text").innerHTML,
    // );
    const lyrics = contentDom
      ?.getElementById("lyric-body-text")
      ?.innerHTML.split("\n")
      .map((s) => s.replaceAll(/<.*?>/g, ""))
      .filter((v) => !!v);

    const title =
      contentDom?.getElementById("lyric-title-text")?.innerHTML ?? "";
    const artUrl =
      contentDom?.querySelector(`img[title='${title}']`)?.src ?? "";
    return { lyrics, artUrl };
  }),
});
