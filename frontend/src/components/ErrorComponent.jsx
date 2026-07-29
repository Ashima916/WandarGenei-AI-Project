import { AlertTriangle, RotateCcw, Key } from 'lucide-react';

const API_KEY_ERROR = 'openai api key';

export default function ErrorComponent({ message = 'Something went wrong.', onRetry }) {
  const isKeyError = message.toLowerCase().includes(API_KEY_ERROR) ||
                     message.toLowerCase().includes('api key') ||
                     message.toLowerCase().includes('server logs');

  return (
    <div className="max-w-md mx-auto text-center animate-fade-in">
      <div className="glass-card rounded-2xl p-8 border-red-500/15">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
          {isKeyError ? (
            <Key className="w-6 h-6 text-red-400" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-red-400" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-display font-semibold text-red-400 mb-2">
          {isKeyError ? 'API Key Not Configured' : 'Something went wrong'}
        </h3>

        {/* Message */}
        <p className="text-sm text-slate-400 mb-2 leading-relaxed">{message}</p>

        {/* Extra help for API key issues */}
        {isKeyError && (
          <div className="mt-4 mb-5 p-4 rounded-xl bg-white/90 border border-slate-200 text-left space-y-1.5">
            <p className="text-xs font-semibold text-teal-600 mb-2 uppercase tracking-wider">How to fix:</p>
            <p className="text-xs text-slate-600">1. Go to <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="text-teal-500 underline hover:text-teal-600">platform.openai.com/account/api-keys</a> and create an API key.</p>
            <p className="text-xs text-slate-600">2. Open <code className="text-teal-600 bg-teal-50 px-1 py-0.5 rounded">backend/.env</code> in your project.</p>
            <p className="text-xs text-slate-600">3. Set <code className="text-teal-600 bg-teal-50 px-1 py-0.5 rounded">OPENAI_API_KEY=your_real_key</code></p>
            <p className="text-xs text-slate-600">4. Restart the backend server and try again.</p>
          </div>
        )}

        {/* Retry */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-600/80 hover:bg-red-600 border border-red-500/40 text-white text-sm font-medium transition-all hover:shadow-[0_0_16px_rgba(239,68,68,0.3)]"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
