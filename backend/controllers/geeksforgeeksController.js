const gfgService = require('../services/geeksforgeeksService');

const getStats = async (req, res) => {
  try {
    const stats = await gfgService.getCachedGeeksforGeeksStats();
    return res.json(stats);
  } catch (error) {
    console.error('GeeksforGeeks getStats Controller Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve GeeksforGeeks statistics.' });
  }
};

const syncStats = async (req, res) => {
  try {
    const stats = await gfgService.syncGeeksforGeeksStats();
    return res.json({ success: true, message: 'GeeksforGeeks profile synced successfully', stats });
  } catch (error) {
    console.error('GeeksforGeeks syncStats Controller Error:', error);
    return res.status(500).json({ error: 'Failed to synchronize GeeksforGeeks profile.' });
  }
};

module.exports = {
  getStats,
  syncStats
};
