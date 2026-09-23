const mongoose = require('mongoose');

const WhatsAppLeadSchema = new mongoose.Schema(
  {
    service: { type: String, default: 'General Consultation' },
    triggerLocation: { type: String, enum: ['floating_button', 'hero_cta', 'service_card', 'final_cta', 'navbar'], default: 'floating_button' },
    customMessage: { type: String },
    userAgent: { type: String },
    ip: { type: String },
    referrer: { type: String },
    createdAt: { type: Date, default: Date.now }
  }
);

module.exports = mongoose.model('WhatsAppLead', WhatsAppLeadSchema);
