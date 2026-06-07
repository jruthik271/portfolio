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
    // 1. Read from localStorage cache for immediate display
    const cached = localStorage.getItem('github_repos_cache');
    let cachedData: GithubRepo[] | null = null;
    if (cached) {
      try {
        cachedData = JSON.parse(cached);
      } catch (e) {
        console.warn('Failed to parse GitHub repos cache:', e);
      }
    }

    // Helper to fetch fresh data and write to cache
    const fetchFreshRepos = async (): Promise<GithubRepo[] | null> => {
      try {
        const response = await fetch('https://api.github.com/users/jruthik271/repos?sort=updated&per_page=10');
        if (response.ok) {
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
            localStorage.setItem('github_repos_cache', JSON.stringify(mapped));
            return mapped;
          }
        }
      } catch (e) {
        console.warn('Background GitHub repos fetch failed:', e);
      }
      return null;
    };

    // 2. If cache exists, trigger background update and return cached data immediately (0ms blocking)
    if (cachedData && Array.isArray(cachedData) && cachedData.length > 0) {
      fetchFreshRepos().catch(() => null);
      return limit ? cachedData.slice(0, limit) : cachedData;
    }

    // 3. Fallback to waiting for fetch if cache is empty
    const fresh = await fetchFreshRepos();
    const finalRepos = fresh || mockRepos;
    return limit ? finalRepos.slice(0, limit) : finalRepos;
  },

  syncRepos: async (): Promise<{ success: boolean; message: string; repos?: GithubRepo[] }> => {
    return { success: true, message: 'Client-side fallback sync complete' };
  },
};
