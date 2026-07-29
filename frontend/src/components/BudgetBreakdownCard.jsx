import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Wallet } from 'lucide-react';

export default function BudgetBreakdownCard({ content }) {
  if (!content) return null;

  return (
    <div className="bg-white/95 rounded-2xl shadow-sm border border-slate-200 p-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
          <Wallet className="w-5 h-5 text-teal-600" />
        </span>
        <h3 className="text-lg font-semibold text-slate-950">Budget Breakdown</h3>
      </div>
      <div className="markdown-body text-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
