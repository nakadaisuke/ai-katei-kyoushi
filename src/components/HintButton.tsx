"use client";

import { useState } from "react";

export function HintButton({
  onRequestHint,
}: {
  onRequestHint: (hintLevel: 1 | 2 | 3) => Promise<string>;
}) {
  const [hints, setHints] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const nextLevel = (hints.length + 1) as 1 | 2 | 3;
  const maxedOut = hints.length >= 3;

  async function handleClick() {
    setLoading(true);
    try {
      const hint = await onRequestHint(nextLevel);
      setHints((prev) => [...prev, hint]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {hints.map((hint, i) => (
        <p key={i} className="rounded bg-yellow-50 p-2 text-sm">
          ヒント{i + 1}：{hint}
        </p>
      ))}
      {!maxedOut && (
        <button
          type="button"
          onClick={handleClick}
          disabled={loading}
          className="self-start rounded border border-yellow-500 px-3 py-1 text-sm font-medium text-yellow-700 disabled:opacity-50"
        >
          {loading ? "考え中..." : hints.length === 0 ? "ヒントを見る" : "もっとヒントが欲しい"}
        </button>
      )}
    </div>
  );
}
