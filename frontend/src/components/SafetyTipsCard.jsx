import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ShieldCheck } from 'lucide-react';

export default function SafetyTipsCard({ content, moneySavingContent, finalChecklist }) {
  if (!content && !moneySavingContent && !finalChecklist) return null;

  return (
    <div className="bg-white/95 rounded-2xl shadow-sm border border-slate-200 p-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
        </span>
        <h3 className="text-lg font-semibold text-slate-950">Safety &amp; Money-Saving Tips</h3>
      </div>
      <div className="markdown-body text-sm space-y-4">
        {content && <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>}
        {moneySavingContent && (
          <div>
            <h4 className="font-semibold text-slate-200 mb-1">Money Saving Tips</h4>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{moneySavingContent}</ReactMarkdown>
          </div>
        )}
        {finalChecklist && (
          <div>
            <h4 className="font-semibold text-slate-200 mb-1">Final Travel Checklist</h4>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{finalChecklist}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
