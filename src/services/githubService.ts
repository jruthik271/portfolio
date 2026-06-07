export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

const mockRepos: GithubRepo[] = [
  { name: 'cognivision', html_url: 'https://github.com/jruthik271/cognivision', description: 'Assistive mobile application using Flutter and Dart.', language: 'Dart', stargazers_count: 5, forks_count: 0, updated_at: new Date().toISOString() },
  { name: 'worknow', html_url: 'https://github.com/jruthik271/worknow', description: 'Production-ready job search mobile application with Flutter.', language: 'Dart', stargazers_count: 3, forks_count: 0, updated_at: new Date().toISOString() },
  { name: 'mecha-connect', html_url: 'https://github.com/jruthik271/mecha-connect', description: 'On-demand roadside assistance mobile platform.', language: 'Dart', stargazers_count: 2, forks_count: 0, updated_at: new Date().toISOString() }
];

export const githubService = {
  getRepos: async (limit?: number): Promise<GithubRepo[]> => {
    try {
      const response = await fetch('https://api.github.com/users/jruthik271/repos?sort=updated&per_page=10');
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        const mapped = data.map((repo: any) => ({
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language,
          updated_at: repo.updated_at,
        }));
        return limit ? mapped.slice(0, limit) : mapped;
      }
      return limit ? mockRepos.slice(0, limit) : mockRepos;
    } catch (e) {
      console.warn('GitHub direct API call failed, using mock data:', e);
      return limit ? mockRepos.slice(0, limit) : mockRepos;
    }
  },

  syncRepos: async (): Promise<{ success: boolean; message: string; repos?: GithubRepo[] }> => {
    // Client-side no-op fallback
    return { success: true, message: 'Client-side fallback sync complete' };
  },
};
