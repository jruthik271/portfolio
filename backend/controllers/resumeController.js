const Analytic = require('../models/Analytic');

const downloadResume = async (req, res) => {
  try {
    // 1. Increment download count in analytics if connection is ready
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      try {
        await Analytic.findOneAndUpdate(
          { type: 'resume_downloads' },
          { $inc: { count: 1 }, lastUpdated: Date.now() },
          { upsert: true, new: true }
        );
      } catch (dbErr) {
        console.warn('Failed to update resume download analytics:', dbErr.message);
      }
    } else {
      console.warn('MongoDB not connected, skipping resume download count increment.');
    }

    // 2. Redirect to client-hosted resume file
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    return res.redirect(`${clientUrl}/resume.pdf`);
  } catch (error) {
    console.error('Resume download controller error:', error);
    return res.status(500).send('Error processing download request.');
  }
};

const getStats = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    let count = 0;
    if (mongoose.connection.readyState === 1) {
      try {
        const stat = await Analytic.findOne({ type: 'resume_downloads' });
        if (stat) count = stat.count;
      } catch (dbErr) {
        console.warn('Failed to fetch resume downloads stats:', dbErr.message);
      }
    }
    return res.json({ count });
  } catch (error) {
    console.error('Resume stats controller error:', error);
    return res.status(500).json({ error: 'Failed to retrieve download metrics.' });
  }
};

module.exports = {
  downloadResume,
  getStats,
};
