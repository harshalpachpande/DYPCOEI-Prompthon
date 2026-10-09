import React, { useState } from 'react';
import { CityMood } from '../types/city';
import { Sparkles, Activity, CloudRain, Car, MessageSquare, ChevronDown } from 'lucide-react';

interface CityMoodRingProps {
  mood: CityMood;
  onStateChange?: (newMood: CityMood['state']) => void;
}

export const CityMoodRing: React.FC<CityMoodRingProps> = ({ mood }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card hover:border-[#19E3B1]/50 px-3.5 py-1.5 rounded-full flex items-center gap-2.5 transition-all duration-300 group cursor-pointer"
        title="City Mood Ring - Live urban heartbeat"
      >
        {/* Animated Revolving Gradient Ring */}
        <div className="relative w-6 h-6 flex items-center justify-center">
          <div 
            className="absolute inset-0 rounded-full animate-spin-slow opacity-85 group-hover:opacity-100"
            style={{
              background: mood.gradient,
              boxShadow: `0 0 12px ${mood.primaryColor}80`
            }}
          />
          <div className="absolute inset-[3px] rounded-full bg-[#0B1020] flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: mood.primaryColor }} />
          </div>
        </div>

        <div className="text-left hidden sm:block">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium leading-none">City Mood</div>
          <div className="text-xs font-semibold text-[#EAF0FF] flex items-center gap-1.5">
            <span style={{ color: mood.primaryColor }}>{mood.state}</span>
            <span className="text-[10px] font-mono text-slate-400">({mood.score}/100)</span>
          </div>
        </div>

        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Expanded Details Popover */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[500]" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 top-12 z-[510] w-80 glass-card p-4 rounded-2xl shadow-2xl border border-violet-500/30 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div 
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: mood.gradient }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white">Pune Urban Mood Twin</h4>
                  <p className="text-[11px] text-slate-400">Real-time composite telemetry</p>
                </div>
              </div>
              <span 
                className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold"
                style={{ backgroundColor: `${mood.primaryColor}20`, color: mood.primaryColor }}
              >
                {mood.state} • {mood.score}
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              {mood.description}
            </p>

            <div className="mt-3.5 space-y-2 pt-2 border-t border-white/10 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <Car className="w-4 h-4 text-[#FFB020] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-medium">Traffic Flow: </span>
                  <span>{mood.factors.traffic}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <CloudRain className="w-4 h-4 text-[#19E3B1] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-medium">Weather Signal: </span>
                  <span>{mood.factors.weather}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <Activity className="w-4 h-4 text-[#7C5CFF] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-medium">Urban Events: </span>
                  <span>{mood.factors.events}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <MessageSquare className="w-4 h-4 text-[#FF4D8D] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-medium">Social Sentiment: </span>
                  <span>{mood.factors.socialSentiment}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>Updated: 2 mins ago</span>
              <span className="text-[#19E3B1] flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#19E3B1] animate-pulse" />
                LIVE STREAM
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

