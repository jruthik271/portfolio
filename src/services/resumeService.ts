export interface ResumeStats {
  count: number;
}

export const resumeService = {
  getStats: async (): Promise<ResumeStats> => {
    // Return a mock count of downloads to keep the UI visual stat active
    return { count: 128 };
  },

  getDownloadUrl: (): string => {
    // Resolve the path dynamically relative to the application's build base (e.g. /portfolio/)
    const base = import.meta.env.BASE_URL || '/';
    const normalizedBase = base.endsWith('/') ? base : `${base}/`;
    return `${normalizedBase}resume.pdf`;
  }
};
