const express = require('express');
const router = express.Router();
const geeksforgeeksController = require('../controllers/geeksforgeeksController');

router.get('/stats', geeksforgeeksController.getStats);
router.post('/sync', geeksforgeeksController.syncStats);

module.exports = router;
