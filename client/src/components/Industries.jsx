import React from 'react';
import { SITE_CONFIG } from '../utils/config';
import { trackWhatsAppLead } from '../utils/api';

export default function Industries() {
  const handleCardMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  const handleIndustryClick = (industryName) => {
    trackWhatsAppLead({
      service: `Industry: ${industryName}`,
      triggerLocation: 'service_card',
      customMessage: `Inquiring for ${industryName} vertical`
    });
    window.open(
      SITE_CONFIG.getWhatsAppUrl(`Hi BDigital Tech, I want to discuss software for ${industryName}.`),
      '_blank'
    );
  };

  return (
    <section id="industries" className="py-24 px-6 relative bg-[#0B0B14]/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              <span className="text-xs font-mono text-pink-400 uppercase tracking-widest">
                Specialized Domains
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Industries <span className="gradient-text-accent">We Transform</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-md">
            Purpose-built architecture addressing regulatory requirements, complex dispatch logic, and high-frequency transactions.
          </p>
        </div>

        {/* 3D Tilt Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_CONFIG.industries.map((ind, idx) => (
            <div
              key={idx}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onClick={() => handleIndustryClick(ind.name)}
              className="glass-tilt-card p-6 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              data-cursor-hover
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-cyan-400/90 tracking-wide uppercase px-2 py-0.5 rounded bg-white/[0.03] border border-white/5">
                    {ind.tag}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-cyan-400 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                </div>
                <h4 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {ind.name}
                </h4>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{ind.desc}</p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/50 group-hover:text-cyan-300 transition-colors">
                <span>Inquire Vertical</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
