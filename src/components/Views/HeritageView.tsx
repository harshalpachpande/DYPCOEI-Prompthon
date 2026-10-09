import React, { useState } from 'react';
import { HeritageSite, LanguageCode } from '../../types/city';
import { HERITAGE_SITES } from '../../data/puneData';
import { speechService } from '../../services/speechService';
import { 
  Volume2, 
  Square, 
  Languages, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  SlidersHorizontal,
  Landmark,
  Sparkles,
  Clock
} from 'lucide-react';

export const HeritageView: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<HeritageSite>(HERITAGE_SITES[0]);
  const [sliderPos, setSliderPos] = useState<number>(50); // 0-100% split
  const [activeLang, setActiveLang] = useState<LanguageCode>('en');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const activeStory = selectedSite.stories[activeLang];

  const handlePlayAudio = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speechService.speak(
        activeStory.text,
        activeLang,
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#7C5CFF]/20 text-[#19E3B1] border border-[#7C5CFF]/40">
            HISTORY & CULTURE
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
          Living Heritage & Then-and-Now Twin
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-xl">
          Step back into Peshwa, Rashtrakuta, and Freedom Movement eras with interactive archival visual comparisons and multilingual audio narratives.
        </p>
      </div>

      {/* Landmark Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {HERITAGE_SITES.map(site => (
          <button
            key={site.id}
            onClick={() => {
              speechService.stop();
              setIsPlayingAudio(false);
              setSelectedSite(site);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              selectedSite.id === site.id
                ? 'bg-gradient-to-r from-[#7C5CFF] to-violet-700 text-white shadow-lg shadow-violet-500/30'
                : 'glass-card text-slate-300 hover:text-white'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 text-[#19E3B1]" />
            <span>{site.name}</span>
            <span className="text-[10px] font-mono text-slate-400">({site.builtYear})</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Then & Now Slider (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card p-4 rounded-3xl border border-violet-500/30 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#19E3B1]" />
                <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">
                  Interactive Then & Now Slider
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Drag slider horizontally to compare
              </span>
            </div>

            {/* Split Image Canvas Container */}
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden select-none cursor-ew-resize">
              {/* NOW IMAGE (Full background) */}
              <img
                src={selectedSite.nowPhoto}
                alt="Today View"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-xs font-mono font-bold text-[#19E3B1] border border-[#19E3B1]/40">
                TODAY (2026)
              </div>

              {/* THEN IMAGE (Clipped on top based on sliderPos) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={selectedSite.thenPhoto}
                  alt="Archival View"
                  className="absolute inset-0 w-full h-full object-cover filter sepia-[0.35] contrast-110"
                  style={{ width: '100%', minWidth: '100%' }}
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-black/75 backdrop-blur-md text-xs font-mono font-bold text-[#FFB020] border border-[#FFB020]/40">
                  THEN ({selectedSite.era.split(' ')[0]})
                </div>
              </div>

              {/* Slider Divider Bar */}
              <div
                className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(25,227,177,0.8)] cursor-ew-resize flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-[#0B1020] border-2 border-white shadow-xl flex items-center justify-center text-[10px] text-white">
                  ⮂ ⮃
                </div>
              </div>

              {/* HTML Range Input Overlay for Dragging */}
              <input
                type="range"
                min={5}
                max={95}
                value={sliderPos}
                onChange={(e) => setSliderPos(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />
            </div>

            {/* Photo Captions */}
            <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[#FFB020] font-mono font-bold block mb-0.5">Archival View:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{selectedSite.thenCaption}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[#19E3B1] font-mono font-bold block mb-0.5">Modern View:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{selectedSite.nowCaption}</p>
              </div>
            </div>
          </div>

          {/* Culture Etiquette Cards (Do's and Don'ts) */}
          <div className="glass-card p-5 rounded-3xl border border-white/10 shadow-xl">
            <h4 className="text-sm font-bold text-white font-['Space_Grotesk'] mb-3 flex items-center gap-2">
              <span>🏛️</span>
              <span>Cultural Etiquette & Sacred Site Protocols</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#19E3B1] uppercase font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>DO'S (Welcomed)</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 pl-1">
                  {selectedSite.etiquette.dos.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#19E3B1]">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF4D4D] uppercase font-mono">
                  <XCircle className="w-4 h-4" />
                  <span>DON'TS (Strictly Avoid)</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 pl-1">
                  {selectedSite.etiquette.donts.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#FF4D4D]">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Story Mode & Festival Calendar (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Story Mode Player */}
          <div className="glass-card p-5 rounded-3xl border border-violet-500/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-violet-600/20 text-[#19E3B1] border border-violet-500/30">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">
                    Story Mode (Multilingual Audio)
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Live speech synthesis in 3 languages
                  </span>
                </div>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-[#0B1020] p-1 rounded-xl border border-white/10">
                {(['en', 'hi', 'mr'] as LanguageCode[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => {
                      speechService.stop();
                      setIsPlayingAudio(false);
                      setActiveLang(lang);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                      activeLang === lang
                        ? 'bg-[#7C5CFF] text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Story Card */}
            <div className="p-4 rounded-2xl bg-black/40 border border-violet-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#19E3B1]">
                  {activeStory.title}
                </h4>
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activeStory.audioDuration}
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {activeStory.text}
              </p>

              {/* Play Audio Button */}
              <button
                onClick={handlePlayAudio}
                className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                  isPlayingAudio
                    ? 'bg-rose-600 text-white shadow-rose-500/30'
                    : 'bg-gradient-to-r from-[#7C5CFF] to-[#19E3B1] text-black font-bold shadow-teal-500/20'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Stop Audio Narration</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Play Audio ({activeLang.toUpperCase()})</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Festival Calendar & Crowd Forecasts */}
          <div className="glass-card p-5 rounded-3xl border border-white/10 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FFB020]" />
              <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">
                Festival Calendar & Crowd Forecasts
              </h3>
            </div>

            <div className="space-y-2.5">
              {selectedSite.festivals.map((f, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-black/30 border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{f.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-[#FF4D4D] border border-rose-500/30">
                      Crowd: {f.crowdForecast}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[#FFB020]">
                    🗓️ Date: {f.date}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    💡 <strong>Smart Tip:</strong> {f.tips}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

