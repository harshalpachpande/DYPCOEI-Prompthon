import { PulseScoreBreakdown } from '../types/city';

export type ProfileWeightType = 'standard' | 'night_solo' | 'budget_backpacker' | 'accessible';

export interface ScoreWeights {
  safety: number;
  cleanliness: number;
  affordability: number;
  ratings: number;
  accessibility: number;
  crowd: number;
}

export const WEIGHT_PROFILES: Record<ProfileWeightType, { name: string; description: string; weights: ScoreWeights }> = {
  standard: {
    name: 'Standard Citizen',
    description: 'Balanced holistic city weight distribution',
    weights: { safety: 0.30, cleanliness: 0.20, affordability: 0.15, ratings: 0.15, accessibility: 0.10, crowd: 0.10 }
  },
  night_solo: {
    name: 'Solo Traveler / Night Owl',
    description: 'Elevated weight on well-lit corridors, CCTV, and low incident density',
    weights: { safety: 0.50, cleanliness: 0.15, affordability: 0.05, ratings: 0.10, accessibility: 0.10, crowd: 0.10 }
  },
  budget_backpacker: {
    name: 'Budget Backpacker',
    description: 'Prioritizes maximum affordability and authentic local prices',
    weights: { safety: 0.20, cleanliness: 0.15, affordability: 0.40, ratings: 0.10, accessibility: 0.05, crowd: 0.10 }
  },
  accessible: {
    name: 'Accessibility First',
    description: 'Highlights ramps, elevators, step-free access and transit convenience',
    weights: { safety: 0.25, cleanliness: 0.15, affordability: 0.10, ratings: 0.10, accessibility: 0.35, crowd: 0.05 }
  }
};

export function calculatePulseScore(
  safety: number,
  cleanliness: number,
  affordability: number,
  rating: number,
  realityRating: number,
  accessibility: number,
  crowdComfort: number,
  profile: ProfileWeightType = 'standard',
  activeHour = 18 // 0-23
): PulseScoreBreakdown {
  const profileConfig = WEIGHT_PROFILES[profile] || WEIGHT_PROFILES.standard;
  const w = profileConfig.weights;

  // Convert 5-star rating to 100-pt scale adjusted by Reality vs Rating
  // If reality rating is lower than online rating by >0.4, penalize inflated ratings
  const ratingDelta = rating - realityRating;
  const ratingPenalty = ratingDelta > 0.3 ? (ratingDelta * 8) : 0;
  const ratingsScore = Math.max(20, Math.min(100, Math.round((realityRating / 5) * 100 - ratingPenalty)));

  // Time-of-day dynamic modifier
  // Night hours (21:00 - 05:00) slightly impact safety if lighting is poor
  const isNight = activeHour >= 21 || activeHour <= 5;
  const adjustedSafety = isNight ? Math.round(safety * 0.92) : safety;

  const rawScore = 
    (adjustedSafety * w.safety) +
    (cleanliness * w.cleanliness) +
    (affordability * w.affordability) +
    (ratingsScore * w.ratings) +
    (accessibility * w.accessibility) +
    (crowdComfort * w.crowd);

  const overall = Math.round(Math.max(10, Math.min(100, rawScore)));

  // Generate explainable factors
  const positiveFactors: string[] = [];
  const riskFactors: string[] = [];

  if (adjustedSafety >= 85) positiveFactors.push('Strong security presence & high pedestrian density');
  else if (adjustedSafety < 70) riskFactors.push('Lower night lighting index or reported dark stretches');

  if (cleanliness >= 85) positiveFactors.push('Top municipal sanitation & clean vendor audit score');
  else if (cleanliness < 65) riskFactors.push('Citizen reports of litter or waste accumulation');

  if (affordability >= 85) positiveFactors.push('Extremely budget-friendly with high value-for-money');
  else if (affordability < 50) riskFactors.push('Premium pricing bracket relative to city median');

  if (ratingDelta > 0.4) {
    riskFactors.push(`Reality vs Rating Alert: Online score (${rating}★) is inflated vs ground-truth (${realityRating}★)`);
  } else {
    positiveFactors.push(`Verified ground-truth rating consistent at ${realityRating}★`);
  }

  if (accessibility >= 80) positiveFactors.push('Step-free access, wheelchair ramp & broad sidewalks verified');
  else if (accessibility < 60) riskFactors.push('Step barriers or steep cobblestone without dedicated ramps');

  if (crowdComfort >= 80) positiveFactors.push('Pleasant spatial comfort and smooth queue movement');
  else if (crowdComfort < 60) riskFactors.push('Peak-hour congestion and tight physical choke points');

  const summary = `Pulse Score ${overall}/100 computed via ${profileConfig.name} profile (${Math.round(w.safety * 100)}% Safety, ${Math.round(w.cleanliness * 100)}% Cleanliness, ${Math.round(w.affordability * 100)}% Affordability). ${
    overall >= 80 ? 'Classified as an Urban Sanctuary.' : overall >= 65 ? 'Moderate pulse with manageable trade-offs.' : 'Needs caution during peak hours.'
  }`;

  return {
    overall,
    safety: adjustedSafety,
    cleanliness,
    affordability,
    ratingsScore,
    realityAdjustedRating: realityRating,
    originalRating: rating,
    accessibility,
    crowdComfort,
    whyExplanation: {
      summary,
      positiveFactors,
      riskFactors,
      weightsUsed: w
    }
  };
}

