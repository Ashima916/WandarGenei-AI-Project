import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

const DEST_PILLS = [
  { label: 'Paris', emoji: '🗼' },
  { label: 'Bali', emoji: '🌴' },
  { label: 'Kyoto', emoji: '🌸' },
  { label: 'Himalayas', emoji: '🏔️' },
  { label: 'Santorini', emoji: '🏝️' },
  { label: 'Serengeti', emoji: '🦁' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy-950 text-slate-900">

      {/* ── Background orbs ── */}
      <div className="orb orb-teal w-[600px] h-[600px] top-[-150px] left-1/2 -translate-x-1/2 opacity-60" />
      <div className="orb orb-teal w-[300px] h-[300px] bottom-[10%] right-[5%] opacity-30" />
      <div className="absolute inset-0 mesh-grid opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/10 via-transparent to-navy-950" />

      {/* ── Floating destination pills ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {DEST_PILLS.map((d, i) => (
          <span
            key={d.label}
            className="absolute text-xs px-3 py-1.5 rounded-full glass-card border-teal-500/20 text-teal-300/70 font-medium animate-float"
            style={{
              left: `${5 + (i * 16) % 82}%`,
              top:  `${12 + (i * 13) % 62}%`,
              animationDelay: `${i * -1.3}s`,
              animationDuration: `${7 + i * 0.9}s`,
            }}
          >
            {d.emoji} {d.label}
          </span>
        ))}
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center py-20">

        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/25 bg-teal-500/8 text-teal-300 text-xs font-semibold tracking-[0.22em] uppercase mb-8 animate-fade-in">
          <MapPin className="w-3 h-3" />
          AI-Powered Travel Planning
        </div>

        {/* Headline */}
        <h1 className="font-display font-black leading-[0.95] mb-6 animate-slide-up">
          <span className="block text-slate-950 text-5xl sm:text-7xl md:text-8xl tracking-tight">Fall in Love</span>
          <span className="block text-4xl sm:text-6xl md:text-7xl tracking-tight mt-1 text-slate-800">
            with Your Next
          </span>
          <span className="block text-gold-gradient text-5xl sm:text-7xl md:text-8xl tracking-tight mt-1">
            Adventure
          </span>
        </h1>

        {/* Divider */}
        <div className="section-divider max-w-xs mx-auto mb-7" style={{ animationDelay: '0.1s' }} />

        {/* Sub */}
        <p className="text-slate-600 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.15s' }}>
          Discover the perfect destination for you with a personalized,
          budget-aware itinerary crafted by AI in seconds.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.22s' }}>
          <Link to="/planner" className="btn-teal inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-white font-bold uppercase tracking-wider text-sm">
            Start Planning
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#features" className="btn-ghost inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wide text-slate-700 hover:text-slate-950">
            Learn More
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-3 max-w-sm mx-auto animate-fade-in" style={{ animationDelay: '0.38s' }}>
          {[
            { val: '90+',  label: 'Destinations' },
            { val: '15M+', label: 'Trips Planned' },
            { val: '100%', label: 'AI Powered' },
          ].map(({ val, label }) => (
            <div key={label} className="stat-card glass-card rounded-xl py-3 px-2 text-center border-teal-500/10">
              <div className="text-xl font-black font-display text-gold-gradient">{val}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 animate-bounce-subtle">
        <span className="text-[9px] text-teal-500 uppercase tracking-[0.25em]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-teal-500/60 to-transparent" />
      </div>
    </section>
  );
}
