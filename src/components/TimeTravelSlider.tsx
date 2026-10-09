import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, Sun, Moon, Sunrise, Sunset } from 'lucide-react';

interface TimeTravelSliderProps {
  currentHour: number;
  onHourChange: (hour: number) => void;
}

export const TimeTravelSlider: React.FC<TimeTravelSliderProps> = ({
  currentHour,
  onHourChange
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play time travel scrubber loop
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        onHourChange((currentHour + 1) % 24);
      }, 1400);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentHour, onHourChange]);

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour.toString().padStart(2, '0')}:00 ${period}`;
  };

  const getTimeContext = (hour: number) => {
    if (hour >= 23 || hour < 5) {
      return { 
        label: 'Late Night Owl', 
        desc: 'Streetlights active, police patrols on core avenues, low general footfall', 
        icon: <Moon className="w-4 h-4 text-indigo-400" />,
        badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
      };
    }
    if (hour >= 5 && hour < 8) {
      return { 
        label: 'Early Morning Calm', 
        desc: 'Joggers on FC Road, temple bells, minimal traffic congestion', 
        icon: <Sunrise className="w-4 h-4 text-amber-300" />,
        badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/30'
      };
    }
    if (hour >= 8 && hour < 11) {
      return { 
        label: 'Morning Peak Commute', 
        desc: 'High transit activity, transit hubs crowded, full solar illumination', 
        icon: <Sun className="w-4 h-4 text-yellow-400" />,
        badgeColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
      };
    }
    if (hour >= 11 && hour < 16) {
      return { 
        label: 'Afternoon Heat & Lull', 
        desc: 'Temperate sun, indoor cafe surge, smooth vehicular movement', 
        icon: <Sun className="w-4 h-4 text-yellow-400" />,
        badgeColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
      };
    }
    if (hour >= 16 && hour < 19) {
      return { 
        label: 'Evening Golden Hour', 
        desc: 'Heritage sites buzzing, street food stalls firing up, pleasant breeze', 
        icon: <Sunset className="w-4 h-4 text-pink-400" />,
        badgeColor: 'text-pink-400 bg-pink-500/10 border-pink-500/30'
      };
    }
    return { 
      label: 'Night Peak & Dining', 
      desc: 'Bustling food streets, maximum pedestrian vibrancy, vibrant safety aura', 
      icon: <Moon className="w-4 h-4 text-[#7C5CFF]" />,
      badgeColor: 'text-[#7C5CFF] bg-[#7C5CFF]/10 border-[#7C5CFF]/30'
    };
  };

  const context = getTimeContext(currentHour);

  return (
    <div className="glass-card rounded-2xl p-3 sm:p-4 border border-violet-500/25 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-violet-600/20 text-[#7C5CFF] border border-violet-500/30">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                Time Travel Digital Twin
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono border flex items-center gap-1.5 ${context.badgeColor}`}>
                {context.icon}
                {context.label}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
              {context.desc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[#FF4D8D] text-white shadow-lg shadow-pink-500/30'
                : 'glass-card text-white hover:border-[#19E3B1]/50'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Time</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Simulate 24h</span>
              </>
            )}
          </button>

          <div className="px-3 py-1 rounded-xl bg-[#0B1020] border border-violet-500/30 text-sm font-mono font-bold text-[#19E3B1] min-w-[95px] text-center shadow-inner">
            {formatHour(currentHour)}
          </div>
        </div>
      </div>

      {/* Scrub Bar */}
      <div className="relative pt-1">
        <input
          type="range"
          min={0}
          max={23}
          step={1}
          value={currentHour}
          onChange={(e) => {
            setIsPlaying(false);
            onHourChange(parseInt(e.target.value));
          }}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#7C5CFF] focus:outline-none focus:ring-2 focus:ring-[#19E3B1]/40"
        />

        {/* Milestone Tick Marks */}
        <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1.5 px-0.5 select-none">
          <span>00:00 (Midnight)</span>
          <span className="hidden sm:inline">06:00 (Dawn)</span>
          <span>12:00 (Noon)</span>
          <span className="hidden sm:inline">18:00 (Dusk)</span>
          <span>23:00 (Night)</span>
        </div>
      </div>
    </div>
  );
};

