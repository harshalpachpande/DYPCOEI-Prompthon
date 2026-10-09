import { RouteOption, RouteStep, RouteCostBreakdown } from '../types/city';

export interface RouteRequest {
  origin: [number, number]; // [lat, lng]
  destination: [number, number];
  originName: string;
  destinationName: string;
  isRaining: boolean;
  isNight: boolean;
}

// Cost function from problem statement:
// edge_cost = time·w1 + (100 − safety)·w2 + risk_weather·w3 + (100 − lighting)·w4
export function computeEdgeCost(
  durationMinutes: number,
  safetyScore: number,
  riskWeather: number,
  lightingScore: number,
  weights = { w1: 0.35, w2: 0.35, w3: 0.15, w4: 0.15 }
): RouteCostBreakdown {
  const timeCost = durationMinutes * weights.w1;
  const safetyCost = (100 - safetyScore) * weights.w2;
  const weatherCost = riskWeather * weights.w3;
  const lightingCost = (100 - lightingScore) * weights.w4;
  const totalEdgeCost = Math.round((timeCost + safetyCost + weatherCost + lightingCost) * 10) / 10;

  return {
    timeWeight: weights.w1,
    timeCost: Math.round(timeCost * 10) / 10,
    safetyWeight: weights.w2,
    safetyCost: Math.round(safetyCost * 10) / 10,
    weatherWeight: weights.w3,
    weatherCost: Math.round(weatherCost * 10) / 10,
    lightingWeight: weights.w4,
    lightingCost: Math.round(lightingCost * 10) / 10,
    totalEdgeCost
  };
}

export function generateSafeRoutes(req: RouteRequest): RouteOption[] {
  const { origin, destination, isRaining, isNight, originName, destinationName } = req;

  // Midpoint coordinate calculations
  const latMid = (origin[0] + destination[0]) / 2;
  const lngMid = (origin[1] + destination[1]) / 2;

  // 1. FASTEST ROUTE: Direct arterial via JM Road dip / Alka Talkies
  const fastestCoords: [number, number][] = [
    origin,
    [latMid - 0.002, lngMid - 0.001],
    [latMid + 0.001, lngMid + 0.002],
    destination
  ];

  const fastestSteps: RouteStep[] = isRaining ? [
    {
      instruction: `Head south-east from ${originName} toward Goodluck Chowk`,
      distanceMeters: 450,
      durationSeconds: 120,
      turnType: 'straight',
      streetName: 'FC Road Main Arterial',
      lightingQuality: 'Well Lit'
    },
    {
      instruction: '⚠️ CAUTION: Enter low-elevation Alka Talkies underpass dip (35cm water reported)',
      distanceMeters: 800,
      durationSeconds: 320,
      turnType: 'slight_right',
      streetName: 'JM Road River Underpass',
      hazardAlert: 'Waterlogging hazard: Potholes hidden under standing water',
      lightingQuality: isNight ? 'Moderate' : 'Well Lit'
    },
    {
      instruction: 'Cross Z-Bridge connector through Kasba Peth market',
      distanceMeters: 1400,
      durationSeconds: 380,
      turnType: 'slight_left',
      streetName: 'Kasba Peth Link Road',
      lightingQuality: isNight ? 'Dim' : 'Well Lit'
    },
    {
      instruction: `Arrive at ${destinationName} (Dilli Darwaza entrance)`,
      distanceMeters: 350,
      durationSeconds: 100,
      turnType: 'destination',
      streetName: 'Shaniwar Wada Plaza',
      lightingQuality: 'Well Lit'
    }
  ] : [
    {
      instruction: `Head south-east from ${originName} toward Goodluck Chowk`,
      distanceMeters: 450,
      durationSeconds: 120,
      turnType: 'straight',
      streetName: 'FC Road',
      lightingQuality: 'Well Lit'
    },
    {
      instruction: 'Turn left onto JM Road arterial connector',
      distanceMeters: 900,
      durationSeconds: 220,
      turnType: 'left',
      streetName: 'JM Road',
      lightingQuality: 'Well Lit'
    },
    {
      instruction: 'Proceed across Shivaji Bridge toward Old City',
      distanceMeters: 1600,
      durationSeconds: 380,
      turnType: 'straight',
      streetName: 'Shivaji Bridge',
      lightingQuality: isNight ? 'Moderate' : 'Well Lit'
    },
    {
      instruction: `Arrive at ${destinationName}`,
      distanceMeters: 350,
      durationSeconds: 90,
      turnType: 'destination',
      streetName: 'Shaniwar Wada Plaza',
      lightingQuality: 'Well Lit'
    }
  ];

  const fastestDuration = isRaining ? 18 : 14;
  const fastestSafety = isRaining ? 58 : (isNight ? 68 : 74);
  const fastestWeatherRisk = isRaining ? 88 : 10;
  const fastestLighting = isNight ? 65 : 95;
  const fastestCost = computeEdgeCost(fastestDuration, fastestSafety, fastestWeatherRisk, fastestLighting);

  // 2. SAFEST ROUTE: Elevated detour via Bhandarkar Rd & Deccan Gymkhana Police Outpost (Avoids JM basin)
  const safestCoords: [number, number][] = isRaining 
    ? [
        origin,
        [origin[0] + 0.003, origin[1] - 0.002],
        [latMid + 0.004, lngMid - 0.003],
        [destination[0] + 0.002, destination[1] - 0.001],
        destination
      ]
    : [
        origin,
        [origin[0] + 0.002, origin[1] - 0.001],
        [latMid + 0.002, lngMid - 0.002],
        [destination[0] + 0.001, destination[1] - 0.001],
        destination
      ];

  const safestSteps: RouteStep[] = isRaining ? [
    {
      instruction: '🛡️ Rain-Aware Reroute: Turn right onto elevated Bhandarkar Road ridge',
      distanceMeters: 600,
      durationSeconds: 150,
      turnType: 'detour',
      streetName: 'Bhandarkar Elevated Corridor (565m)',
      hazardAlert: 'Dry elevation: 100% bypass of flood-prone Alka Talkies basin',
      lightingQuality: 'Well Lit'
    },
    {
      instruction: 'Pass Deccan Gymkhana Police Station (active 24x7 CCTV checkpoint)',
      distanceMeters: 1100,
      durationSeconds: 280,
      turnType: 'straight',
      streetName: 'Deccan Gymkhana Avenue',
      lightingQuality: 'Well Lit'
    },
    {
      instruction: 'Cross via Sambhaji Bridge elevated bypass',
      distanceMeters: 1600,
      durationSeconds: 380,
      turnType: 'slight_right',
      streetName: 'Sambhaji Bridge Flyover',
      lightingQuality: 'Well Lit'
    },
    {
      instruction: `Safely arrive at ${destinationName} rampart entrance`,
      distanceMeters: 400,
      durationSeconds: 110,
      turnType: 'destination',
      streetName: 'Shaniwar Peth Heritage Boulevard',
      lightingQuality: 'Well Lit'
    }
  ] : [
    {
      instruction: `Head south along well-lit pedestrian corridor from ${originName}`,
      distanceMeters: 550,
      durationSeconds: 140,
      turnType: 'straight',
      streetName: 'FC Road Student Boulevard',
      lightingQuality: 'Well Lit'
    },
    {
      instruction: 'Turn right at Deccan Police Chowki with 24x7 surveillance beacon',
      distanceMeters: 1200,
      durationSeconds: 300,
      turnType: 'right',
      streetName: 'Karve Road Arterial',
      lightingQuality: 'Well Lit'
    },
    {
      instruction: 'Proceed across well-lit Lakdi Pul with wide pedestrian sidewalks',
      distanceMeters: 1700,
      durationSeconds: 400,
      turnType: 'straight',
      streetName: 'Tilak Road Link',
      lightingQuality: 'Well Lit'
    },
    {
      instruction: `Arrive securely at ${destinationName}`,
      distanceMeters: 450,
      durationSeconds: 120,
      turnType: 'destination',
      streetName: 'Shaniwar Wada',
      lightingQuality: 'Well Lit'
    }
  ];

  const safestDuration = isRaining ? 21 : 19;
  const safestSafety = 94;
  const safestWeatherRisk = isRaining ? 12 : 5;
  const safestLighting = 96;
  const safestCost = computeEdgeCost(safestDuration, safestSafety, safestWeatherRisk, safestLighting);

  // 3. BALANCED ROUTE
  const balancedCoords: [number, number][] = [
    origin,
    [latMid + 0.001, lngMid - 0.001],
    [latMid + 0.002, lngMid + 0.001],
    destination
  ];

  const balancedSteps: RouteStep[] = [
    {
      instruction: `Start on FC Road and merge smoothly at Goodluck Chowk`,
      distanceMeters: 500,
      durationSeconds: 130,
      turnType: 'straight',
      streetName: 'FC Road',
      lightingQuality: 'Well Lit'
    },
    {
      instruction: 'Navigate via Jangali Maharaj Temple perimeter avenue',
      distanceMeters: 1100,
      durationSeconds: 270,
      turnType: 'slight_left',
      streetName: 'JM Perimeter Road',
      lightingQuality: 'Well Lit'
    },
    {
      instruction: 'Cross Dengle Bridge avoiding market backalleys',
      distanceMeters: 1500,
      durationSeconds: 360,
      turnType: 'slight_right',
      streetName: 'Dengle Bridge Link',
      lightingQuality: isNight ? 'Moderate' : 'Well Lit'
    },
    {
      instruction: `Arrive at destination: ${destinationName}`,
      distanceMeters: 400,
      durationSeconds: 100,
      turnType: 'destination',
      streetName: 'Shaniwar Wada Plaza',
      lightingQuality: 'Well Lit'
    }
  ];

  const balancedDuration = isRaining ? 18 : 16;
  const balancedSafety = isRaining ? 78 : 86;
  const balancedWeatherRisk = isRaining ? 35 : 10;
  const balancedLighting = 88;
  const balancedCost = computeEdgeCost(balancedDuration, balancedSafety, balancedWeatherRisk, balancedLighting);

  return [
    {
      id: 'fastest',
      title: 'Fastest Route',
      durationMinutes: fastestDuration,
      distanceKm: 3.8,
      safetyScore: fastestSafety,
      lightingQuality: isNight ? 'Moderate' : 'Well Lit',
      waterloggingRisk: isRaining ? 'Severe' : 'None',
      coordinates: fastestCoords,
      tradeoffText: isRaining 
        ? '⚠️ High Risk in Rain: Shortest travel time (18 min) but crosses flooded Alka Talkies dip (35cm standing water).'
        : 'Shortest travel time, but 2 stretches have lower street illumination after 9 PM.',
      cctvCoverage: '62% monitored',
      color: '#FFB020',
      steps: fastestSteps,
      elevationProfile: [565, 550, 548, 554], // notice the 548m dip into the waterlogged basin!
      costBreakdown: fastestCost
    },
    {
      id: 'safest',
      title: 'Safest Route (Recommended)',
      durationMinutes: safestDuration,
      distanceKm: 4.5,
      safetyScore: safestSafety,
      lightingQuality: 'Well Lit',
      waterloggingRisk: 'None',
      coordinates: safestCoords,
      tradeoffText: isRaining
        ? '🌧️ Rain-Aware Reroute Active: +3 mins detour over elevated Deccan ridge (565m), 100% dry road with police patrols.'
        : 'Passes 2 police outposts, 98% well-lit LED corridor, 24x7 open commercial establishments.',
      cctvCoverage: '96% monitored & Police beats',
      color: '#19E3B1',
      steps: safestSteps,
      elevationProfile: [565, 568, 566, 560], // elevated ridge, dry all the way!
      costBreakdown: safestCost
    },
    {
      id: 'balanced',
      title: 'Balanced Route',
      durationMinutes: balancedDuration,
      distanceKm: 4.1,
      safetyScore: balancedSafety,
      lightingQuality: 'Well Lit',
      waterloggingRisk: isRaining ? 'Moderate' : 'None',
      coordinates: balancedCoords,
      tradeoffText: 'Optimal compromise: Saves travel time over safest route while avoiding dark unlit alleys.',
      cctvCoverage: '84% monitored',
      color: '#7C5CFF',
      steps: balancedSteps,
      elevationProfile: [565, 560, 556, 554],
      costBreakdown: balancedCost
    },
    {
      id: 'women_safe',
      title: '🌸 Women Safe (Pink Shield Corridor)',
      durationMinutes: safestDuration + 1,
      distanceKm: 4.6,
      safetyScore: 98,
      lightingQuality: 'Well Lit',
      waterloggingRisk: 'None',
      coordinates: safestCoords,
      tradeoffText: 'Highest security priority: 100% smart LED illuminated corridor, 98% CCTV coverage, passes FC Road Pink Safety Kiosk and 24x7 chemist havens.',
      cctvCoverage: '98% monitored + Damini Squad Patrol',
      color: '#FF4D8D',
      steps: [
        {
          instruction: `Depart securely from ${originName} along wide illuminated boulevard`,
          distanceMeters: 400,
          durationSeconds: 110,
          turnType: 'straight',
          streetName: 'FC Road Commercial Corridor',
          lightingQuality: 'Well Lit'
        },
        {
          instruction: '🛡️ Pass FC Road Pink Safety Kiosk (Police officer on duty 24x7, Helpline 1091)',
          distanceMeters: 800,
          durationSeconds: 200,
          turnType: 'straight',
          streetName: 'Fergusson College Main Ave',
          lightingQuality: 'Well Lit'
        },
        {
          instruction: 'Follow elevated, bustling Deccan Gymkhana transit hub with 24x7 open establishments',
          distanceMeters: 1600,
          durationSeconds: 390,
          turnType: 'slight_left',
          streetName: 'Deccan Well-Lit Arterial',
          lightingQuality: 'Well Lit'
        },
        {
          instruction: `Safely arrive at ${destinationName} (monitored ASI entrance)`,
          distanceMeters: 450,
          durationSeconds: 120,
          turnType: 'destination',
          streetName: 'Lit Heritage Plaza',
          lightingQuality: 'Well Lit'
        }
      ],
      elevationProfile: [565, 568, 566, 560],
      costBreakdown: computeEdgeCost(safestDuration + 1, 98, 5, 100)
    }
  ];
}
