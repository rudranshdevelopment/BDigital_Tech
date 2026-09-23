import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyUs({ metrics = [] }) {
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || metrics.length === 0) return;

    const targets = metrics.map((m) => m.target);
    const obj = { val0: 0, val1: 0, val2: 0, val3: 0 };

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val0: targets[0] || 50,
          val1: targets[1] || 19,
          val2: targets[2] || 100,
          val3: targets[3] || 99.9,
          duration: 2.2,
          ease: 'power3.out',
          onUpdate: () => {
            setCounts([
              Math.floor(obj.val0),
              Math.floor(obj.val1),
              Math.floor(obj.val2),
              obj.val3.toFixed(1)
            ]);
          }
        });
      }
    });

    return () => st.kill();
  }, [metrics]);

  const icons = [
    <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>,
    <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ];

  return (
    <section id="why-us" ref={sectionRef} className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono uppercase tracking-widest mb-4">
            Engineered For Supremacy
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4">
            Why Visionary Leaders <span className="gradient-text-violet">Build With Us</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            We don't assemble off-the-shelf templates. We engineer proprietary, low-latency enterprise backbones tailored to your exact business logic.
          </p>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="glass-tilt-card p-8 rounded-2xl border border-white/10 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 group-hover:scale-110 transition-transform">
                  {icons[idx % icons.length]}
                </div>
                <span className="text-xs font-mono text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40">
                  VERIFIED METRIC
                </span>
              </div>
              <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2 flex items-baseline tracking-tight">
                <span>{counts[idx] !== undefined ? counts[idx] : m.target}</span>
                <span className="text-cyan-400 ml-1">{m.suffix}</span>
              </div>
              <h4 className="text-lg font-semibold text-white/90 mb-2 font-display">{m.label}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
