"use client";

import React, { useCallback, useState } from "react";

interface propTypes {
  lines: string[];
}

export default function LineDisplay({ lines }: propTypes) {
  const [selected, setSelected] = useState<Record<number, boolean>>({});

  const addLine = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const rawIndex = event.currentTarget.getAttribute("data-index");
    if (!rawIndex) return;
    const index = Number(rawIndex);
    setSelected((curr) => ({
      ...curr,
      [index]: !(curr[index] ?? false),
    }));
  }, []);

  return (
    <div className="flex h-full w-full justify-center bg-green-300">
      <div className="flex p-4 h-full items-center"> Click anywhere to continue</div>
      <div className="h-full w-[70vw] overflow-auto">
        {lines.map((line, index) => (
          <div
            // index as key is perfectly okay here
            key={index}
            data-index={index}
            onClick={addLine}
            className={`${selected[index] ? "bg-sky-500" : "bg-sky-200"} my-2 cursor-pointer rounded p-2 text-center text-lg hover:opacity-80`}
          >
            {line}
          </div>
        ))}
      </div>
      <div className="flex p-4 h-full items-center"> Click anywhere to continue</div>
    </div>
  );
}
