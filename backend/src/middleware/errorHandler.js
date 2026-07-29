/* Centralized error handler. Keeps error shape consistent across the API
 * and avoids leaking stack traces / internals in production. */
function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${req.method} ${req.originalUrl} ->`, err.message);

  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === 'production';

  res.status(statusCode).json({
    error: err.publicMessage || 'Something went wrong while processing your request.',
    ...(isProd ? {} : { detail: err.message }),
  });
}

function notFoundHandler(req, res) {
  res.status(404).json({ error: `Route ${req.originalUrl} not found.` });
}

module.exports = { errorHandler, notFoundHandler };
