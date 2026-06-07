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
    try {
      const response = await fetch('https://alfa-leetcode-api.onrender.com/jruthik271/solved');
      if (!response.ok) {
        throw new Error(`Leetcode API proxy returned status ${response.status}`);
      }
      const data = await response.json();
      if (data && data.solvedProblem !== undefined) {
        return {
          solvedTotal: data.solvedProblem,
          solvedEasy: data.easySolved !== undefined ? data.easySolved : defaultStats.solvedEasy,
          solvedMedium: data.mediumSolved !== undefined ? data.mediumSolved : defaultStats.solvedMedium,
          solvedHard: data.hardSolved !== undefined ? data.hardSolved : defaultStats.solvedHard,
          globalRank: defaultStats.globalRank,
          contestRating: defaultStats.contestRating,
          streak: defaultStats.streak
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
