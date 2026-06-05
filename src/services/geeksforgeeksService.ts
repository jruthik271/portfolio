import { apiFetch } from './api';

export interface GeeksforGeeksStats {
  solvedTotal: number;
  fetchedAt: number;
}

export const geeksforgeeksService = {
  getStats: async (): Promise<GeeksforGeeksStats> => {
    return apiFetch<GeeksforGeeksStats>('/api/geeksforgeeks/stats');
  },

  syncStats: async (): Promise<{ success: boolean; message: string; stats?: GeeksforGeeksStats }> => {
    return apiFetch<{ success: boolean; message: string; stats?: GeeksforGeeksStats }>('/api/geeksforgeeks/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
