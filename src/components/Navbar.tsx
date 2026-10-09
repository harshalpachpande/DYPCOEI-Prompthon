import React from 'react';
import { CityMood, UserProfile } from '../types/city';
import { CityMoodRing } from './CityMoodRing';
import { ProfileWeightType, WEIGHT_PROFILES } from '../services/pulseScoring';
import { 
  ShieldAlert, 
  Layers, 
  CloudRain, 
  Sliders, 
  MapPin, 
  Award,
  Sparkles
} from 'lucide-react';

export type ScreenType = 'home' | 'explore' | 'heritage' | 'safety' | 'compare' | 'report' | 'itinerary' | 'profile';

interface NavbarProps {
  currentScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
  cityMood: CityMood;
  activeProfile: ProfileWeightType;
  onProfileChange: (p: ProfileWeightType) => void;
  is3DPerspective: boolean;
  onToggle3D: () => void;
  isRaining: boolean;
  onToggleRain: () => void;
  onTriggerSOS: () => void;
  userProfile: UserProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onScreenChange,
  cityMood,
  activeProfile,
  onProfileChange,
  is3DPerspective,
  onToggle3D,
  isRaining,
  onToggleRain,
  onTriggerSOS,
  userProfile
}) => {
  const screens: { id: ScreenType; label: string; icon: string }[] = [
    { id: 'home', label: 'Twin Hub', icon: '🏙️' },
    { id: 'explore', label: 'Explore & Budget', icon: '🍜' },
    { id: 'heritage', label: 'Heritage & Stories', icon: '🏛️' },
    { id: 'safety', label: 'Safe Routes', icon: '🛡️' },
    { id: 'compare', label: 'Compare & Radar', icon: '⚖️' },
    { id: 'report', label: 'Report & Voice', icon: '📡' },
    { id: 'itinerary', label: 'AI Itinerary', icon: '🗺️' },
    { id: 'profile', label: 'Badges & Eco', icon: '👤' },
  ];

  return (
    <header className="sticky top-0 z-[1000] glass-nav border-b border-violet-500/20 px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Top Left: Logo & City Identity */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div 
            onClick={() => onScreenChange('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative w-9 h-9 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src="/logo.svg" alt="CityPulse Logo" className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(25,227,177,0.5)]" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#19E3B1] animate-ping" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-base tracking-tight text-white font-['Space_Grotesk'] leading-none">
                  CityPulse
                </h1>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-violet-500/20 text-[#7C5CFF] font-mono border border-violet-500/30">
                  LIVING TWIN
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#19E3B1]" />
                <span className="font-medium text-slate-300">Pune, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Quick controls on mobile */}
          <div className="flex md:hidden items-center gap-2">
            <CityMoodRing mood={cityMood} />
            <button
              onClick={onTriggerSOS}
              className="p-2 rounded-xl bg-rose-500/20 text-[#FF4D4D] border border-rose-500/40 animate-pulse cursor-pointer"
              title="Guardian SOS"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: Navigation Screen Pills */}
        <nav className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
          {screens.map(s => {
            const isActive = currentScreen === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onScreenChange(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7C5CFF] to-violet-700 text-white shadow-lg shadow-violet-500/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: City Mood, 3D Toggle, Rain Reroute, Weight Persona & SOS */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* City Mood Ring Component */}
          <CityMoodRing mood={cityMood} />

          {/* Rain Reroute Toggle */}
          <button
            onClick={onToggleRain}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer border ${
              isRaining
                ? 'bg-amber-500/20 text-[#FFB020] border-amber-500/50 shadow-md shadow-amber-500/20'
                : 'glass-card text-slate-400 hover:text-white border-white/10'
            }`}
            title="Toggle Rain-Aware routing (elevated detours)"
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{isRaining ? 'Rain ON' : 'Rain'}</span>
          </button>

          {/* 3D Hexagon Extrusion Toggle */}
          <button
            onClick={onToggle3D}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer border ${
              is3DPerspective
                ? 'bg-[#19E3B1]/20 text-[#19E3B1] border-[#19E3B1]/50 shadow-md shadow-teal-500/20'
                : 'glass-card text-slate-400 hover:text-white border-white/10'
            }`}
            title="Toggle 3D Hexagonal Micro-Zone Perspective"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">3D Grid</span>
          </button>

          {/* AI Weight Persona Selector */}
          <div className="relative group">
            <select
              value={activeProfile}
              onChange={(e) => onProfileChange(e.target.value as ProfileWeightType)}
              className="bg-[#141B34] text-xs text-slate-200 border border-violet-500/30 rounded-xl px-2.5 py-1.5 appearance-none cursor-pointer focus:outline-none focus:border-[#19E3B1]"
              title="Explainable AI Persona Weighting"
            >
              {Object.entries(WEIGHT_PROFILES).map(([key, item]) => (
                <option key={key} value={key} className="bg-[#0B1020] text-white">
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* User XP Badge */}
          <button 
            onClick={() => onScreenChange('profile')}
            className="glass-card hover:border-[#19E3B1]/40 px-2.5 py-1.5 rounded-xl text-xs font-mono text-slate-200 flex items-center gap-1.5 cursor-pointer"
            title="Gamification Profile"
          >
            <Award className="w-3.5 h-3.5 text-[#FFB020]" />
            <span className="text-[#19E3B1] font-bold">{userProfile.xp} XP</span>
          </button>

          {/* Guardian SOS Trigger Button */}
          <button
            onClick={onTriggerSOS}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FF4D4D] to-rose-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all cursor-pointer animate-pulse"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};

