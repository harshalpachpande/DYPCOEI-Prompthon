import React, { useState } from 'react';
import { SocialSignal } from '../types/city';
import { SOCIAL_SIGNALS } from '../data/puneData';
import { 
  Radio, 
  MessageSquare, 
  CheckCircle2, 
  ThumbsUp, 
  ExternalLink, 
  Flame, 
  Clock, 
  X,
  Filter
} from 'lucide-react';

interface SocialSignalsFeedProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SocialSignalsFeed: React.FC<SocialSignalsFeedProps> = ({
  isOpen,
  onClose
}) => {
  const [filter, setFilter] = useState<'all' | 'traffic' | 'weather' | 'events' | 'safety'>('all');

  if (!isOpen) return null;

  const filteredSignals = SOCIAL_SIGNALS.filter(
    s => filter === 'all' || s.category === filter
  );

  const getSourceBadge = (source: SocialSignal['source']) => {
    switch (source) {
      case 'X':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">𝕏 / Twitter</span>;
      case 'Reddit':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">Reddit r/pune</span>;
      case 'PMC Alert':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-[#FF4D4D] border border-rose-500/30">PMC Civic Alert</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-[#19E3B1] border border-emerald-500/30">Verified News</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-[1250] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl max-h-[85vh] overflow-y-auto glass-card rounded-3xl border border-violet-500/30 shadow-2xl p-6 text-left relative scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-2 rounded-xl bg-violet-600/20 text-[#19E3B1] border border-violet-500/30">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
              Live Social Media Signals & Event Alerts
            </h3>
            <p className="text-xs text-slate-400">
              Aggregated from X, Reddit, and civic dispatch handles
            </p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-1.5 pb-3 border-b border-white/10 mb-4 overflow-x-auto scrollbar-none">
          {(['all', 'traffic', 'weather', 'events', 'safety'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-[#7C5CFF] text-white shadow'
                  : 'glass-card text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Signals List */}
        <div className="space-y-3">
          {filteredSignals.map(sig => (
            <div 
              key={sig.id}
              className="p-4 rounded-2xl bg-black/35 border border-white/10 space-y-2 hover:border-violet-500/40 transition-colors text-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getSourceBadge(sig.source)}
                  <span className="font-bold text-white font-mono">{sig.author}</span>
                  {sig.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#19E3B1]" />}
                </div>
                <span className="text-[10px] font-mono text-slate-400">{sig.timestamp}</span>
              </div>

              <p className="text-slate-200 leading-relaxed font-sans text-xs">
                {sig.text}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3 text-[#19E3B1]" />
                  {sig.likesOrUpvotes} engagements
                </span>
                <span className={`font-bold ${
                  sig.sentiment === 'Positive' ? 'text-[#19E3B1]' : sig.sentiment === 'Alert' ? 'text-[#FF4D4D]' : 'text-[#FFB020]'
                }`}>
                  Sentiment: {sig.sentiment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

