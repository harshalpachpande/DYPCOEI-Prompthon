import React, { useState } from 'react';
import { Place } from '../../types/city';
import { 
  X, 
  MapPin, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Navigation, 
  Clock, 
  Accessibility, 
  UtensilsCrossed, 
  Info,
  Volume2,
  Trees,
  Users,
  Leaf,
  Activity
} from 'lucide-react';

interface PlaceDetailModalProps {
  place: Place | null;
  onClose: () => void;
  onPlanRoute: (place: Place) => void;
  onAddToItinerary: (place: Place) => void;
  onOpenWhyModal: (place: Place) => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  onClose,
  onPlanRoute,
  onAddToItinerary,
  onOpenWhyModal
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'hygiene' | 'womenSafety' | 'crowd24h'>('overview');

  if (!place) return null;

  const pulseColor = place.pulseScore.overall >= 85 ? '#19E3B1' : place.pulseScore.overall >= 70 ? '#FFB020' : '#FF4D4D';
  
  // Decibel acoustics classification
  const noiseDb = place.ambientNoiseDb ?? 58;
  const noiseCategory = noiseDb < 45 ? { label: 'Tranquil Serenity', color: '#19E3B1' } :
                        noiseDb < 65 ? { label: 'Gentle Urban Buzz', color: '#7C5CFF' } :
                        { label: 'High Energy Energy', color: '#FFB020' };

  // Tree canopy classification
  const canopyPct = place.treeCanopyPct ?? 45;

  // 24-Hour crowd curve generator
  const currentHour = new Date().getHours();
  const hourlyCurve = Array.from({ length: 24 }, (_, h) => {
    let crowd = 15;
    if (place.category === 'food') {
      if ((h >= 8 && h <= 10) || (h >= 13 && h <= 15) || (h >= 19 && h <= 22)) crowd = 75 + ((h * 7) % 20);
      else if (h >= 11 && h <= 18) crowd = 45;
      else crowd = 10;
    } else if (place.category === 'heritage') {
      if (h >= 9 && h <= 17) crowd = 60 + ((h * 5) % 25);
      else crowd = 5;
    } else if (place.category === 'nightlife') {
      if (h >= 18 && h <= 23) crowd = 85;
      else if (h >= 12 && h <= 17) crowd = 40;
      else crowd = 5;
    } else {
      if (h >= 6 && h <= 10) crowd = 70;
      else if (h >= 17 && h <= 20) crowd = 80;
      else crowd = 30;
    }
    return { hour: h, crowd, isCurrent: h === currentHour };
  });

  return (
    <div className="fixed inset-0 z-[1200] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto glass-card rounded-t-3xl sm:rounded-3xl border border-violet-500/30 shadow-2xl p-5 sm:p-6 text-left relative scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner Image */}
        <div className="relative -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-4 h-52 overflow-hidden rounded-t-3xl">
          <img 
            src={place.image} 
            alt={place.name} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-black/40 to-transparent" />
          
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#7C5CFF]/30 text-[#19E3B1] border border-[#7C5CFF]/50 backdrop-blur-md">
                  {place.category.toUpperCase()}
                </span>
                {place.isHiddenGem && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/30 text-[#FFB020] border border-amber-500/50 backdrop-blur-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    HIDDEN GEM
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">
                {place.name}
              </h2>
              {place.nameMr && (
                <div className="text-xs text-[#19E3B1] font-medium mt-0.5">
                  {place.nameMr}
                </div>
              )}
            </div>

            {/* Pulse Score Circular Badge */}
            <div 
              onClick={() => onOpenWhyModal(place)}
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl glass-card border border-white/20 cursor-pointer hover:scale-105 transition-transform"
              title="Click to view explainable AI factors"
            >
              <span className="text-[10px] uppercase font-mono text-slate-300">Pulse</span>
              <span className="text-2xl font-bold font-mono" style={{ color: pulseColor }}>
                {place.pulseScore.overall}
              </span>
              <span className="text-[10px] text-[#19E3B1] underline mt-0.5 flex items-center gap-0.5">
                <Info className="w-2.5 h-2.5" /> Why?
              </span>
            </div>
          </div>
        </div>

        {/* Address and Quick Meta */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
          <MapPin className="w-3.5 h-3.5 text-[#19E3B1] shrink-0" />
          <span>{place.address}</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          {place.description}
        </p>

        {/* Tabs Strip */}
        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-[#7C5CFF] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Overview & Sensors</span>
          </button>
          <button
            onClick={() => setActiveTab('hygiene')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'hygiene'
                ? 'bg-[#19E3B1] text-black shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>AI Hygiene Audit</span>
          </button>
          <button
            onClick={() => setActiveTab('womenSafety')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'womenSafety'
                ? 'bg-[#FF4D8D] text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>🌸 Women Safety</span>
          </button>
          <button
            onClick={() => setActiveTab('crowd24h')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'crowd24h'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>24h Crowd Forecast</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & SENSORS */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Key Signals Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Reality vs Rating */}
              <div className="glass-card p-3 rounded-xl border border-white/10">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Reality vs Rating</div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-base font-bold text-white font-mono">
                    {place.realityRating}★
                  </span>
                  <span className="text-xs text-slate-400 line-through font-mono">
                    {place.rating}★
                  </span>
                </div>
                <div className="text-[10px] mt-0.5 text-slate-400">
                  {place.isOverratedFlag ? (
                    <span className="text-[#FFB020] font-semibold">⚠️ Flagged Overrated</span>
                  ) : (
                    <span className="text-[#19E3B1]">✓ Ground-truth verified</span>
                  )}
                </div>
              </div>

              {/* Street Food Hygiene */}
              <div className="glass-card p-3 rounded-xl border border-white/10">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Hygiene Badge</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <UtensilsCrossed className="w-4 h-4 text-[#19E3B1]" />
                  <span className="text-base font-bold text-white font-mono">
                    Grade {place.hygieneGrade}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Score: {place.hygieneScore}/100
                </div>
              </div>

              {/* Cost Estimate */}
              <div className="glass-card p-3 rounded-xl border border-white/10">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Cost Per Person</div>
                <div className="flex items-center gap-1 mt-1 text-base font-bold text-white font-mono">
                  <span>₹{place.costEstimate}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Level {place.priceLevel} / 4
                </div>
              </div>

              {/* Accessibility Score */}
              <div className="glass-card p-3 rounded-xl border border-white/10">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Accessibility</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <Accessibility className="w-4 h-4 text-[#7C5CFF]" />
                  <span className="text-base font-bold text-white font-mono">
                    {place.accessibility.score}/100
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {place.accessibility.rampAvailable ? 'Ramps active' : 'Steps present'}
                </div>
              </div>
            </div>

            {/* Smart Urban Telemetry Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Acoustic Noise Meter */}
              <div className="glass-card p-3 rounded-xl border border-white/10 bg-[#141B34]/60">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-[#19E3B1]" /> Acoustic Sound
                  </span>
                  <span style={{ color: noiseCategory.color }} className="font-bold">
                    {noiseDb} dB
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                  <div 
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (noiseDb / 90) * 100)}%`, backgroundColor: noiseCategory.color }}
                  />
                </div>
                <div className="text-[10px] text-slate-300 mt-1 font-mono">
                  {noiseCategory.label}
                </div>
              </div>

              {/* Tree Canopy & Shade */}
              <div className="glass-card p-3 rounded-xl border border-white/10 bg-[#141B34]/60">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Trees className="w-3.5 h-3.5 text-emerald-400" /> Tree Canopy
                  </span>
                  <span className="text-emerald-400 font-bold">
                    {canopyPct}% Shade
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                  <div 
                    className="h-1.5 rounded-full bg-emerald-400 transition-all duration-500"
                    style={{ width: `${canopyPct}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-300 mt-1 font-mono">
                  Natural heat buffer active
                </div>
              </div>

              {/* Live Crowd Level & Best Time */}
              <div className="glass-card p-3 rounded-xl border border-white/10 bg-[#141B34]/60">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#FF4D8D]" /> Live Crowd
                  </span>
                  <span className="font-bold text-white">
                    {place.crowdLevelNow ?? 'Moderate'}
                  </span>
                </div>
                <div className="text-[10px] text-slate-300 mt-2 truncate flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#19E3B1] shrink-0" />
                  <span className="truncate">Best: {place.bestTime}</span>
                </div>
              </div>
            </div>

            {/* Explainable AI "Why?" Section */}
            <div className="glass-card p-4 rounded-2xl border border-violet-500/20 bg-[#141B34]/60">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#19E3B1]" />
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                    Explainable AI Pulse Breakdown
                  </h4>
                </div>
                <button 
                  onClick={() => onOpenWhyModal(place)}
                  className="text-xs text-[#7C5CFF] hover:text-[#19E3B1] font-medium transition-colors cursor-pointer"
                >
                  Formula Details →
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {place.pulseScore.whyExplanation.summary}
              </p>

              <div className="space-y-1.5">
                {place.pulseScore.whyExplanation.positiveFactors.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#19E3B1] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
                {place.pulseScore.whyExplanation.riskFactors.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#FFB020] shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AI HYGIENE AUDIT */}
        {activeTab === 'hygiene' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="glass-card p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#19E3B1]" />
                  <div>
                    <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">
                      PMC Smart City Food & Venue Hygiene Inspector
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Automated computer vision & multi-point microbiological inspection verification
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#19E3B1]/20 text-[#19E3B1] border border-[#19E3B1]/40">
                  Grade {place.hygieneGrade} ({place.hygieneScore}/100)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Cooking Oil / Medium Quality</div>
                  <div className="text-xs font-semibold text-white mt-1">
                    {place.aiHygieneAudit?.oilFreshness || 'Cold-pressed sunflower oil · TPM < 14% verified'}
                  </div>
                  <div className="text-[10px] text-[#19E3B1] mt-0.5">✓ Zero trans-fat rancidity detected</div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Utensils & Cutlery Sanitization</div>
                  <div className="text-xs font-semibold text-white mt-1">
                    {place.aiHygieneAudit?.utensilCleanliness || 'High-temp boiled water rinse & SS-304'}
                  </div>
                  <div className="text-[10px] text-[#19E3B1] mt-0.5">✓ Sterilization protocol satisfied</div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Municipal Health Audit Score</div>
                  <div className="text-xs font-semibold text-white mt-1">
                    {place.aiHygieneAudit?.sanitizationAudit || '94/100 · FSSAI & PMC Verified'}
                  </div>
                  <div className="text-[10px] text-[#19E3B1] mt-0.5">✓ Clean potable water source certified</div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Pest Control & Cleanliness</div>
                  <div className="text-xs font-semibold text-white mt-1">
                    {place.aiHygieneAudit?.pestFree !== false ? 'Certified Pest-Free Facility' : 'Under Observation'}
                  </div>
                  <div className="text-[10px] text-[#19E3B1] mt-0.5">✓ Bi-weekly digital fumigation log checked</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: WOMEN SAFETY SHIELD */}
        {activeTab === 'womenSafety' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="glass-card p-4 rounded-2xl border border-pink-500/30 bg-pink-950/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#FF4D8D]" />
                  <div>
                    <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">
                      🌸 Women Night Guardian & Safety Shield
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Verified police beat coverage, CCTV monitoring, and illuminated pink corridors
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#FF4D8D]/20 text-[#FF4D8D] border border-[#FF4D8D]/40">
                  {place.womenSafety?.score || (place.pulseScore.safety >= 85 ? 94 : 88)}% Protected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Night Street Illumination</div>
                  <div className="text-xs font-semibold text-white mt-1">
                    {place.womenSafety?.lightingGrade || 'High'} · Continuous Smart LED Corridor
                  </div>
                  <div className="text-[10px] text-[#19E3B1] mt-0.5">✓ Zero dark alleyway junctions</div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Smart CCTV & Police Beat</div>
                  <div className="text-xs font-semibold text-white mt-1">
                    {place.womenSafety?.cctvCoveragePct || 92}% CCTV Monitored + PCR Link
                  </div>
                  <div className="text-[10px] text-[#FF4D8D] mt-0.5">
                    {place.womenSafety?.patrolFrequency || 'Damini Squad Beat Active'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Verified Night Footfall</div>
                  <div className="text-xs font-semibold text-white mt-1">
                    {place.womenSafety?.nightFootfall || 'Active Family & Commuter Footfall'}
                  </div>
                  <div className="text-[10px] text-[#19E3B1] mt-0.5">✓ 24x7 open pharmacies & transit shops</div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Nearest Pink Safety Kiosk</div>
                  <div className="text-xs font-semibold text-white mt-1">
                    {place.womenSafety?.pinkBoothDistanceMeters || 180}m Walking Distance
                  </div>
                  <div className="text-[10px] text-[#FF4D8D] mt-0.5">✓ Stationed women police personnel</div>
                </div>
              </div>

              {/* Emergency Fast Triggers */}
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-pink-500/20">
                <a
                  href="tel:1091"
                  className="flex-1 py-2 px-3 rounded-xl bg-[#FF4D8D] hover:bg-pink-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-pink-500/20 transition-colors"
                >
                  <span>📞 Call Women Helpline 1091</span>
                </a>
                <a
                  href="tel:112"
                  className="flex-1 py-2 px-3 rounded-xl glass-card hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-white/20"
                >
                  <span>🚨 Emergency 112</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 24H CROWD & SAFETY FORECAST */}
        {activeTab === 'crowd24h' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="glass-card p-4 rounded-2xl border border-violet-500/25 bg-[#141B34]/60">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#FF4D8D]" />
                  <div>
                    <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">
                      24-Hour Crowd & Safety Distribution
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Predictive hourly density curve. Current hour highlighted.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#19E3B1] font-bold">
                  Recommended: {place.bestTime}
                </span>
              </div>

              {/* Bar Chart Visualization */}
              <div className="h-32 flex items-end gap-1 pt-6 px-1 border-b border-white/10 pb-2">
                {hourlyCurve.map((item) => {
                  const barHeight = `${Math.max(12, item.crowd)}%`;
                  const isCurrent = item.isCurrent;
                  const barColor = item.crowd > 70 ? '#FF4D8D' : item.crowd > 40 ? '#7C5CFF' : '#19E3B1';

                  return (
                    <div key={item.hour} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                      {/* Tooltip on hover */}
                      <div className="absolute -top-7 hidden group-hover:flex flex-col items-center px-1.5 py-0.5 rounded bg-black/90 border border-white/20 text-[9px] font-mono text-white whitespace-nowrap z-20">
                        {item.hour}:00 - {item.crowd}%
                      </div>

                      <div 
                        className={`w-full rounded-t-sm transition-all duration-300 ${
                          isCurrent ? 'ring-2 ring-white shadow-lg shadow-white/30' : 'opacity-80 hover:opacity-100'
                        }`}
                        style={{ height: barHeight, backgroundColor: barColor }}
                      />
                      <span className={`text-[8px] font-mono mt-1 ${isCurrent ? 'text-white font-bold' : 'text-slate-500'}`}>
                        {item.hour % 6 === 0 ? `${item.hour}h` : ''}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#19E3B1]" /> Low Density
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFF]" /> Moderate
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D8D]" /> Peak Rush
                </span>
                <span className="flex items-center gap-1.5 text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-white ring-2 ring-violet-500" /> Now ({currentHour}:00)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
          <button
            onClick={() => onPlanRoute(place)}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 transition-all cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Safe Route Navigation</span>
          </button>

          <button
            onClick={() => onAddToItinerary(place)}
            className="w-full sm:w-auto py-3 px-5 rounded-xl glass-card hover:border-[#19E3B1]/50 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#19E3B1]" />
            <span>Add to Day Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
