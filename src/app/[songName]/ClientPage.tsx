"use client";

import React, { useState } from "react";
import LineDisplay from "./LineDisplay";
import Canvas from "./Canvas";

interface propTypes {
  lines: string[];
}

export default function ClientPage({ lines }: propTypes) {
  const [selectedLines, setSelectedLines] = useState<string[]>([]);

  if (selectedLines.length === 0) {
    return <LineDisplay lines={lines} setSelectedLines={setSelectedLines} />;
  }
  return <Canvas lines={selectedLines} />;
}
