const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    serviceId: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    badge: { type: String, required: true },
    color: { type: String, default: 'from-cyan-500 to-blue-600' },
    iconType: { type: String, required: true },
    features: [{ type: String }],
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', ServiceSchema);
