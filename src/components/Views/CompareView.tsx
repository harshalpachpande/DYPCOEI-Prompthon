import React, { useState } from 'react';
import { Place } from '../../types/city';
import { PLACES_DATA, CITY_ZONES } from '../../data/puneData';
import { 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Trophy, 
  ShieldCheck, 
  Car, 
  UtensilsCrossed 
} from 'lucide-react';

export const CompareView: React.FC = () => {
  const [placeA, setPlaceA] = useState<Place>(PLACES_DATA[0]); // FC Road Khao Galli
  const [placeB, setPlaceB] = useState<Place>(PLACES_DATA[3]); // German Bakery KP
  const [placeC, setPlaceC] = useState<Place | null>(PLACES_DATA[2]); // Pataleshwar Caves

  const axes = [
    { key: 'safety', label: 'Safety', getVal: (p: Place) => p.pulseScore.safety },
    { key: 'cleanliness', label: 'Cleanliness', getVal: (p: Place) => p.pulseScore.cleanliness },
    { key: 'affordability', label: 'Affordability', getVal: (p: Place) => p.pulseScore.affordability },
    { key: 'ratingsScore', label: 'Ratings (Ground Truth)', getVal: (p: Place) => p.pulseScore.ratingsScore },
    { key: 'accessibility', label: 'Accessibility', getVal: (p: Place) => p.pulseScore.accessibility },
    { key: 'crowdComfort', label: 'Crowd Comfort', getVal: (p: Place) => p.pulseScore.crowdComfort },
  ];

  // Radar Chart Math (6 vertices, center: 160, 160, radius: 110)
  const cx = 160;
  const cy = 160;
  const maxRadius = 110;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 / 6) * index - Math.PI / 2;
    const r = (value / 100) * maxRadius;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return [x, y];
  };

  const buildPolygonPoints = (place: Place) => {
    return axes
      .map((axis, i) => {
        const val = axis.getVal(place);
        const [x, y] = getCoordinates(val, i);
        return `${x},${y}`;
      })
      .join(' ');
  };

  // Generate plain-language verdict
  const generateVerdict = () => {
    const scoreA = placeA.pulseScore.overall;
    const scoreB = placeB.pulseScore.overall;
    
    if (scoreA > scoreB) {
      return {
        winner: placeA.name,
        text: `${placeA.name} scores higher overall (Pulse ${scoreA} vs ${scoreB}). It is superior in affordability (${placeA.pulseScore.affordability}% vs ${placeB.pulseScore.affordability}%) and public student vibrancy, whereas ${placeB.name} offers higher cafe seating comfort at a premium price.`
      };
    } else {
      return {
        winner: placeB.name,
        text: `${placeB.name} leads overall (Pulse ${scoreB} vs ${scoreA}) with superior ambient cleanliness (${placeB.pulseScore.cleanliness}% vs ${placeA.pulseScore.cleanliness}%) and wheelchair infrastructure, despite higher average bills.`
      };
    }
  };

  const verdict = generateVerdict();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#7C5CFF]/20 text-[#19E3B1] border border-[#7C5CFF]/40">
            BEST VS WORST BENCHMARK
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
          Side-by-Side Radar Comparison
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-xl">
          Evaluate places across 6 objective axes. Unmask overrated spots and see plain-language AI decisions.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <div>
          <label className="text-[11px] font-mono text-[#19E3B1] block mb-1">
            PLACE A (Teal Axis):
          </label>
          <select
            value={placeA.id}
            onChange={(e) => {
              const p = PLACES_DATA.find(x => x.id === e.target.value);
              if (p) setPlaceA(p);
            }}
            className="w-full bg-[#141B34] text-xs text-white border border-[#19E3B1]/40 rounded-xl px-3 py-2.5 focus:outline-none"
          >
            {PLACES_DATA.map(p => (
              <option key={p.id} value={p.id} className="bg-[#0B1020]">
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-mono text-[#FF4D8D] block mb-1">
            PLACE B (Magenta Axis):
          </label>
          <select
            value={placeB.id}
            onChange={(e) => {
              const p = PLACES_DATA.find(x => x.id === e.target.value);
              if (p) setPlaceB(p);
            }}
            className="w-full bg-[#141B34] text-xs text-white border border-[#FF4D8D]/40 rounded-xl px-3 py-2.5 focus:outline-none"
          >
            {PLACES_DATA.map(p => (
              <option key={p.id} value={p.id} className="bg-[#0B1020]">
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-mono text-[#7C5CFF] block mb-1">
            PLACE C (Violet Axis - Optional):
          </label>
          <select
            value={placeC ? placeC.id : 'none'}
            onChange={(e) => {
              if (e.target.value === 'none') {
                setPlaceC(null);
              } else {
                const p = PLACES_DATA.find(x => x.id === e.target.value);
                if (p) setPlaceC(p);
              }
            }}
            className="w-full bg-[#141B34] text-xs text-white border border-[#7C5CFF]/40 rounded-xl px-3 py-2.5 focus:outline-none"
          >
            <option value="none" className="bg-[#0B1020]">None (2 Places)</option>
            {PLACES_DATA.map(p => (
              <option key={p.id} value={p.id} className="bg-[#0B1020]">
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 6-Axis Radar Chart & Plain-Language Verdict (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card p-5 rounded-3xl border border-violet-500/30 shadow-2xl flex flex-col items-center">
            {/* SVG Radar Chart */}
            <div className="relative w-full max-w-[340px] aspect-square">
              <svg viewBox="0 0 320 320" className="w-full h-full overflow-visible">
                {/* Background Concentric Webs (20%, 40%, 60%, 80%, 100%) */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, lvlIdx) => {
                  const pts = axes.map((_, i) => {
                    const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
                    const r = level * maxRadius;
                    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
                  }).join(' ');
                  return (
                    <polygon
                      key={lvlIdx}
                      points={pts}
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Radial Axis Spokes */}
                {axes.map((axis, i) => {
                  const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
                  const x = cx + maxRadius * Math.cos(angle);
                  const y = cy + maxRadius * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1={cx}
                      y1={cy}
                      x2={x}
                      y2={y}
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Polygon A (Teal) */}
                <polygon
                  points={buildPolygonPoints(placeA)}
                  fill="rgba(25, 227, 177, 0.25)"
                  stroke="#19E3B1"
                  strokeWidth="2.5"
                  className="transition-all duration-500"
                />

                {/* Polygon B (Magenta) */}
                <polygon
                  points={buildPolygonPoints(placeB)}
                  fill="rgba(255, 77, 141, 0.25)"
                  stroke="#FF4D8D"
                  strokeWidth="2.5"
                  className="transition-all duration-500"
                />

                {/* Polygon C (Violet) if active */}
                {placeC && (
                  <polygon
                    points={buildPolygonPoints(placeC)}
                    fill="rgba(124, 92, 255, 0.25)"
                    stroke="#7C5CFF"
                    strokeWidth="2.5"
                    className="transition-all duration-500"
                  />
                )}

                {/* Axis Labels */}
                {axes.map((axis, i) => {
                  const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
                  const labelRadius = maxRadius + 22;
                  const lx = cx + labelRadius * Math.cos(angle);
                  const ly = cy + labelRadius * Math.sin(angle);
                  return (
                    <text
                      key={i}
                      x={lx}
                      y={ly}
                      fill="#9CA3AF"
                      fontSize="9"
                      fontWeight="600"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="font-mono uppercase"
                    >
                      {axis.label}
                    </text>
                  );
                })}
              </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#19E3B1]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#19E3B1]" />
                {placeA.name} ({placeA.pulseScore.overall})
              </span>
              <span className="flex items-center gap-1.5 text-[#FF4D8D]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D8D]" />
                {placeB.name} ({placeB.pulseScore.overall})
              </span>
              {placeC && (
                <span className="flex items-center gap-1.5 text-[#7C5CFF]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFF]" />
                  {placeC.name} ({placeC.pulseScore.overall})
                </span>
              )}
            </div>
          </div>

          {/* Plain-Language AI Verdict */}
          <div className="glass-card p-5 rounded-3xl border border-violet-500/25 bg-gradient-to-r from-violet-950/20 to-teal-950/20 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#19E3B1]" />
              <h4 className="text-xs font-bold text-white uppercase font-mono">
                Explainable AI Comparative Verdict
              </h4>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {verdict.text}
            </p>
          </div>
        </div>

        {/* Right: Leaderboards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card p-5 rounded-3xl border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#FFB020]" />
              <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">
                CityPulse Leaderboards
              </h3>
            </div>

            {/* Leaderboard 1: Top Safest Areas */}
            <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#19E3B1] uppercase font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Top Safest Micro-Zones
                </span>
                <span>Safety / Pulse</span>
              </div>
              <div className="space-y-1 text-xs">
                {CITY_ZONES.sort((a,b) => b.safetyScore - a.safetyScore).slice(0, 3).map((z, i) => (
                  <div key={z.id} className="flex items-center justify-between py-1 text-slate-300">
                    <span>{i+1}. {z.name}</span>
                    <span className="font-mono font-bold text-white">{z.safetyScore}% • {z.pulseScore}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard 2: Cleanest Food Hotspots */}
            <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#FFB020] uppercase font-mono">
                <span className="flex items-center gap-1">
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  Cleanest Street Food Streets
                </span>
                <span>Hygiene Grade</span>
              </div>
              <div className="space-y-1 text-xs">
                {PLACES_DATA.filter(p => p.category === 'food').sort((a,b) => b.hygieneScore - a.hygieneScore).slice(0, 3).map((p, i) => (
                  <div key={p.id} className="flex items-center justify-between py-1 text-slate-300">
                    <span>{i+1}. {p.name}</span>
                    <span className="font-mono font-bold text-[#19E3B1]">Grade {p.hygieneGrade} ({p.hygieneScore}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard 3: Worst Traffic Bottlenecks */}
            <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#FF4D4D] uppercase font-mono">
                <span className="flex items-center gap-1">
                  <Car className="w-3.5 h-3.5" />
                  Worst Traffic Chokepoints
                </span>
                <span>Congestion Index</span>
              </div>
              <div className="space-y-1 text-xs">
                {CITY_ZONES.sort((a,b) => b.trafficIndex - a.trafficIndex).slice(0, 3).map((z, i) => (
                  <div key={z.id} className="flex items-center justify-between py-1 text-slate-300">
                    <span>{i+1}. {z.name}</span>
                    <span className="font-mono font-bold text-[#FF4D4D]">{z.trafficIndex}% Delay</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

