import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from '../utils/config';
import { trackWhatsAppLead } from '../utils/api';

gsap.registerPlugin(ScrollTrigger);

// Custom SVG renderer for each service
function getServiceSvg(iconType) {
  switch (iconType) {
    case 'crm-dashboard':
      return (
        <svg className="w-10 h-10 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
          <circle cx="6" cy="6" r="1" fill="currentColor" />
          <circle cx="12" cy="6" r="1" fill="currentColor" />
        </svg>
      );
    case 'ecommerce-cart':
      return (
        <svg className="w-10 h-10 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          <path d="M16 11l3-3m-3 0l3 3" />
        </svg>
      );
    case 'erp-layers':
      return (
        <svg className="w-10 h-10 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 22" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case 'biometric-scan':
      return (
        <svg className="w-10 h-10 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" />
          <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.1-1.4.3-2" />
          <path d="M12 10a2 2 0 0 0-2 2c0 5 2 8 2 8" />
          <path d="M18 10a6 6 0 0 0-12 0c0 7 3 11 4 12" />
          <path d="M22 12c0 4-1.5 7.5-4 10" />
        </svg>
      );
    case 'payroll-ledger':
      return (
        <svg className="w-10 h-10 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M7 15h0M2 10h20" />
          <circle cx="16" cy="15" r="2" />
          <path d="M12 15h1" />
        </svg>
      );
    case 'hrms-nodes':
      return (
        <svg className="w-10 h-10 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'accounting-calc':
      return (
        <svg className="w-10 h-10 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="16" y1="14" x2="16" y2="18" />
          <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
        </svg>
      );
    case 'calendar-radar':
      return (
        <svg className="w-10 h-10 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <circle cx="12" cy="15" r="2" />
        </svg>
      );
    case 'healthcare-pulse':
      return (
        <svg className="w-10 h-10 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
    case 'realestate-building':
      return (
        <svg className="w-10 h-10 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="1" />
          <line x1="9" y1="22" x2="9" y2="18" />
          <line x1="15" y1="22" x2="15" y2="18" />
          <line x1="9" y1="18" x2="15" y2="18" />
          <circle cx="8" cy="6" r="1" />
          <circle cx="12" cy="6" r="1" />
          <circle cx="16" cy="6" r="1" />
          <circle cx="8" cy="10" r="1" />
          <circle cx="12" cy="10" r="1" />
          <circle cx="16" cy="10" r="1" />
        </svg>
      );
    case 'restaurant-pos':
      return (
        <svg className="w-10 h-10 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      );
    case 'salon-sparkle':
      return (
        <svg className="w-10 h-10 text-fuchsia-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case 'logistics-route':
      return (
        <svg className="w-10 h-10 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case 'whatsapp-crm-chat':
      return (
        <svg className="w-10 h-10 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          <line x1="9" y1="10" x2="15" y2="10" />
          <line x1="9" y1="14" x2="13" y2="14" />
        </svg>
      );
    case 'workflow-nodes':
      return (
        <svg className="w-10 h-10 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      );
    case 'saas-cube':
      return (
        <svg className="w-10 h-10 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case 'analytics-chart':
      return (
        <svg className="w-10 h-10 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="2" y1="20" x2="22" y2="20" />
          <path d="M4 12l5-5 4 4 7-7" />
        </svg>
      );
    case 'mobile-device':
      return (
        <svg className="w-10 h-10 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case 'web-app-terminal':
    default:
      return (
        <svg className="w-10 h-10 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
  }
}

export default function ServicesShowcase({ services = [] }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [currentNum, setCurrentNum] = useState('01');
  const [progressPercent, setProgressPercent] = useState(5);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth + 120);
    };

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, window.innerHeight * 2)}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const currentIdx = Math.min(Math.floor(p * 19) + 1, 19);
            setCurrentNum(currentIdx < 10 ? `0${currentIdx}` : `${currentIdx}`);
            setProgressPercent(Math.max(5, p * 100));
          }
        }
      });
    }, section);

    return () => ctx.revert();
  }, [services]);

  // Card 3D Tilt Mousemove
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

  const handleInquire = (serviceName) => {
    trackWhatsAppLead({
      service: serviceName,
      triggerLocation: 'service_card',
      customMessage: `Inquiry for ${serviceName}`
    });
  };

  return (
    <section
      id="services-showcase"
      ref={sectionRef}
      className="relative py-20 min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 w-full mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              Our Core Ecosystem
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            19 Enterprise Solutions <span className="gradient-text-electric">Engineered For Scale</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl">
            Scroll vertically to navigate horizontally across our complete full-stack product architecture.
          </p>
        </div>

        {/* Counter & Progress bar */}
        <div className="flex items-center gap-6">
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-3xl font-bold text-cyan-400">{currentNum}</span>
            <span className="text-sm text-gray-500">/ 19</span>
          </div>
          <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal Track */}
      <div className="w-full overflow-visible">
        <div ref={trackRef} className="horizontal-track">
          {services.map((service, idx) => (
            <div
              key={service.serviceId || service.id || idx}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="service-card-item glass-tilt-card rounded-2xl p-7 flex flex-col justify-between border border-white/10 group interactive-card"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-cyan-400/40 group-hover:scale-105 transition-all duration-300">
                    {getServiceSvg(service.iconType)}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-cyan-400/80 tracking-widest block">
                      {service.number} / 19
                    </span>
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Name & Appendix Description */}
                <span className="text-xs font-mono text-white/40 tracking-wider uppercase block mb-1">
                  {service.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                  {service.name}
                </h3>
                <p className="text-sm md:text-base text-gray-300/90 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>
              </div>

              {/* Feature Chips & WhatsApp CTA */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.features &&
                    service.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.03] text-gray-400 border border-white/5 font-mono"
                      >
                        {feat}
                      </span>
                    ))}
                </div>

                <a
                  href={SITE_CONFIG.getWhatsAppUrl(
                    `Hi BDigital Tech, I want to discuss your ${service.name} solution.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleInquire(service.name)}
                  className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400/50 text-white hover:text-emerald-300 transition-all duration-300 group/btn"
                  data-cursor-hover
                >
                  <span className="text-xs font-semibold tracking-wider uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Inquire on WhatsApp
                  </span>
                  <svg
                    className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
