import React from 'react';
import { SITE_CONFIG } from '../utils/config';
import { trackWhatsAppLead } from '../utils/api';

export default function WhatsAppButton() {
  const handleClick = () => {
    trackWhatsAppLead({
      service: 'General WhatsApp Inquiry',
      triggerLocation: 'floating_button',
      customMessage: 'Floating WhatsApp Button Click'
    });
  };

  return (
    <a
      id="whatsapp-floating-btn"
      href={SITE_CONFIG.getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="whatsapp-float-btn group"
      aria-label="Chat with BDigital Tech on WhatsApp"
      data-cursor-hover
      data-cursor-magnetic
    >
      {/* WhatsApp Glyph SVG */}
      <svg className="w-8 h-8 fill-white transform group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.761.82 2.796.82 3.183 0 5.768-2.587 5.769-5.766.001-3.182-2.585-5.766-5.769-5.766zm9.969 5.768c0 5.503-4.469 9.97-9.97 9.97-1.748 0-3.376-.453-4.81-1.242L2 22l1.341-4.896C2.52 15.65 2.031 13.9 2.031 11.94c0-5.503 4.47-9.97 9.97-9.97 5.501 0 9.969 4.467 9.969 9.97z" />
      </svg>

      {/* Tooltip */}
      <span className="whatsapp-tooltip">Chat with us on WhatsApp</span>
    </a>
  );
}
