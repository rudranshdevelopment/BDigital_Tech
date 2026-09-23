const express = require('express');
const router = express.Router();
const Metric = require('../models/Metric');
const { initialMetrics } = require('../seed');

// GET /api/metrics - Return why-us stats
router.get('/', async (req, res) => {
  try {
    let metrics = await Metric.find().sort({ order: 1 });
    if (!metrics || metrics.length === 0) {
      metrics = initialMetrics;
    }
    res.json({
      success: true,
      count: metrics.length,
      data: metrics
    });
  } catch (error) {
    res.json({
      success: true,
      count: initialMetrics.length,
      data: initialMetrics,
      source: 'fallback'
    });
  }
});

module.exports = router;
