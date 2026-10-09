# 🏙️ CityPulse: Your Living City Twin
> *Turning urban chaos into calm, one smart decision at a time.*

CityPulse is a **live, explainable digital twin of the city**. Instead of another generic "places near me" app, every street, micro-zone, and establishment receives a real-time **Pulse Score** (0–100) computed from safety, cleanliness, cost, ratings, accessibility, traffic, and weather. Every score is **verified, explainable, and auditable**—never just a black-box number.

---

## 🚀 Live Demo & Quickstart

The servers are running live:
- **Interactive Web App (PWA):** `http://localhost:5173/`
- **FastAPI Backend Gateway:** `http://localhost:8000/`
- **Interactive API Swagger Docs:** `http://localhost:8000/docs`

### Starting the Applications
```bash
# 1. Start Frontend (Vite React PWA)
cd c:\TURBOC3\BIN\PROJECT\citypulse
npm run dev

# 2. Start FastAPI Backend Gateway
cd c:\TURBOC3\BIN\PROJECT\citypulse\backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```


---

## 🗺️ Pilot City: Pune, Maharashtra
Pune was selected as the prime pilot city due to its rich juxtaposition of Peshwa history, ancient rock-cut caves, vibrant student food streets (FC Road), IT corridors (Viman Nagar), monsoon waterlogging choke points, and multilingual Marathi/Hindi/English demographic.

---

## 🌟 12 Unique Differentiators (Add-Ons)

| # | Add-On | Implementation in CityPulse |
|---|--------|-----------------------------|
| 1 | **Pulse Score with "Why?" Panel** | Explainable AI modal breaking down the 6 mathematical components, dynamic persona weights, and human-readable positive vs risk signals. |
| 2 | **Time Travel Slider** | 24-hour interactive scrubber (00:00 to 23:00) with autoplay simulation. Watch zones shift from daytime vibrancy to night security modes. |
| 3 | **Trust Engine for Reports** | 4-step corroboration matrix: Photo EXIF/GPS match (+30%), Duplicate clustering (+25%), Nearby citizen corroboration (+20%), Reporter reputation (+25%). |
| 4 | **Reality vs Rating** | Contrast engine flagging inflated star ratings against ground-truth hygiene audits and verified citizen reports. |
| 5 | **Rain-Aware Routing** | Dynamic elevation and rainfall model rerouting around waterlogged basins (e.g., Alka Talkies / JM Road underpass). |
| 6 | **Street-Food Hygiene Score** | AI inspection grades (A+, A, B, C) and cleanliness metrics per food stall. |
| 7 | **Voice-First Reporting** | Multilingual voice recorder supporting Marathi, Hindi, and English with auto-transcription and category tagging. |
| 8 | **City Mood Ring** | Animated rotating gradient badge reflecting composite urban tension, traffic, weather, and social sentiment. |
| 9 | **Accessibility Layer** | Dedicated step-free, wheelchair ramp, tactile, and audio navigation indicators. |
| 10 | **Gamification & Badges** | Rewards citizen reporting with badges like *Chaos Hero*, *Heritage Hunter*, *Night Guardian*, XP levels, and confetti celebration. |
| 11 | **Offline PWA Mode** | Local storage caching for offline map viewing, safe havens, and emergency SOS functionality. |
| 12 | **Eco Layer** | Real-time US AQI index, acoustic noise levels, and tree-canopy shade optimization. |

---

## 📐 Mathematical Formulation

### 1. Pulse Score
$$\text{Pulse} = w_{\text{safety}} \cdot S + w_{\text{clean}} \cdot C + w_{\text{afford}} \cdot A + w_{\text{ratings}} \cdot R^* + w_{\text{access}} \cdot Acc + w_{\text{crowd}} \cdot Cr$$

Where $R^*$ is the ground-truth rating adjusted for inflation:
$$R^* = \text{Rating}_{\text{ground}} - \max(0, (\text{Rating}_{\text{online}} - \text{Rating}_{\text{ground}}) \times 8)$$

### 2. Configurable Personas
- **Standard Citizen:** $30\%$ Safety, $20\%$ Cleanliness, $15\%$ Affordability, $15\%$ Ratings, $10\%$ Accessibility, $10\%$ Crowd Comfort.
- **Solo Traveler / Night Owl:** $50\%$ Safety, $15\%$ Cleanliness, $5\%$ Affordability, $10\%$ Ratings, $10\%$ Accessibility, $10\%$ Crowd Comfort.
- **Budget Backpacker:** $40\%$ Affordability, $20\%$ Safety, $15\%$ Cleanliness, $10\%$ Ratings, $10\%$ Crowd Comfort, $5\%$ Accessibility.
- **Accessibility First:** $35\%$ Accessibility, $25\%$ Safety, $15\%$ Cleanliness, $10\%$ Affordability, $10\%$ Ratings, $5\%$ Crowd Comfort.

### 3. Safe Route Engine Cost
$$\text{EdgeCost} = \text{Time} \cdot w_1 + (100 - \text{Safety}) \cdot w_2 + \text{Risk}_{\text{weather}} \cdot w_3 + (100 - \text{Lighting}) \cdot w_4$$
Produces 3 distinct selectable routes: **Fastest**, **Safest (Recommended)**, and **Balanced**.

---

## 📱 The 8 Integrated Screens

1. **Twin Hub (`home`):** Interactive map with CartoDB Dark Matter tiles, H3 hexagon micro-zones, 3D tilt perspective toggle, live weather & AQI telemetry, and Time Travel scrubber.
2. **Explore & Budget (`explore`):** Category filters, dynamic Budget Slider (₹100–₹1500), Hidden Gems filter, and place cards with Reality vs Rating badges.
3. **Heritage & Stories (`heritage`):** Interactive Then & Now archival photo slider, multilingual audio Story Player in English, Hindi, and Marathi with browser speech synthesis, Festival Calendar with crowd predictions, and Culture Etiquette cards.
4. **Safe Routes & Guardian (`safety`):** Multi-factor route engine (Fastest / Safest / Balanced) with rain rerouting, night safety layer, Guardian Shield live beacon, and nearest safe havens radar.
5. **Compare & Radar (`compare`):** 6-axis SVG radar chart comparing up to 3 places or zones, plain-language AI verdict, and city leaderboards.
6. **Report & Voice (`report`):** Voice-first incident reporting in Marathi, Hindi, and English with waveform animation, EXIF photo check, and Trust Engine breakdown.
7. **AI Itinerary (`itinerary`):** Day planner optimizing time window, budget cap, travel group, and interests with a sequenced stop-by-stop timeline.
8. **Badges & Eco (`profile`):** Citizen Vanguard XP progression, unlocked badges, offline cache status, and eco-routing filters.

---

## 🎭 3-Minute Winning Demo Script

1. **Minute 1: The Living Twin & City Mood**
   - Open on the **Twin Hub**. Point out the revolving **City Mood Ring** showing *"Brisk (68)"* with live traffic and weather.
   - Scrub the **Time Travel Slider** to 23:00 and observe how micro-zones dynamically adjust their safety colors for night mode.
   - Toggle **3D Grid** to inspect the extruded hexagonal micro-zone mesh.

2. **Minute 2: Exploration, Reality vs Rating & Heritage**
   - Switch to **Explore & Budget**. Adjust the budget slider to ₹250 to filter authentic street food like FC Road Khao Galli.
   - Click **Why?** to unveil the explainable AI mathematical decomposition.
   - Switch to **Heritage**; slide the **Then & Now Slider** over Shaniwar Wada to compare 1860s palace towers with today's restored stone ramparts.
   - Press **Play Audio (MR/HI/EN)** to hear the spoken narration.

3. **Minute 3: Safe Route, Rain Reroute, Voice Report & SOS**
   - Switch to **Safe Routes**. Toggle **Rain Reroute ON** and show how the route engine automatically circumvents the flooded Alka Talkies underpass.
   - Head to **Report & Voice**, click **मराठी / हिन्दी** voice simulation to see instant transcription and 95% Trust Score verification.
   - Click the **SOS** button, hold the breathing red ring for 2 seconds to showcase the Guardian emergency beacon dispatch and nearest 24x7 hospitals and police stations.
