import { Globe, Wallet, ShieldCheck, Map, Clock, Zap } from 'lucide-react';
import Hero from '../components/Hero.jsx';
import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: Zap,         title: 'Instant Itinerary',   desc: 'Full day-by-day plans streamed to you in real time by OpenAI.' },
  { icon: Wallet,      title: 'Budget-Aware',         desc: 'Every plan stays within the exact budget you set — no hidden surprises.' },
  { icon: ShieldCheck, title: 'Safety & Practical',   desc: 'Packing lists, weather forecasts, and safety tips built into every trip.' },
  { icon: Map,         title: 'Hidden Gems',          desc: 'Discover off-the-beaten-path spots most tourists never hear about.' },
  { icon: Clock,       title: 'Hour-by-Hour',         desc: 'Detailed schedules for morning, afternoon, and evening every single day.' },
  { icon: Globe,       title: 'Global Coverage',      desc: 'From mountain treks to beach resorts — plan any trip, anywhere on Earth.' },
];

const STEPS = [
  { num: '01', title: 'Enter Details',    desc: 'Tell us your destination, budget, travel style, and dates.' },
  { num: '02', title: 'AI Builds Plan',   desc: 'OpenAI generates a complete personalized itinerary instantly.' },
  { num: '03', title: 'Travel & Enjoy',   desc: 'Follow your custom plan and create unforgettable memories.' },
];

export default function Home() {
  return (
    <div>
      <Hero />

      {/* ── Features ── */}
      <section id="features" className="relative bg-navy-950 overflow-hidden">
        <div className="orb orb-teal w-[400px] h-[400px] top-0 right-0 opacity-20" />
        <div className="section-divider" />
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">

          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full border border-teal-500/25 bg-teal-500/8 text-teal-400 text-xs font-semibold tracking-[0.22em] uppercase mb-4">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 mb-3">
              Plan Smarter, Travel <span className="text-teal-gradient">Better</span>
            </h2>
            <p className="text-slate-600 max-w-md mx-auto text-sm">
              Everything you need for a perfect trip, powered by cutting-edge AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="group glass-card rounded-2xl p-6 cursor-default animate-fade-in"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4 group-hover:bg-teal-500/18 group-hover:border-teal-400/40 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="font-display font-semibold text-slate-950 mb-1.5 group-hover:text-teal-600 transition-colors text-[15px]">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="relative bg-navy-950 overflow-hidden">
        <div className="section-divider" />
        <div className="orb orb-teal w-[350px] h-[350px] bottom-0 left-0 opacity-15" />
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20">

          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full border border-teal-500/25 bg-teal-500/8 text-teal-400 text-xs font-semibold tracking-[0.22em] uppercase mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950">
              Three Steps to Your <span className="text-gold-gradient">Dream Trip</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* connector */}
            <div className="hidden md:block absolute top-10 left-[22%] right-[22%] h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

            {STEPS.map(({ num, title, desc }, i) => (
              <div key={num} className="flex flex-col items-center text-center group animate-slide-up" style={{ animationDelay: `${i * 0.14}s` }}>
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl glass-card border-teal-500/20 flex items-center justify-center group-hover:border-teal-400/50 group-hover:shadow-teal-md transition-all duration-300">
                    <span className="font-display font-black text-2xl text-gold-gradient">{num}</span>
                  </div>
                </div>
                <h3 className="font-display font-semibold text-slate-950 text-base mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-navy-950 overflow-hidden">
        <div className="section-divider" />
        <div className="orb orb-teal w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 py-24 text-center">
          <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-950 mb-4 leading-tight">
            Ready for Your<br />
            <span className="text-gold-gradient">Next Adventure?</span>
          </h2>
          <p className="text-slate-600 mb-10 text-base max-w-md mx-auto">
            Let AI craft the perfect itinerary while you just pack your bags and go.
          </p>
          <Link
            to="/planner"
            className="btn-teal inline-flex items-center gap-2.5 px-10 py-4 rounded-full text-white font-bold uppercase tracking-wider text-sm"
          >
            Start Planning Free
          </Link>
        </div>
      </section>
    </div>
  );
}
