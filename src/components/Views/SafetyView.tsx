import React, { useState } from 'react';
import { Place, RouteOption, SafeHaven, RouteStep } from '../../types/city';
import { PLACES_DATA, SAFE_HAVENS } from '../../data/puneData';
import { generateSafeRoutes } from '../../services/routingEngine';
import { speechService } from '../../services/speechService';
import { 
  ShieldCheck, 
  Navigation, 
  Clock, 
  CloudRain, 
  Moon, 
  Sun, 
  AlertTriangle, 
  ArrowRight, 
  Zap, 
  CheckCircle,
  Eye,
  ShieldAlert,
  Compass,
  CornerDownRight,
  CornerDownLeft,
  MoveRight,
  TrendingUp,
  Volume2,
  Calculator,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface SafetyViewProps {
  onRouteSelect: (route: RouteOption) => void;
  activeRoute: RouteOption | null;
  isRaining: boolean;
  onToggleRain: () => void;
  onTriggerSOS: () => void;
}

export const SafetyView: React.FC<SafetyViewProps> = ({
  onRouteSelect,
  activeRoute,
  isRaining,
  onToggleRain,
  onTriggerSOS
}) => {
  const [originPlace, setOriginPlace] = useState<Place>(PLACES_DATA[0]); // FC Road
  const [destPlace, setDestPlace] = useState<Place>(PLACES_DATA[1]); // Shaniwar Wada
  const [isNightLayerActive, setIsNightLayerActive] = useState<boolean>(true);
  const [showTurnByTurn, setShowTurnByTurn] = useState<boolean>(true);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [showCostFormula, setShowCostFormula] = useState<boolean>(false);

  // Calculate routes dynamically
  const routes = generateSafeRoutes({
    origin: originPlace.coordinates,
    destination: destPlace.coordinates,
    originName: originPlace.name,
    destinationName: destPlace.name,
    isRaining: isRaining,
    isNight: isNightLayerActive
  });

  const currentActiveRoute = activeRoute || routes[1]; // default to safest

  const handleStartNavigation = () => {
    setIsNavigating(true);
    setActiveStepIndex(0);
    const step = currentActiveRoute.steps[0];
    if (step) {
      speechService.speak(step.instruction, 'en');
    }
  };

  const handleNextStep = () => {
    if (activeStepIndex < currentActiveRoute.steps.length - 1) {
      const nextIdx = activeStepIndex + 1;
      setActiveStepIndex(nextIdx);
      const step = currentActiveRoute.steps[nextIdx];
      if (step) {
        speechService.speak(step.instruction, 'en');
      }
    } else {
      setIsNavigating(false);
      speechService.speak('You have arrived safely at your destination.', 'en');
    }
  };

  const getStepIcon = (turnType: RouteStep['turnType']) => {
    switch (turnType) {
      case 'left':
      case 'slight_left':
        return <CornerDownLeft className="w-4 h-4 text-[#7C5CFF]" />;
      case 'right':
      case 'slight_right':
        return <CornerDownRight className="w-4 h-4 text-[#19E3B1]" />;
      case 'detour':
        return <CloudRain className="w-4 h-4 text-[#FFB020]" />;
      case 'destination':
        return <CheckCircle className="w-4 h-4 text-[#19E3B1]" />;
      default:
        return <MoveRight className="w-4 h-4 text-slate-300" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-[#19E3B1] border border-emerald-500/40">
              SAFETY & GUARDIAN ENGINE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
            Safe Route Engine & Guardian Protection
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Never trade personal safety for a trivial shortcut. Evaluate Fastest vs Safest vs Balanced corridors with live street lighting, turn-by-turn maneuvers, and waterlogging telemetry.
          </p>
        </div>

        {/* Global Safety Toggles */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Night Mode & Women Safety Layer Toggle */}
          <button
            onClick={() => setIsNightLayerActive(!isNightLayerActive)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
              isNightLayerActive
                ? 'bg-violet-600/30 text-[#19E3B1] border-[#19E3B1]/50 shadow-lg shadow-teal-500/20'
                : 'glass-card text-slate-300 border-white/10'
            }`}
          >
            <Moon className="w-4 h-4 text-[#7C5CFF]" />
            <span>Women-Safety Night Layer: {isNightLayerActive ? 'ON' : 'OFF'}</span>
          </button>

          {/* Rain Reroute Mode Toggle */}
          <button
            onClick={onToggleRain}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
              isRaining
                ? 'bg-amber-500/30 text-[#FFB020] border-amber-500/60 shadow-lg shadow-amber-500/20'
                : 'glass-card text-slate-300 border-white/10'
            }`}
          >
            <CloudRain className="w-4 h-4" />
            <span>Rain Reroute: {isRaining ? 'ACTIVE' : 'OFF'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Origin/Destination + 3 Route Cards + Turn-by-Turn Navigation (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Origin/Destination Selector */}
          <div className="glass-card p-5 rounded-3xl border border-violet-500/30 shadow-2xl space-y-3">
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-[#19E3B1]" />
              Multi-Factor Route Planner
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  START ORIGIN:
                </label>
                <select
                  value={originPlace.id}
                  onChange={(e) => {
                    const found = PLACES_DATA.find(p => p.id === e.target.value);
                    if (found) setOriginPlace(found);
                  }}
                  className="w-full bg-[#141B34] text-xs text-white border border-violet-500/30 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#19E3B1]"
                >
                  {PLACES_DATA.map(p => (
                    <option key={p.id} value={p.id} className="bg-[#0B1020]">
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  DESTINATION:
                </label>
                <select
                  value={destPlace.id}
                  onChange={(e) => {
                    const found = PLACES_DATA.find(p => p.id === e.target.value);
                    if (found) setDestPlace(found);
                  }}
                  className="w-full bg-[#141B34] text-xs text-white border border-violet-500/30 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#19E3B1]"
                >
                  {PLACES_DATA.map(p => (
                    <option key={p.id} value={p.id} className="bg-[#0B1020]">
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Three Route Cards: Fastest, Safest, Balanced */}
          <div className="space-y-3">
            {routes.map(r => {
              const isSelected = currentActiveRoute.id === r.id;
              const safetyColor = r.safetyScore >= 90 ? '#19E3B1' : r.safetyScore >= 75 ? '#7C5CFF' : '#FFB020';

              return (
                <div
                  key={r.id}
                  onClick={() => onRouteSelect(r)}
                  className={`glass-card p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'border-[#19E3B1] shadow-xl shadow-teal-500/10 scale-[1.01]'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Active Indicator Strip */}
                  {isSelected && (
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-1.5"
                      style={{ backgroundColor: r.color }}
                    />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: r.color }} 
                        />
                        <h4 className="text-sm font-bold text-white font-['Space_Grotesk']">
                          {r.title}
                        </h4>
                        {r.id === 'safest' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-[#19E3B1] border border-emerald-500/30">
                            RECOMMENDED
                          </span>
                        )}
                        {r.id === 'women_safe' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-pink-500/20 text-[#FF4D8D] border border-pink-500/30">
                            PINK SHIELD
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {r.tradeoffText}
                      </p>
                    </div>

                    {/* Stats pill */}
                    <div className="text-right shrink-0">
                      <div className="text-base font-bold text-white font-mono">
                        {r.durationMinutes} min
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {r.distanceKm} km
                      </div>
                    </div>
                  </div>

                  {/* Micro telemetry footer */}
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" style={{ color: safetyColor }} />
                      <strong style={{ color: safetyColor }}>{r.safetyScore}/100</strong> Safety Score
                    </span>

                    <span className="text-slate-400">
                      💡 {r.lightingQuality}
                    </span>

                    <span className="text-slate-400">
                      📹 {r.cctvCoverage}
                    </span>

                    <span className={r.waterloggingRisk === 'Severe' ? 'text-[#FF4D4D] font-bold' : 'text-slate-400'}>
                      🌧️ Waterlogging: {r.waterloggingRisk}
                    </span>

                    <span className="text-slate-400">
                      Cost: <strong>{r.costBreakdown.totalEdgeCost}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Turn-by-Turn Navigation & Elevation Profile */}
          <div className="glass-card p-5 rounded-3xl border border-violet-500/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#19E3B1]" />
                <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">
                  Turn-by-Turn Safe Guidance & Elevation
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCostFormula(!showCostFormula)}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono text-slate-400 hover:text-white glass-card flex items-center gap-1 cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#7C5CFF]" />
                  <span>Cost Formula</span>
                </button>

                <button
                  onClick={() => setShowTurnByTurn(!showTurnByTurn)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                >
                  {showTurnByTurn ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Formula Panel when opened */}
            {showCostFormula && (
              <div className="p-3.5 rounded-2xl bg-black/40 border border-violet-500/30 text-xs font-mono space-y-2 animate-in fade-in">
                <div className="text-[#19E3B1] font-bold">
                  edge_cost = time·w1 + (100−safety)·w2 + risk_weather·w3 + (100−lighting)·w4
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300">
                  <div>Time Cost: {currentActiveRoute.costBreakdown.timeCost}</div>
                  <div>Safety Cost: {currentActiveRoute.costBreakdown.safetyCost}</div>
                  <div>Weather Risk: {currentActiveRoute.costBreakdown.weatherCost}</div>
                  <div>Lighting Risk: {currentActiveRoute.costBreakdown.lightingCost}</div>
                </div>
                <div className="text-right text-[#19E3B1] font-bold">
                  Total Calculated Cost: {currentActiveRoute.costBreakdown.totalEdgeCost}
                </div>
              </div>
            )}

            {/* Elevation Profile Visualizer */}
            <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#19E3B1]" />
                  Elevation Profile Along Route:
                </span>
                <span className="text-white font-bold">
                  {currentActiveRoute.elevationProfile[0]}m → {currentActiveRoute.elevationProfile[currentActiveRoute.elevationProfile.length - 1]}m
                </span>
              </div>
              <div className="flex items-end gap-2 h-12 pt-2">
                {currentActiveRoute.elevationProfile.map((elev, i) => {
                  const heightPercent = Math.max(30, Math.min(100, ((elev - 540) / 30) * 100));
                  const isDip = elev < 552;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div 
                        className={`w-full rounded-t-md transition-all ${
                          isDip ? 'bg-amber-500/60 border-t-2 border-amber-400' : 'bg-emerald-500/60 border-t-2 border-[#19E3B1]'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                      <span className="text-[9px] font-mono text-slate-400">{elev}m</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Turn-by-Turn Steps List */}
            {showTurnByTurn && (
              <div className="space-y-2 pt-1">
                {currentActiveRoute.steps.map((st, i) => {
                  const isCurrent = isNavigating && activeStepIndex === i;
                  return (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-violet-950/40 border-[#19E3B1] shadow-lg'
                          : 'bg-black/25 border-white/5'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 p-1.5 rounded-lg bg-black/40 border border-white/10 shrink-0">
                          {getStepIcon(st.turnType)}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-white leading-snug">
                            {st.instruction}
                          </p>
                          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 mt-1">
                            <span>{st.streetName}</span>
                            <span>• {st.distanceMeters}m</span>
                            <span>• 💡 {st.lightingQuality}</span>
                          </div>
                          {st.hazardAlert && (
                            <p className="text-[10px] text-[#FFB020] font-mono mt-1">
                              {st.hazardAlert}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Navigation Simulator Action Button */}
                <div className="pt-2 flex items-center gap-2">
                  {!isNavigating ? (
                    <button
                      onClick={handleStartNavigation}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#19E3B1] to-teal-500 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 cursor-pointer"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Start Voice Guidance Simulation</span>
                    </button>
                  ) : (
                    <div className="w-full flex items-center gap-2">
                      <button
                        onClick={handleNextStep}
                        className="flex-1 py-2.5 rounded-xl bg-[#7C5CFF] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Next Maneuver ({activeStepIndex + 1}/{currentActiveRoute.steps.length})</span>
                      </button>
                      <button
                        onClick={() => setIsNavigating(false)}
                        className="px-3 py-2.5 rounded-xl glass-card text-xs text-rose-400 hover:text-white cursor-pointer"
                      >
                        Stop
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Guardian Mode & Safe Havens Compass (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Guardian Mode Card */}
          <div className="glass-card p-5 rounded-3xl border border-rose-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#141B34] to-[#0B1020]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-500/20 text-[#FF4D4D] border border-rose-500/40">
                  <ShieldAlert className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">
                    Guardian Shield Mode
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Live escort beacon & emergency trigger
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-[#19E3B1] border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Real-time telemetry tracking with emergency shake-to-SOS sensitivity, check-in timeout reminders, and instantaneous dispatch to Pune Police Control.
            </p>

            <button
              onClick={onTriggerSOS}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-[#FF4D4D] hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Launch Guardian SOS Center</span>
            </button>
          </div>

          {/* Nearest Safe Havens Radar */}
          <div className="glass-card p-5 rounded-3xl border border-white/10 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#19E3B1]" />
                <h3 className="text-sm font-bold text-white font-['Space_Grotesk']">
                  Nearest Safe Havens (Within 2km)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#19E3B1]">24x7 Open</span>
            </div>

            <div className="space-y-2">
              {SAFE_HAVENS.map(haven => (
                <div 
                  key={haven.id}
                  className="p-3 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between text-xs hover:border-[#19E3B1]/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">
                      {haven.type === 'police' ? '👮' : haven.type === 'hospital' ? '🏥' : '💊'}
                    </span>
                    <div>
                      <div className="font-semibold text-white">{haven.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {haven.distanceKm} km away • {haven.phone}
                      </div>
                    </div>
                  </div>

                  <a
                    href={`tel:${haven.phone.replace(/[^0-9]/g, '')}`}
                    className="px-2.5 py-1 rounded-lg bg-violet-600/20 text-[#19E3B1] border border-[#19E3B1]/30 font-mono text-[11px] font-bold"
                  >
                    Call
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
