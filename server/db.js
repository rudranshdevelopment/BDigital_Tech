const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/bdigital_tech';

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.warn(`[MongoDB] Warning: Could not connect to MongoDB (${error.message}). Running with in-memory fallback.`);
    isConnected = false;
  }
};

const getDbStatus = () => {
  return isConnected ? 'connected' : 'disconnected';
};

module.exports = { connectDB, getDbStatus };
