"use client";
import React, { useRef, useEffect } from "react";

interface propTypes {
  lines: string[];
}

export default function Canvas({ lines }: propTypes) {
  const ctxRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ctxRef.current == null) return;
    const ctx = ctxRef.current.getContext("2d");
    if (ctx == null) return;
    ctx.fillStyle = "#a87b38";
    ctx.fillRect(0, 0, 1500, 1000);
    // ctx.fill();
    ctx.font = "80px helvetica";
    ctx.fillStyle = "#fff";
    lines.forEach((line, index) => {
      ctx.fillText(line, 5, (index + 1) * 80);
    });
    // ctx.fill();
    console.log(ctxRef.current.style.height, ctxRef.current.style.width);
  }, []);

  return (
    <canvas
      className="bg-red w-96 min-w-80 rounded"
      height="1000"
      width="1000"
      ref={ctxRef}
    ></canvas>
  );
}
