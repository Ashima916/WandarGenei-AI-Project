import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MapPinned } from 'lucide-react';

export default function RecommendedPlacesCard({ attractions, hiddenGems, food }) {
  if (!attractions && !hiddenGems && !food) return null;

  return (
    <div className="bg-white/95 rounded-2xl shadow-sm border border-slate-200 p-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
          <MapPinned className="w-5 h-5 text-teal-600" />
        </span>
        <h3 className="text-lg font-semibold text-slate-950">Places &amp; Food</h3>
      </div>

      <div className="markdown-body text-sm space-y-4">
        {attractions && (
          <div>
            <h4 className="font-semibold text-slate-200 mb-1">Tourist Attractions</h4>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{attractions}</ReactMarkdown>
          </div>
        )}
        {hiddenGems && (
          <div>
            <h4 className="font-semibold text-slate-200 mb-1">Hidden Gems</h4>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{hiddenGems}</ReactMarkdown>
          </div>
        )}
        {food && (
          <div>
            <h4 className="font-semibold text-slate-200 mb-1">Food Recommendations</h4>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{food}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
