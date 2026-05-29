const githubService = require('../services/githubService');

const getRepos = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const repos = await githubService.getCachedRepos(limit);
    return res.json(repos);
  } catch (error) {
    console.error('Github Controller getRepos Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve repositories.' });
  }
};

const syncRepos = async (req, res) => {
  try {
    const result = await githubService.syncGithubRepos();
    return res.json(result);
  } catch (error) {
    console.error('Github Controller syncRepos Error:', error);
    return res.status(500).json({ error: 'Failed to sync repositories from GitHub API.' });
  }
};

module.exports = {
  getRepos,
  syncRepos,
};
