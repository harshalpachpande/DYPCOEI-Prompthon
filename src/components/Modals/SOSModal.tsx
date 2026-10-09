import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldAlert, 
  Phone, 
  MapPin, 
  Clock, 
  Share2, 
  Check, 
  AlertTriangle,
  Compass
} from 'lucide-react';
import { SAFE_HAVENS } from '../../data/puneData';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SOSModal: React.FC<SOSModalProps> = ({ isOpen, onClose }) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [checkInMinutes, setCheckInMinutes] = useState(30);
  const [checkInActive, setCheckInActive] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Hold-to-SOS button handler (3 seconds)
  useEffect(() => {
    let interval: any = null;
    if (isHolding && !isTriggered) {
      interval = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            setIsTriggered(true);
            setIsHolding(false);
            return 100;
          }
          return prev + 5;
        });
      }, 70);
    } else if (!isHolding && !isTriggered) {
      setHoldProgress(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHolding, isTriggered]);

  if (!isOpen) return null;

  const handleCopyShare = () => {
    navigator.clipboard?.writeText('https://citypulse.live/sos/track/pune-829147');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[1300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg glass-card rounded-3xl border border-rose-500/40 shadow-2xl p-6 text-left relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-[#FF4D4D] border border-rose-500/40">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                Guardian Mode: SOS & Safety Net
              </h3>
              <p className="text-xs text-slate-400">
                Live location beacon & immediate civic emergency dispatch
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsTriggered(false);
              setHoldProgress(0);
              onClose();
            }}
            className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SOS Emergency Trigger Section */}
        {!isTriggered ? (
          <div className="my-6 text-center">
            <p className="text-xs text-slate-300 mb-6 max-w-sm mx-auto">
              Press and hold the button for 2 seconds to broadcast an instant emergency alert with GPS coordinates to nearest police control and trusted emergency contacts.
            </p>

            {/* Breathing Ring Hold Button */}
            <div className="relative inline-flex items-center justify-center">
              {/* Outer pulsing glow ring */}
              <div className="absolute w-44 h-44 rounded-full bg-rose-600/20 animate-ping opacity-60" />
              <div className="absolute w-36 h-36 rounded-full border-2 border-rose-500/40 animate-pulse" />

              {/* Circular SVG Progress */}
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#FF4D4D"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="351.8"
                  strokeDashoffset={351.8 - (351.8 * holdProgress) / 100}
                  className="transition-all duration-75"
                />
              </svg>

              <button
                onMouseDown={() => setIsHolding(true)}
                onMouseUp={() => setIsHolding(false)}
                onMouseLeave={() => setIsHolding(false)}
                onTouchStart={() => setIsHolding(true)}
                onTouchEnd={() => setIsHolding(false)}
                className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-rose-700 to-[#FF4D4D] text-white font-bold text-sm uppercase tracking-wider flex flex-col items-center justify-center shadow-lg shadow-rose-600/50 hover:scale-105 active:scale-95 transition-transform cursor-pointer select-none"
              >
                <span>HOLD SOS</span>
                <span className="text-[10px] font-mono opacity-80 mt-0.5">
                  {holdProgress > 0 ? `${Math.round(holdProgress)}%` : '2 SEC'}
                </span>
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={() => setIsTriggered(true)}
                className="text-xs text-[#FF4D4D] hover:underline cursor-pointer"
              >
                (Demo: Instant Trigger without holding)
              </button>
            </div>
          </div>
        ) : (
          <div className="my-5 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/50 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 text-[#FF4D4D] font-bold text-sm mb-1 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D4D] animate-ping" />
              EMERGENCY SOS BROADCAST ACTIVE
            </div>
            <p className="text-xs text-rose-200 leading-relaxed mb-3">
              Pune Police Control (112) alerted with your live telemetry. 3 nearest PCR vans notified. Emergency beacon link generated.
            </p>

            <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-black/40 border border-rose-500/30 text-xs font-mono">
              <span className="text-slate-300 truncate">
                citypulse.live/sos/track/pune-829147 (PIN: 4892)
              </span>
              <button
                onClick={handleCopyShare}
                className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Check-In If I'm Late Timer Feature */}
        <div className="glass-card p-4 rounded-2xl border border-white/10 mb-4 bg-[#141B34]/60">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FFB020]" />
              <h4 className="text-xs font-semibold text-white uppercase font-mono">
                "Check-in If I'm Late" Timer
              </h4>
            </div>
            <span className="text-[11px] font-mono text-[#FFB020]">
              {checkInActive ? '⏱️ Running' : 'Idle'}
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            If you do not confirm safe arrival within the set duration, CityPulse automatically sends an alert to your guardian contact.
          </p>

          <div className="flex items-center gap-2">
            {[15, 30, 45, 60].map((mins) => (
              <button
                key={mins}
                onClick={() => setCheckInMinutes(mins)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  checkInMinutes === mins
                    ? 'bg-[#FFB020] text-black shadow-md shadow-amber-500/20'
                    : 'glass-card text-slate-300 hover:text-white'
                }`}
              >
                {mins}m
              </button>
            ))}
            <button
              onClick={() => setCheckInActive(!checkInActive)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono cursor-pointer transition-all ${
                checkInActive
                  ? 'bg-rose-500/20 text-[#FF4D4D] border border-rose-500/40'
                  : 'bg-[#19E3B1] text-black'
              }`}
            >
              {checkInActive ? 'Cancel' : 'Start'}
            </button>
          </div>
        </div>

        {/* Nearest Safe Havens Radar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#19E3B1]" />
              Nearest Safe Havens (Within 1.5 km)
            </span>
            <span className="text-[#19E3B1]">24x7 Verified</span>
          </div>

          <div className="space-y-1.5">
            {SAFE_HAVENS.slice(0, 3).map((haven) => (
              <div 
                key={haven.id}
                className="glass-card p-3 rounded-xl border border-white/10 flex items-center justify-between hover:border-[#19E3B1]/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">
                    {haven.type === 'police' ? '👮' : haven.type === 'hospital' ? '🏥' : '💊'}
                  </span>
                  <div>
                    <h5 className="text-xs font-semibold text-white">{haven.name}</h5>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {haven.distanceKm} km away • {haven.address}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${haven.phone.replace(/[^0-9]/g, '')}`}
                  className="px-2.5 py-1.5 rounded-xl bg-violet-600/30 text-[#19E3B1] border border-[#19E3B1]/40 hover:bg-[#19E3B1] hover:text-black font-mono text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

