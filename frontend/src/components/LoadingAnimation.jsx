import { Plane } from 'lucide-react';

const STEPS = ['Reading your preferences...', 'Mapping destinations...', 'Crafting your itinerary...', 'Adding finishing touches...'];

export default function LoadingAnimation({ message = 'Crafting your perfect itinerary...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      {/* Spinner ring */}
      <div className="relative w-24 h-24 mb-8">
        {/* outer glow ring */}
        <div className="absolute inset-0 rounded-full border border-teal-500/20 animate-glow-border" />
        {/* spinning ring */}
        <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-teal-400 border-r-teal-500/40 animate-spin" />
        {/* inner glow */}
        <div className="absolute inset-3 rounded-full bg-teal-500/5 border border-teal-500/10" />
        {/* plane icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Plane className="w-8 h-8 text-teal-400 rotate-45 animate-bounce-subtle" />
        </div>
      </div>

      <p className="text-slate-950 font-display font-semibold text-lg mb-1">{message}</p>
      <p className="text-sm text-slate-600">Powered by OpenAI · Usually a few seconds</p>

      {/* Progress steps */}
      <div className="mt-8 flex flex-col gap-2 items-center">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center gap-2 text-xs text-slate-600 animate-fade-in" style={{ animationDelay: `${i * 0.8}s` }}>
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500/40" />
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
