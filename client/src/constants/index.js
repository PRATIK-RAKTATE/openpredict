// ─── Fake / static data for all feature UIs ──────────────────────────────────

export const POI_CATEGORIES = [
  { id: "schools", label: "Schools", icon: "🏫", count: 98, color: "#10b981" },
  { id: "hospitals", label: "Hospitals", icon: "🏥", count: 27, color: "#ef4444" },
  { id: "bus_stops", label: "Bus Stops", icon: "🚌", count: 214, color: "#f59e0b" },
  { id: "restaurants", label: "Restaurants", icon: "🍽️", count: 376, color: "#10b981" },
  { id: "parks", label: "Parks", icon: "🌳", count: 54, color: "#22c55e" },
  { id: "supermarkets", label: "Supermarkets", icon: "🛒", count: 48, color: "#14b8a6" },
  { id: "gyms", label: "Gyms", icon: "🏋️", count: 31, color: "#ec4899" },
  { id: "atms", label: "ATMs", icon: "🏧", count: 143, color: "#059669" },
];

export const EXTRACTION_LOG = [
  { time: "10:42:01", status: "success", message: "Fetched 112 schools in 2.4s" },
  { time: "10:42:04", status: "success", message: "Fetched 34 hospitals in 1.0s" },
  { time: "10:42:07", status: "success", message: "Fetched 420 bus stops in 3.4s" },
  { time: "10:42:11", status: "warning", message: "Overpass rate-limit: retrying in 2s" },
  { time: "10:42:13", status: "success", message: "Fetched 463 restaurants in 4.0s" },
  { time: "10:42:16", status: "success", message: "Road network downloaded (8.7 MB)" },
  { time: "10:42:19", status: "success", message: "Road density score computed" },
];

export const ROAD_DENSITY = [
  { area: "Gangapur Road", density: 84, length_km: 38.6 },
  { area: "College Road", density: 79, length_km: 34.2 },
  { area: "Cidco", density: 88, length_km: 46.3 },
  { area: "Ambad", density: 61, length_km: 27.1 },
  { area: "Dwarka", density: 76, length_km: 40.5 },
];

// ─── Proximity Feature Engineering ───────────────────────────────────────────

export const PROPERTY_SAMPLES = [
  {
    id: "P001",
    address: "14 Vrindavan Colony, Gangapur Road",
    lat: 19.9975,
    lng: 73.7898,
    walkability: 79,
    nearest_school_m: 380,
    nearest_hospital_m: 1050,
    nearest_bus_m: 110,
    nearest_park_m: 460,
    feature_vector: [0.79, 0.87, 0.63, 0.75, 0.84],
  },
  {
    id: "P002",
    address: "22 MIDC Industrial Zone, Ambad",
    lat: 19.9833,
    lng: 73.7312,
    walkability: 49,
    nearest_school_m: 1240,
    nearest_hospital_m: 2700,
    nearest_bus_m: 360,
    nearest_park_m: 2100,
    feature_vector: [0.49, 0.44, 0.58, 0.38, 0.51],
  },
  {
    id: "P003",
    address: "5 Sainath Nagar, Dwarka",
    lat: 20.0059,
    lng: 73.7742,
    walkability: 68,
    nearest_school_m: 590,
    nearest_hospital_m: 870,
    nearest_bus_m: 160,
    nearest_park_m: 720,
    feature_vector: [0.68, 0.71, 0.65, 0.77, 0.69],
  },
];

export const WALKABILITY_BREAKDOWN = [
  { factor: "Footpath Coverage", score: 72, weight: 0.3 },
  { factor: "Transit Access", score: 85, weight: 0.25 },
  { factor: "Amenity Density", score: 79, weight: 0.2 },
  { factor: "Road Safety", score: 63, weight: 0.15 },
  { factor: "Green Space", score: 68, weight: 0.1 },
];

// ─── Price Trend Prediction ───────────────────────────────────────────────────

export const PRICE_HISTORY = [
  { month: "Jan'24", actual: 4900, predicted: 4860, rf: 4920, xgb: 4890 },
  { month: "Feb'24", actual: 5100, predicted: 5060, rf: 5130, xgb: 5090 },
  { month: "Mar'24", actual: 5300, predicted: 5260, rf: 5340, xgb: 5310 },
  { month: "Apr'24", actual: 5200, predicted: 5240, rf: 5180, xgb: 5220 },
  { month: "May'24", actual: 5500, predicted: 5460, rf: 5530, xgb: 5490 },
  { month: "Jun'24", actual: 5750, predicted: 5720, rf: 5780, xgb: 5760 },
  { month: "Jul'24", actual: 5950, predicted: 5910, rf: 5980, xgb: 5960 },
  { month: "Aug'24", actual: 6200, predicted: 6170, rf: 6230, xgb: 6210 },
];

export const FORECAST_DATA = [
  { period: "3 months", low: 6350, mid: 6550, high: 6750, confidence: 86 },
  { period: "6 months", low: 6550, mid: 6900, high: 7250, confidence: 72 },
  { period: "12 months", low: 6800, mid: 7400, high: 8100, confidence: 59 },
];

export const MODEL_METRICS = [
  { model: "Linear Regression", rmse: 318, mae: 264, r2: 0.83, training_time: "0.2s" },
  { model: "Random Forest", rmse: 182, mae: 151, r2: 0.92, training_time: "3.8s" },
  { model: "XGBoost", rmse: 161, mae: 129, r2: 0.94, training_time: "6.2s" },
];

// ─── Neighborhood Scoring ─────────────────────────────────────────────────────

export const NEIGHBORHOODS = [
  {
    name: "Gangapur Road",
    transit: 84,
    green_space: 70,
    commercial: 88,
    healthcare: 82,
    overall: 81,
    color: "#10b981",
  },
  {
    name: "College Road",
    transit: 81,
    green_space: 66,
    commercial: 85,
    healthcare: 80,
    overall: 78,
    color: "#14b8a6",
  },
  {
    name: "Cidco",
    transit: 76,
    green_space: 74,
    commercial: 79,
    healthcare: 73,
    overall: 75,
    color: "#f59e0b",
  },
  {
    name: "Dwarka",
    transit: 78,
    green_space: 62,
    commercial: 81,
    healthcare: 76,
    overall: 74,
    color: "#10b981",
  },
  {
    name: "Panchavati",
    transit: 71,
    green_space: 80,
    commercial: 76,
    healthcare: 84,
    overall: 77,
    color: "#ec4899",
  },
  {
    name: "Ambad",
    transit: 54,
    green_space: 58,
    commercial: 72,
    healthcare: 49,
    overall: 58,
    color: "#6366f1",
  },
];

export const SCORE_DIMENSIONS = ["transit", "green_space", "commercial", "healthcare"];

// ─── Land Use Analysis ────────────────────────────────────────────────────────

export const LAND_USE_ZONES = [
  { type: "Residential", area_km2: 36.4, percentage: 40, color: "#10b981", tag: "landuse=residential" },
  { type: "Commercial", area_km2: 14.8, percentage: 16, color: "#f59e0b", tag: "landuse=commercial" },
  { type: "Industrial", area_km2: 18.2, percentage: 20, color: "#ef4444", tag: "landuse=industrial" },
  { type: "Mixed-Use", area_km2: 11.6, percentage: 13, color: "#14b8a6", tag: "landuse=mixed" },
  { type: "Green / Parks", area_km2: 10.1, percentage: 11, color: "#22c55e", tag: "leisure=park" },
];

export const URBAN_CHANGE_EVENTS = [
  { date: "2024-11-20", area: "Pathardi Phata", type: "New Construction", impact: "+2.9%", severity: "high" },
  { date: "2024-10-31", area: "Gangapur Road", type: "Road Widening", impact: "+1.6%", severity: "medium" },
  { date: "2024-10-09", area: "Satpur MIDC", type: "Zoning Change", impact: "+2.2%", severity: "high" },
  { date: "2024-09-22", area: "Nashik Road", type: "New Bus Depot", impact: "+1.8%", severity: "medium" },
  { date: "2024-08-14", area: "Indira Nagar", type: "Commercial Complex", impact: "+1.3%", severity: "low" },
];

// ─── Trend Visualization Dashboard ───────────────────────────────────────────

export const DASHBOARD_TREND_DATA = [
  { m: "Jan", apartment: 5100, villa: 8900, plot: 3200, commercial: 6400 },
  { m: "Feb", apartment: 5250, villa: 9100, plot: 3300, commercial: 6600 },
  { m: "Mar", apartment: 5400, villa: 9400, plot: 3450, commercial: 6800 },
  { m: "Apr", apartment: 5300, villa: 9200, plot: 3380, commercial: 6700 },
  { m: "May", apartment: 5600, villa: 9700, plot: 3550, commercial: 7000 },
  { m: "Jun", apartment: 5850, villa: 10100, plot: 3700, commercial: 7300 },
  { m: "Jul", apartment: 6050, villa: 10500, plot: 3850, commercial: 7600 },
  { m: "Aug", apartment: 6250, villa: 10900, plot: 4000, commercial: 7900 },
];

export const PRICE_ZONES = [
  { zone: "Zone A — Gangapur Road", avg_price: 9800, change: "+7.4%", tier: "Premium" },
  { zone: "Zone B — College Road", avg_price: 8200, change: "+5.8%", tier: "High" },
  { zone: "Zone C — Dwarka", avg_price: 6900, change: "+5.1%", tier: "Mid" },
  { zone: "Zone D — Cidco", avg_price: 6100, change: "+4.4%", tier: "Mid" },
  { zone: "Zone E — Panchavati", avg_price: 7400, change: "+3.6%", tier: "Mid" },
  { zone: "Zone F — Pathardi Phata", avg_price: 3800, change: "+9.2%", tier: "Growth" },
];

// ─── Alert & Monitoring System ────────────────────────────────────────────────

export const ACTIVE_ALERTS = [
  {
    id: "A001",
    neighborhood: "Gangapur Road",
    type: "Price Threshold",
    condition: "Avg price > ₹9,500/sqft",
    status: "triggered",
    triggered_at: "2024-12-18 09:14",
    channel: "email",
  },
  {
    id: "A002",
    neighborhood: "Pathardi Phata",
    type: "Infrastructure Change",
    condition: "New bus depot detected",
    status: "triggered",
    triggered_at: "2024-09-22 14:22",
    channel: "webhook",
  },
  {
    id: "A003",
    neighborhood: "College Road",
    type: "Price Threshold",
    condition: "Monthly growth > 2%",
    status: "active",
    triggered_at: null,
    channel: "email",
  },
  {
    id: "A004",
    neighborhood: "Ambad",
    type: "OSM Change Feed",
    condition: "New road added",
    status: "active",
    triggered_at: null,
    channel: "slack",
  },
];

export const OSM_DIFF_FEED = [
  { timestamp: "2024-12-19 06:00", changeset: "148291034", type: "way", tag: "highway=primary", area: "Gangapur Road" },
  { timestamp: "2024-12-18 18:31", changeset: "148267512", type: "node", tag: "amenity=hospital", area: "Panchavati" },
  { timestamp: "2024-12-18 11:05", changeset: "148243891", type: "relation", tag: "landuse=construction", area: "Satpur MIDC" },
  { timestamp: "2024-12-17 22:47", changeset: "148219003", type: "way", tag: "building=apartments", area: "Pathardi Phata" },
];

// ─── Data Import & Export ─────────────────────────────────────────────────────

export const IMPORT_HISTORY = [
  { id: "IMP-001", filename: "nashik_listings_q4.csv", rows: 1124, status: "success", date: "2024-12-15", source: "CSV" },
  { id: "IMP-002", filename: "nashik_properties.json", rows: 2187, status: "success", date: "2024-12-10", source: "JSON" },
  { id: "IMP-003", filename: "99acres_export.csv", rows: 748, status: "error", date: "2024-12-08", source: "API" },
  { id: "IMP-004", filename: "magicbricks_nashik_feed.json", rows: 1563, status: "success", date: "2024-12-01", source: "API" },
];

export const EXPORT_TEMPLATES = [
  { format: "CSV", desc: "Prediction results + feature vectors", size: "~1.8 MB", icon: "📄" },
  { format: "GeoJSON", desc: "Geospatial property data with scores", size: "~3.7 MB", icon: "🗺️" },
  { format: "HTML Map", desc: "Interactive Leaflet map, self-contained", size: "~1.4 MB", icon: "🌐" },
  { format: "PDF Report", desc: "Summary report with charts", size: "~2.6 MB", icon: "📊" },
];

export const API_ENDPOINTS = [
  { method: "GET", path: "/api/v1/predict", desc: "Get price prediction for lat/lng" },
  { method: "GET", path: "/api/v1/neighborhood/:id/score", desc: "Neighborhood livability score" },
  { method: "POST", path: "/api/v1/import", desc: "Upload CSV/JSON listing data" },
  { method: "GET", path: "/api/v1/alerts", desc: "List all active price alerts" },
  { method: "GET", path: "/api/v1/osm/pois", desc: "Fetch POIs for a bounding box" },
];