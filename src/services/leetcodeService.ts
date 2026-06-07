export interface LeetcodeStats {
  solvedTotal: number;
  solvedEasy: number;
  solvedMedium: number;
  solvedHard: number;
  globalRank: number;
  contestRating: number;
  streak: number;
}

const defaultStats: LeetcodeStats = {
  solvedTotal: 164,
  solvedEasy: 143,
  solvedMedium: 20,
  solvedHard: 1,
  globalRank: 978934,
  contestRating: 1480,
  streak: 0
};

export const leetcodeService = {
  getStats: async (): Promise<LeetcodeStats> => {
    // 1. Read from localStorage cache for immediate display
    const cached = localStorage.getItem('leetcode_stats_cache');
    let cachedData: LeetcodeStats | null = null;
    if (cached) {
      try {
        cachedData = JSON.parse(cached);
      } catch (e) {
        console.warn('Failed to parse LeetCode cache:', e);
      }
    }

    // Helper to fetch fresh data and write to cache
    const fetchFreshStats = async (): Promise<LeetcodeStats | null> => {
      try {
        const response = await fetch('https://alfa-leetcode-api.onrender.com/jruthik271/solved');
        if (response.ok) {
          const data = await response.json();
          if (data && data.solvedProblem !== undefined) {
            const freshStats: LeetcodeStats = {
              solvedTotal: data.solvedProblem,
              solvedEasy: data.easySolved !== undefined ? data.easySolved : defaultStats.solvedEasy,
              solvedMedium: data.mediumSolved !== undefined ? data.mediumSolved : defaultStats.solvedMedium,
              solvedHard: data.hardSolved !== undefined ? data.hardSolved : defaultStats.solvedHard,
              globalRank: defaultStats.globalRank,
              contestRating: defaultStats.contestRating,
              streak: defaultStats.streak
            };
            localStorage.setItem('leetcode_stats_cache', JSON.stringify(freshStats));
            return freshStats;
          }
        }
      } catch (e) {
        console.warn('Background LeetCode stats update failed:', e);
      }
      return null;
    };

    // 2. If cache exists, trigger background update and return cached data immediately (0ms blocking)
    if (cachedData) {
      fetchFreshStats().catch(() => null);
      return cachedData;
    }

    // 3. Fallback to waiting for fetch if cache is empty
    const fresh = await fetchFreshStats();
    return fresh || defaultStats;
  },

  syncStats: async (): Promise<{ success: boolean; message: string; stats?: LeetcodeStats }> => {
    return { success: true, message: 'Client-side fallback sync complete' };
  }
};
