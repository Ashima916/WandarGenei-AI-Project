import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import TripPlannerForm from '../components/TripPlannerForm.jsx';

export default function Planner() {
  const navigate = useNavigate();
  const handleSubmit = (tripDetails) => navigate('/itinerary', { state: { tripDetails } });

  return (
    <div className="relative min-h-screen">
      {/* bg orb */}
      <div className="orb orb-teal w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2 opacity-25 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/25 bg-teal-500/8 text-teal-400 text-xs font-semibold tracking-[0.22em] uppercase mb-5">
            <MapPin className="w-3.5 h-3.5" />
            AI Trip Planner
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 mb-3">
            Tell Us About <span className="text-gold-gradient">Your Trip</span>
          </h1>
          <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
            Fill in the details below and WanderGenie will generate a complete,
            budget-aware itinerary just for you — streamed in real time.
          </p>
        </div>

        <TripPlannerForm onSubmit={handleSubmit} submitting={false} />
      </div>
    </div>
  );
}
