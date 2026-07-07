"use client";

import { useState } from "react";

const EMOJIS = ["🎉", "✨", "🌟", "🎊", "⭐"];

interface ConfettiPiece {
  id: number;
  left: number;
  delaySeconds: number;
  durationSeconds: number;
  emoji: string;
  fontSize: number;
}

export function Celebration({
  message,
  particleCount = 24,
}: {
  message: string;
  particleCount?: number;
}) {
  // このコンポーネントは合格判定後（クライアント側の状態遷移後）にしかマウントされない
  // ため、SSR時のHTMLには含まれず、ハイドレーション不一致の心配なくランダム値を
  // 初回レンダーで直接生成できる。
  const [pieces] = useState<ConfettiPiece[]>(() =>
    Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delaySeconds: Math.random() * 0.6,
      durationSeconds: 2 + Math.random() * 1.5,
      emoji: EMOJIS[i % EMOJIS.length],
      fontSize: 18 + Math.random() * 14,
    })),
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.fontSize}px`,
            animationDelay: `${p.delaySeconds}s`,
            animationDuration: `${p.durationSeconds}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 rounded-full bg-yellow-300 px-6 py-3 text-xl font-extrabold text-[#5a3d00] shadow-lg dark:bg-yellow-400"
        style={{ animation: "celebration-pop 0.5s ease-out" }}
      >
        {message}
      </div>
    </div>
  );
}
