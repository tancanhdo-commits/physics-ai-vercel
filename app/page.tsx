"use client";

import { useState } from "react";

export default function Home() {
  const [unit, setUnit] = useState("");
  const [lesson, setLesson] = useState("");
  const [result, setResult] = useState<any>(null);

  const generateLesson = async () => {
    const res = await fetch("/api/generate-physics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ unit, lesson }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Physics 12 AI Generator</h1>

      <input
        placeholder="Tên chương"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />

      <input
        placeholder="Tên bài"
        value={lesson}
        onChange={(e) => setLesson(e.target.value)}
      />

      <button onClick={generateLesson}>
        Generate
      </button>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
