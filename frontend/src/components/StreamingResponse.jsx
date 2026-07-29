import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Sparkles } from 'lucide-react';

/**
 * Renders the itinerary text as it streams in from the backend.
 * While `isStreaming` is true, a blinking cursor is shown after the text
 * to make the progressive rendering feel alive.
 */
export default function StreamingResponse({ text, isStreaming }) {
  return (
    <div className="bg-white/95 rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 animate-fade-in">
      <div className="flex items-center gap-2 mb-4 text-teal-600">
        <Sparkles className="w-5 h-5" />
        <span className="text-sm font-semibold uppercase tracking-wide">
          {isStreaming ? 'Generating live...' : 'Your Itinerary'}
        </span>
      </div>

      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text || ''}</ReactMarkdown>
        {isStreaming && (
          <span className="inline-block w-2 h-5 align-middle bg-ocean-500 ml-1 animate-pulse" />
        )}
      </div>
    </div>
  );
}
