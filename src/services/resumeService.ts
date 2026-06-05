import { apiFetch } from './api';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface ResumeStats {
  count: number;
}

export const resumeService = {
  getStats: async (): Promise<ResumeStats> => {
    return apiFetch<ResumeStats>('/api/resume/stats');
  },

  getDownloadUrl: (): string => {
    return `${BASE_URL}/api/resume/download`;
  },
};
