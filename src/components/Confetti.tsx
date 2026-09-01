import { useState } from "react";

const COLORS = ["#2b95e0", "#6ee7a0", "#f0c674", "#ff8585", "#a78bfa"];

interface Piece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  rotate: number;
  size: number;
}

export default function Confetti() {
  const [pieces] = useState<Piece[]>(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[i % COLORS.length],
      delay: Math.random() * 0.3,
      duration: 1.8 + Math.random() * 1.2,
      rotate: Math.random() * 360,
      size: 6 + Math.random() * 6,
    })),
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 animate-dojo-confetti rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.4,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
