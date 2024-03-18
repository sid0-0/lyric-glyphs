"use client";
import React, { useRef, useEffect } from "react";
import * as PIXI from "pixi.js";

interface propTypes {
  lines: string[];
  artUrl: string;
}

export default function Canvas({ lines, artUrl }: propTypes) {
  const ctxRef = useRef<HTMLCanvasElement | null>(null);

  const generateCanvas = (el) => {
    document.body.style.backgroundColor = "#a87b38";

    (async () => {
      const pixiApp = new PIXI.Application();
      await pixiApp.init({
        autoStart: false,
        sharedTicker: true,
        width: 450,
        // height: 400,
        backgroundColor: 0xa87b38,
      });
      pixiApp.canvas.style.boxShadow = "0 0 10px #222";
      pixiApp.canvas.style.borderRadius = "10px";
      el.innerHTML = "";
      el.appendChild(pixiApp.canvas);

      const texturePromise = PIXI.Assets.load(artUrl);
      texturePromise.then((resolvedTexture) => {
        const albumArt = PIXI.Sprite.from(resolvedTexture);
        // center the sprite's anchor point
        // albumArt.anchor.set(0.5);
        albumArt.x = 40;
        albumArt.y = 40;
        albumArt.height = 120;
        albumArt.width = 120;
        pixiApp.stage.addChild(albumArt);
      });

      const text = new PIXI.Text({
        text: lines.join("\n"),
        style: {
          fontFamily: "Lexend Deca",
          fontSize: 35,
          fill: 0xffffff,
          wordWrap: true,
          wordWrapWidth: pixiApp.screen.width - 80,
        },
        x: 40,
        y: 200,
      });
      pixiApp.stage.addChild(text);
    })();
  };

  useEffect(() => {
    if (ctxRef.current == null) return;
    // const ctx = ctxRef.current.getContext("2d");
    // if (ctx == null) return;
    // ctx.fillStyle = "#a87b38";
    // ctx.fillRect(0, 0, 1500, 1000);
    // // ctx.fill();
    // ctx.font = "80px helvetica";
    // ctx.fillStyle = "#fff";
    // lines.forEach((line, index) => {
    //   ctx.fillText(line, 5, (index + 1) * 80);
    // });
    // // ctx.fill();
    // console.log(ctxRef.current.style.height, ctxRef.current.style.width);
    generateCanvas(ctxRef.current);
  }, [generateCanvas]);

  return (
    <div>
      <div ref={ctxRef}></div>
    </div>
  );
}
