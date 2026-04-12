const express = require('express');
const router = express.Router();
const Analytic = require('../models/Analytic');

router.get('/download', async (req, res) => {
  try {
    // Increment download count
    await Analytic.findOneAndUpdate(
      { type: 'resume_downloads' },
      { $inc: { count: 1 }, lastUpdated: Date.now() },
      { upsert: true, new: true }
    );

    // Redirect to the actual resume file hosted on the frontend
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${clientUrl}/resume.pdf`);
  } catch (error) {
    console.error('Resume download error:', error);
    res.status(500).send('Error processing download');
  }
});

router.get('/stats', async (req, res) => {
   try {
     const stat = await Analytic.findOne({ type: 'resume_downloads' });
     res.json({ count: stat ? stat.count : 0 });
   } catch (error) {
     res.status(500).json({ error: 'Internal server error' });
   }
});

module.exports = router;
