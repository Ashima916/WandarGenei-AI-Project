const rateLimit = require('express-rate-limit');

// Limits each IP to a reasonable number of trip-generation requests per window.
// Protects the OpenAI API key / quota from abuse since this route is the
// most expensive one in the application.
const tripGenerationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many trip generation requests from this IP. Please try again later.',
  },
});

// A looser, general-purpose limiter for the rest of the API.
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { tripGenerationLimiter, generalLimiter };
