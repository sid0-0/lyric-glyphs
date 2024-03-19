import { z } from "zod";
import { JSDOM } from "jsdom";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "@/env";

export const lyricsRouter = createTRPCRouter({
  bySong: publicProcedure.input(z.string()).query(async ({ input }) => {
    const page = await fetch(env.SUPER_SPECIAL_LYRICS_URL.replace("#", input))
      .then((d) => d.text())
      .then((d) => z.string().parse(d))
      .catch(() => "");

    const lyrics =
      page
        .replaceAll(/(\n|\t|&quot;)*/g, "")
        .split("<br><br>")
        .slice(2, -2)
        .join("<br>")
        .split("<br>")
        .map((s) => s.replaceAll(/<.*?>/g, "")) ?? [];

    const [_, artist = "", name = ""] = page.match(
      /<title>(.*?) - (.*?) Lyrics.*<\/title>/,
    );
    const artUrl = await fetch(
      env.SUPER_SPECIAL_ALBUM_ART_URL.replace("<artist>", artist).replace(
        "<title>",
        name,
      ),
    )
      .then((d) => d.text())
      .then((s) => s.match(/data-src="(.*?)"/)?.[1] ?? "");

    return { lyrics, artUrl };
  }),
});
