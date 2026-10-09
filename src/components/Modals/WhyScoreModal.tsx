import React from 'react';
import { Place } from '../../types/city';
import { X, Sparkles, ShieldCheck, Sparkle, Tag, Star, Accessibility, Users, Cpu } from 'lucide-react';
import { WEIGHT_PROFILES, ProfileWeightType } from '../../services/pulseScoring';

interface WhyScoreModalProps {
  place: Place | null;
  activeProfile: ProfileWeightType;
  onClose: () => void;
}

export const WhyScoreModal: React.FC<WhyScoreModalProps> = ({
  place,
  activeProfile,
  onClose
}) => {
  if (!place) return null;

  const profile = WEIGHT_PROFILES[activeProfile];
  const w = place.pulseScore.whyExplanation.weightsUsed;

  const factors = [
    {
      title: 'Safety & Security',
      score: place.pulseScore.safety,
      weight: Math.round(w.safety * 100),
      icon: <ShieldCheck className="w-4 h-4 text-[#19E3B1]" />,
      desc: 'Lighting index, recent verified incident reports, active CCTV and police beat density.'
    },
    {
      title: 'Cleanliness & Hygiene',
      score: place.pulseScore.cleanliness,
      weight: Math.round(w.cleanliness * 100),
      icon: <Sparkle className="w-4 h-4 text-[#7C5CFF]" />,
      desc: 'Municipal sanitation rating, waste bin audit, and Street-Food Hygiene inspection.'
    },
    {
      title: 'Affordability Index',
      score: place.pulseScore.affordability,
      weight: Math.round(w.affordability * 100),
      icon: <Tag className="w-4 h-4 text-[#FFB020]" />,
      desc: 'Average meal/ticket pricing mapped to median city purchasing power benchmark.'
    },
    {
      title: 'Ratings (Reality-Adjusted)',
      score: place.pulseScore.ratingsScore,
      weight: Math.round(w.ratings * 100),
      icon: <Star className="w-4 h-4 text-yellow-400" />,
      desc: `Online: ${place.rating}★ → Ground-Truth: ${place.realityRating}★ (adjusted for spam/tourist trap bias).`
    },
    {
      title: 'Accessibility Layer',
      score: place.pulseScore.accessibility,
      weight: Math.round(w.accessibility * 100),
      icon: <Accessibility className="w-4 h-4 text-[#FF4D8D]" />,
      desc: 'Ramps, step-free access, wheelchair navigability, Braille and audible signals.'
    },
    {
      title: 'Crowd & Traffic Comfort',
      score: place.pulseScore.crowdComfort,
      weight: Math.round(w.crowd * 100),
      icon: <Users className="w-4 h-4 text-sky-400" />,
      desc: 'Pedestrian density comfort, queue velocity, and adjacent road transit chokepoints.'
    }
  ];

  return (
    <div className="fixed inset-0 z-[1300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl border border-violet-500/30 shadow-2xl p-6 text-left relative scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-xl bg-[#7C5CFF]/20 text-[#19E3B1] border border-[#7C5CFF]/40">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
              Explainable AI: Why This Pulse Score?
            </h3>
            <p className="text-xs text-slate-400">
              Transparent 6-axis model mathematically decomposed for {place.name}
            </p>
          </div>
        </div>

        {/* Big Score Summary Banner */}
        <div className="my-4 p-4 rounded-2xl glass-card border border-violet-500/25 bg-[#141B34]/60 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase font-mono text-slate-400">Composite Score</div>
            <div className="text-3xl font-extrabold font-mono text-[#19E3B1]">
              {place.pulseScore.overall} <span className="text-sm text-slate-400">/ 100</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[11px] uppercase font-mono text-slate-400">Active Weight Persona</div>
            <div className="text-xs font-bold text-white mt-0.5">
              {profile.name}
            </div>
            <div className="text-[10px] text-slate-400 max-w-[200px]">
              {profile.description}
            </div>
          </div>
        </div>

        {/* Mathematical Formula Preview */}
        <div className="p-3 rounded-xl bg-black/40 border border-white/10 font-mono text-[11px] text-[#19E3B1] overflow-x-auto mb-4">
          Pulse = ({w.safety}·Safety) + ({w.cleanliness}·Clean) + ({w.affordability}·Afford) + ({w.ratings}·Rating) + ({w.accessibility}·Access) + ({w.crowd}·Crowd)
        </div>

        {/* 6 Factor Decompositions */}
        <div className="space-y-3 mb-5">
          {factors.map((f, i) => (
            <div key={i} className="glass-card p-3 rounded-xl border border-white/10">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 font-semibold text-white">
                  {f.icon}
                  {f.title}
                </span>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-slate-400 text-[10px]">Weight: {f.weight}%</span>
                  <span className="font-bold text-[#19E3B1]">{f.score}/100</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-1.5">
                <div 
                  className="h-full bg-gradient-to-r from-[#7C5CFF] to-[#19E3B1] rounded-full transition-all duration-500"
                  style={{ width: `${f.score}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-normal">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Verification & Transparency Guarantee */}
        <div className="p-3 rounded-xl bg-violet-900/20 border border-violet-500/30 text-xs text-slate-300">
          <span className="font-semibold text-white">✓ Explainability Guarantee: </span>
          CityPulse never serves opaque black-box numbers. Every score is directly auditable against ground-truth sensor telemetry, citizen reports, and open data feeds.
        </div>
      </div>
    </div>
  );
};

