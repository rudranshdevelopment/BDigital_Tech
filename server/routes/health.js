const express = require('express');
const router = express.Router();
const { getDbStatus } = require('../db');

// GET /api/health - Health check endpoint
router.get('/', (req, res) => {
  const dbStatus = getDbStatus();
  res.json({
    status: dbStatus === 'connected' ? 'healthy' : 'degraded',
    platform: 'BDigital Tech Enterprise MERN Core',
    database: dbStatus,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
