const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { initialServices } = require('../seed');

// GET /api/services - Return all 19 services
router.get('/', async (req, res) => {
  try {
    let services = await Service.find().sort({ order: 1 });
    if (!services || services.length === 0) {
      services = initialServices;
    }
    res.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    // Graceful fallback to static data if DB is temporarily offline
    res.json({
      success: true,
      count: initialServices.length,
      data: initialServices,
      source: 'fallback'
    });
  }
});

// GET /api/services/:id - Get single service by serviceId
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findOne({ serviceId: req.params.id });
    if (!service) {
      const fallback = initialServices.find(s => s.serviceId === req.params.id);
      if (fallback) return res.json({ success: true, data: fallback });
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
