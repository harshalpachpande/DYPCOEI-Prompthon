import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Place, ZoneHexagon, RouteOption, SafeHaven } from '../../types/city';
import { PUNE_CENTER } from '../../data/puneData';
import { Layers, Key, Check, Globe } from 'lucide-react';

export type BasemapType = 'maptiler_dark' | 'maptiler_streets' | 'satellite' | 'neon_dark' | 'osm';

interface InteractiveMapProps {
  places: Place[];
  zones: ZoneHexagon[];
  selectedPlace: Place | null;
  onSelectPlace: (place: Place) => void;
  selectedZone: ZoneHexagon | null;
  onSelectZone: (zone: ZoneHexagon) => void;
  activeRoute: RouteOption | null;
  safeHavens: SafeHaven[];
  showSafeHavens: boolean;
  is3DPerspective: boolean;
  timeHour: number;
  isRaining: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  places,
  zones,
  selectedPlace,
  onSelectPlace,
  selectedZone,
  onSelectZone,
  activeRoute,
  safeHavens,
  showSafeHavens,
  is3DPerspective,
  timeHour,
  isRaining
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const zonesLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const placesLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const routeLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const havensLayerGroupRef = useRef<L.LayerGroup | null>(null);

  // Basemap & API Key state (defaulting to MapTiler DataViz Dark with user's verified key)
  const [activeBasemap, setActiveBasemap] = useState<BasemapType>(() => {
    return (localStorage.getItem('citypulse_basemap') as BasemapType) || 'maptiler_dark';
  });
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('citypulse_map_apikey') || (import.meta.env.VITE_MAP_API_KEY as string) || '8m4d2nxbDDEwy9LpfsM5';
  });
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyInput, setKeyInput] = useState(apiKey);

  const getTileConfig = (type: BasemapType, key: string): { url: string; options: L.TileLayerOptions } => {
    const commonOptions: L.TileLayerOptions = {
      keepBuffer: 6,
      updateWhenIdle: true,
      updateWhenZooming: false,
    };
    switch (type) {
      case 'maptiler_dark':
        return {
          url: `https://api.maptiler.com/maps/dataviz-dark/256/{z}/{x}/{y}.png?key=${key}`,
          options: {
            ...commonOptions,
            maxZoom: 19,
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> &copy; OpenStreetMap contributors'
          }
        };
      case 'maptiler_streets':
        return {
          url: `https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${key}`,
          options: {
            ...commonOptions,
            maxZoom: 19,
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> &copy; OpenStreetMap contributors'
          }
        };
      case 'satellite':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          options: {
            ...commonOptions,
            maxZoom: 19,
            attribution: 'Esri World Imagery Digital Twin'
          }
        };
      case 'osm':
        return {
          url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          options: {
            ...commonOptions,
            maxZoom: 19,
            attribution: 'OpenStreetMap'
          }
        };
      case 'neon_dark':
      default:
        return {
          url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          options: {
            ...commonOptions,
            maxZoom: 19,
            subdomains: 'abcd',
            attribution: 'CartoDB Dark Matter'
          }
        };
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: PUNE_CENTER,
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      preferCanvas: true,
    });

    // Add Base Map Tile Layer
    const config = getTileConfig(activeBasemap, apiKey);
    const tileLayer = L.tileLayer(config.url, config.options);
    tileLayer.addTo(map);
    tileLayerRef.current = tileLayer;

    // Handle tile load error: fallback to CartoDB dark
    tileLayer.on('tileerror', () => {
      if (activeBasemap === 'maptiler_dark' || activeBasemap === 'maptiler_streets') {
        console.warn('MapTiler key error, falling back to CartoDB Dark Matter');
        tileLayer.setUrl('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png');
      }
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    zonesLayerGroupRef.current = L.layerGroup().addTo(map);
    placesLayerGroupRef.current = L.layerGroup().addTo(map);
    routeLayerGroupRef.current = L.layerGroup().addTo(map);
    havensLayerGroupRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    // Ensure map tiles render properly when container dimensions change
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Base Map Tile Layer when activeBasemap or apiKey changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const config = getTileConfig(activeBasemap, apiKey);

    if (tileLayerRef.current) {
      tileLayerRef.current.setUrl(config.url);
    } else {
      const newLayer = L.tileLayer(config.url, config.options).addTo(mapInstanceRef.current);
      tileLayerRef.current = newLayer;
    }

    mapInstanceRef.current.invalidateSize();
  }, [activeBasemap, apiKey]);

  // Update Zones Layer (H3 Hexagons with dynamic time-of-day safety colors)
  useEffect(() => {
    if (!zonesLayerGroupRef.current) return;
    zonesLayerGroupRef.current.clearLayers();

    zones.forEach(zone => {
      const isNight = timeHour >= 21 || timeHour <= 5;
      const displayScore = isNight ? zone.nightSafetyScore : zone.safetyScore;

      let fillColor = '#19E3B1'; // Aurora Teal (safe)
      if (displayScore < 70) {
        fillColor = '#FF4D4D'; // Signal Red (danger)
      } else if (displayScore < 85) {
        fillColor = '#FFB020'; // Sunset Amber (caution)
      }

      const isSelected = selectedZone?.id === zone.id;

      const polygon = L.polygon(zone.polygon, {
        color: isSelected ? '#FFFFFF' : fillColor,
        weight: isSelected ? 3 : 1.5,
        fillColor: fillColor,
        fillOpacity: is3DPerspective ? 0.45 : 0.22,
        className: 'transition-all duration-300'
      });

      polygon.on('click', () => {
        onSelectZone(zone);
      });

      polygon.bindTooltip(`
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 600;">
          <div style="color: #EAF0FF;">${zone.name}</div>
          <div style="color: ${fillColor}; font-family: 'JetBrains Mono', monospace; font-size: 11px; margin-top: 2px;">
            Safety: ${displayScore}/100 • Pulse: ${zone.pulseScore}
          </div>
        </div>
      `, {
        direction: 'center',
        permanent: false,
        className: 'glass-card border border-violet-500/30'
      });

      zonesLayerGroupRef.current?.addLayer(polygon);
    });
  }, [zones, selectedZone, timeHour, is3DPerspective]);

  // Update Places Layer
  useEffect(() => {
    if (!placesLayerGroupRef.current) return;
    placesLayerGroupRef.current.clearLayers();

    places.forEach(place => {
      const isSelected = selectedPlace?.id === place.id;
      
      let markerIconBg = '#7C5CFF';
      if (place.category === 'food') markerIconBg = '#FFB020';
      if (place.category === 'heritage') markerIconBg = '#19E3B1';
      if (place.category === 'nightlife') markerIconBg = '#FF4D8D';

      const pulseScoreColor = place.pulseScore.overall >= 85 ? '#19E3B1' : place.pulseScore.overall >= 70 ? '#FFB020' : '#FF4D4D';

      const customIcon = L.divIcon({
        className: 'custom-place-marker',
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; transform: scale(${isSelected ? 1.25 : 1}); transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);">
            <div style="
              width: ${isSelected ? '36px' : '30px'};
              height: ${isSelected ? '36px' : '30px'};
              background: #141B34;
              border: 2px solid ${markerIconBg};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 0 15px ${markerIconBg}80;
            ">
              <span style="font-size: 13px;">
                ${place.isFort ? '🏰' : place.category === 'food' ? '🍜' : place.category === 'heritage' ? '🏛️' : place.category === 'nightlife' ? '🍸' : place.category === 'tech' ? '💻' : place.category === 'nature' ? '🌿' : '📍'}
              </span>
            </div>
            <div style="
              background: #0B1020;
              border: 1px solid ${pulseScoreColor};
              border-radius: 10px;
              padding: 1px 5px;
              font-family: 'JetBrains Mono', monospace;
              font-size: 10px;
              font-weight: 700;
              color: ${pulseScoreColor};
              margin-top: -6px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.8);
            ">
              ${place.pulseScore.overall}
            </div>
          </div>
        `,
        iconSize: [36, 42],
        iconAnchor: [18, 40]
      });

      const marker = L.marker(place.coordinates, { icon: customIcon });

      marker.on('click', () => {
        onSelectPlace(place);
      });

      placesLayerGroupRef.current?.addLayer(marker);
    });
  }, [places, selectedPlace]);

  // Update Safe Havens Layer
  useEffect(() => {
    if (!havensLayerGroupRef.current) return;
    havensLayerGroupRef.current.clearLayers();

    if (!showSafeHavens) return;

    safeHavens.forEach(haven => {
      const isPink = haven.type === 'pink_patrol' || haven.type === 'women_help_desk';
      const borderCol = isPink ? '#FF4D8D' : '#19E3B1';
      const shadowCol = isPink ? 'rgba(255, 77, 141, 0.7)' : 'rgba(255, 255, 255, 0.4)';
      const havenIcon = L.divIcon({
        className: 'custom-haven-marker',
        html: `
          <div style="
            width: 30px;
            height: 30px;
            background: #141B34;
            border: 2px solid ${borderCol};
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 14px ${shadowCol};
          ">
            <span style="font-size: 13px;">
              ${haven.type === 'pink_patrol' ? '🌸' : haven.type === 'women_help_desk' ? '🛡️' : haven.type === 'police' ? '👮' : haven.type === 'hospital' ? '🏥' : '💊'}
            </span>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker(haven.coordinates, { icon: havenIcon });
      marker.bindPopup(`
        <div style="font-family: 'Inter', sans-serif; font-size: 12px;">
          <div style="font-weight: 700; color: ${borderCol};">${haven.name}</div>
          <div style="color: #9CA3AF; margin-top: 3px;">${haven.address}</div>
          <div style="color: #EAF0FF; font-family: 'JetBrains Mono', monospace; margin-top: 4px;">
            📞 ${haven.phone} • 24x7 Active
          </div>
        </div>
      `);

      havensLayerGroupRef.current?.addLayer(marker);
    });
  }, [safeHavens, showSafeHavens]);

  // Update Route Polyline Layer with glowing head animation
  useEffect(() => {
    if (!routeLayerGroupRef.current) return;
    routeLayerGroupRef.current.clearLayers();

    if (!activeRoute || activeRoute.coordinates.length < 2) return;

    const glowLine = L.polyline(activeRoute.coordinates, {
      color: activeRoute.color,
      weight: 8,
      opacity: 0.35,
      lineCap: 'round',
      lineJoin: 'round'
    });

    const mainLine = L.polyline(activeRoute.coordinates, {
      color: activeRoute.color,
      weight: 4,
      opacity: 1.0,
      dashArray: '10, 10',
      className: 'animate-route-flow'
    });

    routeLayerGroupRef.current.addLayer(glowLine);
    routeLayerGroupRef.current.addLayer(mainLine);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.fitBounds(mainLine.getBounds(), { padding: [60, 60] });
    }
  }, [activeRoute]);

  // Center on selected place
  useEffect(() => {
    if (selectedPlace && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(selectedPlace.coordinates, 15, {
        animate: true,
        duration: 0.8
      });
    }
  }, [selectedPlace]);

  const handleSaveApiKey = () => {
    setApiKey(keyInput);
    localStorage.setItem('citypulse_map_apikey', keyInput);
    setShowKeyModal(false);
  };

  const handleSelectBasemap = (type: BasemapType) => {
    setActiveBasemap(type);
    localStorage.setItem('citypulse_basemap', type);
    setShowLayerMenu(false);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden transition-all duration-700 ${
      is3DPerspective ? 'transform perspective-[900px] rotate-x-[22deg] scale-[1.03]' : ''
    }`}>
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Base Map Layer Switcher */}
      <div className="absolute top-16 right-4 z-[400] flex flex-col items-end gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="glass-card hover:border-[#19E3B1]/50 px-3 py-1.5 rounded-xl text-xs font-mono text-white flex items-center gap-1.5 shadow-xl cursor-pointer"
            title="Switch Background Base Map"
          >
            <Globe className="w-3.5 h-3.5 text-[#19E3B1]" />
            <span className="capitalize">{activeBasemap.replace('_', ' ')}</span>
          </button>

          <button
            onClick={() => setShowKeyModal(true)}
            className="glass-card hover:border-[#7C5CFF]/50 p-1.5 rounded-xl text-xs text-slate-300 hover:text-white shadow-xl cursor-pointer"
            title="Configure Map API Key"
          >
            <Key className="w-3.5 h-3.5 text-[#7C5CFF]" />
          </button>
        </div>

        {/* Layer Dropdown Menu */}
        {showLayerMenu && (
          <div className="glass-card p-2 rounded-2xl shadow-2xl border border-violet-500/30 flex flex-col gap-1 w-52 animate-in fade-in zoom-in-95 duration-150">
            {[
              { id: 'maptiler_dark', label: '🗺️ MapTiler Dark Twin', desc: 'Active Key: 8m4d2...pfsM5' },
              { id: 'maptiler_streets', label: '🏙️ MapTiler Streets', desc: 'Vector Roads & Labels' },
              { id: 'satellite', label: '🛰️ Satellite 3D Twin', desc: 'Esri High-Res Aerial' },
              { id: 'neon_dark', label: '🌌 Neon Dusk Dark', desc: 'CartoDB Dark Matter' },
              { id: 'osm', label: '🌐 OpenStreetMap', desc: 'Open Vector Tiles' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => handleSelectBasemap(m.id as BasemapType)}
                className={`p-2 rounded-xl text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                  activeBasemap === m.id
                    ? 'bg-[#7C5CFF] text-white font-semibold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <div>
                  <div>{m.label}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{m.desc}</div>
                </div>
                {activeBasemap === m.id && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-[1400] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="glass-card p-5 rounded-3xl border border-violet-500/30 max-w-sm w-full space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm font-['Space_Grotesk']">
              <Key className="w-4 h-4 text-[#19E3B1]" />
              <span>Map API Key Configuration</span>
            </div>
            <p className="text-xs text-slate-300">
              Enter your MapTiler or custom tile API key. If left blank, CityPulse automatically falls back to high-res CartoDB Dark and Esri Satellite.
            </p>
            <input
              type="text"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Enter MapTiler API Key..."
              className="w-full bg-[#141B34] text-xs font-mono text-white border border-violet-500/30 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#19E3B1]"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-3 py-1.5 rounded-xl glass-card text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveApiKey}
                className="px-4 py-1.5 rounded-xl bg-[#19E3B1] text-black font-bold text-xs cursor-pointer shadow-lg shadow-teal-500/20"
              >
                Save & Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3D Perspective Badge */}
      {is3DPerspective && (
        <div className="absolute top-4 left-4 z-[400] glass-card px-3 py-1.5 rounded-full text-xs font-mono text-[#19E3B1] flex items-center gap-2 border border-[#19E3B1]/40 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#19E3B1] animate-ping" />
          3D Micro-Zone Hexagon Mesh
        </div>
      )}

      {/* Rain Alert Banner on Map */}
      {isRaining && (
        <div className="absolute top-4 right-4 z-[400] glass-card px-3 py-1.5 rounded-xl text-xs font-mono text-[#FFB020] flex items-center gap-2 border border-[#FFB020]/40 shadow-lg animate-pulse">
          <span>🌧️</span>
          <span>Rain Mode Active: Waterlogging Reroute Enabled</span>
        </div>
      )}
    </div>
  );
};
