const Analytic = require('../models/Analytic');

const downloadResume = async (req, res) => {
  try {
    // 1. Increment download count in analytics
    await Analytic.findOneAndUpdate(
      { type: 'resume_downloads' },
      { $inc: { count: 1 }, lastUpdated: Date.now() },
      { upsert: true, new: true }
    );

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
    const stat = await Analytic.findOne({ type: 'resume_downloads' });
    return res.json({ count: stat ? stat.count : 0 });
  } catch (error) {
    console.error('Resume stats controller error:', error);
    return res.status(500).json({ error: 'Failed to retrieve download metrics.' });
  }
};

module.exports = {
  downloadResume,
  getStats,
};
