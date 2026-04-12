const mongoose = require('mongoose');

const analyticSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true, // e.g., 'resume_downloads'
  },
  count: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Analytic', analyticSchema);
