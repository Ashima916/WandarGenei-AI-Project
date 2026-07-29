import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Wifi, WifiOff, Loader2, Menu, X } from 'lucide-react';
import { API_BASE_URL } from '../api/axios.js';

function ApiStatusBadge() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(4000) });
        if (!cancelled) setStatus(res.ok ? 'online' : 'offline');
      } catch {
        if (!cancelled) setStatus('offline');
      }
    };
    check();
    const id = setInterval(check, 30000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  const cfg = {
    checking: { Icon: Loader2,  label: 'Checking',   dot: 'bg-slate-500',  text: 'text-slate-600', ring: 'border-slate-200/60', extra: 'animate-spin' },
    online:   { Icon: Wifi,     label: 'API Live',    dot: 'bg-teal-400',   text: 'text-teal-600',  ring: 'border-teal-200/70', extra: '' },
    offline:  { Icon: WifiOff,  label: 'API Down',    dot: 'bg-red-400',    text: 'text-red-500',   ring: 'border-red-200/60',  extra: '' },
  }[status];

  return (
    <span className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border bg-white/85 text-xs font-medium tracking-wide ${cfg.text} ${cfg.ring}`}>
      <cfg.Icon className={`w-3 h-3 ${cfg.extra}`} />
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${status === 'online' ? 'animate-pulse' : ''}`} />
      {cfg.label}
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const linkClass = ({ isActive }) =>
    `nav-link-anim px-2 py-1.5 text-sm font-medium tracking-wide transition-colors duration-200 ${
      isActive ? 'text-teal-600' : 'text-slate-700 hover:text-slate-900'
    }`;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/80 backdrop-blur-xl border-b border-teal-800/15 shadow-[0_4px_18px_rgba(15,23,42,0.08)]'
        : 'bg-transparent border-b border-transparent'
    }`}>
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
          <span className="w-9 h-9 rounded-xl border border-teal-500/40 bg-teal-500/10 flex items-center justify-center group-hover:border-teal-400/70 group-hover:bg-teal-500/15 transition-all duration-300">
            <Compass className="w-5 h-5 text-teal-400 group-hover:rotate-45 transition-transform duration-500" />
          </span>
          <span className="font-display font-bold text-lg tracking-wide text-slate-900">
            Wander<span className="text-gold-gradient">Genie</span>
          </span>
        </NavLink>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-5">
          <ApiStatusBadge />
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink
            to="/planner"
            className="btn-teal px-6 py-2 rounded-full text-white text-sm font-semibold uppercase tracking-wide"
          >
            Plan Trip
          </NavLink>
        </div>

        {/* Mobile toggle */}
        <button
          className="sm:hidden p-2 rounded-lg border border-navy-600 text-slate-400 hover:text-teal-400 hover:border-teal-600/50 transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`sm:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-56' : 'max-h-0'}`}>
        <div className="px-5 pt-2 pb-5 flex flex-col gap-3 bg-white/90 backdrop-blur-md border-t border-slate-200">
          <ApiStatusBadge />
          <NavLink to="/" className={linkClass} end onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink
            to="/planner"
            className="btn-teal w-full text-center py-2.5 rounded-full text-white text-sm font-semibold uppercase tracking-wide"
            onClick={() => setMenuOpen(false)}
          >
            Plan Trip
          </NavLink>
        </div>
      </div>
    </header>
  );
}
