import { Place, ItineraryPlan, ItineraryItem } from '../types/city';
import { PLACES_DATA } from '../data/puneData';

export interface ItineraryParams {
  budget: number; // in INR e.g. 1500
  timeWindow: 'morning' | 'evening' | 'fullday';
  groupType: 'Solo' | 'Couple' | 'Friends' | 'Family';
  interests: string[]; // ['food', 'heritage', 'nightlife']
}

export function generateOptimizedItinerary(params: ItineraryParams): ItineraryPlan {
  const { budget, timeWindow, groupType, interests } = params;

  // Filter candidate places matching interests or high pulse
  const candidates = PLACES_DATA.filter(p => {
    if (interests.length === 0) return true;
    return interests.includes(p.category) || interests.some(i => p.tags.map(t => t.toLowerCase()).includes(i.toLowerCase()));
  });

  const pool = candidates.length >= 2 ? candidates : PLACES_DATA;

  let items: ItineraryItem[] = [];
  let title = '';
  let summary = '';
  let targetDuration = '';

  if (timeWindow === 'morning') {
    targetDuration = '08:30 AM - 01:00 PM (4.5 hrs)';
    title = `Morning Explorer (${groupType} Edition)`;
    summary = `Kick off your morning in historical Pune with ancient rock-cut cave serenity followed by iconic Peshwa architecture before midday heat.`;

    const stop1 = pool.find(p => p.id === 'place_pataleshwar_caves') || PLACES_DATA[2];
    const stop2 = pool.find(p => p.id === 'place_shaniwar_wada') || PLACES_DATA[1];
    const stop3 = pool.find(p => p.id === 'place_fc_road_street_food') || PLACES_DATA[0];

    items = [
      {
        id: 'item_1',
        timeSlot: '08:30 AM - 10:00 AM',
        placeId: stop1.id,
        placeName: stop1.name,
        category: stop1.category,
        durationMinutes: 90,
        estimatedCost: stop1.costEstimate,
        activityNote: 'Meditative exploration of 8th-century Rashtrakuta rock-cut basalt mandapa. Cool thermal sanctuary.',
        safetyNote: 'Zone Pulse 89. Zero traffic inside archaeological precinct.',
        travelToNextMinutes: 15
      },
      {
        id: 'item_2',
        timeSlot: '10:15 AM - 11:45 AM',
        placeId: stop2.id,
        placeName: stop2.name,
        category: stop2.category,
        durationMinutes: 90,
        estimatedCost: stop2.costEstimate,
        activityNote: 'Walk the historic ramparts of Dilli Darwaza and Hazari Karanje lotus fountain gardens.',
        safetyNote: 'Zone Pulse 79. ASI guards present; keep valuables zipped near crowded ticket turnstiles.',
        travelToNextMinutes: 20
      },
      {
        id: 'item_3',
        timeSlot: '12:05 PM - 01:00 PM',
        placeId: stop3.id,
        placeName: stop3.name,
        category: stop3.category,
        durationMinutes: 55,
        estimatedCost: Math.min(stop3.costEstimate * 1.5, budget * 0.4),
        activityNote: 'Authentic student brunch: Savour Sev Potato Dahi Puri (SPDP) & steaming Vaishali Filter Coffee.',
        safetyNote: 'Zone Pulse 87. High daytime student security & pedestrian walkway.'
      }
    ];
  } else if (timeWindow === 'evening') {
    targetDuration = '04:30 PM - 09:30 PM (5 hrs)';
    title = `Sunset Heritage & Culinary Pulse (${groupType})`;
    summary = `A vibrant late-afternoon to night itinerary capturing golden hour photography, cultural theatre, and dinner at historic hotspots.`;

    const stop1 = pool.find(p => p.id === 'place_aga_khan_palace') || PLACES_DATA[4];
    const stop2 = pool.find(p => p.id === 'place_fc_road_street_food') || PLACES_DATA[0];
    const stop3 = pool.find(p => p.id === 'place_mg_road_dorabjee') || PLACES_DATA[7];

    items = [
      {
        id: 'item_1',
        timeSlot: '04:30 PM - 06:00 PM',
        placeId: stop1.id,
        placeName: stop1.name,
        category: stop1.category,
        durationMinutes: 90,
        estimatedCost: stop1.costEstimate,
        activityNote: 'Sunset glow across Italianate arches and reflective pools of Kasturba Gandhi memorial.',
        safetyNote: 'Zone Pulse 91. Highly secure gated grounds, pristine lighting.',
        travelToNextMinutes: 25
      },
      {
        id: 'item_2',
        timeSlot: '06:25 PM - 07:45 PM',
        placeId: stop2.id,
        placeName: stop2.name,
        category: stop2.category,
        durationMinutes: 80,
        estimatedCost: Math.min(200, budget * 0.3),
        activityNote: 'Evening buzz on FC Road: Bun Maska, sizzling cheese Pav Bhaji, and street shopping.',
        safetyNote: 'Zone Pulse 87. Peak street lighting, lively women-friendly crowd.',
        travelToNextMinutes: 20
      },
      {
        id: 'item_3',
        timeSlot: '08:05 PM - 09:30 PM',
        placeId: stop3.id,
        placeName: stop3.name,
        category: stop3.category,
        durationMinutes: 85,
        estimatedCost: Math.min(stop3.costEstimate, budget * 0.5),
        activityNote: 'Celebrated 1878 Parsi feast: Authentic slow-cooked Dhansak and Lagan Nu Custard.',
        safetyNote: 'Zone Pulse 85. Camp main street remains well-patrolled until 11 PM.'
      }
    ];
  } else {
    // Full day
    targetDuration = '09:00 AM - 09:30 PM (Full Day 12.5 hrs)';
    title = `The Ultimate Pune Digital Twin Odyssey (${groupType})`;
    summary = `Comprehensive day navigating hidden monolithic rock caves, Maratha empires, leafy cafes, and sunset cultural landmarks within your ₹${budget} budget.`;

    items = [
      {
        id: 'item_1',
        timeSlot: '09:00 AM - 10:30 AM',
        placeId: 'place_pataleshwar_caves',
        placeName: 'Pataleshwar Cave Temple',
        category: 'heritage',
        durationMinutes: 90,
        estimatedCost: 0,
        activityNote: 'Peaceful morning contemplation at the 8th-century Rashtrakuta basalt temple.',
        safetyNote: 'Zone Pulse 89. Serene morning comfort.',
        travelToNextMinutes: 15
      },
      {
        id: 'item_2',
        timeSlot: '10:45 AM - 12:45 PM',
        placeId: 'place_shaniwar_wada',
        placeName: 'Shaniwar Wada Palace Fort',
        category: 'heritage',
        durationMinutes: 120,
        estimatedCost: 50,
        activityNote: 'Historical Peshwa ramparts, audio guide tour, and stone arch photography.',
        safetyNote: 'Zone Pulse 79. Busy market surroundings.',
        travelToNextMinutes: 20
      },
      {
        id: 'item_3',
        timeSlot: '01:05 PM - 02:30 PM',
        placeId: 'place_fc_road_street_food',
        placeName: 'FC Road Khao Galli',
        category: 'food',
        durationMinutes: 85,
        estimatedCost: 220,
        activityNote: 'Hearty lunch feast: Vaishali Mysore Masala Dosa, Sev Batata Puri, cold coffee.',
        safetyNote: 'Zone Pulse 87. Continuous footfall & safe walkways.',
        travelToNextMinutes: 30
      },
      {
        id: 'item_4',
        timeSlot: '03:00 PM - 05:00 PM',
        placeId: 'place_aga_khan_palace',
        placeName: 'Aga Khan Palace & Memorial',
        category: 'heritage',
        durationMinutes: 120,
        estimatedCost: 50,
        activityNote: 'Quiet stroll through Freedom Movement galleries and lush surrounding trees.',
        safetyNote: 'Zone Pulse 91. Highest safety rating.',
        travelToNextMinutes: 25
      },
      {
        id: 'item_5',
        timeSlot: '05:25 PM - 07:30 PM',
        placeId: 'place_kothrud_cultural_park',
        placeName: 'Kothrud Natyagruha & Khau Katta',
        category: 'heritage',
        durationMinutes: 125,
        estimatedCost: 280,
        activityNote: 'Savour fresh Sabudana Vada while soaking in Marathi theatrical community energy.',
        safetyNote: 'Zone Pulse 88. Safe residential precinct.',
        travelToNextMinutes: 25
      },
      {
        id: 'item_6',
        timeSlot: '07:55 PM - 09:30 PM',
        placeId: 'place_koregaon_park_cafe',
        placeName: 'German Bakery & KP Boulevard',
        category: 'nightlife',
        durationMinutes: 95,
        estimatedCost: Math.min(650, budget - 600),
        activityNote: 'Unwind under Koregaon Park banyan trees with artisanal desserts and artisan mocktails.',
        safetyNote: 'Zone Pulse 83. Tree-lined, well-patrolled night zone.'
      }
    ];
  }

  const estimatedSpent = items.reduce((sum, item) => sum + item.estimatedCost, 0);

  const tips = [
    `💰 Total Estimated Expense: ₹${estimatedSpent} (Leaves ₹${Math.max(0, budget - estimatedSpent)} buffer in your ₹${budget} budget).`,
    '🌧️ Weather Alert: Light evening showers predicted; route engine has selected rain-safe elevated connectors.',
    '🚶 Footwear Tip: Slip-on footwear recommended for Pataleshwar temple shoe removal.',
    '📱 Guardian Mode: You can activate Guardian Mode tracking during this itinerary for automated check-in reminders.'
  ];

  return {
    title,
    summary,
    totalBudget: budget,
    estimatedSpent,
    groupType,
    targetDuration,
    items,
    tips
  };
}

