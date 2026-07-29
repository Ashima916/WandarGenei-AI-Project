require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const tripRoutes = require('./src/routes/generateTrip');
const { generalLimiter } = require('./src/middleware/rateLimiter');
const { errorHandler, notFoundHandler } = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// --- Security & core middleware ---
app.use(
  helmet({
    contentSecurityPolicy: false, // SSE + API-only server; CSP is enforced on the frontend
  })
);
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '1mb' }));
app.use(generalLimiter);

// --- Health check (useful for Docker / AWS App Runner / Elastic Beanstalk) ---
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'wandergenie-ai-backend' });
});

// --- API routes ---
app.use('/api', tripRoutes);

// --- 404 + error handling ---
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`WanderGenie AI backend running on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
});
