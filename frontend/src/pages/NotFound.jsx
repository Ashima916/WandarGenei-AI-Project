import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-white/90 border border-teal-100 flex items-center justify-center mx-auto mb-6 animate-float">
        <Compass className="w-10 h-10 text-moss-400" />
      </div>
      <h1 className="text-5xl font-display font-bold text-slate-950 mb-3">404</h1>
      <p className="text-slate-600 mb-8">
        Looks like you've wandered off the map. This page doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-moss-500 text-ink-950 font-semibold uppercase tracking-wide text-sm hover:bg-moss-400 transition-colors"
      >
        <Home className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}
