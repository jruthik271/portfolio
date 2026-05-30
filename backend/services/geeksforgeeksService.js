const axios = require('axios');

let gfgInMemoryCache = {
  solvedTotal: 2, // Sumanth's actual GFG solved problems count is 2 (new account/jruthik271)
  fetchedAt: Date.now()
};

const syncGeeksforGeeksStats = async () => {
  const username = process.env.GEEKSFORGEEKS_USERNAME || 'jruthik271';
  console.log(`Syncing GeeksforGeeks statistics for user: ${username}`);
  
  try {
    const response = await axios.get(`https://www.geeksforgeeks.org/user/${username}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 8000
    });

    const html = response.data;
    const match = html.match(/"total_problems_solved"\s*:\s*(\d+)/);
    
    if (match) {
      const solvedTotal = parseInt(match[1]);
      gfgInMemoryCache = {
        solvedTotal,
        fetchedAt: Date.now()
      };
      console.log(`GeeksforGeeks sync complete: ${solvedTotal} problems solved`);
      return gfgInMemoryCache;
    } else {
      console.warn('GeeksforGeeks profile scraped but total_problems_solved pattern not found. Using fallback cache.');
      return gfgInMemoryCache;
    }
  } catch (error) {
    console.error(`GeeksforGeeks Service Error: ${error.message}`);
    return gfgInMemoryCache;
  }
};

const getCachedGeeksforGeeksStats = async () => {
  // If memory cache exists and was fetched recently, return it
  if (gfgInMemoryCache && (Date.now() - gfgInMemoryCache.fetchedAt < 3600000)) {
    return gfgInMemoryCache;
  }
  
  // Otherwise, trigger background sync
  syncGeeksforGeeksStats().catch(err => console.error('Background GFG sync failed:', err.message));
  return gfgInMemoryCache;
};

module.exports = {
  syncGeeksforGeeksStats,
  getCachedGeeksforGeeksStats
};
