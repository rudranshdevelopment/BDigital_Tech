const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema(
  {
    target: { type: Number, required: true },
    suffix: { type: String, default: '' },
    label: { type: String, required: true },
    desc: { type: String, required: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Metric', MetricSchema);
