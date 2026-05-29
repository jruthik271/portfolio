const axios = require('axios');
const GithubRepo = require('../models/GithubRepo');

const syncGithubRepos = async () => {
  const username = process.env.GITHUB_USERNAME || 'jruthik271';
  try {
    console.log(`Syncing GitHub repositories for user: ${username}`);
    const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Optional GitHub token to avoid API rate limits in production
        ...(process.env.GITHUB_TOKEN && { 'Authorization': `token ${process.env.GITHUB_TOKEN}` })
      }
    });

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response structure received from GitHub API.');
    }

    const upsertPromises = response.data.map(repo => {
      return GithubRepo.findOneAndUpdate(
        { githubId: repo.id },
        {
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          updated_at: repo.updated_at,
          fetchedAt: Date.now()
        },
        { upsert: true, new: true }
      );
    });

    await Promise.all(upsertPromises);
    console.log('GitHub repositories sync complete');
    return { success: true, count: response.data.length };
  } catch (error) {
    console.error(`GitHub Service Error: ${error.message}`);
    // If we have cached repos in DB, we can return success but flag that we loaded from cache
    const count = await GithubRepo.countDocuments();
    if (count > 0) {
      console.warn('Returning cached GitHub repositories due to API failure.');
      return { success: true, count, isCachedOnly: true, warning: error.message };
    }
    throw error;
  }
};

const getCachedRepos = async (limit = 6) => {
  return await GithubRepo.find().sort({ stargazers_count: -1, updated_at: -1 }).limit(limit);
};

module.exports = {
  syncGithubRepos,
  getCachedRepos,
};
