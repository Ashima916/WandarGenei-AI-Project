import { Compass, MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-teal-100 bg-navy-950 relative overflow-hidden">
      <div className="orb orb-teal w-[300px] h-[300px] bottom-0 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 relative">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-8 h-8 rounded-lg border border-teal-500/30 bg-teal-500/10 flex items-center justify-center">
                <Compass className="w-4 h-4 text-teal-400" />
              </span>
              <span className="font-display font-bold text-slate-900">
                Wander<span className="text-gold-gradient">Genie</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              AI-powered travel planning. Personalized itineraries in seconds,
              tailored to your budget and style.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-semibold text-teal-400/70 uppercase tracking-wider mb-3">Navigation</h4>
            <ul className="space-y-2">
              {[{ to: '/', label: 'Home' }, { to: '/planner', label: 'Trip Planner' }].map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} end={to === '/'} className={({ isActive }) =>
                    `text-sm transition-colors ${isActive ? 'text-teal-600' : 'text-slate-700 hover:text-slate-900'}`
                  }>{label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h4 className="text-xs font-semibold text-teal-400/70 uppercase tracking-wider mb-3">Powered By</h4>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> OpenAI</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-600" /> React + Vite</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-700" /> Node.js + Express</li>
            </ul>
          </div>
        </div>

        <div className="section-divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
          <span>© {new Date().getFullYear()} WanderGenie AI · All rights reserved.</span>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-teal-700" />
            <span>Built for explorers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
