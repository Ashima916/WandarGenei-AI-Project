import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { RefreshCcw, ArrowLeft } from 'lucide-react';
import LoadingAnimation from '../components/LoadingAnimation.jsx';
import ErrorComponent from '../components/ErrorComponent.jsx';
import StreamingResponse from '../components/StreamingResponse.jsx';
import BudgetBreakdownCard from '../components/BudgetBreakdownCard.jsx';
import DayItineraryCard from '../components/DayItineraryCard.jsx';
import RecommendedPlacesCard from '../components/RecommendedPlacesCard.jsx';
import PackingChecklist from '../components/PackingChecklist.jsx';
import WeatherCard from '../components/WeatherCard.jsx';
import SafetyTipsCard from '../components/SafetyTipsCard.jsx';
import { API_BASE_URL } from '../api/axios.js';

const SECTION_KEYS = [
  'Trip Summary',
  'Budget Breakdown',
  'Day-wise Itinerary',
  'Recommended Tourist Attractions',
  'Hidden Gems',
  'Food Recommendations',
  'Packing Checklist',
  'Weather Advice',
  'Safety Tips',
  'Money Saving Tips',
  'Final Travel Checklist',
];

/** Splits the completed Markdown response into a { heading: content } map
 * based on the "## Heading" structure requested in the prompt. */
function parseSections(markdown) {
  const sections = {};
  const pattern = /^##\s+(.+)$/gm;
  const matches = [...markdown.matchAll(pattern)];

  matches.forEach((match, idx) => {
    const heading = match[1].trim();
    const start = match.index + match[0].length;
    const end = idx + 1 < matches.length ? matches[idx + 1].index : markdown.length;
    sections[heading] = markdown.slice(start, end).trim();
  });

  return sections;
}

export default function Itinerary() {
  const location = useLocation();
  const navigate = useNavigate();
  const tripDetails = location.state?.tripDetails;

  const [status, setStatus] = useState('idle'); // idle | streaming | done | error
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const abortRef = useRef(null);

  const runGeneration = useCallback(async () => {
    if (!tripDetails) return;

    setStatus('streaming');
    setText('');
    setErrorMessage('');

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(`${API_BASE_URL}/generate-trip`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tripDetails),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const errJson = await response.json().catch(() => null);
        throw new Error(errJson?.error || `Request failed with status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulated = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // SSE events are separated by a blank line ("\n\n")
        const events = buffer.split('\n\n');
        buffer = events.pop(); // keep the last (possibly incomplete) chunk in the buffer

        for (const rawEvent of events) {
          const lines = rawEvent.split('\n');
          let eventName = 'message';
          let dataLine = '';

          for (const line of lines) {
            if (line.startsWith('event:')) eventName = line.replace('event:', '').trim();
            if (line.startsWith('data:')) dataLine += line.replace('data:', '').trim();
          }

          if (!dataLine) continue;
          let payload;
          try {
            payload = JSON.parse(dataLine);
          } catch {
            continue;
          }

          if (eventName === 'chunk' && payload.text) {
            accumulated += payload.text;
            setText(accumulated);
          } else if (eventName === 'error') {
            throw new Error(payload.message || 'Streaming error');
          } else if (eventName === 'done') {
            setStatus('done');
          }
        }
      }

      setStatus((prev) => (prev === 'error' ? prev : 'done'));
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error(err);
      setErrorMessage(err.message || 'Failed to generate itinerary.');
      setStatus('error');
    }
  }, [tripDetails]);

  useEffect(() => {
    runGeneration();
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runGeneration]);

  if (!tripDetails) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-full border border-teal-500/30 bg-teal-500/10 flex items-center justify-center mx-auto mb-6">
          <ArrowLeft className="w-7 h-7 text-teal-400" />
        </div>
        <h2 className="text-2xl font-display font-semibold text-slate-950 mb-3">No trip details found</h2>
        <p className="text-slate-500 mb-8">Please fill out the planner form first to generate an itinerary.</p>
        <Link to="/planner" className="btn-teal inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold uppercase tracking-wide text-sm">
          <ArrowLeft className="w-4 h-4" /> Go to Planner
        </Link>
      </div>
    );
  }

  const sections = status === 'done' ? parseSections(text) : {};

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-950">
            ✈️ {tripDetails.destination}
          </h1>
          <p className="text-slate-400 text-sm mt-1.5 flex flex-wrap gap-2">
            <span className="px-2 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs">{tripDetails.days} day(s)</span>
            <span className="px-2 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs">{tripDetails.travelers} traveler(s)</span>
            <span className="px-2 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs">From {tripDetails.startingCity}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={runGeneration}
            className="btn-ghost flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            <RefreshCcw className="w-4 h-4" /> Regenerate
          </button>
          <Link
            to="/planner"
            className="btn-teal flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white"
          >
            New Trip
          </Link>
        </div>
      </div>

      {status === 'streaming' && text.length === 0 && <LoadingAnimation />}

      {status === 'error' && (
        <ErrorComponent message={errorMessage} onRetry={runGeneration} />
      )}

      {(status === 'streaming' || status === 'done') && (
        <div className="space-y-6">
          <StreamingResponse text={text} isStreaming={status === 'streaming'} />

          {status === 'done' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <BudgetBreakdownCard content={sections['Budget Breakdown']} />
              <DayItineraryCard content={sections['Day-wise Itinerary']} />
              <RecommendedPlacesCard
                attractions={sections['Recommended Tourist Attractions']}
                hiddenGems={sections['Hidden Gems']}
                food={sections['Food Recommendations']}
              />
              <PackingChecklist content={sections['Packing Checklist']} />
              <WeatherCard content={sections['Weather Advice']} />
              <SafetyTipsCard
                content={sections['Safety Tips']}
                moneySavingContent={sections['Money Saving Tips']}
                finalChecklist={sections['Final Travel Checklist']}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
