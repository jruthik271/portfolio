const express = require('express');
const router = express.Router();
const gfgService = require('../services/geeksforgeeksService');

router.get('/stats', async (req, res) => {
  try {
    const stats = await gfgService.getCachedGeeksforGeeksStats();
    return res.json(stats);
  } catch (error) {
    console.error('GeeksforGeeks getStats Route Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve GeeksforGeeks statistics.' });
  }
});

router.post('/sync', async (req, res) => {
  try {
    const stats = await gfgService.syncGeeksforGeeksStats();
    return res.json({ success: true, message: 'GeeksforGeeks profile synced successfully', stats });
  } catch (error) {
    console.error('GeeksforGeeks syncStats Route Error:', error);
    return res.status(500).json({ error: 'Failed to synchronize GeeksforGeeks profile.' });
  }
});

module.exports = router;
