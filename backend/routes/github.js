const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController');

router.get('/repos', githubController.getRepos);
router.post('/sync', githubController.syncRepos);

module.exports = router;
