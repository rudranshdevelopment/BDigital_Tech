/**
 * BDigital Tech - Main Application Engine
 * Orchestrates Lenis smooth scroll, GSAP ScrollTrigger choreography,
 * dynamic DOM rendering, 3D tilt physics, and WhatsApp routing.
 */

(function () {
  'use strict';

  var config = window.SITE_CONFIG;
  if (!config) {
    console.error('SITE_CONFIG not loaded');
    return;
  }

  // Respect reduced motion
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize Lenis Smooth Scroll
  var lenis = null;
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.25,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // Helper to generate bespoke SVGs for services
  function getServiceSvg(iconType) {
    switch (iconType) {
      case 'crm-dashboard':
        return '<svg class="w-10 h-10 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/><circle cx="6" cy="6" r="1" fill="currentColor"/><circle cx="12" cy="6" r="1" fill="currentColor"/></svg>';
      case 'ecommerce-cart':
        return '<svg class="w-10 h-10 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/><path d="M16 11l3-3m-3 0l3 3"/></svg>';
      case 'erp-layers':
        return '<svg class="w-10 h-10 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 22"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>';
      case 'biometric-scan':
        return '<svg class="w-10 h-10 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"/><path d="M5 19.5C5.5 18 6 15 6 12c0-.7.1-1.4.3-2"/><path d="M12 10a2 2 0 0 0-2 2c0 5 2 8 2 8"/><path d="M18 10a6 6 0 0 0-12 0c0 7 3 11 4 12"/><path d="M22 12c0 4-1.5 7.5-4 10"/></svg>';
      case 'payroll-ledger':
        return '<svg class="w-10 h-10 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15h0M2 10h20"/><circle cx="16" cy="15" r="2"/><path d="M12 15h1"/></svg>';
      case 'hrms-nodes':
        return '<svg class="w-10 h-10 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
      case 'accounting-calc':
        return '<svg class="w-10 h-10 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"/></svg>';
      case 'calendar-radar':
        return '<svg class="w-10 h-10 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="12" cy="15" r="2"/></svg>';
      case 'healthcare-pulse':
        return '<svg class="w-10 h-10 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>';
      case 'realestate-building':
        return '<svg class="w-10 h-10 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="22" x2="9" y2="18"/><line x1="15" y1="22" x2="15" y2="18"/><line x1="9" y1="18" x2="15" y2="18"/><circle cx="8" cy="6" r="1"/><circle cx="12" cy="6" r="1"/><circle cx="16" cy="6" r="1"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="10" r="1"/><circle cx="16" cy="10" r="1"/><circle cx="8" cy="14" r="1"/><circle cx="12" cy="14" r="1"/><circle cx="16" cy="14" r="1"/></svg>';
      case 'restaurant-pos':
        return '<svg class="w-10 h-10 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>';
      case 'salon-sparkle':
        return '<svg class="w-10 h-10 text-fuchsia-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      case 'logistics-route':
        return '<svg class="w-10 h-10 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>';
      case 'whatsapp-crm-chat':
        return '<svg class="w-10 h-10 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="13" y2="14"/></svg>';
      case 'workflow-nodes':
        return '<svg class="w-10 h-10 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';
      case 'saas-cube':
        return '<svg class="w-10 h-10 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>';
      case 'analytics-chart':
        return '<svg class="w-10 h-10 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/><path d="M4 12l5-5 4 4 7-7"/></svg>';
      case 'mobile-device':
        return '<svg class="w-10 h-10 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>';
      case 'web-app-terminal':
      default:
        return '<svg class="w-10 h-10 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>';
    }
  }

  // 1. Render Infinite Ticker
  function renderTicker() {
    var tickerEl = document.getElementById('services-ticker-content');
    if (!tickerEl) return;

    var html = '';
    // Duplicate twice for seamless infinite marquee loop
    for (var loop = 0; loop < 2; loop++) {
      config.services.forEach(function (service) {
        html += '<div class="inline-flex items-center gap-3 px-3 py-1 cursor-pointer transition-colors hover:text-cyan-400">';
        html += '<span class="text-xs font-mono text-cyan-400 opacity-60">[' + service.number + ']</span>';
        html += '<span class="text-sm md:text-base font-semibold tracking-wider uppercase text-white/90">' + service.name + '</span>';
        html += '<span class="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_#8b5cf6]"></span>';
        html += '</div>';
      });
    }
    tickerEl.innerHTML = html;
  }

  // 2. Render Pinned Horizontal Services Showcase (All 19 Services)
  function renderServicesShowcase() {
    var trackEl = document.getElementById('services-horizontal-track');
    if (!trackEl) return;

    var html = '';
    config.services.forEach(function (service, idx) {
      var waUrl = config.getWhatsAppUrl("Hi BDigital Tech, I want to discuss your " + service.name + " solution.");
      
      html += '<div class="service-card-item glass-tilt-card rounded-2xl p-7 flex flex-col justify-between border border-white/10 group interactive-card" data-index="' + idx + '">';
      
      // Top header of card
      html += '<div>';
      html += '  <div class="flex items-center justify-between mb-5">';
      html += '    <div class="p-3 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-cyan-400/40 group-hover:scale-105 transition-all duration-300">';
      html +=        getServiceSvg(service.iconType);
      html += '    </div>';
      html += '    <div class="text-right">';
      html += '      <span class="text-xs font-mono text-cyan-400/80 tracking-widest block">' + service.number + ' / 19</span>';
      html += '      <span class="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">' + service.badge + '</span>';
      html += '    </div>';
      html += '  </div>';

      // Title & Category
      html += '  <span class="text-xs font-mono text-white/40 tracking-wider uppercase block mb-1">' + service.category + '</span>';
      html += '  <h3 class="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">' + service.name + '</h3>';
      
      // Verbatim description from Appendix
      html += '  <p class="text-sm md:text-base text-gray-300/90 leading-relaxed mb-6 font-normal">' + service.description + '</p>';
      html += '</div>';

      // Feature tags and WhatsApp direct CTA
      html += '<div>';
      html += '  <div class="flex flex-wrap gap-1.5 mb-6">';
      service.features.forEach(function (feat) {
        html += '    <span class="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.03] text-gray-400 border border-white/5 font-mono">' + feat + '</span>';
      });
      html += '  </div>';

      html += '  <a href="' + waUrl + '" target="_blank" rel="noopener noreferrer" class="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400/50 text-white hover:text-emerald-300 transition-all duration-300 group/btn" data-cursor-hover>';
      html += '    <span class="text-xs font-semibold tracking-wider uppercase flex items-center gap-2">';
      html += '      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Inquire on WhatsApp';
      html += '    </span>';
      html += '    <svg class="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>';
      html += '  </a>';
      html += '</div>';

      html += '</div>';
    });

    trackEl.innerHTML = html;
  }

  // 3. Render Why Us Metrics & Self-Drawing Icons
  function renderMetrics() {
    var metricsEl = document.getElementById('metrics-grid');
    if (!metricsEl) return;

    var icons = [
      '<svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
      '<svg class="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>',
      '<svg class="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
      '<svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>'
    ];

    var html = '';
    config.metrics.forEach(function (m, idx) {
      html += '<div class="glass-tilt-card p-8 rounded-2xl border border-white/10 relative overflow-hidden group">';
      html += '  <div class="flex items-center justify-between mb-6">';
      html += '    <div class="p-3 rounded-xl bg-white/[0.03] border border-white/10 group-hover:scale-110 transition-transform">' + icons[idx] + '</div>';
      html += '    <span class="text-xs font-mono text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40">VERIFIED METRIC</span>';
      html += '  </div>';
      html += '  <div class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2 flex items-baseline tracking-tight">';
      html += '    <span class="metric-counter" data-target="' + m.target + '">0</span>';
      html += '    <span class="text-cyan-400 ml-1">' + m.suffix + '</span>';
      html += '  </div>';
      html += '  <h4 class="text-lg font-semibold text-white/90 mb-2 font-display">' + m.label + '</h4>';
      html += '  <p class="text-sm text-gray-400 leading-relaxed">' + m.desc + '</p>';
      html += '</div>';
    });

    metricsEl.innerHTML = html;
  }

  // 4. Render Process Steps
  function renderProcess() {
    var processEl = document.getElementById('process-timeline-container');
    if (!processEl) return;

    var html = '';
    config.process.forEach(function (p, idx) {
      var isEven = idx % 2 === 1;
      html += '<div class="process-step-item relative flex flex-col md:flex-row items-center justify-between gap-8 mb-16 lg:mb-24 ' + (isEven ? 'md:flex-row-reverse' : '') + '">';
      
      // Content card
      html += '  <div class="w-full md:w-5/12 ' + (isEven ? 'md:text-right' : 'md:text-left') + '">';
      html += '    <div class="glass-panel p-8 rounded-2xl border border-white/10 hover:border-violet-500/40 transition-all">';
      html += '      <div class="flex items-center gap-3 mb-3 ' + (isEven ? 'md:justify-end' : 'justify-start') + '">';
      html += '        <span class="text-xs font-mono px-2.5 py-1 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">PHASE ' + p.step + '</span>';
      html += '        <span class="text-xs font-mono text-cyan-400">' + p.tagline + '</span>';
      html += '      </div>';
      html += '      <h3 class="text-2xl md:text-3xl font-display font-bold text-white mb-3">' + p.name + '</h3>';
      html += '      <p class="text-gray-300 text-sm md:text-base leading-relaxed mb-5">' + p.desc + '</p>';
      html += '      <div class="pt-4 border-t border-white/10 flex items-center gap-2 ' + (isEven ? 'md:justify-end' : 'justify-start') + '">';
      html += '        <span class="text-xs font-mono text-emerald-400">DELIVERABLE:</span>';
      html += '        <span class="text-xs text-white/80 font-medium">' + p.deliverable + '</span>';
      html += '      </div>';
      html += '    </div>';
      html += '  </div>';

      // Center Milestone Node
      html += '  <div class="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[#05050A] border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]">';
      html += '    <span class="text-sm font-mono font-bold text-cyan-300">' + p.step + '</span>';
      html += '  </div>';

      // Empty space for balance on desktop
      html += '  <div class="hidden md:block w-5/12"></div>';

      html += '</div>';
    });

    processEl.innerHTML = html;
  }

  // 5. Render Industries Grid (3D Hover-Tilt)
  function renderIndustries() {
    var indEl = document.getElementById('industries-grid');
    if (!indEl) return;

    var html = '';
    config.industries.forEach(function (ind) {
      html += '<div class="glass-tilt-card p-6 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group cursor-pointer">';
      html += '  <div>';
      html += '    <div class="flex items-center justify-between mb-4">';
      html += '      <span class="text-xs font-mono text-cyan-400/90 tracking-wide uppercase px-2 py-0.5 rounded bg-white/[0.03] border border-white/5">' + ind.tag + '</span>';
      html += '      <div class="w-2 h-2 rounded-full bg-cyan-400 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all"></div>';
      html += '    </div>';
      html += '    <h4 class="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">' + ind.name + '</h4>';
      html += '    <p class="text-xs md:text-sm text-gray-400 leading-relaxed">' + ind.desc + '</p>';
      html += '  </div>';
      html += '  <div class="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/50 group-hover:text-cyan-300 transition-colors">';
      html += '    <span>Explore Architecture</span>';
      html += '    <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>';
      html += '  </div>';
      html += '</div>';
    });

    indEl.innerHTML = html;
  }

  // 6. Connect All WhatsApp CTA Links
  function setupWhatsAppLinks() {
    var defaultUrl = config.getWhatsAppUrl();

    // Floating Button
    var floatBtn = document.getElementById('whatsapp-floating-btn');
    if (floatBtn) {
      floatBtn.setAttribute('href', defaultUrl);
      floatBtn.setAttribute('target', '_blank');
      floatBtn.setAttribute('rel', 'noopener noreferrer');
    }

    // Hero WhatsApp CTA
    var heroWaBtn = document.getElementById('hero-whatsapp-btn');
    if (heroWaBtn) {
      heroWaBtn.setAttribute('href', config.getWhatsAppUrl("Hi BDigital Tech, I want to discuss building a custom software platform."));
      heroWaBtn.setAttribute('target', '_blank');
      heroWaBtn.setAttribute('rel', 'noopener noreferrer');
    }

    // Nav WhatsApp CTA
    var navWaBtn = document.getElementById('nav-whatsapp-btn');
    if (navWaBtn) {
      navWaBtn.setAttribute('href', defaultUrl);
      navWaBtn.setAttribute('target', '_blank');
      navWaBtn.setAttribute('rel', 'noopener noreferrer');
    }

    // Final CTA WhatsApp Button
    var finalWaBtn = document.getElementById('final-cta-whatsapp-btn');
    if (finalWaBtn) {
      finalWaBtn.setAttribute('href', config.getWhatsAppUrl("Hi BDigital Tech, let's schedule an enterprise consultation."));
      finalWaBtn.setAttribute('target', '_blank');
      finalWaBtn.setAttribute('rel', 'noopener noreferrer');
    }

    // Footer WhatsApp Link
    var footerWaLink = document.getElementById('footer-whatsapp-link');
    if (footerWaLink) {
      footerWaLink.setAttribute('href', defaultUrl);
      footerWaLink.setAttribute('target', '_blank');
      footerWaLink.setAttribute('rel', 'noopener noreferrer');
    }
  }

  // 7. 3D Card Hover-Tilt Physics & Dynamic Spotlight
  function init3DTiltPhysics() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    var cards = document.querySelectorAll('.glass-tilt-card');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        // Set CSS variables for radial spotlight
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');

        if (!prefersReducedMotion) {
          var centerX = rect.width / 2;
          var centerY = rect.height / 2;
          var rotateX = ((y - centerY) / centerY) * -7;
          var rotateY = ((x - centerX) / centerX) * 7;

          card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
        }
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // 8. Preloader Sequence (≤ 1.8s)
  function initPreloader(onComplete) {
    var preloader = document.getElementById('preloader');
    var counterEl = document.getElementById('loader-counter');
    var statusEl = document.getElementById('loader-status');

    if (!preloader) {
      if (onComplete) onComplete();
      return;
    }

    var count = 0;
    var duration = 1600; // ms
    var intervalTime = 20;
    var step = 100 / (duration / intervalTime);

    var statuses = [
      "INITIALIZING DIGITAL ARCHITECTURE...",
      "SYNCHRONIZING 19 ENTERPRISE SOLUTIONS...",
      "COMPILING WEBGL SHADERS...",
      "SYSTEM READY"
    ];

    var timer = setInterval(function () {
      count += step;
      if (count >= 100) {
        count = 100;
        clearInterval(timer);
        if (counterEl) counterEl.textContent = '100%';
        if (statusEl) statusEl.textContent = statuses[3];

        setTimeout(function () {
          preloader.classList.add('wiped');
          setTimeout(function () {
            preloader.style.display = 'none';
            if (onComplete) onComplete();
          }, 900);
        }, 200);
      } else {
        if (counterEl) counterEl.textContent = Math.floor(count) + '%';
        if (statusEl) {
          if (count < 30) statusEl.textContent = statuses[0];
          else if (count < 70) statusEl.textContent = statuses[1];
          else statusEl.textContent = statuses[2];
        }
      }
    }, intervalTime);
  }

  // 9. GSAP & ScrollTrigger Master Choreography
  function initScrollChoreography() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Kinetic Hero Word-by-Word Reveal
    var heroHeadline = document.getElementById('hero-headline');
    if (heroHeadline) {
      var words = heroHeadline.textContent.trim().split(/\s+/);
      heroHeadline.innerHTML = words.map(function (w) {
        return '<span class="inline-block overflow-hidden"><span class="hero-word inline-block transform translate-y-full opacity-0">' + w + '&nbsp;</span></span>';
      }).join('');

      gsap.to('.hero-word', {
        y: '0%',
        opacity: 1,
        duration: 1.1,
        stagger: 0.08,
        ease: 'power4.out',
        delay: 0.2
      });
    }

    // Hero Subtitle and CTA Fade-in
    gsap.from(['#hero-subline', '#hero-cta-group', '#hero-scroll-cue'], {
      y: 30,
      opacity: 0,
      duration: 1.0,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.7
    });

    // CENTERPIECE: Pinned Horizontal Scroll Gallery (All 19 Services)
    var showcaseSection = document.getElementById('services-showcase');
    var track = document.getElementById('services-horizontal-track');
    var counterProgress = document.getElementById('showcase-current-num');
    var progressBar = document.getElementById('showcase-progress-bar');

    if (showcaseSection && track) {
      function getScrollAmount() {
        var trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth + 120);
      }

      var horizontalTween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: showcaseSection,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: function () {
            return '+=' + Math.max(track.scrollWidth - window.innerWidth, window.innerHeight * 2);
          },
          invalidateOnRefresh: true,
          onUpdate: function (self) {
            var progress = self.progress;
            var currentIdx = Math.min(Math.floor(progress * 19) + 1, 19);
            var formatted = currentIdx < 10 ? '0' + currentIdx : '' + currentIdx;
            if (counterProgress) counterProgress.textContent = formatted;
            if (progressBar) progressBar.style.width = (progress * 100) + '%';
          }
        }
      });
    }

    // Metric Count-Up Animation
    var metricCounters = document.querySelectorAll('.metric-counter');
    if (metricCounters.length > 0) {
      ScrollTrigger.create({
        trigger: '#why-us',
        start: 'top 75%',
        once: true,
        onEnter: function () {
          metricCounters.forEach(function (counter) {
            var target = parseFloat(counter.getAttribute('data-target'));
            var isDecimal = target % 1 !== 0;
            var obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 2.2,
              ease: 'power3.out',
              onUpdate: function () {
                counter.textContent = isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val);
              }
            });
          });
        }
      });
    }

    // Process Timeline Scroll Drawing
    var processTimeline = document.getElementById('process-timeline-container');
    var processSpine = document.getElementById('process-spine-glow');
    if (processTimeline && processSpine) {
      gsap.fromTo(processSpine, 
        { strokeDashoffset: 2000 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: processTimeline,
            start: 'top 70%',
            end: 'bottom 85%',
            scrub: 1
          }
        }
      );
    }
  }

  // DOM Content Loaded Handler
  document.addEventListener('DOMContentLoaded', function () {
    renderTicker();
    renderServicesShowcase();
    renderMetrics();
    renderProcess();
    renderIndustries();
    setupWhatsAppLinks();
    init3DTiltPhysics();

    if (window.refreshCursorListeners) {
      window.refreshCursorListeners();
    }

    initPreloader(function () {
      initScrollChoreography();
    });
  });

})();
