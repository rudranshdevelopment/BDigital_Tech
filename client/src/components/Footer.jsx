import React from 'react';
import { SITE_CONFIG } from '../utils/config';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#05050A] pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        {/* Brand & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <a href="#" className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 p-[1px]">
              <div className="w-full h-full bg-[#05050A] rounded-[7px] flex items-center justify-center font-display font-bold text-sm text-cyan-300">
                B
              </div>
            </div>
            <span className="font-display font-bold text-lg text-white">
              BDigital <span className="text-violet-400 font-normal">Tech</span>
            </span>
          </a>
          <p className="text-xs text-gray-400 max-w-sm">
            Proprietary enterprise CRM, ERP, HRMS, and automated cloud platforms engineered for continuous global performance.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
          <a href="#services-showcase" className="hover:text-cyan-300 transition-colors" data-cursor-hover>
            19 Solutions
          </a>
          <a href="#why-us" className="hover:text-cyan-300 transition-colors" data-cursor-hover>
            Architecture
          </a>
          <a href="#process" className="hover:text-cyan-300 transition-colors" data-cursor-hover>
            Execution
          </a>
          <a href="#industries" className="hover:text-cyan-300 transition-colors" data-cursor-hover>
            Domains
          </a>
          <a
            href={SITE_CONFIG.getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            data-cursor-hover
          >
            WhatsApp Chat
          </a>
        </div>

        {/* System Health Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ALL SYSTEMS OPERATIONAL</span>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>© 2026 BDigital Tech. All Rights Reserved. Built for scale.</p>
        <p className="font-mono text-[11px] text-gray-600">
          MERN FULL STACK CORE • ZERO DOWNTIME
        </p>
      </div>
    </footer>
  );
}
