import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "@/env";

export const lyricsRouter = createTRPCRouter({
  bySong: publicProcedure.input(z.string()).query(async ({ input }) => {
    const page = await fetch(env.SUPER_SPECIAL_LYRICS_URL.replace("#", input))
      .then((d) => d.text())
      .then((d) => z.string().parse(d))
      .catch(() => "");
    console.log(
      page
        .replaceAll(/(\n|\t)*/g, "")
        .split("<br><br>")
        .slice(2, -2)
        .join("<br>")
        .split("<br>"),
    );

    const lines =
      page
        .replaceAll(/(\n|\t|&quot;)*/g, "")
        .split("<br><br>")
        .slice(2, -2)
        .join("<br>")
        .split("<br>")
        .map((s) => s.replaceAll(/<.*?>/g, "")) ?? [];
    console.log(lines);
    return lines;
  }),
});
