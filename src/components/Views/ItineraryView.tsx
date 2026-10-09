import React, { useState } from 'react';
import { generateOptimizedItinerary } from '../../services/itineraryOptimizer';
import { 
  Sparkles, 
  Clock, 
  DollarSign, 
  Users, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  Navigation
} from 'lucide-react';

export const ItineraryView: React.FC = () => {
  const [budget, setBudget] = useState<number>(1200);
  const [timeWindow, setTimeWindow] = useState<'morning' | 'evening' | 'fullday'>('evening');
  const [groupType, setGroupType] = useState<'Solo' | 'Couple' | 'Friends' | 'Family'>('Solo');
  const [interests, setInterests] = useState<string[]>(['food', 'heritage']);

  const plan = generateOptimizedItinerary({
    budget,
    timeWindow,
    groupType,
    interests
  });

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      if (interests.length > 1) {
        setInterests(interests.filter(i => i !== interest));
      }
    } else {
      setInterests([...interests, interest]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#7C5CFF]/20 text-[#19E3B1] border border-[#7C5CFF]/40">
            AI ITINERARY OPTIMIZER
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
          AI-Optimized Day & Evening Planner
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-xl">
          Enter your budget, hours, and travel group. The optimizer calculates opening hours, crowd comfort, and safest inter-stop routes.
        </p>
      </div>

      {/* Planner Controls Bar */}
      <div className="glass-card p-5 rounded-3xl border border-violet-500/30 shadow-2xl mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Time Window */}
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1.5">
              1. TIME WINDOW:
            </label>
            <div className="grid grid-cols-3 gap-1">
              {(['morning', 'evening', 'fullday'] as const).map(tw => (
                <button
                  key={tw}
                  onClick={() => setTimeWindow(tw)}
                  className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                    timeWindow === tw
                      ? 'bg-[#7C5CFF] text-white shadow'
                      : 'glass-card text-slate-400 hover:text-white'
                  }`}
                >
                  {tw}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-mono text-slate-400">
                2. BUDGET:
              </label>
              <span className="text-xs font-mono font-bold text-[#19E3B1]">
                ₹{budget}
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={4000}
              step={100}
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#19E3B1]"
            />
          </div>

          {/* Group Type */}
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1.5">
              3. GROUP TYPE:
            </label>
            <div className="grid grid-cols-4 gap-1">
              {(['Solo', 'Couple', 'Friends', 'Family'] as const).map(gt => (
                <button
                  key={gt}
                  onClick={() => setGroupType(gt)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    groupType === gt
                      ? 'bg-[#19E3B1] text-black shadow font-bold'
                      : 'glass-card text-slate-400 hover:text-white'
                  }`}
                >
                  {gt}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1.5">
              4. INTERESTS:
            </label>
            <div className="flex items-center gap-1.5">
              {[
                { id: 'food', label: '🍜 Food' },
                { id: 'heritage', label: '🏛️ Heritage' },
                { id: 'nightlife', label: '🍸 Chill' }
              ].map(int => (
                <button
                  key={int.id}
                  onClick={() => toggleInterest(int.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                    interests.includes(int.id)
                      ? 'bg-amber-500/20 text-[#FFB020] border border-amber-500/40 font-semibold'
                      : 'glass-card text-slate-400'
                  }`}
                >
                  {int.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generated Itinerary Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Sequenced Timeline (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-card p-5 rounded-3xl border border-violet-500/30 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10 mb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  {plan.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Target Duration: {plan.targetDuration}
                </p>
              </div>

              {/* Budget Match Badge */}
              <div className="glass-card px-3.5 py-1.5 rounded-2xl border border-emerald-500/30 text-right">
                <div className="text-[10px] uppercase font-mono text-slate-400">Estimated Spent</div>
                <div className="text-sm font-bold font-mono text-[#19E3B1]">
                  ₹{plan.estimatedSpent} <span className="text-xs text-slate-400">/ ₹{plan.totalBudget}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {plan.summary}
            </p>

            {/* Timeline Stops */}
            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-violet-500/30">
              {plan.items.map((item, idx) => (
                <div key={item.id} className="relative group">
                  {/* Timeline Indicator Dot */}
                  <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#141B34] border-2 border-[#19E3B1] group-hover:scale-125 transition-transform shadow-md shadow-teal-500/30" />

                  <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-2 group-hover:border-[#19E3B1]/40 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-violet-600/30 text-[#19E3B1]">
                          STOP {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {item.placeName}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                        <span>🕒 {item.timeSlot}</span>
                        <span className="text-[#FFB020] font-bold">₹{item.estimatedCost}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.activityNote}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-[#19E3B1]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {item.safetyNote}
                      </span>
                      <span>Duration: {item.durationMinutes} mins</span>
                    </div>

                    {item.travelToNextMinutes && (
                      <div className="mt-2 py-1 px-2.5 rounded-lg bg-black/40 text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                        <Navigation className="w-3 h-3 text-[#7C5CFF]" />
                        <span>Travel to next stop: ~{item.travelToNextMinutes} mins via recommended safe arterial</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: AI Travel Tips & Budget Breakdown (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-card p-5 rounded-3xl border border-white/10 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#19E3B1]" />
              Smart Itinerary Insights
            </h4>

            <div className="space-y-2">
              {plan.tips.map((tip, i) => (
                <div key={i} className="p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-slate-300 leading-relaxed">
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

