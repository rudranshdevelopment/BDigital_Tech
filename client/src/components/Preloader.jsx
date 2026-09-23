import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState("INITIALIZING DIGITAL ARCHITECTURE...");
  const [isWiping, setIsWiping] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const statuses = [
      "INITIALIZING DIGITAL ARCHITECTURE...",
      "SYNCHRONIZING 19 ENTERPRISE SOLUTIONS...",
      "COMPILING WEBGL SHADERS...",
      "SYSTEM READY"
    ];

    let current = 0;
    const duration = 1600;
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      current += step;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setPercent(100);
        setStatus(statuses[3]);

        setTimeout(() => {
          setIsWiping(true);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 850);
        }, 200);
      } else {
        const floored = Math.floor(current);
        setPercent(floored);
        if (floored < 30) setStatus(statuses[0]);
        else if (floored < 70) setStatus(statuses[1]);
        else setStatus(statuses[2]);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#05050A] z-[99999] flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isWiping ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center p-6 text-center max-w-sm">
        {/* Animated SVG 'B' Monogram */}
        <div className="relative w-24 h-24 mb-8">
          <svg className="w-full h-full filter drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="reactLoaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22D3EE" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <path
              className="b-stroke-draw"
              d="M 28 15 L 56 15 C 70 15 78 22 78 33 C 78 42 71 48 60 50 C 74 52 82 59 82 71 C 82 83 72 90 56 90 L 28 90 Z M 44 28 L 44 43 L 54 43 C 60 43 64 40 64 35.5 C 64 31 60 28 54 28 Z M 44 56 L 44 76 L 56 76 C 63 76 68 72 68 66 C 68 60 63 56 56 56 Z"
              stroke="url(#reactLoaderGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Counter */}
        <div className="flex items-baseline justify-center gap-1 mb-3">
          <span className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tighter">
            {percent}%
          </span>
        </div>

        {/* Telemetry Status */}
        <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase opacity-80 h-5">
          {status}
        </p>

        {/* Glowing Progress bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 transition-all duration-75"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
