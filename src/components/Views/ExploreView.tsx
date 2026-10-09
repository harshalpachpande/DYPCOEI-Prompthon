import React, { useState } from 'react';
import { Place, CategoryType } from '../../types/city';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Info,
  Volume2,
  Trees,
  ShieldCheck,
  CheckCircle2,
  Users
} from 'lucide-react';

interface ExploreViewProps {
  places: Place[];
  onSelectPlace: (place: Place) => void;
  onOpenWhyModal: (place: Place) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  places,
  onSelectPlace,
  onOpenWhyModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxBudget, setMaxBudget] = useState<number>(1000);
  const [onlyHiddenGems, setOnlyHiddenGems] = useState<boolean>(false);
  const [onlyQuietEco, setOnlyQuietEco] = useState<boolean>(false);
  const [onlyTopHygiene, setOnlyTopHygiene] = useState<boolean>(false);
  const [onlyForts, setOnlyForts] = useState<boolean>(false);
  const [onlyPCMC, setOnlyPCMC] = useState<boolean>(false);
  const [onlyWomenSafe, setOnlyWomenSafe] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: string; label: string; icon: string }[] = [
    { id: 'all', label: 'All Places', icon: '✨' },
    { id: 'food', label: 'Street Food & Dining', icon: '🍜' },
    { id: 'heritage', label: 'Forts & Heritage', icon: '🏛️' },
    { id: 'nightlife', label: 'Cafes & Nightlife', icon: '🍸' },
  ];

  const filteredPlaces = places.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesBudget = p.costEstimate <= maxBudget;
    const matchesGem = !onlyHiddenGems || p.isHiddenGem;
    const matchesEco = !onlyQuietEco || ((p.ambientNoiseDb ?? 60) <= 55 || (p.treeCanopyPct ?? 40) >= 60);
    const matchesHygiene = !onlyTopHygiene || p.hygieneGrade === 'A+';
    const matchesFort = !onlyForts || p.isFort === true;
    const matchesPCMC = !onlyPCMC || p.region === 'pcmc';
    const matchesWomen = !onlyWomenSafe || (p.womenSafety && p.womenSafety.score >= 90);
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.nameMr && p.nameMr.includes(searchQuery)) ||
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesBudget && matchesGem && matchesEco && matchesHygiene && matchesFort && matchesPCMC && matchesWomen && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-20">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#7C5CFF]/20 text-[#19E3B1] border border-[#7C5CFF]/40">
              EXPLORATION & HOSPITALITY
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
            Pune Urban Discovery Engine
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Verified, explainable city places with ground-truth hygiene grades, decibel noise telemetry, and reality-adjusted ratings.
          </p>
        </div>

        {/* Search Bar */}
        <div className="glass-card p-2 rounded-2xl flex items-center gap-2 w-full md:w-72 border border-violet-500/30">
          <Search className="w-4 h-4 text-[#19E3B1] ml-1.5" />
          <input
            type="text"
            placeholder="Search misal, caves, forts, cafes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Control Strip: Categories, Budget Mode Slider, Filters */}
      <div className="glass-card p-4 rounded-2xl border border-violet-500/25 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 lg:pb-0">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === c.id
                  ? 'bg-[#7C5CFF] text-white shadow-lg shadow-violet-500/30'
                  : 'glass-card text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Budget Slider */}
          <div className="flex items-center gap-2 glass-card px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-xs text-slate-400 font-medium">Budget:</span>
            <input
              type="range"
              min={100}
              max={1500}
              step={50}
              value={maxBudget}
              onChange={(e) => setMaxBudget(parseInt(e.target.value))}
              className="w-24 sm:w-28 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#19E3B1]"
            />
            <span className="text-xs font-mono font-bold text-[#19E3B1] min-w-[50px]">
              ≤ ₹{maxBudget}
            </span>
          </div>

          {/* Hidden Gems Detector Button */}
          <button
            onClick={() => setOnlyHiddenGems(!onlyHiddenGems)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
              onlyHiddenGems
                ? 'bg-amber-500/20 text-[#FFB020] border-amber-500/60 shadow-lg shadow-amber-500/20'
                : 'glass-card text-slate-300 hover:text-white border-white/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hidden Gems</span>
          </button>

          {/* Quiet & Eco Filter */}
          <button
            onClick={() => setOnlyQuietEco(!onlyQuietEco)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
              onlyQuietEco
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/60 shadow-lg shadow-emerald-500/20'
                : 'glass-card text-slate-300 hover:text-white border-white/10'
            }`}
          >
            <Trees className="w-3.5 h-3.5" />
            <span>Quiet & Eco</span>
          </button>

          {/* Top Hygiene Grade A+ Filter */}
          <button
            onClick={() => setOnlyTopHygiene(!onlyTopHygiene)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
              onlyTopHygiene
                ? 'bg-[#19E3B1]/20 text-[#19E3B1] border-[#19E3B1]/60 shadow-lg shadow-[#19E3B1]/20'
                : 'glass-card text-slate-300 hover:text-white border-white/10'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Grade A+ Only</span>
          </button>

          {/* Sahyadri Forts Filter */}
          <button
            onClick={() => setOnlyForts(!onlyForts)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
              onlyForts
                ? 'bg-amber-600/30 text-amber-300 border-amber-500/70 shadow-lg shadow-amber-500/20 font-bold'
                : 'glass-card text-slate-300 hover:text-white border-white/10'
            }`}
          >
            <span>🏰</span>
            <span>Sahyadri Forts</span>
          </button>

          {/* PCMC Filter */}
          <button
            onClick={() => setOnlyPCMC(!onlyPCMC)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
              onlyPCMC
                ? 'bg-blue-600/30 text-blue-300 border-blue-500/70 shadow-lg shadow-blue-500/20 font-bold'
                : 'glass-card text-slate-300 hover:text-white border-white/10'
            }`}
          >
            <span>🏢</span>
            <span>PCMC Hubs</span>
          </button>

          {/* Women Safe 90%+ Filter */}
          <button
            onClick={() => setOnlyWomenSafe(!onlyWomenSafe)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
              onlyWomenSafe
                ? 'bg-pink-600/30 text-pink-300 border-pink-500/70 shadow-lg shadow-pink-500/20 font-bold'
                : 'glass-card text-slate-300 hover:text-white border-white/10'
            }`}
          >
            <span>🌸</span>
            <span>Women Safe</span>
          </button>
        </div>
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPlaces.map(place => {
          const pulseColor = place.pulseScore.overall >= 85 ? '#19E3B1' : place.pulseScore.overall >= 70 ? '#FFB020' : '#FF4D4D';
          const noiseDb = place.ambientNoiseDb ?? 58;
          const canopyPct = place.treeCanopyPct ?? 45;

          return (
            <div
              key={place.id}
              className="glass-card glass-card-hover rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between group cursor-pointer"
              onClick={() => onSelectPlace(place)}
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-black/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-[#141B34]/90 text-white backdrop-blur-md border border-white/20 uppercase">
                        {place.category}
                      </span>

                      {place.isFort && (
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-amber-600/90 text-white backdrop-blur-md flex items-center gap-1 shadow-md">
                          🏰 FORT
                        </span>
                      )}

                      {place.region === 'pcmc' && (
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-blue-600/90 text-white backdrop-blur-md flex items-center gap-1 shadow-md">
                          🏢 PCMC
                        </span>
                      )}

                      {place.womenSafety && place.womenSafety.score >= 90 && (
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-pink-600/90 text-white backdrop-blur-md flex items-center gap-1 shadow-md">
                          🌸 {place.womenSafety.score}% SAFE
                        </span>
                      )}
                    </div>

                    {place.isHiddenGem && (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-amber-500/90 text-black backdrop-blur-md flex items-center gap-1 shadow-lg">
                        <Sparkles className="w-2.5 h-2.5" />
                        HIDDEN GEM
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Title */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white font-['Space_Grotesk'] leading-snug">
                        {place.name}
                      </h3>
                      {place.nameMr && (
                        <div className="text-[11px] text-[#19E3B1]">
                          {place.nameMr}
                        </div>
                      )}
                    </div>

                    {/* Pulse Score Circle */}
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenWhyModal(place);
                      }}
                      className="glass-card p-1.5 rounded-xl border border-white/20 flex flex-col items-center justify-center min-w-[48px] hover:scale-105 transition-transform"
                      title="Click to view Why Panel"
                    >
                      <span className="text-[9px] font-mono uppercase text-slate-400 leading-none">Pulse</span>
                      <span className="text-lg font-bold font-mono leading-tight" style={{ color: pulseColor }}>
                        {place.pulseScore.overall}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {place.description}
                  </p>

                  {/* Signal Metrics (Reality, Hygiene, Cost) */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                    {/* Reality vs Rating */}
                    <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                      <div className="text-[10px] text-slate-400 font-mono">Reality Rating</div>
                      <div className="font-bold text-white font-mono mt-0.5">
                        {place.realityRating}★
                      </div>
                      <div className="text-[9px] text-slate-400">
                        online: {place.rating}★
                      </div>
                    </div>

                    {/* Hygiene Score */}
                    <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                      <div className="text-[10px] text-slate-400 font-mono">Hygiene</div>
                      <div className="font-bold text-[#19E3B1] font-mono mt-0.5">
                        Grade {place.hygieneGrade}
                      </div>
                      <div className="text-[9px] text-slate-400">
                        {place.hygieneScore}/100
                      </div>
                    </div>

                    {/* Cost */}
                    <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                      <div className="text-[10px] text-slate-400 font-mono">Avg Cost</div>
                      <div className="font-bold text-white font-mono mt-0.5">
                        ₹{place.costEstimate}
                      </div>
                      <div className="text-[9px] text-slate-400">
                        per person
                      </div>
                    </div>
                  </div>

                  {/* Telemetry Strip: Noise dB, Tree Canopy, Crowd */}
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-[11px] font-mono">
                    <span className="flex items-center gap-1 text-slate-300" title="Ambient Sound Decibel Level">
                      <Volume2 className="w-3 h-3 text-[#19E3B1]" />
                      <span>{noiseDb} dB</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-300" title="Tree Canopy Shade Coverage">
                      <Trees className="w-3 h-3 text-emerald-400" />
                      <span>{canopyPct}% Shade</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-300" title="Live Crowd Density">
                      <Users className="w-3 h-3 text-[#FF4D8D]" />
                      <span>{place.crowdLevelNow ?? 'Moderate'}</span>
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {place.tags.slice(0, 3).map((tag, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[10px] bg-white/5 text-slate-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                  <MapPin className="w-3 h-3 text-[#19E3B1]" />
                  {place.address.split(',')[0]}
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenWhyModal(place);
                  }}
                  className="text-xs text-[#19E3B1] hover:underline flex items-center gap-0.5 font-mono cursor-pointer"
                >
                  <Info className="w-3 h-3" />
                  Why {place.pulseScore.overall}?
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPlaces.length === 0 && (
        <div className="text-center py-16 text-slate-400 glass-card rounded-2xl p-8">
          <p className="text-base font-semibold text-white">No places matched your active budget or filter.</p>
          <p className="text-xs mt-1">Try clearing filters or raising the budget slider.</p>
        </div>
      )}
    </div>
  );
};
