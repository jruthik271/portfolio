const leetcodeService = require('./leetcodeService');
const githubService = require('./githubService');
const gfgService = require('./geeksforgeeksService');

const startScheduler = () => {
  console.log('Daily sync scheduler initialized.');
  
  // 1. Initial synchronization on server bootup
  const triggerSync = async () => {
    console.log('Background Sync Process Started...');
    try {
      await Promise.all([
        leetcodeService.syncLeetcodeStats().catch(err => console.error('LeetCode sync failed:', err.message)),
        githubService.syncGithubRepos().catch(err => console.error('GitHub sync failed:', err.message)),
        gfgService.syncGeeksforGeeksStats().catch(err => console.error('GeeksforGeeks sync failed:', err.message))
      ]);
      console.log('Background Sync Process Completed successfully.');
    } catch (err) {
      console.error('Unified Sync Process failed:', err.message);
    }
  };

  // Run immediately on boot
  triggerSync();

  // 2. Set recurring sync every 24 hours (86,400,000 milliseconds)
  const DAILY_INTERVAL = 24 * 60 * 60 * 1000;
  setInterval(() => {
    console.log('Scheduler Trigger: Starting daily live synchronization...');
    triggerSync();
  }, DAILY_INTERVAL);
};

module.exports = {
  startScheduler
};
