const rateLimit = require('express-rate-limit');

/**
 * Custom rate limiting rules for various routes
 */

const loginRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 mins
  max: 30, // start blocking after 20 requests
  message: 'Too many login attempts',
  headers: true,
  handler: (req, res, next) => {
    return res
      .status(429)
      .json({ errors: [{ msg: 'Too many login attempts, please wait...' }] });
  },
});

const registerRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 mins
  max: 5,
  message: 'Too many registration attempts',
  headers: true,
  handler: (req, res, next) => {
    return res
      .status(429)
      .json({ errors: [{ msg: 'Too many registrations, please wait...' }] });
  },
});

const customScanRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 mins
  max: 20, // start blocking after 20 requests
  message: 'Too many login attempts',
  headers: true,
  handler: (req, res, next) => {
    return res
      .status(429)
      .json({ msg: 'Too many custom scans, please wait...' });
  },
});

module.exports = {
  loginRateLimit,
  registerRateLimit,
  customScanRateLimit,
};
