const express = require('express');
const router = express.Router();
const axios = require('axios');
const GithubRepo = require('../models/GithubRepo');

// Get cached repos
router.get('/repos', async (req, res) => {
  try {
    const repos = await GithubRepo.find().sort({ updated_at: -1 }).limit(6);
    res.json(repos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Force sync from GitHub API
router.post('/sync', async (req, res) => {
  try {
    const username = process.env.GITHUB_USERNAME;
    const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    
    // Upsert each repo into the database
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

    res.json({ success: true, message: 'Repositories synced successfully' });
  } catch (error) {
    console.error('Github sync error:', error.message);
    res.status(500).json({ error: 'Failed to sync repositories from GitHub.' });
  }
});

module.exports = router;
