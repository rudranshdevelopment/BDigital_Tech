import React from 'react';

export default function ServicesTicker({ services = [] }) {
  // Duplicate for continuous seamless marquee loop
  const marqueeList = [...services, ...services];

  return (
    <section id="services-ticker" className="py-6 border-y border-white/[0.08] bg-[#0B0B14]/50 relative overflow-hidden backdrop-blur-sm">
      <div className="ticker-skew-wrap">
        <div className="ticker-track">
          {marqueeList.map((service, idx) => (
            <div
              key={`${service.id || service.serviceId}-${idx}`}
              className="inline-flex items-center gap-3 px-3 py-1 cursor-pointer transition-colors hover:text-cyan-400"
            >
              <span className="text-xs font-mono text-cyan-400 opacity-60">
                [{service.number}]
              </span>
              <span className="text-sm md:text-base font-semibold tracking-wider uppercase text-white/90">
                {service.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_#8b5cf6]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
