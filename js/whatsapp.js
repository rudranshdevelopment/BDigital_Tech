/**
 * BDigital Tech - Enterprise WhatsApp Routing & Lead Telemetry
 */

(function () {
  'use strict';

  var WHATSAPP_CONFIG = {
    phone: "917709629488", // Client official WhatsApp number
    defaultMessage: "Hi BDigital Tech, I'd like to consult on connecting our business operations software."
  };

  function getWhatsAppUrl(customText) {
    var msg = customText || WHATSAPP_CONFIG.defaultMessage;
    return "https://wa.me/" + WHATSAPP_CONFIG.phone + "?text=" + encodeURIComponent(msg);
  }

  function logLeadTelemetry(context) {
    try {
      fetch('/api/leads/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: context || 'General Consultation',
          triggerLocation: 'whatsapp_cta',
          referrer: window.location.href
        })
      }).catch(function () {});
    } catch (e) {}
  }

  function bindWhatsAppTriggers() {
    var triggers = document.querySelectorAll('[data-wa-trigger]');
    triggers.forEach(function (btn) {
      var context = btn.getAttribute('data-wa-context') || '';
      var currentHref = btn.getAttribute('href');

      // Only assign default URL if href is missing or a hash placeholder
      if (!currentHref || currentHref === '#' || currentHref === '') {
        var message = context 
          ? "Hi BDigital Tech, I'd like to consult on " + context + "."
          : WHATSAPP_CONFIG.defaultMessage;
        btn.setAttribute('href', getWhatsAppUrl(message));
      }

      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');

      // Avoid duplicate listener bindings
      if (!btn._waBound) {
        btn._waBound = true;
        btn.addEventListener('click', function () {
          logLeadTelemetry(context || 'Direct WhatsApp CTA');
        });
      }
    });

    var floatBtn = document.getElementById('floating-whatsapp');
    if (floatBtn && !floatBtn._waBound) {
      floatBtn._waBound = true;
      floatBtn.setAttribute('href', getWhatsAppUrl());
      floatBtn.setAttribute('target', '_blank');
      floatBtn.setAttribute('rel', 'noopener noreferrer');
      floatBtn.addEventListener('click', function () {
        logLeadTelemetry('Floating Utility');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    bindWhatsAppTriggers();
  });

  window.BDIGITAL_WHATSAPP = {
    getUrl: getWhatsAppUrl,
    config: WHATSAPP_CONFIG
  };
})();
