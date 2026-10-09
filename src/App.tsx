import React, { useState } from 'react';
import { Place, ZoneHexagon, RouteOption, CityMood, UserProfile } from './types/city';
import { 
  PLACES_DATA, 
  CITY_ZONES, 
  SAFE_HAVENS, 
  INITIAL_CITY_MOOD 
} from './data/puneData';
import { ProfileWeightType, calculatePulseScore } from './services/pulseScoring';
import { Navbar, ScreenType } from './components/Navbar';
import { InteractiveMap } from './components/Map/InteractiveMap';
import { HomeView } from './components/Views/HomeView';
import { ExploreView } from './components/Views/ExploreView';
import { HeritageView } from './components/Views/HeritageView';
import { SafetyView } from './components/Views/SafetyView';
import { CompareView } from './components/Views/CompareView';
import { ReportView } from './components/Views/ReportView';
import { ItineraryView } from './components/Views/ItineraryView';
import { ProfileView } from './components/Views/ProfileView';
import { PlaceDetailModal } from './components/Modals/PlaceDetailModal';
import { SOSModal } from './components/Modals/SOSModal';
import { WhyScoreModal } from './components/Modals/WhyScoreModal';
import { Map as MapIcon, Layers, ChevronUp, ChevronDown } from 'lucide-react';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [places, setPlaces] = useState<Place[]>(PLACES_DATA);
  const [zones, setZones] = useState<ZoneHexagon[]>(CITY_ZONES);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedZone, setSelectedZone] = useState<ZoneHexagon | null>(null);
  const [activeRoute, setActiveRoute] = useState<RouteOption | null>(null);
  const [cityMood, setCityMood] = useState<CityMood>(INITIAL_CITY_MOOD);
  const [activeProfile, setActiveProfile] = useState<ProfileWeightType>('standard');
  const [is3DPerspective, setIs3DPerspective] = useState<boolean>(false);
  const [isRaining, setIsRaining] = useState<boolean>(false);
  const [timeHour, setTimeHour] = useState<number>(18); // Default 6:00 PM
  const [isSOSModalOpen, setIsSOSModalOpen] = useState<boolean>(false);
  const [whyModalPlace, setWhyModalPlace] = useState<Place | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMapFocusMode, setIsMapFocusMode] = useState<boolean>(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'usr_harshal',
    name: 'Harshal Shinde',
    xp: 450,
    level: 'Level 3 - Urban Vanguard',
    verifiedReportsCount: 3,
    savedPlaces: ['place_fc_road_street_food', 'place_pataleshwar_caves'],
    activeProfileWeight: 'standard',
    badges: [
      {
        id: 'badge_chaos_hero',
        title: 'Chaos Hero',
        icon: '⚡',
        unlockedAt: '2026-10-09',
        description: 'Verified civic reports that saved fellow commuters from waterlogging.'
      }
    ]
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Shake-to-SOS real hardware listener
  React.useEffect(() => {
    let lastX = 0, lastY = 0, lastZ = 0;
    let lastUpdate = 0;

    const handleDeviceMotion = (e: DeviceMotionEvent) => {
      const cur = e.accelerationIncludingGravity;
      if (!cur || cur.x == null || cur.y == null || cur.z == null) return;
      const curTime = Date.now();
      if (curTime - lastUpdate > 150) {
        const diffTime = curTime - lastUpdate;
        lastUpdate = curTime;
        const speed = Math.abs(cur.x + cur.y + cur.z - lastX - lastY - lastZ) / diffTime * 10000;
        if (speed > 800) {
          setIsSOSModalOpen(true);
          showToast('🚨 Shake-to-SOS Activated!');
        }
        lastX = cur.x;
        lastY = cur.y;
        lastZ = cur.z;
      }
    };

    window.addEventListener('devicemotion', handleDeviceMotion);
    return () => window.removeEventListener('devicemotion', handleDeviceMotion);
  }, []);

  // Recalculate place pulse scores when profile changes
  const handleProfileChange = (newProfile: ProfileWeightType) => {
    setActiveProfile(newProfile);
    const updatedPlaces = places.map(p => {
      const newScore = calculatePulseScore(
        p.pulseScore.safety,
        p.pulseScore.cleanliness,
        p.pulseScore.affordability,
        p.rating,
        p.realityRating,
        p.accessibility.score,
        p.pulseScore.crowdComfort,
        newProfile,
        timeHour
      );
      return {
        ...p,
        pulseScore: newScore
      };
    });
    setPlaces(updatedPlaces);
    showToast(`AI Weight Persona shifted to ${newProfile.replace('_', ' ').toUpperCase()}`);
  };

  // Time travel scrubber handler
  const handleHourChange = (newHour: number) => {
    setTimeHour(newHour);
    const updated = places.map(p => {
      const newScore = calculatePulseScore(
        p.pulseScore.safety,
        p.pulseScore.cleanliness,
        p.pulseScore.affordability,
        p.rating,
        p.realityRating,
        p.accessibility.score,
        p.pulseScore.crowdComfort,
        activeProfile,
        newHour
      );
      return { ...p, pulseScore: newScore };
    });
    setPlaces(updated);
  };

  const handleToggleRain = () => {
    const nextState = !isRaining;
    setIsRaining(nextState);
    if (nextState) {
      setCityMood({
        ...cityMood,
        state: 'Rain Alert',
        score: 62,
        primaryColor: '#FFB020',
        description: 'Monsoon showers over JM Road basin; Rain-Aware elevated rerouting automatically active.'
      });
      showToast('🌧️ Rain Alert: Waterlogging reroute active around Alka Talkies!');
    } else {
      setCityMood(INITIAL_CITY_MOOD);
      showToast('☀️ Clear weather restored: Standard routing active.');
    }
  };

  const handlePlanRoute = (place: Place) => {
    setSelectedPlace(null);
    setCurrentScreen('safety');
    setIsMapFocusMode(false);
    showToast(`Planning multi-factor route to ${place.name}`);
  };

  const handleAddToItinerary = (place: Place) => {
    setSelectedPlace(null);
    setCurrentScreen('itinerary');
    setIsMapFocusMode(false);
    showToast(`Added ${place.name} to Day Plan Optimizer`);
  };

  const handleReportSubmitted = () => {
    setUserProfile(prev => ({
      ...prev,
      xp: prev.xp + 50,
      verifiedReportsCount: prev.verifiedReportsCount + 1
    }));
    showToast('🎉 Report verified by Trust Engine! +50 XP awarded.');
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-[#EAF0FF] flex flex-col font-['Inter'] selection:bg-[#7C5CFF] selection:text-white relative overflow-hidden">
      {/* Navigation Header */}
      <Navbar
        currentScreen={currentScreen}
        onScreenChange={(s) => {
          setCurrentScreen(s);
          setIsMapFocusMode(false);
        }}
        cityMood={cityMood}
        activeProfile={activeProfile}
        onProfileChange={handleProfileChange}
        is3DPerspective={is3DPerspective}
        onToggle3D={() => setIs3DPerspective(!is3DPerspective)}
        isRaining={isRaining}
        onToggleRain={handleToggleRain}
        onTriggerSOS={() => setIsSOSModalOpen(true)}
        userProfile={userProfile}
      />

      {/* PERMANENT LIVING CITY BASE MAP IN THE BACKGROUND */}
      <div className="fixed inset-0 top-[56px] md:top-[65px] z-0 pointer-events-auto">
        <InteractiveMap
          places={places}
          zones={zones}
          selectedPlace={selectedPlace}
          onSelectPlace={(p) => setSelectedPlace(p)}
          selectedZone={selectedZone}
          onSelectZone={(z) => setSelectedZone(z)}
          activeRoute={activeRoute}
          safeHavens={SAFE_HAVENS}
          showSafeHavens={true}
          is3DPerspective={is3DPerspective}
          timeHour={timeHour}
          isRaining={isRaining}
        />
      </div>

      {/* FLOATING MAP / PANEL TOGGLE BUTTON (when not on home screen) */}
      {currentScreen !== 'home' && (
        <button
          onClick={() => setIsMapFocusMode(!isMapFocusMode)}
          className="fixed top-20 left-4 z-[500] glass-card px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-white border border-[#19E3B1]/40 shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
        >
          <MapIcon className="w-3.5 h-3.5 text-[#19E3B1]" />
          <span>{isMapFocusMode ? 'Show Screen Panel' : '🗺️ View Live Base Map'}</span>
        </button>
      )}

      {/* FOREGROUND SCREEN LAYERS OVER THE BASE MAP */}
      <main className="flex-1 w-full relative z-10 pointer-events-none">
        {/* Home Screen: Transparent HUD over the background map */}
        {currentScreen === 'home' && (
          <HomeView
            places={places}
            zones={zones}
            selectedPlace={selectedPlace}
            onSelectPlace={(p) => setSelectedPlace(p)}
            selectedZone={selectedZone}
            onSelectZone={(z) => setSelectedZone(z)}
            activeRoute={activeRoute}
            safeHavens={SAFE_HAVENS}
            cityMood={cityMood}
            timeHour={timeHour}
            onHourChange={handleHourChange}
            is3DPerspective={is3DPerspective}
            isRaining={isRaining}
            onNavigateToScreen={(s) => {
              setCurrentScreen(s);
              setIsMapFocusMode(false);
            }}
          />
        )}

        {/* Other screens render as glassmorphic panels over the background map */}
        {currentScreen !== 'home' && !isMapFocusMode && (
          <div className="pointer-events-auto w-full max-h-[calc(100vh-65px)] overflow-y-auto bg-[#0B1020]/80 backdrop-blur-xl border-t border-violet-500/20 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {currentScreen === 'explore' && (
              <ExploreView
                places={places}
                onSelectPlace={(p) => setSelectedPlace(p)}
                onOpenWhyModal={(p) => setWhyModalPlace(p)}
              />
            )}

            {currentScreen === 'heritage' && (
              <HeritageView />
            )}

            {currentScreen === 'safety' && (
              <SafetyView
                onRouteSelect={(r) => {
                  setActiveRoute(r);
                  showToast(`Selected ${r.title} (${r.durationMinutes} min, ${r.safetyScore}% Safety)`);
                }}
                activeRoute={activeRoute}
                isRaining={isRaining}
                onToggleRain={handleToggleRain}
                onTriggerSOS={() => setIsSOSModalOpen(true)}
              />
            )}

            {currentScreen === 'compare' && (
              <CompareView />
            )}

            {currentScreen === 'report' && (
              <ReportView onReportSubmitted={handleReportSubmitted} />
            )}

            {currentScreen === 'itinerary' && (
              <ItineraryView />
            )}

            {currentScreen === 'profile' && (
              <ProfileView userProfile={userProfile} />
            )}
          </div>
        )}
      </main>

      {/* Place Detail Modal Drawer */}
      <PlaceDetailModal
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        onPlanRoute={handlePlanRoute}
        onAddToItinerary={handleAddToItinerary}
        onOpenWhyModal={(p) => setWhyModalPlace(p)}
      />

      {/* Explainable AI "Why Score" Modal */}
      <WhyScoreModal
        place={whyModalPlace}
        activeProfile={activeProfile}
        onClose={() => setWhyModalPlace(null)}
      />

      {/* Guardian Mode SOS Emergency Trigger Modal */}
      <SOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
      />

      {/* Global Interactive Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[2000] glass-card px-4 py-3 rounded-2xl border border-violet-500/40 text-xs font-mono text-white shadow-2xl animate-in slide-in-from-bottom-4 duration-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#19E3B1] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default App;
