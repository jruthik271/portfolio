const mongoose = require('mongoose');

const githubRepoSchema = new mongoose.Schema({
  githubId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  html_url: String,
  language: String,
  stargazers_count: Number,
  forks_count: Number,
  updated_at: Date,
  fetchedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GithubRepo', githubRepoSchema);
