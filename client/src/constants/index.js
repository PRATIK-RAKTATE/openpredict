// ─── Fake / static data for all feature UIs ──────────────────────────────────

export const POI_CATEGORIES = [
  { id: "schools", label: "Schools", icon: "🏫", count: 142, color: "#10b981" },
  { id: "hospitals", label: "Hospitals", icon: "🏥", count: 38, color: "#ef4444" },
  { id: "bus_stops", label: "Bus Stops", icon: "🚌", count: 317, color: "#f59e0b" },
  { id: "restaurants", label: "Restaurants", icon: "🍽️", count: 524, color: "#10b981" },
  { id: "parks", label: "Parks", icon: "🌳", count: 89, color: "#22c55e" },
  { id: "supermarkets", label: "Supermarkets", icon: "🛒", count: 67, color: "#14b8a6" },
  { id: "gyms", label: "Gyms", icon: "🏋️", count: 43, color: "#ec4899" },
  { id: "atms", label: "ATMs", icon: "🏧", count: 198, color: "#059669" },
];

export const EXTRACTION_LOG = [
  { time: "10:42:01", status: "success", message: "Fetched 142 schools in 2.3s" },
  { time: "10:42:04", status: "success", message: "Fetched 38 hospitals in 1.1s" },
  { time: "10:42:06", status: "success", message: "Fetched 317 bus stops in 3.7s" },
  { time: "10:42:10", status: "warning", message: "Overpass rate-limit: retrying in 2s" },
  { time: "10:42:12", status: "success", message: "Fetched 524 restaurants in 4.2s" },
  { time: "10:42:15", status: "success", message: "Road network downloaded (12.4 MB)" },
  { time: "10:42:18", status: "success", message: "Road density score computed" },
];

export const ROAD_DENSITY = [
  { area: "Koregaon Park", density: 87, length_km: 42.3 },
  { area: "Baner", density: 74, length_km: 38.1 },
  { area: "Viman Nagar", density: 91, length_km: 51.7 },
  { area: "Hinjewadi", density: 63, length_km: 29.4 },
  { area: "Kothrud", density: 82, length_km: 44.8 },
];

// ─── Proximity Feature Engineering ───────────────────────────────────────────

export const PROPERTY_SAMPLES = [
  {
    id: "P001",
    address: "12 Rose Garden, Koregaon Park",
    lat: 18.5362,
    lng: 73.8937,
    walkability: 82,
    nearest_school_m: 340,
    nearest_hospital_m: 1200,
    nearest_bus_m: 80,
    nearest_park_m: 420,
    feature_vector: [0.82, 0.91, 0.65, 0.78, 0.88],
  },
  {
    id: "P002",
    address: "45 Tech Hub Rd, Hinjewadi",
    lat: 18.5915,
    lng: 73.7380,
    walkability: 54,
    nearest_school_m: 1100,
    nearest_hospital_m: 2400,
    nearest_bus_m: 320,
    nearest_park_m: 1800,
    feature_vector: [0.54, 0.48, 0.62, 0.41, 0.55],
  },
  {
    id: "P003",
    address: "7 Green Ave, Baner",
    lat: 18.5590,
    lng: 73.7868,
    walkability: 71,
    nearest_school_m: 560,
    nearest_hospital_m: 900,
    nearest_bus_m: 140,
    nearest_park_m: 680,
    feature_vector: [0.71, 0.74, 0.69, 0.80, 0.72],
  },
];

export const WALKABILITY_BREAKDOWN = [
  { factor: "Footpath Coverage", score: 78, weight: 0.3 },
  { factor: "Transit Access", score: 91, weight: 0.25 },
  { factor: "Amenity Density", score: 85, weight: 0.2 },
  { factor: "Road Safety", score: 67, weight: 0.15 },
  { factor: "Green Space", score: 72, weight: 0.1 },
];

// ─── Price Trend Prediction ───────────────────────────────────────────────────

export const PRICE_HISTORY = [
  { month: "Jan'24", actual: 6800, predicted: 6750, rf: 6820, xgb: 6790 },
  { month: "Feb'24", actual: 7100, predicted: 7050, rf: 7120, xgb: 7080 },
  { month: "Mar'24", actual: 7350, predicted: 7300, rf: 7380, xgb: 7340 },
  { month: "Apr'24", actual: 7200, predicted: 7250, rf: 7180, xgb: 7220 },
  { month: "May'24", actual: 7600, predicted: 7550, rf: 7630, xgb: 7580 },
  { month: "Jun'24", actual: 7900, predicted: 7870, rf: 7940, xgb: 7910 },
  { month: "Jul'24", actual: 8100, predicted: 8050, rf: 8130, xgb: 8090 },
  { month: "Aug'24", actual: 8400, predicted: 8380, rf: 8430, xgb: 8410 },
];

export const FORECAST_DATA = [
  { period: "3 months", low: 8600, mid: 8900, high: 9200, confidence: 87 },
  { period: "6 months", low: 8900, mid: 9400, high: 9900, confidence: 74 },
  { period: "12 months", low: 9200, mid: 10100, high: 11000, confidence: 61 },
];

export const MODEL_METRICS = [
  { model: "Linear Regression", rmse: 342, mae: 281, r2: 0.84, training_time: "0.2s" },
  { model: "Random Forest", rmse: 198, mae: 164, r2: 0.93, training_time: "4.1s" },
  { model: "XGBoost", rmse: 176, mae: 142, r2: 0.95, training_time: "6.7s" },
];

// ─── Neighborhood Scoring ─────────────────────────────────────────────────────

export const NEIGHBORHOODS = [
  {
    name: "Koregaon Park",
    transit: 88,
    green_space: 72,
    commercial: 91,
    healthcare: 85,
    overall: 84,
    color: "#10b981",
  },
  {
    name: "Baner",
    transit: 74,
    green_space: 68,
    commercial: 78,
    healthcare: 71,
    overall: 73,
    color: "#14b8a6",
  },
  {
    name: "Hinjewadi",
    transit: 52,
    green_space: 61,
    commercial: 84,
    healthcare: 48,
    overall: 61,
    color: "#f59e0b",
  },
  {
    name: "Viman Nagar",
    transit: 91,
    green_space: 55,
    commercial: 88,
    healthcare: 79,
    overall: 78,
    color: "#10b981",
  },
  {
    name: "Kothrud",
    transit: 83,
    green_space: 76,
    commercial: 73,
    healthcare: 88,
    overall: 80,
    color: "#ec4899",
  },
];

export const SCORE_DIMENSIONS = ["transit", "green_space", "commercial", "healthcare"];

// ─── Land Use Analysis ────────────────────────────────────────────────────────

export const LAND_USE_ZONES = [
  { type: "Residential", area_km2: 48.3, percentage: 38, color: "#10b981", tag: "landuse=residential" },
  { type: "Commercial", area_km2: 22.1, percentage: 17, color: "#f59e0b", tag: "landuse=commercial" },
  { type: "Industrial", area_km2: 15.7, percentage: 12, color: "#ef4444", tag: "landuse=industrial" },
  { type: "Mixed-Use", area_km2: 19.4, percentage: 15, color: "#14b8a6", tag: "landuse=mixed" },
  { type: "Green / Parks", area_km2: 23.8, percentage: 19, color: "#22c55e", tag: "leisure=park" },
];

export const URBAN_CHANGE_EVENTS = [
  { date: "2024-11-12", area: "Hinjewadi Ph-4", type: "New Construction", impact: "+3.2%", severity: "high" },
  { date: "2024-10-28", area: "Baner Link Rd", type: "Road Addition", impact: "+1.8%", severity: "medium" },
  { date: "2024-10-05", area: "Kothrud West", type: "Zoning Change", impact: "+2.5%", severity: "high" },
  { date: "2024-09-17", area: "Wagholi", type: "New Metro Stop", impact: "+4.1%", severity: "high" },
  { date: "2024-08-30", area: "Hadapsar", type: "Commercial Complex", impact: "+1.4%", severity: "low" },
];

// ─── Trend Visualization Dashboard ───────────────────────────────────────────

export const DASHBOARD_TREND_DATA = [
  { m: "Jan", apartment: 7200, villa: 12400, plot: 4800, commercial: 9100 },
  { m: "Feb", apartment: 7400, villa: 12800, plot: 4900, commercial: 9300 },
  { m: "Mar", apartment: 7600, villa: 13100, plot: 5100, commercial: 9600 },
  { m: "Apr", apartment: 7500, villa: 12900, plot: 5000, commercial: 9400 },
  { m: "May", apartment: 7900, villa: 13500, plot: 5300, commercial: 9900 },
  { m: "Jun", apartment: 8200, villa: 14000, plot: 5600, commercial: 10200 },
  { m: "Jul", apartment: 8500, villa: 14400, plot: 5800, commercial: 10500 },
  { m: "Aug", apartment: 8800, villa: 14900, plot: 6000, commercial: 10900 },
];

export const PRICE_ZONES = [
  { zone: "Zone A — Koregaon Park", avg_price: 18400, change: "+8.2%", tier: "Premium" },
  { zone: "Zone B — Viman Nagar", avg_price: 11200, change: "+6.1%", tier: "High" },
  { zone: "Zone C — Baner", avg_price: 9800, change: "+5.4%", tier: "Mid" },
  { zone: "Zone D — Hinjewadi", avg_price: 7600, change: "+4.7%", tier: "Mid" },
  { zone: "Zone E — Kothrud", avg_price: 8900, change: "+3.9%", tier: "Mid" },
  { zone: "Zone F — Wagholi", avg_price: 5200, change: "+7.8%", tier: "Growth" },
];

// ─── Alert & Monitoring System ────────────────────────────────────────────────

export const ACTIVE_ALERTS = [
  {
    id: "A001",
    neighborhood: "Koregaon Park",
    type: "Price Threshold",
    condition: "Avg price > ₹18,000/sqft",
    status: "triggered",
    triggered_at: "2024-12-18 09:14",
    channel: "email",
  },
  {
    id: "A002",
    neighborhood: "Wagholi",
    type: "Infrastructure Change",
    condition: "New metro stop detected",
    status: "triggered",
    triggered_at: "2024-09-17 14:22",
    channel: "webhook",
  },
  {
    id: "A003",
    neighborhood: "Baner",
    type: "Price Threshold",
    condition: "Monthly growth > 2%",
    status: "active",
    triggered_at: null,
    channel: "email",
  },
  {
    id: "A004",
    neighborhood: "Hinjewadi",
    type: "OSM Change Feed",
    condition: "New road added",
    status: "active",
    triggered_at: null,
    channel: "slack",
  },
];

export const OSM_DIFF_FEED = [
  { timestamp: "2024-12-19 06:00", changeset: "148291034", type: "way", tag: "highway=primary", area: "Baner" },
  { timestamp: "2024-12-18 18:31", changeset: "148267512", type: "node", tag: "amenity=hospital", area: "Kothrud" },
  { timestamp: "2024-12-18 11:05", changeset: "148243891", type: "relation", tag: "landuse=construction", area: "Hinjewadi" },
  { timestamp: "2024-12-17 22:47", changeset: "148219003", type: "way", tag: "building=apartments", area: "Wagholi" },
];

// ─── Data Import & Export ─────────────────────────────────────────────────────

export const IMPORT_HISTORY = [
  { id: "IMP-001", filename: "pune_listings_q4.csv", rows: 1842, status: "success", date: "2024-12-15", source: "CSV" },
  { id: "IMP-002", filename: "mumbai_properties.json", rows: 3401, status: "success", date: "2024-12-10", source: "JSON" },
  { id: "IMP-003", filename: "zillow_export.csv", rows: 924, status: "error", date: "2024-12-08", source: "API" },
  { id: "IMP-004", filename: "magicbricks_feed.json", rows: 2156, status: "success", date: "2024-12-01", source: "API" },
];

export const EXPORT_TEMPLATES = [
  { format: "CSV", desc: "Prediction results + feature vectors", size: "~2.4 MB", icon: "📄" },
  { format: "GeoJSON", desc: "Geospatial property data with scores", size: "~5.1 MB", icon: "🗺️" },
  { format: "HTML Map", desc: "Interactive Leaflet map, self-contained", size: "~1.8 MB", icon: "🌐" },
  { format: "PDF Report", desc: "Summary report with charts", size: "~3.2 MB", icon: "📊" },
];

export const API_ENDPOINTS = [
  { method: "GET", path: "/api/v1/predict", desc: "Get price prediction for lat/lng" },
  { method: "GET", path: "/api/v1/neighborhood/:id/score", desc: "Neighborhood livability score" },
  { method: "POST", path: "/api/v1/import", desc: "Upload CSV/JSON listing data" },
  { method: "GET", path: "/api/v1/alerts", desc: "List all active price alerts" },
  { method: "GET", path: "/api/v1/osm/pois", desc: "Fetch POIs for a bounding box" },
];
