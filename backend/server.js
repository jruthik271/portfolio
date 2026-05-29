require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const { globalLimiter, contactLimiter, resumeLimiter } = require('./middlewares/rateLimiter');

const app = express();

// 1. Establish Database Connection
connectDB();

// 2. Apply Security Middlewares
app.use(helmet()); // Sets various HTTP headers for security
app.use(mongoSanitize()); // Prevent NoSQL query injection attacks

// 3. Configure Secure CORS
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
  origin: [clientUrl, 'http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 4. Parse Payloads & Apply General Rate Limiting
app.use(express.json({ limit: '10kb' })); // Limit JSON payload sizes to prevent flooding
app.use(globalLimiter);

// 5. Register Clean Routes with Endpoint-Specific Limits
app.use('/api/contact', contactLimiter, require('./routes/contact'));
app.use('/api/resume', require('./routes/resume')); // Limit is handled specifically on redirect endpoint
app.use('/api/github', require('./routes/github'));
app.use('/api/leetcode', require('./routes/leetcode'));

// Custom specific limiter on the download endpoint
app.get('/api/resume/download', resumeLimiter);

// 6. Global 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// 7. Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error. Please contact support.' });
});

// 8. Start Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running securely on port ${PORT}`);
});
