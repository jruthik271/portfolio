const rateLimit = require('express-rate-limit');

// 1. General global rate limiter (max 100 requests per 15 mins)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});

// 2. Strict contact form rate limiter (max 3 contact submissions per hour per IP)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 requests per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many contact messages sent from this IP. Please try again after an hour.'
  }
});

// 3. Resume download rate limiter (max 10 downloads per minute per IP)
const resumeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many downloads triggered. Please wait a moment.'
  }
});

module.exports = {
  globalLimiter,
  contactLimiter,
  resumeLimiter
};
