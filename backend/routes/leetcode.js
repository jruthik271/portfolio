const express = require('express');
const router = express.Router();
const leetcodeController = require('../controllers/leetcodeController');

router.get('/stats', leetcodeController.getStats);
router.post('/sync', leetcodeController.syncStats);

module.exports = router;
