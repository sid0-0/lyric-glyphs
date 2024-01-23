import React from "react";

interface propTypes {
  lines: string[];
}

export default function Canvas({ lines }: propTypes) {
    console.log(lines)
  return (
    <div className="bg-red rounded bg-black text-white">
      {lines.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </div>
  );
}
