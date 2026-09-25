import React, { useEffect, useState } from 'react';
import { SITE_CONFIG } from '../utils/config';
import { fetchHealth, trackWhatsAppLead } from '../utils/api';

export default function Navbar() {
  const [health, setHealth] = useState({ status: 'healthy', database: 'connected' });

  useEffect(() => {
    fetchHealth().then((res) => {
      if (res && res.database) {
        setHealth(res);
      }
    });
  }, []);

  const handleNavWhatsApp = () => {
    trackWhatsAppLead({
      service: 'General Consultation',
      triggerLocation: 'navbar',
      customMessage: 'Navbar CTA Click'
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 backdrop-blur-md bg-[#05050A]/70 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center group py-1" data-cursor-hover aria-label="BDigital Tech">
          <img src="/bdigital-tech-logo.png" alt="BDigital Tech" className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#services-showcase" className="hover:text-cyan-300 transition-colors" data-cursor-hover>
            Solutions
          </a>
          <a href="#why-us" className="hover:text-cyan-300 transition-colors" data-cursor-hover>
            Why Us
          </a>
          <a href="#process" className="hover:text-cyan-300 transition-colors" data-cursor-hover>
            Process
          </a>
          <a href="#industries" className="hover:text-cyan-300 transition-colors" data-cursor-hover>
            Industries
          </a>
        </nav>

        {/* Database Live Ping & WhatsApp CTA Button */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="uppercase text-[10px]">DB: {health.database}</span>
          </div>

          <a
            href={SITE_CONFIG.getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleNavWhatsApp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-400/60 text-emerald-300 text-xs font-semibold tracking-wider uppercase transition-all duration-300 group shadow-[0_0_15px_rgba(37,211,102,0.15)]"
            data-cursor-hover
            data-cursor-magnetic
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>WhatsApp Us</span>
          </a>
        </div>

      </div>
    </header>
  );
}
