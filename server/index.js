require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const { connectDB } = require('./db');
const { seedDatabase } = require('./seed');

const app = express();
const PORT = parseInt(process.env.PORT, 10) || (process.env.NODE_ENV === 'production' ? 80 : 5000);
const HOST = process.env.HOST || '0.0.0.0';

// Trust reverse proxy (Coolify / Traefik / Nginx) for accurate client IPs and HTTPS detection
app.set('trust proxy', 1);

// Disable x-powered-by header for security
app.disable('x-powered-by');

// Middlewares
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Mount API Routes
app.use('/api/services', require('./routes/services'));
app.use('/api/metrics', require('./routes/metrics'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/health', require('./routes/health'));

// Serve Static Frontend with caching for static assets
const rootPath = path.join(__dirname, '..');
app.use(express.static(rootPath, {
  maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0,
  etag: true,
  lastModified: true
}));

// Fallback for API 404
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// SPA routing: send index.html for all other GET requests (e.g. /services, /contact)
app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(rootPath, 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

let server;

// Start Server and connect Database
const startServer = async () => {
  await connectDB();
  await seedDatabase();

  server = app.listen(PORT, HOST, () => {
    const displayHost = HOST === '0.0.0.0' ? 'localhost' : HOST;
    console.log(`====================================================`);
    console.log(`🚀 BDigital Tech Server running on http://${displayHost}:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📡 API Endpoints:`);
    console.log(`   - Services: http://${displayHost}:${PORT}/api/services`);
    console.log(`   - Metrics:  http://${displayHost}:${PORT}/api/metrics`);
    console.log(`   - Leads:    http://${displayHost}:${PORT}/api/leads`);
    console.log(`   - Health:   http://${displayHost}:${PORT}/api/health`);
    console.log(`====================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ Error: Port ${PORT} is already in use by another running process.`);
      console.error(`   To free port ${PORT} on Windows PowerShell, run:`);
      console.error(`   Get-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess | Stop-Process -Force\n`);
    } else {
      console.error('[Server Error]', err.message);
    }
    process.exit(1);
  });
};

// Graceful Shutdown for Docker / Coolify container lifecycle
const shutdown = (signal) => {
  console.log(`\n[Server] Received ${signal}. Starting graceful shutdown...`);
  if (server) {
    server.close(async () => {
      console.log('[Server] HTTP connections closed.');
      try {
        const mongoose = require('mongoose');
        await mongoose.connection.close(false);
        console.log('[MongoDB] Connection closed successfully.');
      } catch (err) {
        console.error('[MongoDB] Error closing connection:', err.message);
      }
      process.exit(0);
    });

    // Force exit after 10s if graceful close stalls
    setTimeout(() => {
      console.error('[Server] Forced shutdown due to timeout.');
      process.exit(1);
    }, 10000).unref();
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

startServer();
