const axios = require('axios');
const GithubRepo = require('../models/GithubRepo');

let githubInMemoryCache = [];

const syncGithubRepos = async () => {
  const username = process.env.GITHUB_USERNAME || 'jruthik271';
  try {
    console.log(`Syncing GitHub repositories for user: ${username}`);
    const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && { 'Authorization': `token ${process.env.GITHUB_TOKEN}` })
      }
    });

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response structure received from GitHub API.');
    }

    const reposData = response.data.map(repo => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at,
      fetchedAt: Date.now()
    }));

    githubInMemoryCache = reposData;

    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      try {
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
      } catch (dbErr) {
        console.warn('Failed to save GitHub repos to MongoDB, returning memory cache:', dbErr.message);
      }
    }

    console.log('GitHub repositories sync complete');
    return { success: true, count: response.data.length };
  } catch (error) {
    console.error(`GitHub Service Error: ${error.message}`);
    
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      try {
        const count = await GithubRepo.countDocuments();
        if (count > 0) {
          console.warn('Returning cached GitHub repositories due to API failure.');
          const dbRepos = await GithubRepo.find().sort({ stargazers_count: -1, updated_at: -1 });
          githubInMemoryCache = dbRepos;
          return { success: true, count, isCachedOnly: true, warning: error.message };
        }
      } catch (dbErr) {
        console.warn('DB query failed in syncGithubRepos fallback:', dbErr.message);
      }
    }

    if (githubInMemoryCache.length > 0) {
      console.warn('Returning in-memory cached GitHub repositories due to API failure.');
      return { success: true, count: githubInMemoryCache.length, isCachedOnly: true, warning: error.message };
    }
    throw error;
  }
};

const getCachedRepos = async (limit = 6) => {
  const mongoose = require('mongoose');
  if (mongoose.connection.readyState === 1) {
    try {
      const dbRepos = await GithubRepo.find().sort({ stargazers_count: -1, updated_at: -1 }).limit(limit);
      if (dbRepos && dbRepos.length > 0) {
        githubInMemoryCache = dbRepos;
        return dbRepos;
      }
    } catch (dbErr) {
      console.warn('DB query failed in getCachedRepos:', dbErr.message);
    }
  }

  // Fallback to memory cache
  if (githubInMemoryCache.length > 0) {
    return githubInMemoryCache.slice(0, limit);
  }

  // If memory cache is empty, trigger sync
  try {
    await syncGithubRepos();
    return githubInMemoryCache.slice(0, limit);
  } catch (err) {
    // Return standard mock/placeholder repos if offline completely
    const mockRepos = [
      { name: 'cognivision', html_url: 'https://github.com/jruthik271/cognivision', description: 'Assistive mobile application using Flutter and Dart.', language: 'Dart', stargazers_count: 5 },
      { name: 'worknow', html_url: 'https://github.com/jruthik271/worknow', description: 'Production-ready job search mobile application with Flutter.', language: 'Dart', stargazers_count: 3 },
      { name: 'mecha-connect', html_url: 'https://github.com/jruthik271/mecha-connect', description: 'On-demand roadside assistance mobile platform.', language: 'Dart', stargazers_count: 2 }
    ];
    githubInMemoryCache = mockRepos;
    return mockRepos.slice(0, limit);
  }
};

module.exports = {
  syncGithubRepos,
  getCachedRepos,
};
