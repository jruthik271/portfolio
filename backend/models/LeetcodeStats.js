const mongoose = require('mongoose');

const leetcodeStatsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  solvedTotal: {
    type: Number,
    default: 0
  },
  solvedEasy: {
    type: Number,
    default: 0
  },
  solvedMedium: {
    type: Number,
    default: 0
  },
  solvedHard: {
    type: Number,
    default: 0
  },
  globalRank: {
    type: Number,
    default: 0
  },
  contestRating: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  fetchedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LeetcodeStats', leetcodeStatsSchema);
