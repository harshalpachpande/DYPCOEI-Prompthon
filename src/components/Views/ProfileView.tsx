import React, { useState } from 'react';
import { UserProfile } from '../../types/city';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Wifi, 
  WifiOff, 
  Leaf, 
  Sliders, 
  Sparkles, 
  Compass, 
  Heart 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProfileViewProps {
  userProfile: UserProfile;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ userProfile }) => {
  const [offlineModeEnabled, setOfflineModeEnabled] = useState(true);
  const [ecoFilterActive, setEcoFilterActive] = useState(true);

  const handleClaimReward = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#7C5CFF]/20 text-[#19E3B1] border border-[#7C5CFF]/40">
            PROFILE, GAMIFICATION & ECO
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
          Citizen Vanguard & System Layers
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-xl">
          Track your civic verification reputation, gamified badges, offline PWA cache status, and eco-routing preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Profile Card & Gamification Badges (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* User Hero Banner */}
          <div className="glass-card p-6 rounded-3xl border border-violet-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-r from-[#141B34] to-[#0B1020]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7C5CFF] to-[#19E3B1] p-0.5 shadow-xl">
                  <div className="w-full h-full bg-[#0B1020] rounded-[14px] flex items-center justify-center text-2xl font-bold text-white">
                    HS
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                      Harshal Shinde
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-[#FFB020] border border-amber-500/30">
                      LEVEL 3
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Role: Certified Urban Vanguard & Pune Digital Twin Contributor
                  </p>
                  <div className="text-[11px] font-mono text-[#19E3B1] mt-1">
                    Citizen Trust Reputation: <strong>94% High Credibility</strong>
                  </div>
                </div>
              </div>

              {/* XP Pill */}
              <div className="text-right sm:self-auto self-start">
                <div className="text-[10px] uppercase font-mono text-slate-400">Total Experience</div>
                <div className="text-2xl font-black font-mono text-[#19E3B1]">
                  {userProfile.xp} <span className="text-xs text-slate-400">XP</span>
                </div>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span>Progress to Level 4 (City Warden)</span>
                <span>450 / 600 XP (75%)</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#7C5CFF] to-[#19E3B1] rounded-full"
                  style={{ width: '75%' }}
                />
              </div>
            </div>
          </div>

          {/* Gamification Badges Grid */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FFB020]" />
                <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">
                  Civic Gamification Badges
                </h3>
              </div>
              <button
                onClick={handleClaimReward}
                className="text-xs text-[#19E3B1] hover:underline font-mono cursor-pointer"
              >
                + Celebrate Badge
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'badge_chaos_hero',
                  title: 'Chaos Hero',
                  icon: '⚡',
                  desc: 'Submitted 3+ reports with EXIF photo corroboration and zero disputes.',
                  unlocked: true,
                  date: 'Unlocked Oct 2026'
                },
                {
                  id: 'badge_heritage_hunter',
                  title: 'Heritage Hunter',
                  icon: '🏛️',
                  desc: 'Explored 3 historical landmarks and listened to audio stories.',
                  unlocked: true,
                  date: 'Unlocked Oct 2026'
                },
                {
                  id: 'badge_night_guardian',
                  title: 'Night Guardian',
                  icon: '🌙',
                  desc: 'Navigated 5 safe routes during late hours with Guardian Mode active.',
                  unlocked: true,
                  date: 'Unlocked Oct 2026'
                },
                {
                  id: 'badge_hygiene_scout',
                  title: 'Hygiene Scout',
                  icon: '🧼',
                  desc: 'Audited street-food stall cleanliness on FC Road Khao Galli.',
                  unlocked: false,
                  date: 'In Progress (1/3)'
                }
              ].map(badge => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    badge.unlocked
                      ? 'bg-black/40 border-violet-500/30'
                      : 'bg-black/20 border-white/5 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-white">{badge.title}</h4>
                        {badge.unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-[#19E3B1]" />}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        {badge.desc}
                      </p>
                      <span className="text-[9px] font-mono text-[#19E3B1] block mt-1">
                        {badge.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Offline PWA & Eco Layer (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Offline PWA Mode Card */}
          <div className="glass-card p-5 rounded-3xl border border-violet-500/30 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {offlineModeEnabled ? (
                  <Wifi className="w-4 h-4 text-[#19E3B1]" />
                ) : (
                  <WifiOff className="w-4 h-4 text-[#FF4D4D]" />
                )}
                <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">
                  Offline PWA & Emergency Cache
                </h3>
              </div>
              <button
                onClick={() => setOfflineModeEnabled(!offlineModeEnabled)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  offlineModeEnabled ? 'bg-[#19E3B1] text-black' : 'glass-card text-slate-400'
                }`}
              >
                {offlineModeEnabled ? 'Cached' : 'Off'}
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              When connectivity drops during power cuts or remote transit, cached map tiles, emergency safe havens, and SMS SOS dispatch remain 100% operational in browser storage.
            </p>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span>• Offline Map Bounds:</span>
                <span className="text-[#19E3B1]">Pune Metro (6.2 MB)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>• Safe Havens & Police:</span>
                <span className="text-[#19E3B1]">Verified Offline</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>• Audio Stories Cache:</span>
                <span className="text-[#19E3B1]">Saved Locally</span>
              </div>
            </div>
          </div>

          {/* Eco Layer Card */}
          <div className="glass-card p-5 rounded-3xl border border-white/10 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#19E3B1]" />
                <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">
                  Eco Layer & Health Corridors
                </h3>
              </div>
              <button
                onClick={() => setEcoFilterActive(!ecoFilterActive)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  ecoFilterActive ? 'bg-emerald-500/20 text-[#19E3B1] border border-emerald-500/40' : 'glass-card text-slate-400'
                }`}
              >
                {ecoFilterActive ? 'Active' : 'Off'}
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Prioritizes pedestrian routes with high tree canopy shade index, low particulate air pollution (PM2.5), and low acoustic noise decibels.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                <div className="text-[10px] text-slate-400">Tree Canopy Index</div>
                <div className="text-sm font-bold text-[#19E3B1] mt-0.5">82 / 100</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                <div className="text-[10px] text-slate-400">Acoustic Comfort</div>
                <div className="text-sm font-bold text-[#19E3B1] mt-0.5">58 dB (Calm)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

