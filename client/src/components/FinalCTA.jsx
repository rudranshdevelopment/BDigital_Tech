import React from 'react';
import { SITE_CONFIG } from '../utils/config';
import { trackWhatsAppLead } from '../utils/api';

export default function FinalCTA() {
  const handleFinalWhatsApp = () => {
    trackWhatsAppLead({
      service: 'Enterprise Project Consultation',
      triggerLocation: 'final_cta',
      customMessage: 'Final CTA Consultation Request'
    });
  };

  return (
    <section id="final-cta" className="relative py-32 px-6 overflow-hidden flex items-center justify-center min-h-[75vh]">
      {/* Shifting Animated Aurora Mesh Background */}
      <div className="absolute inset-0 aurora-mesh pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono text-emerald-300 uppercase tracking-widest">
            Available For Strategic Projects
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-white tracking-tight leading-[1.08] mb-6">
          Let's Build Something <span className="gradient-text-electric">Extraordinary.</span>
        </h2>

        <p className="text-base sm:text-xl text-gray-300 max-w-2xl leading-relaxed mb-10 font-normal">
          Connect directly with our principal architects on WhatsApp. We dissect your requirements and respond within minutes.
        </p>

        {/* Huge WhatsApp Conversion Button */}
        <a
          id="final-cta-whatsapp-btn"
          href={SITE_CONFIG.getWhatsAppUrl("Hi BDigital Tech, let's schedule an enterprise consultation.")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleFinalWhatsApp}
          className="px-10 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base sm:text-lg tracking-wide shadow-[0_0_50px_rgba(37,211,102,0.6)] hover:shadow-[0_0_70px_rgba(37,211,102,0.9)] transform hover:scale-105 transition-all duration-300 flex items-center gap-3 group"
          data-cursor-hover
          data-cursor-magnetic
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.761.82 2.796.82 3.183 0 5.768-2.587 5.769-5.766.001-3.182-2.585-5.766-5.769-5.766zm9.969 5.768c0 5.503-4.469 9.97-9.97 9.97-1.748 0-3.376-.453-4.81-1.242L2 22l1.341-4.896C2.52 15.65 2.031 13.9 2.031 11.94c0-5.503 4.47-9.97 9.97-9.97 5.501 0 9.969 4.467 9.969 9.97z" />
          </svg>
          <span>Consult On WhatsApp</span>
          <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>

        <div className="mt-8 flex items-center gap-6 text-xs font-mono text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Zero Obligation
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" /> Direct Architect Line
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Sub-10m Response
          </span>
        </div>
      </div>
    </section>
  );
}
