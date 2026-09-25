const express = require('express');
const router = express.Router();
const WhatsAppLead = require('../models/WhatsAppLead');

// POST /api/leads/track - Log WhatsApp click interaction to MongoDB
router.post('/track', async (req, res) => {
  try {
    const { service, triggerLocation, customMessage, referrer } = req.body;
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const ip = req.ip || req.connection.remoteAddress || 'Unknown';

    const VALID_LOCATIONS = ['floating_button', 'hero_cta', 'service_card', 'final_cta', 'navbar'];
    const safeLocation = VALID_LOCATIONS.includes(triggerLocation) ? triggerLocation : 'floating_button';

    const lead = new WhatsAppLead({
      service: service || 'General Consultation',
      triggerLocation: safeLocation,
      customMessage: customMessage || '',
      userAgent,
      ip,
      referrer: referrer || req.headers.referer || ''
    });

    await lead.save();
    console.log(`[Lead Telemetry] WhatsApp lead recorded for service: "${lead.service}" via ${lead.triggerLocation}`);

    res.status(201).json({
      success: true,
      message: 'Telemetry logged successfully',
      id: lead._id
    });
  } catch (error) {
    console.warn(`[Lead Telemetry Warning] Failed to log lead: ${error.message}`);
    // Respond with success false but non-blocking status
    res.status(200).json({
      success: false,
      message: 'Failed to record lead, but link navigation proceeds.'
    });
  }
});

// GET /api/leads - Summary of leads for system dashboard
router.get('/', async (req, res) => {
  try {
    const leads = await WhatsAppLead.find().sort({ createdAt: -1 }).limit(50);
    const totalCount = await WhatsAppLead.countDocuments();
    res.json({
      success: true,
      totalCount,
      leads
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
