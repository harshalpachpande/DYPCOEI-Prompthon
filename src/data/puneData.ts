import { 
  Place, 
  ZoneHexagon, 
  HeritageSite, 
  SafeHaven, 
  CitizenReport, 
  CityMood,
  SocialSignal
} from '../types/city';

// Helper to generate a hexagon polygon given a center and radius in degrees (~450m)
function generateHexagon(lat: number, lng: number, radius = 0.0055): [number, number][] {
  const points: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const angle_deg = 60 * i - 30;
    const angle_rad = (Math.PI / 180) * angle_deg;
    const pLat = lat + radius * Math.cos(angle_rad) * 0.85; // aspect ratio adjustment
    const pLng = lng + radius * Math.sin(angle_rad);
    points.push([pLat, pLng]);
  }
  return points;
}

export const PUNE_CENTER: [number, number] = [18.5204, 73.8567];

export const CITY_ZONES: ZoneHexagon[] = [
  {
    id: 'hex_fc_road',
    name: 'FC Road & Fergusson Campus',
    center: [18.5222, 73.8415],
    polygon: generateHexagon(18.5222, 73.8415),
    safetyScore: 88,
    cleanlinessScore: 82,
    affordabilityScore: 90,
    trafficIndex: 65,
    aqi: 72,
    waterloggingRisk: 22,
    lightingIndex: 94,
    nightSafetyScore: 86,
    pulseScore: 85,
    activeReportsCount: 2,
    accidentHotspotsCount: 1,
    elevationMeters: 565,
  },
  {
    id: 'hex_shaniwar_wada',
    name: 'Old City & Shaniwar Wada',
    center: [18.5195, 73.8553],
    polygon: generateHexagon(18.5195, 73.8553),
    safetyScore: 80,
    cleanlinessScore: 68,
    affordabilityScore: 92,
    trafficIndex: 78,
    aqi: 98,
    waterloggingRisk: 48,
    lightingIndex: 75,
    nightSafetyScore: 72,
    pulseScore: 77,
    activeReportsCount: 5,
    accidentHotspotsCount: 3,
    elevationMeters: 554,
  },
  {
    id: 'hex_jm_road',
    name: 'JM Road & Deccan Gymkhana',
    center: [18.5175, 73.8440],
    polygon: generateHexagon(18.5175, 73.8440),
    safetyScore: 85,
    cleanlinessScore: 84,
    affordabilityScore: 78,
    trafficIndex: 72,
    aqi: 80,
    waterloggingRisk: 65, // known monsoon waterlogging spot near riverbed
    lightingIndex: 92,
    nightSafetyScore: 83,
    pulseScore: 81,
    activeReportsCount: 4,
    accidentHotspotsCount: 2,
    elevationMeters: 551,
  },
  {
    id: 'hex_koregaon_park',
    name: 'Koregaon Park (North Main Rd)',
    center: [18.5362, 73.8940],
    polygon: generateHexagon(18.5362, 73.8940),
    safetyScore: 91,
    cleanlinessScore: 90,
    affordabilityScore: 52,
    trafficIndex: 45,
    aqi: 58,
    waterloggingRisk: 15,
    lightingIndex: 88,
    nightSafetyScore: 89,
    pulseScore: 86,
    activeReportsCount: 1,
    accidentHotspotsCount: 0,
    elevationMeters: 560,
  },
  {
    id: 'hex_swargate',
    name: 'Swargate Junction & Transit Hub',
    center: [18.5015, 73.8580],
    polygon: generateHexagon(18.5015, 73.8580),
    safetyScore: 64,
    cleanlinessScore: 56,
    affordabilityScore: 85,
    trafficIndex: 92, // heavy congestion
    aqi: 135,
    waterloggingRisk: 55,
    lightingIndex: 78,
    nightSafetyScore: 62,
    pulseScore: 63,
    activeReportsCount: 8,
    accidentHotspotsCount: 6,
    elevationMeters: 550,
  },
  {
    id: 'hex_kothrud',
    name: 'Kothrud & Paud Road',
    center: [18.5074, 73.8077],
    polygon: generateHexagon(18.5074, 73.8077),
    safetyScore: 89,
    cleanlinessScore: 85,
    affordabilityScore: 80,
    trafficIndex: 58,
    aqi: 64,
    waterloggingRisk: 25,
    lightingIndex: 86,
    nightSafetyScore: 84,
    pulseScore: 84,
    activeReportsCount: 2,
    accidentHotspotsCount: 1,
    elevationMeters: 575,
  },
  {
    id: 'hex_viman_nagar',
    name: 'Viman Nagar Tech Corridor',
    center: [18.5679, 73.9143],
    polygon: generateHexagon(18.5679, 73.9143),
    safetyScore: 93,
    cleanlinessScore: 88,
    affordabilityScore: 62,
    trafficIndex: 60,
    aqi: 66,
    waterloggingRisk: 18,
    lightingIndex: 95,
    nightSafetyScore: 90,
    pulseScore: 88,
    activeReportsCount: 2,
    accidentHotspotsCount: 1,
    elevationMeters: 570,
  },
  {
    id: 'hex_camp_mg_road',
    name: 'Pune Camp & MG Road Heritage',
    center: [18.5140, 73.8780],
    polygon: generateHexagon(18.5140, 73.8780),
    safetyScore: 82,
    cleanlinessScore: 76,
    affordabilityScore: 72,
    trafficIndex: 70,
    aqi: 88,
    waterloggingRisk: 30,
    lightingIndex: 85,
    nightSafetyScore: 79,
    pulseScore: 78,
    activeReportsCount: 3,
    accidentHotspotsCount: 2,
    elevationMeters: 560,
  },
  {
    id: 'hex_pashan',
    name: 'Pashan Eco Wetland & Lake',
    center: [18.5372, 73.7915],
    polygon: generateHexagon(18.5372, 73.7915),
    safetyScore: 92,
    cleanlinessScore: 94,
    affordabilityScore: 98,
    trafficIndex: 25,
    aqi: 42,
    waterloggingRisk: 10,
    lightingIndex: 78,
    nightSafetyScore: 82,
    pulseScore: 93,
    activeReportsCount: 0,
    accidentHotspotsCount: 0,
    elevationMeters: 572,
  },
  {
    id: 'hex_sinhagad',
    name: 'Sinhagad Mountain Fort Ridge',
    center: [18.3663, 73.7558],
    polygon: generateHexagon(18.3663, 73.7558, 0.009),
    safetyScore: 90,
    cleanlinessScore: 86,
    affordabilityScore: 94,
    trafficIndex: 30,
    aqi: 32,
    waterloggingRisk: 5,
    lightingIndex: 70,
    nightSafetyScore: 80,
    pulseScore: 91,
    activeReportsCount: 1,
    accidentHotspotsCount: 1,
    elevationMeters: 1312,
  }
];

export const PLACES_DATA: Place[] = [
  {
    id: 'place_fc_road_street_food',
    name: 'FC Road Khao Galli',
    nameMr: 'एफसी रोड खाऊ गल्ली',
    nameHi: 'एफसी रोड स्ट्रीट फ़ूड लेन',
    category: 'food',
    coordinates: [18.5230, 73.8420],
    h3ZoneId: 'hex_fc_road',
    address: 'Fergusson College Road, Shivajinagar, Pune',
    description: 'Iconic street food strip famed for SPDP (Sev Potato Dahi Puri), Vaishali Filter Coffee, Bun Maska, and steaming Pav Bhaji.',
    image: '/images/places/fc_road_chaat.jpg',
    priceLevel: 1,
    costEstimate: 180,
    openingHours: '08:00 AM - 11:30 PM',
    isOpenNow: true,
    rating: 4.7,
    reviewCount: 3410,
    realityRating: 4.5,
    isOverratedFlag: false,
    hygieneGrade: 'A',
    hygieneScore: 84,
    isHiddenGem: false,
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: false,
      brailleSignage: false,
      audioAssistance: false,
      accessibleRestrooms: true,
      score: 75
    },
    pulseScore: {
      overall: 87,
      safety: 89,
      cleanliness: 82,
      affordability: 96,
      ratingsScore: 92,
      realityAdjustedRating: 4.5,
      originalRating: 4.7,
      accessibility: 75,
      crowdComfort: 76,
      whyExplanation: {
        summary: 'Exceptional affordability and bustling, well-patrolled night student crowds keep safety strong despite peak-hour rush.',
        positiveFactors: ['High student footfall until late midnight', 'Active CCTV coverage', 'Fresh high-turnover food preparation', 'Wheelchair navigable pavement'],
        riskFactors: ['Two-wheeler parking spillover during 7-9 PM peak', 'Crowd density high on weekends'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Street Food', 'Budget', 'Student Favorite', 'Vegetarian', 'Open Late'],
    bestTime: '5:00 PM - 9:00 PM'
  ,
    ambientNoiseDb: 74,
    crowdLevelNow: 'Peak',
    treeCanopyPct: 48,
    aiHygieneAudit: {
      oilFreshness: 'Pure Groundnut Oil (TPM 14% - Tested Daily)',
      utensilCleanliness: 'Eco-friendly Areca nut leaf plates & SS cutlery',
      sanitizationAudit: '91/100 · FSSAI Street Food Hub Certified',
      pestFree: true
    }
  },
  {
    id: 'place_shaniwar_wada',
    name: 'Shaniwar Wada Palace Fort',
    nameMr: 'शनिवार वाडा',
    nameHi: 'शनिवार वाड़ा',
    category: 'heritage',
    coordinates: [18.5195, 73.8553],
    h3ZoneId: 'hex_shaniwar_wada',
    address: 'Shaniwar Peth, Old Pune',
    description: 'Historical 18th-century fortification seat of the Maratha Empire Peshwas, built in 1732. Majestic Dilli Darwaza, lotus fountain, and garden ramparts.',
    image: '/images/places/shaniwar_wada.jpg',
    historicalImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    priceLevel: 1,
    costEstimate: 50,
    openingHours: '09:00 AM - 06:30 PM (Light & Sound 07:15 PM)',
    isOpenNow: true,
    rating: 4.3,
    reviewCount: 8920,
    realityRating: 4.1,
    isOverratedFlag: false,
    hygieneGrade: 'B',
    hygieneScore: 70,
    isHiddenGem: false,
    accessibility: {
      wheelchairAccessible: false,
      rampAvailable: true,
      elevatorAvailable: false,
      brailleSignage: true,
      audioAssistance: true,
      accessibleRestrooms: true,
      score: 55
    },
    pulseScore: {
      overall: 79,
      safety: 82,
      cleanliness: 70,
      affordability: 98,
      ratingsScore: 82,
      realityAdjustedRating: 4.1,
      originalRating: 4.3,
      accessibility: 55,
      crowdComfort: 70,
      whyExplanation: {
        summary: 'Priceless Maratha heritage site with nominal entry fee, though steep cobblestones limit full wheelchair access.',
        positiveFactors: ['Archaeological Survey of India security', 'Rich multilingual interpretive boards', 'Affordable ticket ₹25 (Indian nationals)'],
        riskFactors: ['High afternoon heat on stone courtyards', 'Surrounding Kasba Peth traffic chokepoint'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Heritage', 'Monument', 'Maratha Empire', 'Architecture', 'Audio Guides'],
    bestTime: '9:30 AM - 11:30 AM & 5:00 PM'
  ,
    ambientNoiseDb: 58,
    crowdLevelNow: 'Moderate',
    treeCanopyPct: 44,
    aiHygieneAudit: {
      oilFreshness: 'Canteen Grade: Cold-pressed Sunflower (TPM 12%)',
      utensilCleanliness: 'UV-sterilized RO Potable water kiosks',
      sanitizationAudit: '94/100 · ASI Heritage Sanitation Protocol',
      pestFree: true
    }
  },
  {
    id: 'place_pataleshwar_caves',
    name: 'Pataleshwar Cave Temple',
    nameMr: 'पाताळेश्वर लेणी',
    nameHi: 'पातालेश्वर गुफा मंदिर',
    category: 'heritage',
    coordinates: [18.5273, 73.8496],
    h3ZoneId: 'hex_jm_road',
    address: 'JM Road, Shivajinagar, Pune',
    description: 'An 8th-century Rashtrakuta-era monolithic rock-cut cave temple dedicated to Lord Shiva, carved from a single massive basalt rock.',
    image: '/images/places/pataleshwar_caves.jpg',
    historicalImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    priceLevel: 1,
    costEstimate: 0,
    openingHours: '08:30 AM - 05:30 PM',
    isOpenNow: true,
    rating: 4.5,
    reviewCount: 2310,
    realityRating: 4.8,
    isOverratedFlag: false,
    hygieneGrade: 'A+',
    hygieneScore: 92,
    isHiddenGem: true,
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: false,
      brailleSignage: false,
      audioAssistance: false,
      accessibleRestrooms: false,
      score: 68
    },
    pulseScore: {
      overall: 89,
      safety: 90,
      cleanliness: 91,
      affordability: 100,
      ratingsScore: 94,
      realityAdjustedRating: 4.8,
      originalRating: 4.5,
      accessibility: 68,
      crowdComfort: 92,
      whyExplanation: {
        summary: 'Hidden Gem! Serene subterranean oasis with free entry, shaded basalt canopy, and peaceful crowd density right in the city core.',
        positiveFactors: ['Zero entry fee', 'Surprising tranquility amidst bustling JM Road', 'Ancient monolithic architecture in great preservation'],
        riskFactors: ['Low indoor natural lighting inside sanctum', 'Uneven rock floor at sanctum entrance'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Hidden Gem', 'Ancient Rock-cut', 'Shiva Temple', 'Free Entry', 'Quiet Zone'],
    bestTime: '8:30 AM - 10:30 AM'
  ,
    ambientNoiseDb: 44,
    crowdLevelNow: 'Low',
    treeCanopyPct: 68,
    aiHygieneAudit: {
      oilFreshness: 'Zero Oil (Sacred Archeological Reserve)',
      utensilCleanliness: 'Copper vessel clean drinking water',
      sanitizationAudit: '96/100 · Zero Plastic & Clean Basalt Zone',
      pestFree: true
    }
  },
  {
    id: 'place_koregaon_park_cafe',
    name: 'German Bakery & KP Boulevard',
    nameMr: 'जर्मन बेकरी, कोरेगाव पार्क',
    nameHi: 'जर्मन बेकरी, कोरेगांव पार्क',
    category: 'nightlife',
    coordinates: [18.5365, 73.8935],
    h3ZoneId: 'hex_koregaon_park',
    address: 'North Main Road, Koregaon Park, Pune',
    description: 'Iconic bakery café landmark known for artisanal quiches, red velvet cake, organic teas, and cosmopolitan tree-lined boulevard vibe.',
    image: '/images/places/koregaon_park_cafe.jpg',
    priceLevel: 3,
    costEstimate: 850,
    openingHours: '08:00 AM - 11:45 PM',
    isOpenNow: true,
    rating: 4.4,
    reviewCount: 6100,
    realityRating: 4.1,
    isOverratedFlag: true,
    hygieneGrade: 'A',
    hygieneScore: 88,
    isHiddenGem: false,
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: true,
      brailleSignage: false,
      audioAssistance: false,
      accessibleRestrooms: true,
      score: 82
    },
    pulseScore: {
      overall: 83,
      safety: 93,
      cleanliness: 90,
      affordability: 58,
      ratingsScore: 84,
      realityAdjustedRating: 4.1,
      originalRating: 4.4,
      accessibility: 82,
      crowdComfort: 81,
      whyExplanation: {
        summary: 'Excellent security and leafy ambiance, but flagged with Reality vs Rating caveat: premium pricing for modest portions.',
        positiveFactors: ['Premium private security patrols', 'Pristine hygiene protocols', 'Excellent wheelchair ramps and wide aisles'],
        riskFactors: ['High pricing relative to portion quantity', 'Weekend wait time exceeds 25 mins'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Artisanal Cafe', 'Bakery', 'Nightlife', 'Pet Friendly', 'Wi-Fi'],
    bestTime: '4:00 PM - 7:30 PM'
  ,
    ambientNoiseDb: 61,
    crowdLevelNow: 'Moderate',
    treeCanopyPct: 72,
    aiHygieneAudit: {
      oilFreshness: 'Cold-Pressed Olive & Butter (TPM < 10%)',
      utensilCleanliness: 'Commercial Dishwasher 82°C High-Temp Sanitized',
      sanitizationAudit: '95/100 · PMC A+ Grade Health Verification',
      pestFree: true
    }
  },
  {
    id: 'place_aga_khan_palace',
    name: 'Aga Khan Palace & Memorial',
    nameMr: 'आगाखान पॅलेस',
    nameHi: 'आगा खान पैलेस',
    category: 'heritage',
    coordinates: [18.5523, 73.9015],
    h3ZoneId: 'hex_viman_nagar',
    address: 'Pune-Nagar Road, Kalyani Nagar / Yerawada, Pune',
    description: 'Built in 1892 by Sultan Muhammed Shah Aga Khan III. Served as prison for Mahatma Gandhi and Kasturba Gandhi during Quit India Movement.',
    image: '/images/places/aga_khan_palace.jpg',
    historicalImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    priceLevel: 1,
    costEstimate: 50,
    openingHours: '09:00 AM - 05:30 PM',
    isOpenNow: true,
    rating: 4.6,
    reviewCount: 7850,
    realityRating: 4.7,
    isOverratedFlag: false,
    hygieneGrade: 'A+',
    hygieneScore: 95,
    isHiddenGem: false,
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: false,
      brailleSignage: true,
      audioAssistance: true,
      accessibleRestrooms: true,
      score: 88
    },
    pulseScore: {
      overall: 91,
      safety: 94,
      cleanliness: 93,
      affordability: 95,
      ratingsScore: 92,
      realityAdjustedRating: 4.7,
      originalRating: 4.6,
      accessibility: 88,
      crowdComfort: 86,
      whyExplanation: {
        summary: 'Top Pulse Score! Expansive manicured lawns, profound historical gravity, pristine maintenance and high security make it a city crown jewel.',
        positiveFactors: ['Manicured Italian arches & gardens', 'Strict monument security & low noise', 'Wheelchair accessible ramps across ground floor'],
        riskFactors: ['Busy highway crossing outside outer gate'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['National Heritage', 'Gandhi Memorial', 'Architecture', 'Gardens', 'Audio Guide'],
    bestTime: '9:30 AM - 1:00 PM'
  ,
    ambientNoiseDb: 48,
    crowdLevelNow: 'Low',
    treeCanopyPct: 76,
    aiHygieneAudit: {
      oilFreshness: 'Memorial Garden Canteen (TPM 11%)',
      utensilCleanliness: 'RO UV Water System & Daily Disinfection',
      sanitizationAudit: '97/100 · Gandhi National Memorial Trust Standard',
      pestFree: true
    }
  },
  {
    id: 'place_swargate_misal',
    name: 'Katraj Ghat Sweets & Swargate Misal',
    nameMr: 'कात्रज स्वीट्स आणि मिसळ',
    nameHi: 'कात्रज स्वीट्स और मिसल',
    category: 'food',
    coordinates: [18.5020, 73.8575],
    h3ZoneId: 'hex_swargate',
    address: 'Near Swargate ST Stand, Pune',
    description: 'Fiery Puneri spicy Kolhapuri rassa misal with farsan, onions, and fresh pavs. Packed with interstate travelers.',
    image: '/images/places/swargate_misal.jpg',
    priceLevel: 1,
    costEstimate: 120,
    openingHours: '06:30 AM - 10:00 PM',
    isOpenNow: true,
    rating: 4.2,
    reviewCount: 1980,
    realityRating: 3.5,
    isOverratedFlag: true,
    hygieneGrade: 'C',
    hygieneScore: 54,
    isHiddenGem: false,
    accessibility: {
      wheelchairAccessible: false,
      rampAvailable: false,
      elevatorAvailable: false,
      brailleSignage: false,
      audioAssistance: false,
      accessibleRestrooms: false,
      score: 30
    },
    pulseScore: {
      overall: 58,
      safety: 64,
      cleanliness: 52,
      affordability: 96,
      ratingsScore: 68,
      realityAdjustedRating: 3.5,
      originalRating: 4.2,
      accessibility: 30,
      crowdComfort: 48,
      whyExplanation: {
        summary: 'Flagged with Reality vs Rating warning. While taste is authentic, recent citizen hygiene reports and high bus diesel fumes suppress its Pulse score.',
        positiveFactors: ['Extremely economical ₹120 meal', 'Fast turnaround during morning commute'],
        riskFactors: ['Swargate bus exhaust & particulate pollution', 'Sub-optimal washroom cleanliness reported', 'No ramp access'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Spicy Misal', 'Budget', 'Transit Stop', 'Local Flavor'],
    bestTime: '7:00 AM - 10:00 AM'
  ,
    ambientNoiseDb: 76,
    crowdLevelNow: 'Peak',
    treeCanopyPct: 22,
    aiHygieneAudit: {
      oilFreshness: 'Fresh Kolhapuri Mustard & Sunflower (TPM 15%)',
      utensilCleanliness: 'Boiling water brass pot cleansing',
      sanitizationAudit: '89/100 · High Turnover Daily PMC Hygiene Check',
      pestFree: true
    }
  },
  {
    id: 'place_kothrud_cultural_park',
    name: 'Kothrud Yashwantrao Chavan Natyagruha & Khau Katta',
    nameMr: 'यशवंतराव चव्हाण नाट्यगृह',
    nameHi: 'यशवंतराव चव्हाण नाट्यगृह',
    category: 'heritage',
    coordinates: [18.5065, 73.8060],
    h3ZoneId: 'hex_kothrud',
    address: 'Near Karve Statue, Kothrud, Pune',
    description: 'The epicentre of Marathi theatre and cultural performances, surrounded by clean evening snacking kiosks serving Sabudana Vada and Thalipeeth.',
    image: '/images/places/kothrud_cultural.jpg',
    priceLevel: 2,
    costEstimate: 300,
    openingHours: '10:00 AM - 10:30 PM',
    isOpenNow: true,
    rating: 4.6,
    reviewCount: 3200,
    realityRating: 4.6,
    isOverratedFlag: false,
    hygieneGrade: 'A',
    hygieneScore: 89,
    isHiddenGem: true,
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: true,
      brailleSignage: true,
      audioAssistance: true,
      accessibleRestrooms: true,
      score: 92
    },
    pulseScore: {
      overall: 88,
      safety: 91,
      cleanliness: 87,
      affordability: 82,
      ratingsScore: 90,
      realityAdjustedRating: 4.6,
      originalRating: 4.6,
      accessibility: 92,
      crowdComfort: 85,
      whyExplanation: {
        summary: 'Exceptional Marathi cultural venue with top-tier accessibility ramps, respectful crowd behavior, and well-lit residential surroundings.',
        positiveFactors: ['Full wheelchair ramps and hearing-loop equipped auditorium', 'High civic cleanliness rating', 'Family-friendly atmosphere'],
        riskFactors: ['Show checkout traffic at 9:30 PM on Karve Road'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Marathi Drama', 'Culture', 'Accessible', 'Traditional Snacks', 'Family'],
    bestTime: '4:30 PM - 9:00 PM'
  ,
    ambientNoiseDb: 58,
    crowdLevelNow: 'Moderate',
    treeCanopyPct: 58,
    aiHygieneAudit: {
      oilFreshness: 'Cottonseed & Sunflower blend (TPM 13%)',
      utensilCleanliness: 'Stainless Steel 304 food-grade sanitization',
      sanitizationAudit: '93/100 · Municipal Theater Hygiene Compliance',
      pestFree: true
    }
  },
  {
    id: 'place_mg_road_dorabjee',
    name: 'Dorabjee & Sons 1878 Parsi Heritage Dining',
    nameMr: 'दोराबजी अँड सन्स (१८७८)',
    nameHi: 'दोराबजी एंड संस (१८७८)',
    category: 'food',
    coordinates: [18.5148, 73.8775],
    h3ZoneId: 'hex_camp_mg_road',
    address: 'Dastur Meher Road, Camp, Pune',
    description: 'Pune’s oldest authentic Parsi establishment established in 1878. Famed for slow-cooked Dhansak, Mutton Biryani, and Caramel Custard.',
    image: '/images/places/dorabjee.jpg',
    historicalImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    priceLevel: 2,
    costEstimate: 450,
    openingHours: '09:30 AM - 10:30 PM',
    isOpenNow: true,
    rating: 4.5,
    reviewCount: 4210,
    realityRating: 4.5,
    isOverratedFlag: false,
    hygieneGrade: 'A+',
    hygieneScore: 92,
    isHiddenGem: false,
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: false,
      brailleSignage: false,
      audioAssistance: false,
      accessibleRestrooms: true,
      score: 72
    },
    pulseScore: {
      overall: 85,
      safety: 85,
      cleanliness: 88,
      affordability: 82,
      ratingsScore: 89,
      realityAdjustedRating: 4.5,
      originalRating: 4.5,
      accessibility: 72,
      crowdComfort: 80,
      whyExplanation: {
        summary: '145-year culinary institution maintaining high kitchen cleanliness and timeless Parsi hospitality.',
        positiveFactors: ['Consistent culinary authenticity since 1878', 'Clean open kitchen protocol', 'Heritage photographs on display'],
        riskFactors: ['Narrow historic Camp bylanes require caution when walking at peak evening'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Parsi Heritage', 'Culinary History', 'Dhansak', 'Camp Landmark'],
    bestTime: '12:30 PM - 3:00 PM & 7:30 PM'
  ,
    ambientNoiseDb: 62,
    crowdLevelNow: 'Moderate',
    treeCanopyPct: 55,
    aiHygieneAudit: {
      oilFreshness: 'Pure Ghee & Cold-Pressed Groundnut (TPM 9%)',
      utensilCleanliness: 'Heritage Brass & SS Cleansed in 75°C Rinse',
      sanitizationAudit: '96/100 · 146-Year Legacy Zero Contamination Record',
      pestFree: true
    }
  },
  {
    id: 'place_sinhagad_fort',
    name: 'Sinhagad Fort & Tanaji Malusare Memorial',
    nameMr: 'सिंहगड किल्ला',
    nameHi: 'सिंहगढ़ दुर्ग',
    category: 'heritage',
    coordinates: [18.3663, 73.7558],
    h3ZoneId: 'hex_sinhagad',
    address: 'Sinhagad Ghat Road, Thoptewadi, Pune',
    description: 'Iconic 2000-year-old Sahyadri mountain fort at 1312m elevation. Site of the legendary 1670 Battle of Sinhagad led by Subhedar Tanaji Malusare. Renowned for steaming Pithla Bhakri, Thecha, and Matka Dahi.',
    image: '/images/places/sinhagad_fort.jpg',
    historicalImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    priceLevel: 1,
    costEstimate: 90,
    openingHours: '05:00 AM - 07:00 PM',
    isOpenNow: true,
    rating: 4.6,
    reviewCount: 11400,
    realityRating: 4.8,
    isOverratedFlag: false,
    hygieneGrade: 'A',
    hygieneScore: 86,
    isHiddenGem: false,
    accessibility: {
      wheelchairAccessible: false,
      rampAvailable: false,
      elevatorAvailable: false,
      brailleSignage: false,
      audioAssistance: false,
      accessibleRestrooms: true,
      score: 35
    },
    pulseScore: {
      overall: 92,
      safety: 89,
      cleanliness: 88,
      affordability: 96,
      ratingsScore: 94,
      realityAdjustedRating: 4.8,
      originalRating: 4.6,
      accessibility: 35,
      crowdComfort: 85,
      whyExplanation: {
        summary: 'Exceptional Sahyadri mountain air quality (AQI 32), historic Maratha gravity, and authentic village cuisine compensate for steep hiking cobblestones.',
        positiveFactors: ['Clean mountain micro-climate with zero smog', 'Authentic rustic Pithla Bhakri prepared on woodfire', 'Breathtaking 360-degree Sahyadri valley panorama'],
        riskFactors: ['Steep rocky slopes; not wheelchair accessible', 'Monsoon fog causes slippery cliff edges'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Hill Fort', 'Maratha Empire', 'Trekking', 'Pithla Bhakri', 'Panoramas'],
    bestTime: '06:00 AM - 09:30 AM & 04:30 PM'
  ,
    ambientNoiseDb: 38,
    crowdLevelNow: 'Moderate',
    treeCanopyPct: 88,
    aiHygieneAudit: {
      oilFreshness: 'Wood-pressed Groundnut Oil (Thecha & Pithla, TPM 11%)',
      utensilCleanliness: 'Earthen Matka & Clay Chulha Organic Cooking',
      sanitizationAudit: '92/100 · Sahyadri Eco-Tourism Health Protocol',
      pestFree: true
    }
  },
  {
    id: 'place_vaishali',
    name: 'Vaishali Restaurant & Filter Coffee',
    nameMr: 'वैशाली रेस्टॉरंट, एफसी रोड',
    nameHi: 'वैशाली रेस्टोरेंट, एफसी रोड',
    category: 'food',
    coordinates: [18.5228, 73.8428],
    h3ZoneId: 'hex_fc_road',
    address: 'FC Road, Shivajinagar, Pune',
    description: 'Pune’s most legendary South Indian culinary institution since 1971. Celebrated for crispy Mysore Masala Dosa, Sev Potato Dahi Puri (SPDP), steaming frothy Filter Coffee, and iconic tree-shaded back garden courtyard.',
    image: '/images/places/vaishali.jpg',
    priceLevel: 2,
    costEstimate: 240,
    openingHours: '07:00 AM - 11:00 PM',
    isOpenNow: true,
    rating: 4.7,
    reviewCount: 16800,
    realityRating: 4.7,
    isOverratedFlag: false,
    hygieneGrade: 'A+',
    hygieneScore: 94,
    isHiddenGem: false,
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: false,
      brailleSignage: false,
      audioAssistance: false,
      accessibleRestrooms: true,
      score: 80
    },
    pulseScore: {
      overall: 90,
      safety: 92,
      cleanliness: 93,
      affordability: 84,
      ratingsScore: 94,
      realityAdjustedRating: 4.7,
      originalRating: 4.7,
      accessibility: 80,
      crowdComfort: 76,
      whyExplanation: {
        summary: 'Gold standard Pune cultural landmark. High kitchen hygiene and constant vibrant footfall ensure safety and consistency despite weekend queues.',
        positiveFactors: ['Impeccable stainless steel kitchen sanitation', 'Consistent filter coffee quality for 50+ years', 'Safe, well-lit student boulevard'],
        riskFactors: ['Peak wait times can reach 20 minutes between 8-10 AM on Sundays'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Legendary Dining', 'Filter Coffee', 'Mysore Dosa', 'Garden Courtyard', 'FC Road Anchor'],
    bestTime: '07:30 AM - 10:00 AM & 04:30 PM'
  ,
    ambientNoiseDb: 66,
    crowdLevelNow: 'Peak',
    treeCanopyPct: 52,
    aiHygieneAudit: {
      oilFreshness: 'Pure Cow Ghee & Sesame/Sunflower (TPM 8%)',
      utensilCleanliness: 'Automated Hobart 85°C Sanitizing Dishwasher',
      sanitizationAudit: '98/100 · 5-Star Commercial Kitchen Audit',
      pestFree: true
    }
  },
  {
    id: 'place_vohuman_cafe',
    name: 'Vohuman Cafe (1978 Irani Breakfast)',
    nameMr: 'वोहुमन कॅफे',
    nameHi: 'वोहुमन कैफे',
    category: 'food',
    coordinates: [18.5285, 73.8742],
    h3ZoneId: 'hex_camp_mg_road',
    address: 'Millennium Star, Near Pune Railway Station',
    description: 'Beloved Irani breakfast landmark founded in 1978. Renowned for double Cheese Butter Omelette, thick toasted Bun Maska dipped in sweet Irani Chai, and warm nostalgic hospitality.',
    image: '/images/places/vohuman_cafe.jpg',
    priceLevel: 1,
    costEstimate: 140,
    openingHours: '06:00 AM - 07:00 PM',
    isOpenNow: true,
    rating: 4.5,
    reviewCount: 9400,
    realityRating: 4.7,
    isOverratedFlag: false,
    hygieneGrade: 'A',
    hygieneScore: 88,
    isHiddenGem: false,
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: false,
      brailleSignage: false,
      audioAssistance: false,
      accessibleRestrooms: true,
      score: 75
    },
    pulseScore: {
      overall: 88,
      safety: 88,
      cleanliness: 87,
      affordability: 96,
      ratingsScore: 92,
      realityAdjustedRating: 4.7,
      originalRating: 4.5,
      accessibility: 75,
      crowdComfort: 82,
      whyExplanation: {
        summary: 'Exceptional morning budget institution with verified high turnaround cleanliness and friendly Irani cafe ambiance.',
        positiveFactors: ['Fast, freshly prepared breakfast', 'Extremely economical ₹140 meal', 'Wheelchair accessible entrance ramp'],
        riskFactors: ['Morning rush hour table sharing during 7:30-9:30 AM'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Irani Cafe', 'Cheese Omelette', 'Bun Maska', 'Breakfast Legend', 'Open 6 AM'],
    bestTime: '06:30 AM - 09:30 AM'
  ,
    ambientNoiseDb: 64,
    crowdLevelNow: 'Moderate',
    treeCanopyPct: 35,
    aiHygieneAudit: {
      oilFreshness: 'Amul Butter & Dairy Fresh Eggs Only (Zero Rancidity)',
      utensilCleanliness: 'Twin Sink High-Temperature Water Sterilizer',
      sanitizationAudit: '94/100 · PMC Irani Heritage Food Safety Certified',
      pestFree: true
    }
  },
  {
    id: 'place_pashan_lake',
    name: 'Pashan Lake & Bird Eco-Sanctuary',
    nameMr: 'पाषाण तलाव आणि पक्षी अभयारण्य',
    nameHi: 'पाषाण झील एवं पक्षी अभयारण्य',
    category: 'nature',
    coordinates: [18.5372, 73.7915],
    h3ZoneId: 'hex_pashan',
    address: 'Pashan, Pune',
    description: 'Pristine British-era water catchment reservoir and ecological wetland sanctuary. Haven for over 90 migratory bird species including openbill storks, purple moorhens, and grey herons. 3km peaceful walking trail.',
    image: '/images/places/pashan_lake.jpg',
    priceLevel: 1,
    costEstimate: 0,
    openingHours: '06:00 AM - 06:30 PM',
    isOpenNow: true,
    rating: 4.4,
    reviewCount: 3800,
    realityRating: 4.8,
    isOverratedFlag: false,
    hygieneGrade: 'A+',
    hygieneScore: 96,
    isHiddenGem: true,
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: false,
      brailleSignage: true,
      audioAssistance: false,
      accessibleRestrooms: true,
      score: 82
    },
    pulseScore: {
      overall: 94,
      safety: 92,
      cleanliness: 95,
      affordability: 100,
      ratingsScore: 96,
      realityAdjustedRating: 4.8,
      originalRating: 4.4,
      accessibility: 82,
      crowdComfort: 96,
      whyExplanation: {
        summary: 'Top Eco Layer Champion! Pure acoustic tranquility (42 dB), zero entry fee, pristine AQI (42), and rich birdwatching make it a soothing natural sanctuary.',
        positiveFactors: ['Superb acoustic serenity: 42 dB ambient noise', 'Clean unpolluted wetlands and sunset trails', 'Free admission for all citizens'],
        riskFactors: ['Unlit peripheral dirt tracks after sunset'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Eco Sanctuary', 'Hidden Gem', 'Bird Watching', 'Quiet Zone (42dB)', 'Free Entry', 'Nature Walk'],
    bestTime: '06:00 AM - 08:30 AM & 05:00 PM'
  ,
    ambientNoiseDb: 34,
    crowdLevelNow: 'Low',
    treeCanopyPct: 84,
    aiHygieneAudit: {
      oilFreshness: 'Zero Oil (Wetland Ecological Sanctuary)',
      utensilCleanliness: 'Zero Waste Zone · No Single-Use Plastics Permitted',
      sanitizationAudit: '99/100 · Central Pollution Control Board Eco Rating',
      pestFree: true
    }
  },
  {
    id: 'place_osho_teerth_park',
    name: 'Osho Teerth Park & Zen Bamboo Groves',
    nameMr: 'ओशो तीर्थ उद्यान',
    nameHi: 'ओशो तीर्थ पार्क एवं जेन गार्डन',
    category: 'nature',
    coordinates: [18.5395, 73.8962],
    h3ZoneId: 'hex_koregaon_park',
    address: 'Lane 2, Koregaon Park, Pune',
    description: 'An ecological marvel: a 12-acre Japanese-style Zen garden transformed from a former polluted wastewater nullah into a verdant oasis of black swans, stone footbridges, bubbling cascades, and whispering bamboo forests.',
    image: '/images/places/osho_teerth.jpg',
    priceLevel: 1,
    costEstimate: 50,
    openingHours: '06:00 AM - 09:00 AM & 03:00 PM - 06:00 PM',
    isOpenNow: true,
    rating: 4.6,
    reviewCount: 4100,
    realityRating: 4.8,
    isOverratedFlag: false,
    hygieneGrade: 'A+',
    hygieneScore: 98,
    isHiddenGem: true,
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: false,
      brailleSignage: false,
      audioAssistance: false,
      accessibleRestrooms: true,
      score: 85
    },
    pulseScore: {
      overall: 93,
      safety: 95,
      cleanliness: 98,
      affordability: 96,
      ratingsScore: 96,
      realityAdjustedRating: 4.8,
      originalRating: 4.6,
      accessibility: 85,
      crowdComfort: 94,
      whyExplanation: {
        summary: 'Exceptional eco-restoration triumph. Strict silence rules, pristine running streams, and dense Japanese bamboo canopy deliver a meditative sanctuary.',
        positiveFactors: ['98% Environmental cleanliness score', 'Strict quiet protocol preserves meditative calm', 'Tree canopy provides 95% thermal solar shielding'],
        riskFactors: ['Closed during midday hours (9 AM - 3 PM)'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Zen Garden', 'Hidden Gem', 'Bamboo Forest', 'Eco Restoration', 'Meditation Oasis'],
    bestTime: '06:30 AM - 08:30 AM'
  ,
    ambientNoiseDb: 36,
    crowdLevelNow: 'Low',
    treeCanopyPct: 92,
    aiHygieneAudit: {
      oilFreshness: 'Zero Oil (Zen Ecological Meditation Park)',
      utensilCleanliness: 'Recycled Bio-Filtered Stream Water for Flora',
      sanitizationAudit: '98/100 · Eco-Conservation Botanical Index',
      pestFree: true
    }
  },
  {
    id: 'place_goodluck_cafe',
    name: 'Cafe Goodluck 1935',
    nameMr: 'कॅफे गुडगलक',
    nameHi: 'कैफे गुडलक',
    category: 'food',
    coordinates: [18.5186, 73.8418],
    h3ZoneId: 'hex_fc_road',
    address: 'Goodluck Chowk, FC Road, Pune',
    description: 'Operating since 1935 at Goodluck Chowk, this iconic heritage Irani cafe has hosted generations of writers, actors, and students. World-famous for crusty Bun Maska, sweet Irani Chai, Kheema Pav, and Caramel Custard.',
    image: '/images/places/goodluck_cafe.jpg',
    priceLevel: 1,
    costEstimate: 160,
    openingHours: '07:30 AM - 11:30 PM',
    isOpenNow: true,
    rating: 4.5,
    reviewCount: 14200,
    realityRating: 4.4,
    isOverratedFlag: false,
    hygieneGrade: 'A',
    hygieneScore: 85,
    isHiddenGem: false,
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: false,
      brailleSignage: false,
      audioAssistance: false,
      accessibleRestrooms: true,
      score: 74
    },
    pulseScore: {
      overall: 86,
      safety: 89,
      cleanliness: 84,
      affordability: 94,
      ratingsScore: 88,
      realityAdjustedRating: 4.4,
      originalRating: 4.5,
      accessibility: 74,
      crowdComfort: 76,
      whyExplanation: {
        summary: '90-year culinary cornerstone at the crossroads of Deccan Gymkhana. High nighttime student presence ensures safety until midnight.',
        positiveFactors: ['Timeless heritage Irani recipes', 'Well-patrolled Goodluck Chowk location', 'Economical pricing'],
        riskFactors: ['Busy traffic junction outside front doors during evening hours'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Heritage Cafe (1935)', 'Bun Maska', 'Irani Chai', 'Goodluck Chowk', 'Cultural Anchor'],
    bestTime: '08:00 AM - 10:30 AM & 09:30 PM'
  ,
    ambientNoiseDb: 68,
    crowdLevelNow: 'Moderate',
    treeCanopyPct: 46,
    aiHygieneAudit: {
      oilFreshness: 'Pure Dairy Butter & Refined Sunflower (TPM 12%)',
      utensilCleanliness: 'Continuous Boiled Water Glassware & Cutlery Rinse',
      sanitizationAudit: '95/100 · Heritage Food Safety Standard',
      pestFree: true
    }
  },
  {
    id: 'place_kelkar_museum',
    name: 'Raja Dinkar Kelkar Museum & Mastani Mahal',
    nameMr: 'राजा दिनकर केळकर वस्तुसंग्रहालय',
    nameHi: 'राजा दिनकर केलकर संग्रहालय',
    category: 'heritage',
    coordinates: [18.5108, 73.8540],
    h3ZoneId: 'hex_shaniwar_wada',
    address: 'Kamal Kunj, Bajirao Road, Shukrawar Peth, Pune',
    description: 'Remarkable 3-storey heritage museum housing Dr. D.G. Kelkar’s personal collection of 20,000+ Indian antiquities from the 14th-19th centuries, including the recreated Mastani Mahal, royal hookahs, temple wooden chariots, and ancient sitars.',
    image: '/images/places/kelkar_museum.jpg',
    historicalImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    priceLevel: 1,
    costEstimate: 100,
    openingHours: '10:00 AM - 05:30 PM',
    isOpenNow: true,
    rating: 4.6,
    reviewCount: 5200,
    realityRating: 4.7,
    isOverratedFlag: false,
    hygieneGrade: 'A+',
    hygieneScore: 92,
    isHiddenGem: true,
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: true,
      brailleSignage: true,
      audioAssistance: true,
      accessibleRestrooms: true,
      score: 88
    },
    pulseScore: {
      overall: 90,
      safety: 90,
      cleanliness: 92,
      affordability: 92,
      ratingsScore: 93,
      realityAdjustedRating: 4.7,
      originalRating: 4.6,
      accessibility: 88,
      crowdComfort: 88,
      whyExplanation: {
        summary: 'Hidden Gem! Priceless Maratha and Peshwa decorative arts collection with elevator ramps and audio tour support.',
        positiveFactors: ['Magnificent Mastani Mahal reconstruction', 'Elevator access across all three museum galleries', 'Well-preserved temperature controlled artifact halls'],
        riskFactors: ['Busy Bajirao Road parking constraints'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Museum', 'Hidden Gem', 'Mastani Mahal', 'Peshwa Antiquities', 'Accessible (Elevator)'],
    bestTime: '10:30 AM - 01:00 PM'
  ,
    ambientNoiseDb: 50,
    crowdLevelNow: 'Low',
    treeCanopyPct: 38,
    aiHygieneAudit: {
      oilFreshness: 'N/A (Climate-Controlled Antiquities Archive)',
      utensilCleanliness: 'Microclimate Air Scrubbers & Dust Filtration',
      sanitizationAudit: '97/100 · Maharashtra Archeology Dept Standard',
      pestFree: true
    }
  },
  {
    id: 'place_doolally_kp',
    name: 'Doolally Taproom Koregaon Park',
    nameMr: 'डुलाली टॅपक्रम, कोरेगाव पार्क',
    nameHi: 'डूलाली टैपरूम, कोरेगांव पार्क',
    category: 'nightlife',
    coordinates: [18.5380, 73.8990],
    h3ZoneId: 'hex_koregaon_park',
    address: 'Near ABC Farms, Koregaon Park, Pune',
    description: 'India’s pioneering craft microbrewery founded right here in Pune. Celebrated for freshly brewed Belgian Witbier, Apple Cider, Mango Cider, gourmet pub fare, board games, and 100% pet-friendly community atmosphere.',
    image: '/images/places/doolally.jpg',
    priceLevel: 3,
    costEstimate: 850,
    openingHours: '11:00 AM - 01:00 AM',
    isOpenNow: true,
    rating: 4.6,
    reviewCount: 7100,
    realityRating: 4.6,
    isOverratedFlag: false,
    hygieneGrade: 'A+',
    hygieneScore: 95,
    isHiddenGem: false,
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: true,
      brailleSignage: false,
      audioAssistance: false,
      accessibleRestrooms: true,
      score: 84
    },
    pulseScore: {
      overall: 87,
      safety: 93,
      cleanliness: 94,
      affordability: 60,
      ratingsScore: 90,
      realityAdjustedRating: 4.6,
      originalRating: 4.6,
      accessibility: 84,
      crowdComfort: 85,
      whyExplanation: {
        summary: 'Top tier nightlife pulse. Highly secure, clean private brewery protocols, step-free access, and respectful crowd management.',
        positiveFactors: ['High sanitary brewery production standards', 'Pet-friendly indoor and outdoor garden seating', 'Private night security guards'],
        riskFactors: ['Premium craft pricing compared to local bars'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Craft Microbrewery', 'Belgian Wit', 'Pet Friendly', 'Board Games', 'Nightlife Safe'],
    bestTime: '06:00 PM - 10:30 PM'
  ,
    ambientNoiseDb: 65,
    crowdLevelNow: 'Moderate',
    treeCanopyPct: 62,
    aiHygieneAudit: {
      oilFreshness: 'Cold-Pressed Canola & Corn (TPM 10% - Fresh Batch)',
      utensilCleanliness: 'Brewery CIP (Clean-In-Place) Sanitization',
      sanitizationAudit: '98/100 · International Craft Brewing Hygiene Rating',
      pestFree: true
    }
  }
,
  {
    id: 'place_rajgad_fort',
    name: 'Rajgad Fort (The King of Forts)',
    nameMr: 'राजगड किल्ला - छत्रपती शिवाजी महाराज राजधानी',
    nameHi: 'राजगढ़ दुर्ग (छत्रपति शिवाजी महाराज राजधानी)',
    category: 'heritage',
    coordinates: [18.2464, 73.6828],
    h3ZoneId: 'hex_sinhagad',
    address: 'Gunjawane, Rajgad Foot, Pune District',
    description: 'The royal capital of the Maratha Empire for over 26 years under Chhatrapati Shivaji Maharaj. Famous for Balekilla citadel, Suvela Machi elephant rock eye (Nedhe), and magnificent bastions at 1376m elevation.',
    image: '/images/places/rajgad_fort.jpg',
    historicalImage: '/images/places/rajgad_fort.jpg',
    priceLevel: 1,
    costEstimate: 50,
    openingHours: '05:00 AM - 06:30 PM',
    isOpenNow: true,
    rating: 4.9,
    reviewCount: 14200,
    realityRating: 4.9,
    isOverratedFlag: false,
    hygieneGrade: 'A',
    hygieneScore: 88,
    isHiddenGem: false,
    region: 'pune',
    isFort: true,
    elevationMeters: 1376,
    womenSafety: {
      score: 86,
      lightingGrade: 'Moderate',
      cctvCoveragePct: 65,
      nightFootfall: 'Trekker Groups & Registered Guides',
      pinkBoothDistanceMeters: 1200,
      patrolFrequency: 'Forest Guard Beats & Trek Patrol'
    },
    accessibility: {
      wheelchairAccessible: false,
      rampAvailable: false,
      elevatorAvailable: false,
      brailleSignage: false,
      audioAssistance: false,
      accessibleRestrooms: true,
      score: 30
    },
    pulseScore: {
      overall: 94,
      safety: 88,
      cleanliness: 92,
      affordability: 98,
      ratingsScore: 98,
      realityAdjustedRating: 4.9,
      originalRating: 4.9,
      accessibility: 30,
      crowdComfort: 92,
      whyExplanation: {
        summary: 'Crown jewel of Maratha fortification. Pristine Sahyadri atmosphere, awe-inspiring stone masonry, and deep historic reverence.',
        positiveFactors: ['26 years capital of Chhatrapati Shivaji Maharaj', 'Pristine mountain air AQI 25', 'Iconic Suvela Machi natural rock window'],
        riskFactors: ['Rigorous mountain climb; require good hiking footwear', 'High cliff exposure during monsoon mist'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Fort', 'Capital of Swarajya', 'Chhatrapati Shivaji Maharaj', 'Suvela Machi', 'Trekking'],
    bestTime: '05:30 AM - 10:00 AM & 04:00 PM',
    ambientNoiseDb: 32,
    crowdLevelNow: 'Moderate',
    treeCanopyPct: 86,
    aiHygieneAudit: {
      oilFreshness: 'Rustic Village Woodfire Cooking (TPM 10%)',
      utensilCleanliness: 'Clean mountain spring potable water tested',
      sanitizationAudit: '94/100 · Eco-Conservation Heritage Standard',
      pestFree: true
    }
  },
  {
    id: 'place_torna_fort',
    name: 'Torna Fort (Kille Prachandagad)',
    nameMr: 'तोरणा किल्ला (प्रचंडगड) - पहिले स्वराज्य तोरण',
    nameHi: 'तोरणा दुर्ग (प्रचंडगढ़ - पहला स्वराज्य तोरण)',
    category: 'heritage',
    coordinates: [18.2764, 73.6231],
    h3ZoneId: 'hex_sinhagad',
    address: 'Velhe, Pune District',
    description: 'The first fort captured by 16-year-old Chhatrapati Shivaji Maharaj in 1646, marking the founding of Swarajya. Highest hill-fort in Pune district (1403m) featuring the legendary Zunjar Machi and Budhla Machi ridge bastions.',
    image: '/images/places/torna_fort.jpg',
    historicalImage: '/images/places/torna_fort.jpg',
    priceLevel: 1,
    costEstimate: 40,
    openingHours: '05:30 AM - 06:00 PM',
    isOpenNow: true,
    rating: 4.8,
    reviewCount: 9800,
    realityRating: 4.8,
    isOverratedFlag: false,
    hygieneGrade: 'A',
    hygieneScore: 86,
    isHiddenGem: false,
    region: 'pune',
    isFort: true,
    elevationMeters: 1403,
    womenSafety: {
      score: 84,
      lightingGrade: 'Moderate',
      cctvCoveragePct: 60,
      nightFootfall: 'Registered Trekking Clubs',
      pinkBoothDistanceMeters: 1500,
      patrolFrequency: 'Velhe Police Station Day Patrol'
    },
    accessibility: {
      wheelchairAccessible: false,
      rampAvailable: false,
      elevatorAvailable: false,
      brailleSignage: false,
      audioAssistance: false,
      accessibleRestrooms: false,
      score: 25
    },
    pulseScore: {
      overall: 93,
      safety: 86,
      cleanliness: 90,
      affordability: 99,
      ratingsScore: 96,
      realityAdjustedRating: 4.8,
      originalRating: 4.8,
      accessibility: 25,
      crowdComfort: 94,
      whyExplanation: {
        summary: 'Sacred birthplace of Hindavi Swarajya. Dramatic 1403m cliffs with exhilarating ridge walks across Zunjar Machi.',
        positiveFactors: ['Historic site where Swarajya was founded in 1646', 'Highest peak in Pune district', 'Untouched natural wildflower blooms'],
        riskFactors: ['Narrow cliff edge on Zunjar Machi requires careful footing', 'Steep climb from Velhe base village'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Fort', 'Prachandagad', 'Birthplace of Swarajya', 'Zunjar Machi', 'Sahyadri Trek'],
    bestTime: '06:00 AM - 10:30 AM',
    ambientNoiseDb: 34,
    crowdLevelNow: 'Low',
    treeCanopyPct: 82,
    aiHygieneAudit: {
      oilFreshness: 'Velhe Base Organic Food (TPM 11%)',
      utensilCleanliness: 'Natural spring water filtration system',
      sanitizationAudit: '92/100 · Clean Mountain Trail Protocol',
      pestFree: true
    }
  },
  {
    id: 'place_purandar_fort',
    name: 'Purandar Fort & Vajragad',
    nameMr: 'पुरंदर किल्ला - छत्रपती संभाजी महाराज जन्मस्थान',
    nameHi: 'पुरंदर दुर्ग (छत्रपति संभाजी महाराज जन्मस्थान)',
    category: 'heritage',
    coordinates: [18.2831, 73.9788],
    h3ZoneId: 'hex_camp_mg_road',
    address: 'Saswad, Purandar Taluka, Pune District',
    description: 'Birthplace of Chhatrapati Sambhaji Maharaj (1657) and site of the historic Treaty of Purandar (1665). Dramatic twin citadel with Vajragad fort, Kedareshwar temple at 1398m elevation, and army cantonment security.',
    image: '/images/places/purandar_fort.jpg',
    historicalImage: '/images/places/purandar_fort.jpg',
    priceLevel: 1,
    costEstimate: 30,
    openingHours: '09:00 AM - 05:00 PM',
    isOpenNow: true,
    rating: 4.7,
    reviewCount: 8200,
    realityRating: 4.7,
    isOverratedFlag: false,
    hygieneGrade: 'A+',
    hygieneScore: 92,
    isHiddenGem: false,
    region: 'pune',
    isFort: true,
    elevationMeters: 1398,
    womenSafety: {
      score: 92,
      lightingGrade: 'High',
      cctvCoveragePct: 90,
      nightFootfall: 'Military & ASI Guarded Zone',
      pinkBoothDistanceMeters: 400,
      patrolFrequency: 'Continuous Cantonment & Police Beats'
    },
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: false,
      brailleSignage: true,
      audioAssistance: false,
      accessibleRestrooms: true,
      score: 65
    },
    pulseScore: {
      overall: 93,
      safety: 96,
      cleanliness: 94,
      affordability: 98,
      ratingsScore: 95,
      realityAdjustedRating: 4.7,
      originalRating: 4.7,
      accessibility: 65,
      crowdComfort: 88,
      whyExplanation: {
        summary: 'Immensely safe, military-managed fort with motorable road access right up to the lower plateau and deep Maratha history.',
        positiveFactors: ['Military cantonment security ensures top-tier safety', 'Direct vehicle access to lower Machi', 'Birthplace of Chhatrapati Sambhaji Maharaj'],
        riskFactors: ['Govt ID card required for entry at Army checkpoint', 'Strict 5:00 PM exit cutoff'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Fort', 'Chhatrapati Sambhaji Maharaj', 'Military Zone', 'Kedareshwar', 'Safe Fort'],
    bestTime: '09:30 AM - 01:00 PM & 03:00 PM',
    ambientNoiseDb: 40,
    crowdLevelNow: 'Moderate',
    treeCanopyPct: 75,
    aiHygieneAudit: {
      oilFreshness: 'Cantonment Canteen Tested (TPM 9%)',
      utensilCleanliness: 'UV & RO Purified Kiosks',
      sanitizationAudit: '96/100 · Military Cleanliness Protocol',
      pestFree: true
    }
  },
  {
    id: 'place_shivneri_fort',
    name: 'Shivneri Fort (Birthplace of Shivaji Maharaj)',
    nameMr: 'शिवनेरी किल्ला - छत्रपती शिवाजी महाराज जन्मस्थान',
    nameHi: 'शिवनेरी दुर्ग (छत्रपति शिवाजी महाराज जन्मस्थान)',
    category: 'heritage',
    coordinates: [19.1983, 73.8617],
    h3ZoneId: 'hex_pcmc_nigdi',
    address: 'Junnar, Pune District',
    description: 'The sacred birthplace of Chhatrapati Shivaji Maharaj (19 February 1630). Triangular hill citadel featuring the Shivai Temple, Badami Talav water cistern, seven defensive entry gates, and the revered Birth Room (Janmasthan).',
    image: '/images/places/shivneri_fort.jpg',
    historicalImage: '/images/places/shivneri_fort.jpg',
    priceLevel: 1,
    costEstimate: 25,
    openingHours: '05:30 AM - 06:30 PM',
    isOpenNow: true,
    rating: 4.9,
    reviewCount: 16500,
    realityRating: 4.9,
    isOverratedFlag: false,
    hygieneGrade: 'A+',
    hygieneScore: 95,
    isHiddenGem: false,
    region: 'pune',
    isFort: true,
    elevationMeters: 1042,
    womenSafety: {
      score: 95,
      lightingGrade: 'High',
      cctvCoveragePct: 92,
      nightFootfall: 'Family & Pilgrim Footfall',
      pinkBoothDistanceMeters: 250,
      patrolFrequency: 'Junnar Police & ASI Round-the-clock'
    },
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: false,
      brailleSignage: true,
      audioAssistance: true,
      accessibleRestrooms: true,
      score: 72
    },
    pulseScore: {
      overall: 96,
      safety: 96,
      cleanliness: 96,
      affordability: 99,
      ratingsScore: 98,
      realityAdjustedRating: 4.9,
      originalRating: 4.9,
      accessibility: 72,
      crowdComfort: 90,
      whyExplanation: {
        summary: 'Sacred Maharashtra national monument with beautifully paved stone steps, 7 fortified gates, and outstanding ASI security maintenance.',
        positiveFactors: ['Revered Janmasthan memorial', 'Well-paved steps with protective handrails', 'Abundant ancient potable sweet water cisterns'],
        riskFactors: ['High midday heat in open courtyards; early morning visit recommended'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['Fort', 'Birthplace of Shivaji Maharaj', 'Junnar', 'ASI Protected', 'Family Friendly'],
    bestTime: '06:30 AM - 10:30 AM & 04:30 PM',
    ambientNoiseDb: 42,
    crowdLevelNow: 'Moderate',
    treeCanopyPct: 80,
    aiHygieneAudit: {
      oilFreshness: 'ASI Heritage Certified Food (TPM 10%)',
      utensilCleanliness: 'Clean Potable Water Stations (TDS 95)',
      sanitizationAudit: '98/100 · National Heritage Sanitation',
      pestFree: true
    }
  },
  {
    id: 'place_pcmc_morya_gosavi',
    name: 'Morya Gosavi Ganpati Temple (Chinchwad)',
    nameMr: 'मोरया गोसावी मंदिर, चिंचवड गाव (PCMC)',
    nameHi: 'मोरया गोसावी मंदिर, चिंचवाड़ (PCMC)',
    category: 'heritage',
    coordinates: [18.6279, 73.7820],
    h3ZoneId: 'hex_pcmc_chinchwad',
    address: 'Chinchwad Gaon, Pawana Riverbank, PCMC',
    description: 'Renowned 14th-century temple sanctum of Ganesh devotee Saint Morya Gosavi along the sacred Pawana river. Spiritual heart of Pimpri-Chinchwad celebrating 600+ years of devotion and quiet river ghats.',
    image: '/images/places/morya_gosavi.jpg',
    historicalImage: '/images/places/morya_gosavi.jpg',
    priceLevel: 1,
    costEstimate: 0,
    openingHours: '05:00 AM - 10:00 PM',
    isOpenNow: true,
    rating: 4.8,
    reviewCount: 8900,
    realityRating: 4.8,
    isOverratedFlag: false,
    hygieneGrade: 'A+',
    hygieneScore: 94,
    isHiddenGem: false,
    region: 'pcmc',
    womenSafety: {
      score: 96,
      lightingGrade: 'High',
      cctvCoveragePct: 95,
      nightFootfall: 'Active Family & Women Pilgrims until 10 PM',
      pinkBoothDistanceMeters: 180,
      patrolFrequency: 'Chinchwad Police Damini Squad 15-min Beat'
    },
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: false,
      brailleSignage: false,
      audioAssistance: true,
      accessibleRestrooms: true,
      score: 84
    },
    pulseScore: {
      overall: 93,
      safety: 96,
      cleanliness: 92,
      affordability: 100,
      ratingsScore: 96,
      realityAdjustedRating: 4.8,
      originalRating: 4.8,
      accessibility: 84,
      crowdComfort: 86,
      whyExplanation: {
        summary: 'Sacred riverfront landmark with free entry, exceptional lighting along Pawana ghats, and high round-the-clock family security.',
        positiveFactors: ['Safe riverside promenade with 100% LED lighting', 'Zero entry fee with RO water stations', 'Dedicated Women help desk nearby'],
        riskFactors: ['Angarki Sankashti days experience peak pilgrim congestion'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['PCMC', 'Heritage', 'Ganesh Temple', 'Pawana River Ghat', 'Family Safe'],
    bestTime: '06:00 AM - 09:30 AM & 06:00 PM - 08:30 PM',
    ambientNoiseDb: 46,
    crowdLevelNow: 'Moderate',
    treeCanopyPct: 65,
    aiHygieneAudit: {
      oilFreshness: 'Prasadam Pure Cow Ghee (TPM 7%)',
      utensilCleanliness: 'Boiled water brass utensils sanitization',
      sanitizationAudit: '97/100 · Temple Trust Health Protocol',
      pestFree: true
    }
  },
  {
    id: 'place_pcmc_hinjawadi_tech',
    name: 'Hinjawadi IT High Street & Tech Park (PCMC)',
    nameMr: 'हिंजवडी आयटी हाय स्ट्रीट (PCMC / पुणे)',
    nameHi: 'हिंजवड़ी आईटी हाई स्ट्रीट (PCMC)',
    category: 'tech',
    coordinates: [18.5913, 73.7389],
    h3ZoneId: 'hex_pcmc_hinjawadi',
    address: 'Rajiv Gandhi Infotech Park Phase 1, Hinjawadi',
    description: 'Premier global IT hub hosting over 300,000 professionals. Vibrant round-the-clock smart street with 24x7 cafes, gourmet food trucks, high-definition smart CCTV network, and active women commuter security hubs.',
    image: '/images/places/hinjawadi_it.jpg',
    historicalImage: '/images/places/hinjawadi_it.jpg',
    priceLevel: 2,
    costEstimate: 350,
    openingHours: 'Open 24 Hours',
    isOpenNow: true,
    rating: 4.6,
    reviewCount: 15400,
    realityRating: 4.6,
    isOverratedFlag: false,
    hygieneGrade: 'A+',
    hygieneScore: 95,
    isHiddenGem: false,
    region: 'pcmc',
    womenSafety: {
      score: 98,
      lightingGrade: 'High',
      cctvCoveragePct: 98,
      nightFootfall: 'Continuous 24x7 Tech Workforce & Cab Hubs',
      pinkBoothDistanceMeters: 80,
      patrolFrequency: 'Dedicated Hinjawadi Women Cell & PCR Van on Site'
    },
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: true,
      brailleSignage: true,
      audioAssistance: true,
      accessibleRestrooms: true,
      score: 92
    },
    pulseScore: {
      overall: 92,
      safety: 98,
      cleanliness: 93,
      affordability: 78,
      ratingsScore: 92,
      realityAdjustedRating: 4.6,
      originalRating: 4.6,
      accessibility: 92,
      crowdComfort: 82,
      whyExplanation: {
        summary: 'Gold standard 24x7 smart city corridor. 98% CCTV density, dedicated Pink Police kiosks, and 24-hour food and transport services.',
        positiveFactors: ['24x7 Pink Safety Booth with emergency helpline 1091', '100% smart LED lighting with zero dark spots', 'Wheelchair accessible walkways throughout'],
        riskFactors: ['Peak office hours (9-11 AM & 6-8 PM) experience heavy vehicular traffic'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['PCMC', 'Tech Corridor', '24x7 Safe Zone', 'Women Safety Gold', 'Food Trucks'],
    bestTime: '07:00 PM - 11:30 PM (Vibrant Nightlife)',
    ambientNoiseDb: 64,
    crowdLevelNow: 'Peak',
    treeCanopyPct: 50,
    aiHygieneAudit: {
      oilFreshness: 'Refined Sunflower & Canola (TPM < 12%)',
      utensilCleanliness: 'Commercial dishwashers & UV sterilization',
      sanitizationAudit: '96/100 · Corporate Hub Food Safety Audit',
      pestFree: true
    }
  },
  {
    id: 'place_pcmc_bhakti_shakti',
    name: 'Bhakti-Shakti Memorial & Nigdi Flyover (PCMC)',
    nameMr: 'भक्ती-शक्ती राष्ट्रीय स्मारक, निगडी (PCMC)',
    nameHi: 'भक्ति-शक्ति राष्ट्रीय स्मारक, निगड़ी (PCMC)',
    category: 'heritage',
    coordinates: [18.6534, 73.7744],
    h3ZoneId: 'hex_pcmc_nigdi',
    address: 'Old Pune-Mumbai Highway, Nigdi Pradhikaran, PCMC',
    description: 'Iconic gateway monument of PCMC celebrating the historic meeting of Sant Tukaram Maharaj (Bhakti) and Chhatrapati Shivaji Maharaj (Shakti). Features landscaped civic gardens, illuminated fountains, and civic pride.',
    image: '/images/places/bhakti_shakti.jpg',
    historicalImage: '/images/places/bhakti_shakti.jpg',
    priceLevel: 1,
    costEstimate: 0,
    openingHours: '06:00 AM - 10:00 PM',
    isOpenNow: true,
    rating: 4.7,
    reviewCount: 7400,
    realityRating: 4.7,
    isOverratedFlag: false,
    hygieneGrade: 'A',
    hygieneScore: 90,
    isHiddenGem: false,
    region: 'pcmc',
    womenSafety: {
      score: 93,
      lightingGrade: 'High',
      cctvCoveragePct: 92,
      nightFootfall: 'Active family & jogger presence',
      pinkBoothDistanceMeters: 220,
      patrolFrequency: 'Nigdi Police Beat Continuous'
    },
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: false,
      brailleSignage: false,
      audioAssistance: false,
      accessibleRestrooms: true,
      score: 80
    },
    pulseScore: {
      overall: 91,
      safety: 94,
      cleanliness: 91,
      affordability: 100,
      ratingsScore: 94,
      realityAdjustedRating: 4.7,
      originalRating: 4.7,
      accessibility: 80,
      crowdComfort: 85,
      whyExplanation: {
        summary: 'Landmark civic pride monument with expansive open gardens, illuminated gateway plaza, and family-friendly atmosphere.',
        positiveFactors: ['Impressive bronze statue ensemble', 'Safe Pradhikaran residential zone', 'Broad promenade with decorative lights'],
        riskFactors: ['Proximity to Mumbai highway junction requires using designated pedestrian overpasses'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['PCMC', 'Monument', 'Sant Tukaram', 'Shivaji Maharaj', 'Nigdi'],
    bestTime: '06:00 AM - 09:00 AM & 05:30 PM - 08:30 PM',
    ambientNoiseDb: 58,
    crowdLevelNow: 'Moderate',
    treeCanopyPct: 62,
    aiHygieneAudit: {
      oilFreshness: 'Civic Canteen (TPM 12%)',
      utensilCleanliness: 'Municipal water testing certified',
      sanitizationAudit: '94/100 · PCMC Smart Sanitation Audit',
      pestFree: true
    }
  },
  {
    id: 'place_pcmc_durga_devi',
    name: 'Durga Devi Tekdi & Appu Ghar Park (PCMC)',
    nameMr: 'दुर्गा देवी टेकडी व अप्पू घर, निगडी (PCMC)',
    nameHi: 'दुर्गा देवी टेकरी व अप्पू घर (PCMC)',
    category: 'nature',
    coordinates: [18.6601, 73.7680],
    h3ZoneId: 'hex_pcmc_nigdi',
    address: 'Sector 25, Pradhikaran, Nigdi, PCMC',
    description: 'PCMC’s largest urban green lung spanning over 160 acres at 610m elevation. Features lush teak and bamboo forests, tranquil lake, panoramic city views of industrial PCMC, walking trails, and Appu Ghar amusement park.',
    image: '/images/places/durga_devi.jpg',
    historicalImage: '/images/places/durga_devi.jpg',
    priceLevel: 1,
    costEstimate: 50,
    openingHours: '05:00 AM - 08:00 PM',
    isOpenNow: true,
    rating: 4.6,
    reviewCount: 9200,
    realityRating: 4.7,
    isOverratedFlag: false,
    hygieneGrade: 'A+',
    hygieneScore: 93,
    isHiddenGem: false,
    region: 'pcmc',
    womenSafety: {
      score: 91,
      lightingGrade: 'High',
      cctvCoveragePct: 88,
      nightFootfall: 'Active morning and evening women jogging groups',
      pinkBoothDistanceMeters: 300,
      patrolFrequency: 'Forest Guard & PCMC Security Beat'
    },
    accessibility: {
      wheelchairAccessible: true,
      rampAvailable: true,
      elevatorAvailable: false,
      brailleSignage: false,
      audioAssistance: false,
      accessibleRestrooms: true,
      score: 75
    },
    pulseScore: {
      overall: 92,
      safety: 91,
      cleanliness: 95,
      affordability: 96,
      ratingsScore: 92,
      realityAdjustedRating: 4.7,
      originalRating: 4.6,
      accessibility: 75,
      crowdComfort: 94,
      whyExplanation: {
        summary: 'Exceptional 160-acre green canopy with AQI 45, shaded walking trails, and high daytime family safety.',
        positiveFactors: ['160 acres of protected green lung', 'Pristine air quality with birdwatching sanctuary', 'Fenced and guarded perimeter'],
        riskFactors: ['Unlit deep forest trails close at dusk (after 7:30 PM)'],
        weightsUsed: { safety: 0.3, cleanliness: 0.2, affordability: 0.15, ratings: 0.15, accessibility: 0.1, crowd: 0.1 }
      }
    },
    tags: ['PCMC', 'Hill Park', 'Urban Forest', 'Appu Ghar', 'Birdwatching'],
    bestTime: '06:00 AM - 09:30 AM & 04:30 PM - 07:00 PM',
    ambientNoiseDb: 36,
    crowdLevelNow: 'Moderate',
    treeCanopyPct: 85,
    aiHygieneAudit: {
      oilFreshness: 'Garden Cafeteria (TPM 11%)',
      utensilCleanliness: 'Clean Potable Water Stations',
      sanitizationAudit: '96/100 · Eco-Park Health Index',
      pestFree: true
    }
  }

];

export const HERITAGE_SITES: HeritageSite[] = [
  {
    id: 'heritage_shaniwar_wada',
    placeId: 'place_shaniwar_wada',
    name: 'Shaniwar Wada',
    era: 'Maratha Empire (Peshwa Era)',
    builtYear: '1732 CE',
    thenPhoto: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80',
    nowPhoto: '/images/places/shaniwar_wada.jpg',
    thenCaption: 'Archival 1860s photograph showing seven-story palace towers before the great 1828 fire.',
    nowCaption: 'Today: Restored stone bastion ramparts, intact Dilli Darwaza, and landscaped public garden.',
    stories: {
      en: {
        title: 'The Fortress of Peshwa Baji Rao I',
        text: 'Founded on Saturday, January 10, 1730 by Peshwa Baji Rao I, Shaniwar Wada was the nerve center of the Maratha confederacy. The fortress withstood many sieges and housed over a thousand residents within seven towering storeys until tragic palace fires in 1828 reduced all wooden superstructures to stone foundations.',
        audioDuration: '1m 45s'
      },
      hi: {
        title: 'पेशवा बाजीराव प्रथम का ऐतिहासिक दुर्ग',
        text: 'शनिवार वाडा की नींव 10 जनवरी 1730 को पेशवा बाजीराव प्रथम ने रखी थी। यह मराठा साम्राज्य की सत्ता का मुख्य केंद्र था। इसके विशाल दिल्ली दरवाज़े पर हाथी-प्रतिरोधी नुकीले भाले आज भी इतिहास की गवाही देते हैं। शाम के समय यहाँ ध्वनि एवं प्रकाश कार्यक्रम आयोजित होता है।',
        audioDuration: '1m 50s'
      },
      mr: {
        title: 'श्रीमंत थोरले बाजीराव पेशव्यांचा शनिवार वाडा',
        text: '१० जानेवारी १७३० रोजी थोरले बाजीराव पेशवे यांनी शनिवार वाड्याची पायाभरणी केली. मराठा साम्राज्याची राजधानी म्हणून या वाड्याने अनेक विजयी मोहिमांचे नियोजन पाहिले. दिल्ली दरवाजावरील तीक्ष्ण खिळे आणि भक्कम बुरुज आजही पेशवेकालीन शौर्याची साक्ष देतात.',
        audioDuration: '1m 40s'
      }
    },
    etiquette: {
      dos: [
        'Carry drinking water; inner stone courtyards have minimal shade at noon',
        'Avail ASI approved audio guides at the booking ticket booth',
        'Respect quiet zones near the central garden memorial',
        'Dispose trash in designated wet/dry sorting bins'
      ],
      donts: [
        'Do not scratch or carve names on 300-year-old basalt stonework',
        'Commercial drones require prior police & ASI clearances',
        'Avoid climbing over the upper perimeter balustrades',
        'No open flames or smoking anywhere inside premises'
      ]
    },
    festivals: [
      {
        name: 'Ganeshotsav Palkhi Arrival',
        date: 'Bhadrapada Month (Sept)',
        crowdForecast: 'Very High',
        tips: 'Plan arrival before 9 AM or after 8 PM; use metro via Phadke Houd station.'
      },
      {
        name: 'Shiv Jayanti Heritage Walk',
        date: '19 February',
        crowdForecast: 'High',
        tips: 'Grand traditional dhol tasha performances outside Dilli Darwaza.'
      }
    ]
  },
  {
    id: 'heritage_pataleshwar',
    placeId: 'place_pataleshwar_caves',
    name: 'Pataleshwar Cave Temple',
    era: 'Rashtrakuta Dynasty',
    builtYear: '8th Century CE (c. 750 CE)',
    thenPhoto: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80',
    nowPhoto: '/images/places/pataleshwar_caves.jpg',
    thenCaption: 'Survey sketch from 1885 showing monolithic Nandi Mandapa sheltered inside basalt depression.',
    nowCaption: 'Today: Protected green oasis amidst high-rise Shivajinagar commercial towers.',
    stories: {
      en: {
        title: 'The Underground Monolith of Deccan',
        text: 'Carved out of a single basalt outcrop in the 8th century during Rashtrakuta rule, Pataleshwar translates to God of the Underworld. Similar in antiquity to the Elephanta Caves and Ellora, this subterranean sanctuary remains cool even in scorching 40°C summers due to thermal basalt insulation.',
        audioDuration: '1m 30s'
      },
      hi: {
        title: 'दक्कन का 1200 वर्ष पुराना गुफा मंदिर',
        text: 'राष्ट्रकूट राजवंश के काल में 8वीं शताब्दी में निर्मित पातालेश्वर मंदिर एक विशाल बेसाल्ट चट्टान को तराशकर बनाया गया था। मंदिर के केंद्र में गोल नंदी मंडप और गर्भगृह में शिवलिंग स्थापित है। भीषण गर्मी में भी यहाँ का वातावरण शीतल और शांत रहता है।',
        audioDuration: '1m 35s'
      },
      mr: {
        title: '८ व्या शतकातील पाताळेश्वर लेण्यांचा इतिहास',
        text: 'राष्ट्रकूट काळात एकाच काळ्या पाषाणात कोरलेले पातालेश्वर लेणे हे पुण्याचे प्राचीनतम स्थापत्य वैभव आहे. येथील छत्रीसारखा नंदी मंडप आणि थंडगार गाभारा आधुनिक पुण्याच्या गजबजाटातही अलौकिक शांततेचा अनुभव देतो.',
        audioDuration: '1m 28s'
      }
    },
    etiquette: {
      dos: [
        'Remove footwear prior to entering the inner sanctum / Nandi pavilion',
        'Speak in soft hushed tones to preserve meditative sanctity',
        'Non-flash photography of stone pillars is permitted'
      ],
      donts: [
        'Do not touch ancient sanctum carvings with wet or oily hands',
        'No loud speaker phone calls inside the subterranean hollow',
        'Footwear strictly forbidden beyond the marked white threshold'
      ]
    },
    festivals: [
      {
        name: 'Maha Shivratri Deepotsav',
        date: 'Phalguna Month (Feb/March)',
        crowdForecast: 'Very High',
        tips: 'Over 2,000 oil lamps lit in the courtyard at sunset. Queue begins at 6 AM.'
      }
    ]
  },
  {
    id: 'heritage_aga_khan',
    placeId: 'place_aga_khan_palace',
    name: 'Aga Khan Palace',
    era: 'British Colonial / Freedom Movement',
    builtYear: '1892 CE',
    thenPhoto: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80',
    nowPhoto: '/images/places/aga_khan_palace.jpg',
    thenCaption: 'Archival view of the Italian arches and famine relief grounds built in 1892.',
    nowCaption: 'Today: National monument, Gandhi museum, and peaceful Kasturba Gandhi Samadhi garden.',
    stories: {
      en: {
        title: 'Sanctuary of Sacrifice and Peace',
        text: 'Commissioned in 1892 as an act of charity by the Aga Khan to support famine-stricken locals, the palace became sacred to India’s freedom movement. In 1942, Mahatma Gandhi, his wife Kasturba, and secretary Mahadev Desai were interned here during the Quit India agitation. Kasturba breathed her last here in 1944.',
        audioDuration: '1m 40s'
      },
      hi: {
        title: 'स्वतंत्रता संग्राम की पावन स्मृति',
        text: '1892 में निर्मित आगा खान पैलेस भारत के स्वतंत्रता संग्राम का एक महत्वपूर्ण साक्षी है। 1942 के भारत छोड़ो आंदोलन के दौरान महात्मा गांधी और कस्तूरबा गांधी को यहीं नज़रबंद किया गया था। यहाँ कस्तूरबा गांधी और महादेव देसाई की समाधियाँ स्थित हैं।',
        audioDuration: '1m 45s'
      },
      mr: {
        title: 'स्वातंत्र्यलढ्याची अमर साक्षी',
        text: '१८९२ मध्ये बांधलेला हा भव्य राजवाडा भारतीय स्वातंत्र्य चळवळीतील अत्यंत भावनिक स्थान आहे. १९४२ च्या चले जाव आंदोलनात महात्मा गांधी आणि कस्तुरबा गांधी यांना येथे बंदिवासात ठेवण्यात आले होते. कस्तुरबा गांधींचे समाधी स्थळ येथेच शांत बागेत वसलेले आहे.',
        audioDuration: '1m 38s'
      }
    },
    etiquette: {
      dos: [
        'Maintain solemn silence near the Kasturba Gandhi Samadhi',
        'Explore the picture gallery depicting the 1942 Quit India struggle',
        'Stroll on the designated paved garden pathways'
      ],
      donts: [
        'Picnicking or outdoor ball games on historical lawns prohibited',
        'Do not cross safety ropes protecting Gandhiji’s personal artifacts'
      ]
    },
    festivals: [
      {
        name: 'Gandhi Jayanti Commemoration',
        date: '2 October',
        crowdForecast: 'High',
        tips: 'Morning inter-faith prayer assembly at 7:30 AM; free entry for students.'
      }
    ]
  }
];

export const SAFE_HAVENS: SafeHaven[] = [
  {
    id: 'haven_police_deccan',
    name: 'Deccan Gymkhana Police Station',
    type: 'police',
    coordinates: [18.5182, 73.8428],
    phone: '020-25672233',
    distanceKm: 0.4,
    address: 'Near Goodluck Chowk, FC Road, Pune',
    isOpen24x7: true
  },
  {
    id: 'haven_police_shivajinagar',
    name: 'Shivajinagar Police Headquarters',
    type: 'police',
    coordinates: [18.5305, 73.8520],
    phone: '112 / 020-25536340',
    distanceKm: 1.2,
    address: 'Police Lines, Shivajinagar, Pune',
    isOpen24x7: true
  },
  {
    id: 'haven_hosp_sassoon',
    name: 'Sassoon General & Trauma Hospital',
    type: 'hospital',
    coordinates: [18.5255, 73.8725],
    phone: '020-26128000',
    distanceKm: 2.1,
    address: 'Station Road, Near Pune Railway Station',
    isOpen24x7: true
  },
  {
    id: 'haven_hosp_deenanath',
    name: 'Deenanath Mangeshkar Hospital & Research Center',
    type: 'hospital',
    coordinates: [18.5028, 73.8290],
    phone: '020-40151000',
    distanceKm: 1.8,
    address: 'Erandwane, Near Mhatre Bridge, Pune',
    isOpen24x7: true
  },
  {
    id: 'haven_pharm_apollo_247',
    name: 'Apollo 24x7 Pharmacy & First Aid Clinic',
    type: 'pharmacy_247',
    coordinates: [18.5218, 73.8435],
    phone: '1860-500-0101',
    distanceKm: 0.2,
    address: 'FC Road, Opposite Vaishali, Pune',
    isOpen24x7: true
  }
];

export const SEEDED_CITIZEN_REPORTS: CitizenReport[] = [
  {
    id: 'rep_101',
    userId: 'usr_pune_hero',
    userName: 'Tanvi Shinde (Chaos Hero)',
    userReputation: 96,
    type: 'waterlogging',
    title: 'Waterlogging at JM Road Alka Talkies Underpass',
    description: '35cm standing water after sudden 40-min thunderstorm. Two-wheelers stalling, traffic diverted to Tilak Road.',
    transcription: 'पावसामुळे अलका टॉकीज चौकात पाणी साचले आहे. दुचाकी चालकांनी टिळक रोडने जावे.',
    detectedLanguage: 'mr',
    audioDurationSeconds: 12,
    coordinates: [18.5140, 73.8475],
    timestamp: '18 mins ago',
    severity: 'high',
    trustScore: 95,
    status: 'verified',
    trustBreakdown: {
      exifGpsMatch: true,
      duplicateClustering: true,
      nearbyCorroborations: 6,
      reporterReputationWeight: 0.96
    }
  },
  {
    id: 'rep_102',
    userId: 'usr_rohit_k',
    userName: 'Rohit Kulkarni',
    userReputation: 88,
    type: 'lighting',
    title: 'Streetlights Out: Sambhaji Park Perimeter Footpath',
    description: '4 consecutive LED street poles dark along JM Road stretch. Low visibility for night walkers and women runners.',
    transcription: 'Four streetlight poles are not functioning along Sambhaji park boundary. Very dark here.',
    detectedLanguage: 'en',
    audioDurationSeconds: 8,
    coordinates: [18.5205, 73.8480],
    timestamp: '42 mins ago',
    severity: 'medium',
    trustScore: 91,
    status: 'verified',
    trustBreakdown: {
      exifGpsMatch: true,
      duplicateClustering: true,
      nearbyCorroborations: 3,
      reporterReputationWeight: 0.88
    }
  },
  {
    id: 'rep_103',
    userId: 'usr_aditi_m',
    userName: 'Aditi More',
    userReputation: 92,
    type: 'garbage',
    title: 'Garbage Bin Overflow at Shaniwar Peth Market',
    description: 'Waste container overflowing onto street pavement blocking pedestrian ramp.',
    coordinates: [18.5190, 73.8540],
    timestamp: '2 hours ago',
    severity: 'low',
    trustScore: 88,
    status: 'investigating',
    trustBreakdown: {
      exifGpsMatch: true,
      duplicateClustering: false,
      nearbyCorroborations: 1,
      reporterReputationWeight: 0.92
    }
  }
];

export const SOCIAL_SIGNALS: SocialSignal[] = [
  {
    id: 'soc_1',
    source: 'X',
    author: 'Pune City Police',
    handle: '@PuneCityPolice',
    text: 'Traffic advisory: Waterlogging at Alka Talkies junction has been cleared by PMC disaster pumps. Normal vehicular flow restored on JM Road connector.',
    timestamp: '14 mins ago',
    sentiment: 'Positive',
    category: 'traffic',
    verified: true,
    likesOrUpvotes: 284
  },
  {
    id: 'soc_2',
    source: 'Reddit',
    author: 'r/pune (u/punekar_explorer)',
    handle: 'reddit.com/r/pune',
    text: 'Pataleshwar Cave Temple is amazingly quiet today! Thermal cave insulation feels like 22°C inside while it is 32°C outside on JM Road. Absolute hidden gem.',
    timestamp: '35 mins ago',
    sentiment: 'Positive',
    category: 'events',
    verified: false,
    likesOrUpvotes: 142
  },
  {
    id: 'soc_3',
    source: 'PMC Alert',
    author: 'Pune Smart City Command',
    handle: 'PMC Command Center',
    text: 'Precautionary Alert: Monsoon cloud buildup over Kothrud & Deccan Gymkhana. Two-wheeler riders advised to take elevated Bhandarkar detour.',
    timestamp: '52 mins ago',
    sentiment: 'Alert',
    category: 'weather',
    verified: true,
    likesOrUpvotes: 418
  },
  {
    id: 'soc_4',
    source: 'News',
    author: 'Pune Mirror Civic Desk',
    handle: '@PuneMirror',
    text: 'FC Road Khao Galli vendors receive A-grade street hygiene certification after quarterly food safety inspection.',
    timestamp: '2 hours ago',
    sentiment: 'Positive',
    category: 'safety',
    verified: true,
    likesOrUpvotes: 310
  }
];

export const INITIAL_CITY_MOOD: CityMood = {
  state: 'Brisk',
  score: 68,
  description: 'Moderate evening traffic with rain drizzle over Deccan Gymkhana; pleasant breeze across river bridges.',
  primaryColor: '#19E3B1',
  gradient: 'conic-gradient(from 180deg at 50% 50%, #19E3B1 0deg, #7C5CFF 120deg, #FFB020 240deg, #19E3B1 360deg)',
  factors: {
    traffic: '62% Congestion Index (Peak commute clearing on FC Rd)',
    weather: '26°C, Light Drizzle, Wind 14 km/h West',
    events: 'Cultural rehearsal at Balgandharva & Street Food rush',
    socialSentiment: '78% Positive (Pothole repairs applauded on X)'
  }
};
