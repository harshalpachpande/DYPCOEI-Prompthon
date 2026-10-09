import React, { useState } from 'react';
import { Place, ZoneHexagon, RouteOption, SafeHaven, CityMood } from '../../types/city';
import { TimeTravelSlider } from '../TimeTravelSlider';
import { SocialSignalsFeed } from '../SocialSignalsFeed';
import { 
  Search, 
  Wind, 
  Thermometer, 
  CloudRain, 
  AlertTriangle, 
  ArrowRight,
  Radio,
  MapPin
} from 'lucide-react';

interface HomeViewProps {
  places: Place[];
  zones: ZoneHexagon[];
  selectedPlace: Place | null;
  onSelectPlace: (place: Place) => void;
  selectedZone: ZoneHexagon | null;
  onSelectZone: (zone: ZoneHexagon) => void;
  activeRoute: RouteOption | null;
  safeHavens: SafeHaven[];
  cityMood: CityMood;
  timeHour: number;
  onHourChange: (hour: number) => void;
  is3DPerspective: boolean;
  isRaining: boolean;
  onNavigateToScreen: (screen: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  places,
  selectedPlace,
  onSelectPlace,
  selectedZone,
  onSelectZone,
  cityMood,
  timeHour,
  onHourChange,
  onNavigateToScreen
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showSocialFeed, setShowSocialFeed] = useState<boolean>(false);

  const filteredPlaces = searchQuery.trim() ? places.filter(p => {
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
           p.address.toLowerCase().includes(searchQuery.toLowerCase());
  }) : [];

  return (
    <div className="relative w-full h-[calc(100vh-65px)] flex flex-col justify-between overflow-hidden pointer-events-none p-3">
      {/* Top Floating Control Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 z-[450] max-w-7xl mx-auto w-full">
        {/* Search & Instant Results */}
        <div className="relative max-w-md w-full pointer-events-auto">
          <div className="glass-card p-2 rounded-2xl flex items-center gap-2 w-full border border-violet-500/30 shadow-2xl">
            <Search className="w-4 h-4 text-[#19E3B1] shrink-0 ml-1.5" />
            <input
              type="text"
              placeholder="Search streets, food, heritage or zones in Pune..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                className="text-xs text-slate-400 hover:text-white px-1.5 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Search Autocomplete Dropdown */}
          {showSearchResults && filteredPlaces.length > 0 && (
            <div className="absolute top-12 left-0 right-0 glass-card p-2 rounded-2xl shadow-2xl border border-violet-500/30 max-h-60 overflow-y-auto space-y-1 z-[500] animate-in fade-in">
              {filteredPlaces.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectPlace(p);
                    setShowSearchResults(false);
                  }}
                  className="p-2 rounded-xl hover:bg-white/10 cursor-pointer flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#19E3B1]" />
                    <span className="font-semibold text-white">{p.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#19E3B1]">Pulse: {p.pulseScore.overall}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Weather, AQI, Social Signals & Incident Micro-Telemetries */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pointer-events-auto">
          {/* Temperature & Rain */}
          <div className="glass-card px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 text-xs font-mono shadow-lg">
            <Thermometer className="w-3.5 h-3.5 text-[#FFB020]" />
            <span className="text-white font-semibold">26°C</span>
            <span className="text-slate-400 text-[10px]">Drizzle</span>
          </div>

          {/* AQI Indicator */}
          <div className="glass-card px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 text-xs font-mono shadow-lg">
            <Wind className="w-3.5 h-3.5 text-[#19E3B1]" />
            <span className="text-slate-400 text-[10px]">AQI</span>
            <span className="text-[#19E3B1] font-bold">68 (Good)</span>
          </div>

          {/* Social Media Signals Feed Trigger */}
          <button
            onClick={() => setShowSocialFeed(true)}
            className="glass-card px-3 py-1.5 rounded-xl border border-violet-500/40 text-[#7C5CFF] hover:border-violet-400 flex items-center gap-1.5 text-xs font-mono cursor-pointer shadow-lg"
          >
            <Radio className="w-3.5 h-3.5 text-[#19E3B1] animate-pulse" />
            <span className="text-white font-semibold">Live Signals (4)</span>
          </button>

          {/* Live Incident Alert Chip */}
          <button
            onClick={() => onNavigateToScreen('report')}
            className="glass-card px-3 py-1.5 rounded-xl border border-amber-500/40 text-[#FFB020] hover:border-amber-400 flex items-center gap-1.5 text-xs font-mono cursor-pointer shadow-lg animate-pulse"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="font-semibold">3 Reports</span>
          </button>
        </div>
      </div>

      {/* Middle Space is Empty and Transparent so the Base Map is Clickable & Visible */}
      <div className="flex-1" />

      {/* Bottom Floating Bar: Selected Zone Drawer & Time Travel Scrubber */}
      <div className="flex flex-col gap-2 max-w-4xl mx-auto w-full z-[450] pointer-events-auto">
        {/* Quick Highlights Drawer when a Zone is clicked on the base map */}
        {selectedZone && (
          <div className="glass-card p-3 sm:p-4 rounded-2xl border border-violet-500/40 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in slide-in-from-bottom-3 duration-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#19E3B1] animate-ping" />
                <h4 className="text-sm font-bold text-white font-['Space_Grotesk']">
                  {selectedZone.name} Micro-Zone
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-violet-500/20 text-[#19E3B1] border border-violet-500/30">
                  Pulse {selectedZone.pulseScore}/100
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-300 mt-1">
                <span>🛡️ Safety: <strong className="text-white">{selectedZone.safetyScore}%</strong></span>
                <span>🧹 Clean: <strong className="text-white">{selectedZone.cleanlinessScore}%</strong></span>
                <span>🚦 Traffic: <strong className="text-white">{selectedZone.trafficIndex}%</strong></span>
                <span>Elevation: <strong className="text-white">{selectedZone.elevationMeters}m</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => onNavigateToScreen('compare')}
                className="px-3 py-1.5 rounded-xl glass-card text-xs font-semibold text-slate-200 hover:text-white hover:border-[#19E3B1]/40 flex items-center gap-1 cursor-pointer"
              >
                <span>Compare</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onSelectZone(null as any)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Time Travel Slider Component */}
        <TimeTravelSlider
          currentHour={timeHour}
          onHourChange={onHourChange}
        />
      </div>

      {/* Social Media Signals Feed Modal */}
      <SocialSignalsFeed
        isOpen={showSocialFeed}
        onClose={() => setShowSocialFeed(false)}
      />
    </div>
  );
};
