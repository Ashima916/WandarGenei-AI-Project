import { useState } from 'react';
import { Send, MapPin, Wallet, Users, Home as HomeIcon, Calendar } from 'lucide-react';

const TRAVEL_STYLES = [
  { key: 'Budget',    emoji: '💰' },
  { key: 'Luxury',    emoji: '✨' },
  { key: 'Adventure', emoji: '🏔️' },
  { key: 'Solo',      emoji: '🎒' },
  { key: 'Family',    emoji: '👨‍👩‍👧' },
  { key: 'Business',  emoji: '💼' },
];
const INTERESTS = [
  { key: 'Nature',       emoji: '🌿' },
  { key: 'Food',         emoji: '🍜' },
  { key: 'Shopping',     emoji: '🛍️' },
  { key: 'Culture',      emoji: '🏛️' },
  { key: 'Photography',  emoji: '📸' },
  { key: 'Trekking',     emoji: '🥾' },
];
const TRANSPORT = [
  { key: 'Flight', emoji: '✈️' },
  { key: 'Train',  emoji: '🚂' },
  { key: 'Bus',    emoji: '🚌' },
  { key: 'Car',    emoji: '🚗' },
];
const HOTELS = [
  { key: 'Budget',   emoji: '🛏️' },
  { key: 'Standard', emoji: '⭐' },
  { key: 'Luxury',   emoji: '💎' },
];

const initialState = {
  destination: '', days: '', budget: '', travelers: '',
  startingCity: '', travelStyle: 'Adventure', interests: [],
  transportation: 'Bus', hotelPreference: 'Budget', notes: '',
};

const FIELDS = [
  { key: 'destination', label: 'Destination',     Icon: MapPin,     type: 'text',   placeholder: 'e.g. Himachal Pradesh' },
  { key: 'days',        label: 'Number of Days',  Icon: Calendar,   type: 'number', placeholder: 'e.g. 5',             min: 1 },
  { key: 'budget',      label: 'Total Budget',    Icon: Wallet,     type: 'text',   placeholder: 'e.g. ₹20,000' },
  { key: 'travelers',   label: 'Travelers',       Icon: Users,      type: 'number', placeholder: 'e.g. 2',             min: 1 },
];

export default function TripPlannerForm({ onSubmit, submitting }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);

  const set = (field, value) => {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
  };

  const toggleInterest = (key) =>
    setForm(p => ({
      ...p,
      interests: p.interests.includes(key)
        ? p.interests.filter(i => i !== key)
        : [...p.interests, key],
    }));

  const validate = () => {
    const e = {};
    if (!form.destination.trim())              e.destination  = 'Required';
    if (!form.days || Number(form.days) <= 0)  e.days         = 'Enter valid days';
    if (!form.budget.trim())                   e.budget       = 'Required';
    if (!form.travelers || Number(form.travelers) <= 0) e.travelers = 'Enter traveler count';
    if (!form.startingCity.trim())             e.startingCity = 'Required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit(form); };

  const inputBase = (field) =>
    `input-teal w-full px-4 py-3 rounded-xl text-slate-100 placeholder-slate-600 text-sm outline-none transition-all
     ${errors[field] ? 'border-red-500/50 bg-red-900/10' : ''}`;

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 space-y-7">

      {/* Primary grid fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {FIELDS.map(({ key, label, Icon, type, placeholder, min }) => (
          <div key={key}>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-teal-400/80 mb-2 uppercase tracking-wider">
              <Icon className="w-3.5 h-3.5" /> {label}
            </label>
            <input
              type={type}
              min={min}
              placeholder={placeholder}
              value={form[key]}
              onChange={e => set(key, e.target.value)}
              onFocus={() => setFocused(key)}
              onBlur={() => setFocused(null)}
              className={inputBase(key)}
            />
            {errors[key] && <p className="text-xs text-red-400 mt-1.5">⚠ {errors[key]}</p>}
          </div>
        ))}

        <div className="sm:col-span-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-teal-400/80 mb-2 uppercase tracking-wider">
            <HomeIcon className="w-3.5 h-3.5" /> Starting City
          </label>
          <input
            type="text"
            placeholder="e.g. Delhi"
            value={form.startingCity}
            onChange={e => set('startingCity', e.target.value)}
            onFocus={() => setFocused('startingCity')}
            onBlur={() => setFocused(null)}
            className={inputBase('startingCity')}
          />
          {errors.startingCity && <p className="text-xs text-red-400 mt-1.5">⚠ {errors.startingCity}</p>}
        </div>
      </div>

      {/* Travel Style */}
      <div>
        <label className="text-xs font-semibold text-teal-400/80 mb-3 block uppercase tracking-wider">Travel Style</label>
        <div className="flex flex-wrap gap-2">
          {TRAVEL_STYLES.map(({ key, emoji }) => (
            <button type="button" key={key} onClick={() => set('travelStyle', key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${form.travelStyle === key ? 'chip-active' : 'chip-inactive'}`}>
              {emoji} {key}
            </button>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="text-xs font-semibold text-teal-400/80 mb-3 block uppercase tracking-wider">Interests</label>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map(({ key, emoji }) => (
            <button type="button" key={key} onClick={() => toggleInterest(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${form.interests.includes(key) ? 'chip-active' : 'chip-inactive'}`}>
              {emoji} {key}
            </button>
          ))}
        </div>
      </div>

      {/* Transport + Hotel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-xs font-semibold text-teal-400/80 mb-3 block uppercase tracking-wider">Transport</label>
          <div className="flex flex-wrap gap-2">
            {TRANSPORT.map(({ key, emoji }) => (
              <button type="button" key={key} onClick={() => set('transportation', key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${form.transportation === key ? 'chip-active' : 'chip-inactive'}`}>
                {emoji} {key}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-teal-400/80 mb-3 block uppercase tracking-wider">Hotel</label>
          <div className="flex flex-wrap gap-2">
            {HOTELS.map(({ key, emoji }) => (
              <button type="button" key={key} onClick={() => set('hotelPreference', key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${form.hotelPreference === key ? 'chip-active' : 'chip-inactive'}`}>
                {emoji} {key}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="text-xs font-semibold text-teal-400/80 mb-2 block uppercase tracking-wider">Notes (optional)</label>
        <textarea
          rows={3}
          placeholder="e.g. Vegetarian food, avoid crowded spots, honeymoon trip..."
          value={form.notes}
          onChange={e => set('notes', e.target.value)}
          className={`input-teal w-full px-4 py-3 rounded-xl text-slate-100 placeholder-slate-600 text-sm outline-none transition-all resize-none`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="btn-teal w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-white font-bold uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating your itinerary...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Generate My Itinerary
          </>
        )}
      </button>
    </form>
  );
}
