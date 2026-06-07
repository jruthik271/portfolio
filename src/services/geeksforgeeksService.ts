export interface GeeksforGeeksStats {
  solvedTotal: number;
  fetchedAt: number;
}

const defaultStats: GeeksforGeeksStats = {
  solvedTotal: 2,
  fetchedAt: Date.now()
};

export const geeksforgeeksService = {
  getStats: async (): Promise<GeeksforGeeksStats> => {
    return defaultStats;
  },

  syncStats: async (): Promise<{ success: boolean; message: string; stats?: GeeksforGeeksStats }> => {
    return { success: true, message: 'Client-side fallback sync complete' };
  }
};
