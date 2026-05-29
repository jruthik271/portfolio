const leetcodeService = require('../services/leetcodeService');

const getStats = async (req, res) => {
  try {
    const stats = await leetcodeService.getCachedLeetcodeStats();
    return res.json(stats);
  } catch (error) {
    console.error('LeetCode getStats Controller Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve LeetCode statistics.' });
  }
};

const syncStats = async (req, res) => {
  try {
    const stats = await leetcodeService.syncLeetcodeStats();
    return res.json({ success: true, message: 'LeetCode profile synced successfully', stats });
  } catch (error) {
    console.error('LeetCode syncStats Controller Error:', error);
    return res.status(500).json({ error: 'Failed to synchronize LeetCode profile.' });
  }
};

module.exports = {
  getStats,
  syncStats
};
