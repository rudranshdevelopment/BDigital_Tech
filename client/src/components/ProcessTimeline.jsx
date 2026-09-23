import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from '../utils/config';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessTimeline() {
  const containerRef = useRef(null);
  const spineRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const spine = spineRef.current;
    if (!container || !spine) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const st = gsap.fromTo(
      spine,
      { strokeDashoffset: 2000 },
      {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 70%',
          end: 'bottom 85%',
          scrub: 1
        }
      }
    );

    return () => st.kill();
  }, []);

  return (
    <section id="process" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
            Execution Velocity
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4">
            From Blueprint to <span className="gradient-text-electric">Production Scale</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Our 5-phase delivery model ensures rigorous architectural integrity, zero-downtime cutover, and continuous feature evolution.
          </p>
        </div>

        {/* Timeline with SVG Spine */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* SVG Spine */}
          <svg className="process-svg-spine" viewBox="0 0 4 2000" fill="none" preserveAspectRatio="none">
            <line x1="2" y1="0" x2="2" y2="2000" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
            <line
              ref={spineRef}
              className="timeline-glow-path"
              x1="2"
              y1="0"
              x2="2"
              y2="2000"
              stroke="url(#reactSpineGrad)"
              strokeWidth="3"
            />
            <defs>
              <linearGradient id="reactSpineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22D3EE" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Steps */}
          {SITE_CONFIG.process.map((p, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={p.step}
                className={`process-step-item relative flex flex-col md:flex-row items-center justify-between gap-8 mb-16 lg:mb-24 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-violet-500/40 transition-all">
                    <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                        PHASE {p.step}
                      </span>
                      <span className="text-xs font-mono text-cyan-400">{p.tagline}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                      {p.name}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-5">
                      {p.desc}
                    </p>
                    <div className={`pt-4 border-t border-white/10 flex items-center gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                      <span className="text-xs font-mono text-emerald-400">DELIVERABLE:</span>
                      <span className="text-xs text-white/80 font-medium">{p.deliverable}</span>
                    </div>
                  </div>
                </div>

                {/* Center Node */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[#05050A] border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                  <span className="text-sm font-mono font-bold text-cyan-300">{p.step}</span>
                </div>

                {/* Desktop Spacer */}
                <div className="hidden md:block w-5/12" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
