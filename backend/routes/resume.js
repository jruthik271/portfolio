const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

router.get('/download', resumeController.downloadResume);
router.get('/stats', resumeController.getStats);

module.exports = router;
