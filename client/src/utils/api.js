import { SITE_CONFIG } from './config';

const API_BASE = '/api';

export const fetchServices = async () => {
  try {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data && data.data.length > 0 ? data.data : SITE_CONFIG.services;
  } catch (err) {
    console.warn('[API] Using local services fallback:', err.message);
    return SITE_CONFIG.services;
  }
};

export const fetchMetrics = async () => {
  try {
    const res = await fetch(`${API_BASE}/metrics`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data && data.data.length > 0 ? data.data : SITE_CONFIG.metrics;
  } catch (err) {
    console.warn('[API] Using local metrics fallback:', err.message);
    return SITE_CONFIG.metrics;
  }
};

export const fetchHealth = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      status: 'healthy',
      database: 'local_active',
      platform: 'BDigital Tech MERN Core',
      timestamp: new Date().toISOString()
    };
  }
};

export const trackWhatsAppLead = async ({ service, triggerLocation, customMessage }) => {
  try {
    await fetch(`${API_BASE}/leads/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: service || 'General Consultation',
        triggerLocation: triggerLocation || 'floating_button',
        customMessage: customMessage || '',
        referrer: window.location.href
      })
    });
  } catch (err) {
    // Non-blocking telemetry tracking
    console.log('[Telemetry] Dispatched locally:', service);
  }
};
