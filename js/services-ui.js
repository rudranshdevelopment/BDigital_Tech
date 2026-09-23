/**
 * BDigital Tech — Four Pillars & 19 Services Interactive Console
 * Renders and choreographs the service showcase UI dynamically from BDIGITAL_DATA
 * adhering 100% to the approved visual styling and futuristic HUD language.
 */

(function () {
  'use strict';

  var activePillarId = 'business-operations';
  var activeServiceId = 'erp';

  function initServicesShowcase() {
    if (typeof BDIGITAL_DATA === 'undefined') {
      console.warn('BDIGITAL_DATA not found. Retrying in 50ms...');
      setTimeout(initServicesShowcase, 50);
      return;
    }

    renderPillarTabs();
    selectPillar(activePillarId, activeServiceId);
    setupTicker();
    setupQuickLinks();
  }

  function renderPillarTabs() {
    var tabsContainer = document.getElementById('pillar-tabs-container');
    if (!tabsContainer) return;

    var pillars = BDIGITAL_DATA.getPillars();
    var html = '';

    pillars.forEach(function (pillar) {
      var isActive = pillar.id === activePillarId ? ' active' : '';
      html += '<button class="pillar-tab-btn' + isActive + '" data-pillar-id="' + pillar.id + '" role="tab" aria-selected="' + (pillar.id === activePillarId) + '">';
      html += '  <span class="pillar-tab-num">' + pillar.number + '</span>';
      html += '  <span class="pillar-tab-name">' + pillar.name + '</span>';
      html += '</button>';
    });

    tabsContainer.innerHTML = html;

    // Attach click listeners to tabs
    var tabBtns = tabsContainer.querySelectorAll('.pillar-tab-btn');
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pId = this.getAttribute('data-pillar-id');
        selectPillar(pId);
      });
    });
  }

  function selectPillar(pillarId, defaultServiceId) {
    activePillarId = pillarId;
    var pillar = BDIGITAL_DATA.getPillarById(pillarId);
    if (!pillar) return;

    // Update active tab styling
    var tabBtns = document.querySelectorAll('.pillar-tab-btn');
    tabBtns.forEach(function (btn) {
      var isCurrent = btn.getAttribute('data-pillar-id') === pillarId;
      btn.classList.toggle('active', isCurrent);
      btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });

    // Update Pillar Header & Tagline
    var bannerTag = document.getElementById('pillar-badge-text');
    var bannerTitle = document.getElementById('pillar-active-name');
    var bannerDesc = document.getElementById('pillar-active-tagline');

    if (bannerTag) bannerTag.textContent = 'PILLAR ' + pillar.number + ' // ' + pillar.badge.toUpperCase();
    if (bannerTitle) bannerTitle.textContent = pillar.name;
    if (bannerDesc) bannerDesc.textContent = pillar.tagline;

    // Get services for this pillar
    var services = BDIGITAL_DATA.getServicesByPillar(pillarId);
    renderServicesList(services);

    // Select first service or the requested default
    var targetService = defaultServiceId || (services.length > 0 ? services[0].id : null);
    if (targetService) {
      selectService(targetService);
    }
  }

  function renderServicesList(services) {
    var listContainer = document.getElementById('pillar-services-list');
    if (!listContainer) return;

    var html = '';
    services.forEach(function (s) {
      var isSelected = s.id === activeServiceId ? ' active' : '';
      html += '<div class="service-selector-card' + isSelected + '" data-service-id="' + s.id + '" role="button" tabindex="0">';
      html += '  <div class="selector-card-left">';
      html += '    <div class="selector-card-header">';
      html += '      <span class="service-index-badge">' + s.number + '</span>';
      html += '      <span class="service-mini-title">' + s.shortName + '</span>';
      html += '    </div>';
      html += '    <div class="service-mini-sub">' + s.title + '</div>';
      html += '  </div>';
      html += '  <div class="selector-card-right">';
      html += '    <span class="selector-sync-dot"></span>';
      html += '    <svg class="selector-arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>';
      html += '  </div>';
      html += '</div>';
    });

    listContainer.innerHTML = html;

    // Attach click events to service cards
    var cards = listContainer.querySelectorAll('.service-selector-card');
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        var sId = this.getAttribute('data-service-id');
        selectService(sId);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var sId = this.getAttribute('data-service-id');
          selectService(sId);
        }
      });
    });
  }

  function selectService(serviceId) {
    activeServiceId = serviceId;
    var service = BDIGITAL_DATA.getServiceById(serviceId);
    if (!service) return;

    // Update active highlight on service selector cards
    var cards = document.querySelectorAll('.service-selector-card');
    cards.forEach(function (c) {
      var isCurrent = c.getAttribute('data-service-id') === serviceId;
      c.classList.toggle('active', isCurrent);
    });

    // Populate Active Service HUD Console
    var consoleElem = document.getElementById('service-hud-console');
    if (!consoleElem) return;

    // Add subtle state transition animation
    consoleElem.classList.remove('updating');
    void consoleElem.offsetWidth; // trigger reflow
    consoleElem.classList.add('updating');

    // Telemetry & Pillar Tag
    var pillar = BDIGITAL_DATA.getPillarById(service.pillarId);
    var pillarName = pillar ? pillar.name : 'Enterprise Architecture';
    var tagElem = document.getElementById('hud-service-tag');
    if (tagElem) {
      tagElem.textContent = 'SERVICE ' + service.number + ' // ' + pillarName.toUpperCase();
    }

    // Title & Subtitle
    var titleElem = document.getElementById('hud-service-title');
    if (titleElem) {
      titleElem.textContent = service.title;
    }

    // Short Description Callout
    var shortDescElem = document.getElementById('hud-service-short-desc');
    if (shortDescElem) {
      shortDescElem.textContent = '“' + service.shortDescription + '”';
    }

    // Full Information Overview
    var infoElem = document.getElementById('hud-service-info');
    if (infoElem) {
      infoElem.textContent = service.information;
    }

    // Key Capabilities Tags / List
    var capsContainer = document.getElementById('hud-capabilities-list');
    if (capsContainer) {
      var capsHtml = '';
      service.capabilities.forEach(function (cap) {
        capsHtml += '<div class="capability-chip">';
        capsHtml += '  <span class="capability-chip-bullet"></span>';
        capsHtml += '  <span class="capability-chip-text">' + cap + '</span>';
        capsHtml += '</div>';
      });
      capsContainer.innerHTML = capsHtml;
    }

    // Ideal For Callout
    var idealElem = document.getElementById('hud-service-ideal-for');
    if (idealElem) {
      idealElem.textContent = service.idealFor;
    }

    // WhatsApp CTA Button
    var waBtn = document.getElementById('hud-service-wa-btn');
    if (waBtn) {
      var waUrl = BDIGITAL_DATA.getWhatsAppUrl(service.id);
      waBtn.setAttribute('href', waUrl);
      waBtn.setAttribute('target', '_blank');
      waBtn.setAttribute('rel', 'noopener noreferrer');
      waBtn.setAttribute('data-wa-context', service.title);

      var btnText = waBtn.querySelector('.wa-btn-label');
      if (btnText) {
        btnText.textContent = service.ctaText;
      }
    }
  }

  function setupTicker() {
    var tickerTrack = document.querySelector('.capability-ticker-track');
    if (!tickerTrack) return;

    var services = BDIGITAL_DATA.getServices();
    var html = '';
    // Build continuous marquee using all 19 services
    for (var pass = 0; pass < 2; pass++) {
      services.forEach(function (s) {
        html += '<span class="capability-item" data-service-jump="' + s.id + '">' + s.shortName + '</span>';
        html += '<span class="capability-separator-dot"></span>';
      });
    }
    tickerTrack.innerHTML = html;

    // Make ticker items clickable to jump directly to that service
    tickerTrack.querySelectorAll('[data-service-jump]').forEach(function (item) {
      item.style.cursor = 'pointer';
      item.addEventListener('click', function () {
        var sId = this.getAttribute('data-service-jump');
        jumpToService(sId);
      });
    });
  }

  function setupQuickLinks() {
    // Listen for clicks on links that reference services
    document.querySelectorAll('[data-select-service]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var sId = this.getAttribute('data-select-service');
        jumpToService(sId);
      });
    });
  }

  function jumpToService(serviceId) {
    var service = BDIGITAL_DATA.getServiceById(serviceId);
    if (!service) return;

    var targetSection = document.getElementById('our-solution');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    selectPillar(service.pillarId, service.id);
  }

  // Expose global API
  window.BDIGITAL_SERVICES_UI = {
    init: initServicesShowcase,
    selectPillar: selectPillar,
    selectService: selectService,
    jumpToService: jumpToService
  };

  document.addEventListener('DOMContentLoaded', function () {
    initServicesShowcase();
  });
})();
