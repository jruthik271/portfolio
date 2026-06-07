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
  solvedTotal: 155,
  solvedEasy: 82,
  solvedMedium: 62,
  solvedHard: 11,
  globalRank: 185000,
  contestRating: 1480,
  streak: 5
};

export const leetcodeService = {
  getStats: async (): Promise<LeetcodeStats> => {
    try {
      const response = await fetch('https://leetcode-stats-api.herokuapp.com/jruthik271');
      if (!response.ok) {
        throw new Error(`Leetcode API proxy returned status ${response.status}`);
      }
      const data = await response.json();
      if (data && data.status === 'success') {
        return {
          solvedTotal: data.totalSolved || defaultStats.solvedTotal,
          solvedEasy: data.easySolved || defaultStats.solvedEasy,
          solvedMedium: data.mediumSolved || defaultStats.solvedMedium,
          solvedHard: data.hardSolved || defaultStats.solvedHard,
          globalRank: data.ranking || defaultStats.globalRank,
          contestRating: defaultStats.contestRating, // Default as proxy doesn't supply this
          streak: data.contributionPoints || defaultStats.streak
        };
      }
      return defaultStats;
    } catch (e) {
      console.warn('LeetCode stats fetch failed, using fallback:', e);
      return defaultStats;
    }
  },

  syncStats: async (): Promise<{ success: boolean; message: string; stats?: LeetcodeStats }> => {
    return { success: true, message: 'Client-side fallback sync complete' };
  }
};
