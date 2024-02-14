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
    ctx.font = "10px verdana";
    ctx.fillStyle = "#fff";
    lines.forEach((line, index) => {
      ctx.fillText(line, 5, (index + 1) * 20);
    });
    // ctx.fill();
  }, []);

  return (
    <canvas className="bg-red w-96 min-w-80 rounded" ref={ctxRef}></canvas>
  );
}
