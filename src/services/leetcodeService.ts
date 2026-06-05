import { apiFetch } from './api';

export interface LeetcodeStats {
  solvedTotal: number;
  solvedEasy: number;
  solvedMedium: number;
  solvedHard: number;
  globalRank: number;
  contestRating: number;
  streak: number;
}

export const leetcodeService = {
  getStats: async (): Promise<LeetcodeStats> => {
    return apiFetch<LeetcodeStats>('/api/leetcode/stats');
  },

  syncStats: async (): Promise<{ success: boolean; message: string; stats?: LeetcodeStats }> => {
    return apiFetch<{ success: boolean; message: string; stats?: LeetcodeStats }>('/api/leetcode/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
