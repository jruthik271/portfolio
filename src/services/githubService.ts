import { apiFetch } from './api';

export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export const githubService = {
  getRepos: async (limit?: number): Promise<GithubRepo[]> => {
    const query = limit ? `?limit=${limit}` : '';
    return apiFetch<GithubRepo[]>(`/api/github/repos${query}`);
  },

  syncRepos: async (): Promise<{ success: boolean; message: string; repos?: GithubRepo[] }> => {
    return apiFetch<{ success: boolean; message: string; repos?: GithubRepo[] }>('/api/github/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
