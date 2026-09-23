require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { connectDB } = require('./db');
const { seedDatabase } = require('./seed');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Mount API Routes
app.use('/api/services', require('./routes/services'));
app.use('/api/metrics', require('./routes/metrics'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/health', require('./routes/health'));

// Serve Static Frontend directly from root directory
const rootPath = path.join(__dirname, '..');
app.use(express.static(rootPath));

app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api/')) return next();
  res.sendFile(path.join(rootPath, 'index.html'));
});

// Start Server and connect Database
const startServer = async () => {
  await connectDB();
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 BDigital Tech MERN Server running on port ${PORT}`);
    console.log(`📡 API Endpoints:`);
    console.log(`   - Services: http://localhost:${PORT}/api/services`);
    console.log(`   - Metrics:  http://localhost:${PORT}/api/metrics`);
    console.log(`   - Leads:    http://localhost:${PORT}/api/leads`);
    console.log(`   - Health:   http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
};

startServer();
