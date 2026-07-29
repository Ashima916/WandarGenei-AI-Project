const express = require('express');
const { generateTrip } = require('../controllers/tripController');
const { tripGenerationLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/generate-trip', tripGenerationLimiter, generateTrip);

module.exports = router;
