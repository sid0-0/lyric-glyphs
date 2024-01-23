"use client";

import React, { useCallback, useState } from "react";

interface propTypes {
  lines: string[];
  setSelectedLines: (arg0: string[]) => void;
}

export default function LineDisplay({ lines, setSelectedLines }: propTypes) {
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

  const submit = useCallback(() => {
    const keys = Object.keys(selected);
    setSelectedLines(
      keys.reduce<string[]>((acc, k) => {
        const key = Number(k);
        const v = lines[key];
        if (selected[key] && v) {
          return [...acc, v];
        }
        return acc;
      }, []),
    );
  }, [selected, lines, setSelectedLines]);

  return (
    <div className="flex h-full w-full justify-center bg-green-300">
      <div className="flex h-full items-center p-4" onClick={submit}>
        Click anywhere to continue
      </div>
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
      <div className="flex h-full items-center p-4" onClick={submit}>
        Click anywhere to continue
      </div>
    </div>
  );
}
