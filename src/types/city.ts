export type CategoryType = 
  | 'food' 
  | 'heritage' 
  | 'stay' 
  | 'nature' 
  | 'tech' 
  | 'nightlife' 
  | 'shopping';

export type LanguageCode = 'en' | 'hi' | 'mr';

export interface AccessibilityData {
  wheelchairAccessible: boolean;
  rampAvailable: boolean;
  elevatorAvailable: boolean;
  brailleSignage: boolean;
  audioAssistance: boolean;
  accessibleRestrooms: boolean;
  score: number; // 0-100
}

export interface PulseScoreBreakdown {
  overall: number; // 0-100
  safety: number; // 0-100
  cleanliness: number; // 0-100
  affordability: number; // 0-100
  ratingsScore: number; // 0-100
  realityAdjustedRating: number; // 1.0 - 5.0
  originalRating: number; // 1.0 - 5.0
  accessibility: number; // 0-100
  crowdComfort: number; // 0-100
  whyExplanation: {
    summary: string;
    positiveFactors: string[];
    riskFactors: string[];
    weightsUsed: {
      safety: number;
      cleanliness: number;
      affordability: number;
      ratings: number;
      accessibility: number;
      crowd: number;
    };
  };
}

export interface Place {
  id: string;
  name: string;
  nameMr?: string;
  nameHi?: string;
  category: CategoryType;
  coordinates: [number, number]; // [lat, lng]
  h3ZoneId: string;
  address: string;
  description: string;
  image: string;
  historicalImage?: string;
  priceLevel: 1 | 2 | 3 | 4; // 1: <₹250, 2: ₹250-₹700, 3: ₹700-₹1500, 4: ₹1500+
  costEstimate: number; // INR
  openingHours: string;
  isOpenNow: boolean;
  rating: number; // Online rating (e.g. 4.6)
  reviewCount: number;
  realityRating: number; // Reality ground truth rating (e.g. 3.8)
  isOverratedFlag: boolean;
  hygieneGrade: 'A+' | 'A' | 'B' | 'C';
  hygieneScore: number; // 0-100
  isHiddenGem: boolean;
  accessibility: AccessibilityData;
  pulseScore: PulseScoreBreakdown;
  tags: string[];
  bestTime: string;
  ambientNoiseDb?: number; // Decibel sound meter
  crowdLevelNow?: 'Low' | 'Moderate' | 'Peak';
  aiHygieneAudit?: {
    oilFreshness: string;
    utensilCleanliness: string;
    sanitizationAudit: string;
    pestFree: boolean;
  };
  treeCanopyPct?: number; // Eco layer tree shade coverage
  region?: 'pune' | 'pcmc';
  isFort?: boolean;
  elevationMeters?: number;
  womenSafety?: {
    score: number; // 0-100
    lightingGrade: 'High' | 'Moderate' | 'Low';
    cctvCoveragePct: number;
    nightFootfall: string;
    pinkBoothDistanceMeters: number;
    patrolFrequency: string;
  };
}

export interface ZoneHexagon {
  id: string;
  name: string;
  center: [number, number];
  polygon: [number, number][]; // 6 lat/lng pairs
  safetyScore: number;
  cleanlinessScore: number;
  affordabilityScore: number;
  trafficIndex: number; // 0-100 (100 is severe jam)
  aqi: number; // US AQI scale
  waterloggingRisk: number; // 0-100
  lightingIndex: number; // 0-100
  nightSafetyScore: number; // 0-100
  pulseScore: number;
  activeReportsCount: number;
  accidentHotspotsCount: number;
  elevationMeters: number;
}

export interface HeritageSite {
  id: string;
  placeId: string;
  name: string;
  era: string;
  builtYear: string;
  thenPhoto: string;
  nowPhoto: string;
  thenCaption: string;
  nowCaption: string;
  stories: {
    en: { title: string; text: string; audioDuration: string };
    hi: { title: string; text: string; audioDuration: string };
    mr: { title: string; text: string; audioDuration: string };
  };
  etiquette: {
    dos: string[];
    donts: string[];
  };
  festivals: {
    name: string;
    date: string;
    crowdForecast: 'High' | 'Very High' | 'Moderate';
    tips: string;
  }[];
}

export interface SafeHaven {
  id: string;
  name: string;
  type: 'police' | 'hospital' | 'pharmacy_247' | 'transit_hub' | 'women_help_desk' | 'pink_patrol';
  coordinates: [number, number];
  phone: string;
  distanceKm: number;
  address: string;
  isOpen24x7: boolean;
}

export interface RouteStep {
  instruction: string;
  distanceMeters: number;
  durationSeconds: number;
  turnType: 'straight' | 'left' | 'right' | 'slight_left' | 'slight_right' | 'destination' | 'detour';
  streetName: string;
  hazardAlert?: string;
  lightingQuality: 'Well Lit' | 'Moderate' | 'Dim';
}

export interface RouteCostBreakdown {
  timeWeight: number;
  timeCost: number;
  safetyWeight: number;
  safetyCost: number;
  weatherWeight: number;
  weatherCost: number;
  lightingWeight: number;
  lightingCost: number;
  totalEdgeCost: number;
}

export interface RouteOption {
  id: 'fastest' | 'safest' | 'balanced' | 'women_safe';
  title: string;
  durationMinutes: number;
  distanceKm: number;
  safetyScore: number;
  lightingQuality: 'Well Lit' | 'Moderate' | 'Dim';
  waterloggingRisk: 'None' | 'Moderate' | 'Severe';
  coordinates: [number, number][];
  tradeoffText: string;
  cctvCoverage: string;
  color: string;
  steps: RouteStep[];
  elevationProfile: number[]; // meters along path
  costBreakdown: RouteCostBreakdown;
}

export interface CitizenReport {
  id: string;
  userId: string;
  userName: string;
  userReputation: number; // 0-100
  type: 'waterlogging' | 'pothole' | 'lighting' | 'harassment' | 'garbage' | 'traffic';
  title: string;
  description: string;
  audioNoteUrl?: string;
  audioDurationSeconds?: number;
  transcription?: string;
  detectedLanguage?: LanguageCode;
  imageUrl?: string;
  coordinates: [number, number];
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  trustScore: number; // 0-100
  status: 'verified' | 'investigating' | 'resolved';
  trustBreakdown: {
    exifGpsMatch: boolean;
    duplicateClustering: boolean;
    nearbyCorroborations: number;
    reporterReputationWeight: number;
  };
}

export interface SocialSignal {
  id: string;
  source: 'X' | 'Reddit' | 'News' | 'PMC Alert';
  author: string;
  handle: string;
  text: string;
  timestamp: string;
  sentiment: 'Positive' | 'Neutral' | 'Caution' | 'Alert';
  category: 'traffic' | 'weather' | 'events' | 'safety';
  verified: boolean;
  likesOrUpvotes: number;
}

export interface CityMood {
  state: 'Calm' | 'Brisk' | 'Tense' | 'Festive' | 'Rain Alert';
  score: number; // 0-100
  description: string;
  primaryColor: string;
  gradient: string;
  factors: {
    traffic: string;
    weather: string;
    events: string;
    socialSentiment: string;
  };
}

export interface ItineraryItem {
  id: string;
  timeSlot: string;
  placeId: string;
  placeName: string;
  category: CategoryType;
  durationMinutes: number;
  estimatedCost: number;
  activityNote: string;
  safetyNote: string;
  travelToNextMinutes?: number;
}

export interface ItineraryPlan {
  title: string;
  summary: string;
  totalBudget: number;
  estimatedSpent: number;
  groupType: 'Solo' | 'Couple' | 'Friends' | 'Family';
  targetDuration: string;
  items: ItineraryItem[];
  tips: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  badges: {
    id: string;
    title: string;
    icon: string;
    unlockedAt: string;
    description: string;
  }[];
  xp: number;
  level: string;
  verifiedReportsCount: number;
  savedPlaces: string[];
  activeProfileWeight: 'standard' | 'night_solo' | 'budget_backpacker' | 'accessible';
}
