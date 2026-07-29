const { streamTripPlan } = require('../services/openaiService');

const REQUIRED_FIELDS = [
  'destination',
  'days',
  'budget',
  'travelers',
  'startingCity',
  'travelStyle',
  'transportation',
  'hotelPreference',
];

function validateTripDetails(body) {
  const missing = REQUIRED_FIELDS.filter((field) => {
    const value = body[field];
    return value === undefined || value === null || value === '';
  });
  return missing;
}

/**
 * POST /api/generate-trip
 * Streams the OpenAI-generated itinerary to the client using
 * Server-Sent Events so the frontend can render it progressively.
 */
async function generateTrip(req, res) {
  const missingFields = validateTripDetails(req.body);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Missing required field(s): ${missingFields.join(', ')}`,
    });
  }

  // --- Set up SSE headers ---
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no', // disables buffering on reverse proxies like nginx
  });
  res.flushHeaders?.();

  const sendEvent = (event, data) => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // If the client disconnects early, stop trying to write to the socket.
  let clientDisconnected = false;
  req.on('close', () => {
    clientDisconnected = true;
  });

  try {
    sendEvent('start', { message: 'Generating your itinerary...' });

    for await (const chunk of streamTripPlan(req.body)) {
      if (clientDisconnected) break;
      sendEvent('chunk', { text: chunk });
    }

    if (!clientDisconnected) {
      sendEvent('done', { message: 'Itinerary generation complete.' });
      res.end();
    }
  } catch (err) {
    console.error('[OpenAI streaming error]', err.message);
    if (!clientDisconnected) {
      sendEvent('error', {
        message:
          'Failed to generate itinerary. Please check the server logs and your OpenAI API key.',
      });
      res.end();
    }
  }
}

module.exports = { generateTrip };
