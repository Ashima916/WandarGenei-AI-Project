const { OpenAI } = require('openai');

if (!process.env.OPENAI_API_KEY) {
  // We don't throw here so the server can still boot (e.g. for health checks
  // or local frontend-only work), but every generation call will fail fast
  // with a clear message instead of a cryptic SDK error.
  console.warn('[WARN] OPENAI_API_KEY is not set. /api/generate-trip will fail until it is configured.');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });
const MODEL_NAME = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

/**
 * Builds the master prompt sent to OpenAI using the user's trip details.
 */
function buildPrompt(tripDetails) {
  const {
    destination,
    days,
    budget,
    travelers,
    startingCity,
    travelStyle,
    interests,
    transportation,
    hotelPreference,
    notes,
  } = tripDetails;

  const interestsText = Array.isArray(interests) ? interests.join(', ') : interests;

  return `You are an expert travel planner.

Generate a complete personalized travel plan.

Return the response in Markdown.

Include:

Trip Summary

Budget Breakdown
- Transportation Cost
- Hotel Cost
- Food Cost
- Activity Cost
- Emergency Budget

Day-wise Itinerary
For each day include:
- Morning
- Afternoon
- Evening
- Estimated Cost
- Nearby Attractions
- Travel Tips

Recommended Tourist Attractions

Hidden Gems

Food Recommendations

Packing Checklist

Weather Advice

Safety Tips

Money Saving Tips

Final Travel Checklist

Keep the itinerary realistic and ensure the total estimated cost stays within the user's budget.

Use the following Markdown heading structure exactly so the response can be parsed programmatically:
## Trip Summary
## Budget Breakdown
## Day-wise Itinerary
## Recommended Tourist Attractions
## Hidden Gems
## Food Recommendations
## Packing Checklist
## Weather Advice
## Safety Tips
## Money Saving Tips
## Final Travel Checklist

Trip details provided by the user:
- Destination: ${destination}
- Number of Days: ${days}
- Budget: ${budget}
- Number of Travelers: ${travelers}
- Starting City: ${startingCity}
- Travel Style: ${travelStyle}
- Interests: ${interestsText}
- Transportation Preference: ${transportation}
- Hotel Preference: ${hotelPreference}
- Additional Notes: ${notes || 'None'}
`;
}

/**
 * Streams an OpenAI response chunk-by-chunk via an async generator so the
 * caller (the SSE route) can forward each piece to the client immediately.
 */
async function* streamTripPlan(tripDetails) {
  const prompt = buildPrompt(tripDetails);

  const response = await openai.chat.completions.create({
    model: MODEL_NAME,
    messages: [
      { role: 'system', content: 'You are an expert travel planner.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.8,
    max_tokens: 1400,
    stream: true,
  });

  for await (const part of response) {
    if (part.type === 'response.error') {
      throw new Error(part.error?.message || 'OpenAI streaming error');
    }

    const chunk = part.choices?.[0]?.delta?.content;
    if (chunk) {
      yield chunk;
    }
  }
}

module.exports = { streamTripPlan, buildPrompt };
