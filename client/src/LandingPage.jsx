/**
 * LandingPage.jsx
 * Real Estate Trend Detection · OpenStreetMap powered
 * Stack : React JSX · Tailwind v4 · Vite
 * Design: Glassmorphism · Deep Blue · Syne + DM Sans typography
 */

import { useState, useEffect, useRef } from "react";
import {
  TrendingUp, MapPin, BarChart3, Globe2, Search,
  ChevronRight, Activity, Building2, Layers,
  ArrowUpRight, Cpu, Eye, Bell, Star,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import Globe3D, { GLOBE_HOTSPOTS } from "./Globe3D";

// ─── Static data ──────────────────────────────────────────────────────────────

const TREND_DATA = [
  { m: "Jan", idx: 245, vol: 1800 }, { m: "Feb", idx: 258, vol: 2100 },
  { m: "Mar", idx: 271, vol: 2400 }, { m: "Apr", idx: 265, vol: 2200 },
  { m: "May", idx: 289, vol: 2800 }, { m: "Jun", idx: 312, vol: 3200 },
  { m: "Jul", idx: 328, vol: 3100 }, { m: "Aug", idx: 341, vol: 3500 },
  { m: "Sep", idx: 356, vol: 3700 }, { m: "Oct", idx: 372, vol: 4000 },
  { m: "Nov", idx: 368, vol: 3800 }, { m: "Dec", idx: 391, vol: 4200 },
];

const FEATURES = [
  {
    icon: Globe2,
    title: "OpenStreetMap Integration",
    desc: "Real-time OSM data layers map property clusters, zoning boundaries, and urban expansion corridors across 200+ cities.",
    badge: "Live Data",
    gradient: "from-emerald-500 to-green-600",
    navId: "osm",
  },
  {
    icon: Cpu,
    title: "AI Trend Engine",
    desc: "Proprietary ML models analyse 50+ market signals—foot traffic, permit filings, transit proximity—surfacing hotspots months early.",
    badge: "ML Powered",
    gradient: "from-green-500 to-teal-600",
    navId: "prediction",
  },
  {
    icon: Layers,
    title: "Multi-Layer Analysis",
    desc: "Stack demographic, economic, and geospatial layers into a composite heat map with sub-block precision.",
    badge: "GIS Ready",
    gradient: "from-emerald-400 to-green-500",
    navId: "landuse",
  },
  {
    icon: Building2,
    title: "Neighborhood Scoring",
    desc: "Score each neighborhood on transit access, green space, commercial density, and healthcare proximity as a heatmap overlay.",
    badge: "Enterprise",
    gradient: "from-green-400 to-teal-500",
    navId: "neighborhoods",
  },
  {
    icon: Eye,
    title: "Price Prediction",
    desc: "12-month forward models trained on 10 years of transaction data, refreshed weekly with the latest deed recordings.",
    badge: "Forecasting",
    gradient: "from-emerald-400 to-green-600",
    navId: "prediction",
  },
  {
    icon: Bell,
    title: "Real-Time Alerts",
    desc: "Webhook + email alerts the moment a market crosses your custom thresholds: cap rates, DOM velocity, permit clusters.",
    badge: "Instant",
    gradient: "from-green-500 to-emerald-400",
    navId: "alerts",
  },
];

const STATS = [
  { label: "Cities Tracked",   value: "200+", icon: MapPin    },
  { label: "Properties Indexed", value: "12M+", icon: Building2 },
  { label: "Accuracy Rate",    value: "94.7%", icon: Star      },
  { label: "Trend Signals",    value: "50+",  icon: Activity  },
];

const STEPS = [
  {
    num: "01",
    title: "Connect Your Market",
    desc: "Select any city or draw a custom boundary on the map. We ingest OSM data + local transaction records in under 60 seconds.",
  },
  {
    num: "02",
    title: "Configure Your Signals",
    desc: "Choose the indicators that matter—price PSF, permit velocity, walkability, school ratings—and set your alert thresholds.",
  },
  {
    num: "03",
    title: "Act on Insight",
    desc: "Get ranked investment opportunities with confidence scores. Export to your CRM or forward to partners via our REST API.",
  },
];

// ─── Reusable primitives ──────────────────────────────────────────────────────

/** Glassmorphism card – the core reusable surface */
const GlassCard = ({ children, className = "", hover = false, onClick }) => (
  <div
    onClick={onClick}
    className={[
      "rounded-2xl border backdrop-blur-xl",
      "bg-white/[0.04] border-white/[0.08]",
      "shadow-[0_4px_32px_rgba(0,150,70,0.08)]",
      hover && "transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.14] hover:shadow-[0_8px_48px_rgba(0,180,80,0.15)] hover:-translate-y-1",
      className,
    ].filter(Boolean).join(" ")}
  >
    {children}
  </div>
);

/** Pill / badge chip */
const Badge = ({ children, className = "" }) => (
  <span
    className={[
      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-widest uppercase",
      "bg-emerald-500/15 border border-emerald-400/25 text-emerald-300",
      className,
    ].join(" ")}
  >
    {children}
  </span>
);

/** Animated stat counter (counts up once visible) */
const StatCounter = ({ value, label, icon: Icon }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "flex flex-col items-center gap-2 transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
    >
      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center">
        <Icon size={18} className="text-emerald-400" />
      </div>
      <span className="text-3xl font-bold text-white font-display">{value}</span>
      <span className="text-xs text-slate-400 tracking-wider uppercase">{label}</span>
    </div>
  );
};

/** Scroll-reveal wrapper */
const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className,
      ].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Custom Recharts tooltip
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/90 backdrop-blur-xl px-4 py-3 text-sm shadow-xl">
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      <p className="text-emerald-300 font-semibold">Index: {payload[0]?.value}</p>
    </div>
  );
};

// ─── Section components ───────────────────────────────────────────────────────

// ── Hero ─────────────────────────────────────────────────────────────────────
const HeroSection = ({ onNavigate }) => {
  const [activeSpot, setActiveSpot] = useState(0);

  // Cycle through hotspot labels automatically
  useEffect(() => {
    const id = setInterval(() => setActiveSpot(i => (i + 1) % GLOBE_HOTSPOTS.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-56px)] flex items-center overflow-hidden">
      {/* Background orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-green-700/20 blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-emerald-600/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-teal-700/15 blur-[90px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left column */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 backdrop-blur-sm animate-[fadeDown_0.7s_ease_both]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold tracking-wider uppercase">
              Powered by OpenStreetMap · Live
            </span>
          </div>

          <h1 className="font-display text-5xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight text-white animate-[fadeUp_0.7s_0.1s_ease_both]">
            Detect Real Estate&nbsp;
            <span className="relative">
              <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-300 bg-clip-text text-transparent">
                Trends
              </span>
              <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-emerald-400 to-emerald-300 opacity-60 rounded-full" />
            </span>
            &nbsp;Before the Market Does
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed max-w-xl animate-[fadeUp_0.7s_0.2s_ease_both]">
            DetectTrend fuses OpenStreetMap geospatial layers with AI-driven market signals to surface
            high-conviction investment opportunities in real time—at sub-block precision.
          </p>

          {/* Live hotspot ticker */}
          <div className="flex items-center gap-3 animate-[fadeUp_0.7s_0.3s_ease_both]">
            <GlassCard className="flex items-center gap-3 px-4 py-3">
              <MapPin size={14} className="text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-xs text-slate-500 block">Trending now</span>
                <span className="text-sm font-semibold text-white transition-all duration-500">
                  {GLOBE_HOTSPOTS[activeSpot].city}
                </span>
              </div>
              <div className="pl-3 border-l border-white/10">
                <span className="text-xs text-slate-500 block">Avg. price</span>
                <span className="text-sm font-bold text-emerald-300">{GLOBE_HOTSPOTS[activeSpot].price}</span>
              </div>
              <div className="pl-3 border-l border-white/10">
                <span className="text-xs text-slate-500 block">YoY</span>
                <span className="text-sm font-bold text-emerald-400">{GLOBE_HOTSPOTS[activeSpot].trend}</span>
              </div>
            </GlassCard>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 animate-[fadeUp_0.7s_0.4s_ease_both]">
            <button
              onClick={() => onNavigate?.("osm")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-[0_6px_32px_rgba(16,185,129,0.4)] hover:shadow-[0_8px_48px_rgba(16,185,129,0.6)] hover:scale-[1.02] transition-all duration-200"
            >
              Explore Platform <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => onNavigate?.("dashboard")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm text-white font-semibold hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-200"
            >
              View Dashboard <ChevronRight size={16} className="text-slate-400" />
            </button>
          </div>
        </div>

        {/* Right column – Globe */}
        <div className="relative h-[520px] lg:h-[640px] animate-[fadeIn_1s_0.3s_ease_both]">
          {/* Glow behind globe */}
          <div aria-hidden className="absolute inset-0 rounded-full bg-green-600/15 blur-[80px]" />

          {/* Globe canvas */}
          <div className="relative w-full h-full">
            <Globe3D />
          </div>

          {/* Floating hotspot cards */}
          <GlassCard className="absolute top-8 right-0 px-4 py-3 animate-[float_4s_ease-in-out_infinite]">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-emerald-400" />
              <span className="text-xs font-semibold text-white">Dubai · +12.1%</span>
            </div>
            <span className="text-[10px] text-slate-500">Highest YoY growth</span>
          </GlassCard>

          <GlassCard className="absolute bottom-16 left-0 px-4 py-3 animate-[float_5s_1s_ease-in-out_infinite]">
            <div className="flex items-center gap-2">
              <BarChart3 size={14} className="text-emerald-400" />
              <span className="text-xs font-semibold text-white">10 Markets Live</span>
            </div>
            <span className="text-[10px] text-slate-500">Drag to explore</span>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

// ── Stats bar ─────────────────────────────────────────────────────────────────
const StatsBar = () => (
  <section className="relative py-16 overflow-hidden">
    <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />

    <div className="max-w-5xl mx-auto px-6">
      <GlassCard className="px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 divide-x divide-white/[0.06]">
          {STATS.map(s => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>
      </GlassCard>
    </div>
  </section>
);

// ── Features grid ─────────────────────────────────────────────────────────────
const FeaturesSection = ({ onNavigate }) => (
  <section className="relative py-24 overflow-hidden" id="platform">
    <div aria-hidden className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full bg-teal-700/10 blur-[120px] pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6">
      <Reveal className="text-center mb-16 space-y-4">
        <Badge>Platform</Badge>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
          Everything you need to<br />
          <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            lead the market
          </span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
          Six layers of intelligence, one unified platform. Built for analysts,
          fund managers, and developers who refuse to guess.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((feat, i) => (
          <Reveal key={feat.title} delay={i * 80}>
            <GlassCard
              hover
              className="p-6 h-full space-y-4 cursor-pointer"
              onClick={() => onNavigate?.(feat.navId)}
            >
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center shadow-lg`}>
                  <feat.icon size={20} className="text-white" />
                </div>
                <Badge>{feat.badge}</Badge>
              </div>
              <h3 className="font-display text-lg font-semibold text-white">{feat.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                Open feature <ArrowUpRight size={11} />
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ── Trend chart section ───────────────────────────────────────────────────────
const TrendSection = () => {
  const [activeMetric, setActiveMetric] = useState("idx");

  return (
    <section className="py-24 relative overflow-hidden" id="markets">
      <div aria-hidden className="absolute left-0 top-0 w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
        {/* Left */}
        <Reveal className="space-y-6">
          <Badge>Market Intelligence</Badge>
          <h2 className="font-display text-4xl font-bold text-white leading-tight">
            Real-time trend signals,<br />
            <span className="text-emerald-400">visualised instantly</span>
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Our Global Property Index aggregates thousands of data points daily.
            Spot turning points before they make headlines.
          </p>

          {/* Metric selector */}
          <div className="flex gap-2">
            {[
              { key: "idx", label: "Price Index" },
              { key: "vol", label: "Transaction Vol." },
            ].map(m => (
              <button
                key={m.key}
                onClick={() => setActiveMetric(m.key)}
                className={[
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  activeMetric === m.key
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-[0_4px_16px_rgba(16,185,129,0.35)]"
                    : "border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.05]",
                ].join(" ")}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "YTD Growth",    value: "+59.6%", color: "text-emerald-400" },
              { label: "Peak Month",    value: "Dec",    color: "text-emerald-300"     },
              { label: "Avg Monthly",   value: "+5.0%",  color: "text-blue-300"    },
              { label: "Markets Live",  value: "10",     color: "text-cyan-300"    },
            ].map(s => (
              <GlassCard key={s.label} className="px-4 py-3">
                <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-0.5">{s.label}</p>
                <p className={`text-xl font-bold font-display ${s.color}`}>{s.value}</p>
              </GlassCard>
            ))}
          </div>
        </Reveal>

        {/* Right – chart */}
        <Reveal delay={150}>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Global Property Index</p>
                <p className="text-2xl font-bold text-white font-display">391 <span className="text-sm text-emerald-400 font-medium">+59.6%</span></p>
              </div>
              <Badge>2024</Badge>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={TREND_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#34d399" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="m" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(52,211,153,0.2)", strokeWidth: 1 }} />
                <Area
                  type="monotone"
                  dataKey={activeMetric}
                  stroke="#34d399"
                  strokeWidth={2}
                  fill="url(#chartGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#34d399", stroke: "#10b981", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
};

// ── OSM Map preview ───────────────────────────────────────────────────────────
const MapPreviewSection = () => (
  <section className="py-24 relative overflow-hidden">
    <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

    <div className="max-w-7xl mx-auto px-6">
      <Reveal className="text-center mb-12 space-y-4">
        <Badge>OpenStreetMap</Badge>
        <h2 className="font-display text-4xl font-bold text-white">
          Sub-block precision,<br />
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
            city-wide coverage
          </span>
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <GlassCard className="overflow-hidden">
          {/* Mock map header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {["bg-red-400", "bg-yellow-400", "bg-green-400"].map(c => (
                  <span key={c} className={`w-3 h-3 rounded-full ${c} opacity-60`} />
                ))}
              </div>
              <span className="text-xs text-slate-500">DetectTrend Map — New York City</span>
            </div>
            <div className="flex items-center gap-2">
              <GlassCard className="flex items-center gap-2 px-3 py-1.5">
                <Search size={12} className="text-slate-500" />
                <span className="text-xs text-slate-500">Search area…</span>
              </GlassCard>
              <Badge>Live</Badge>
            </div>
          </div>

          {/* Map mock canvas */}
          <div className="relative h-80 bg-gradient-to-br from-slate-950 via-[#020f08] to-slate-900 overflow-hidden">
            {/* Grid lines simulating OSM tiles */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#1ea060" strokeWidth="0.5" />
                </pattern>
                <pattern id="bigGrid" width="192" height="192" patternUnits="userSpaceOnUse">
                  <rect width="192" height="192" fill="url(#grid)" />
                  <path d="M 192 0 L 0 0 0 192" fill="none" stroke="#2ab870" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#bigGrid)" />
            </svg>

            {/* Simulated road network */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <line x1="0"   y1="120" x2="100%" y2="110" stroke="#34d399" strokeWidth="2" />
              <line x1="0"   y1="220" x2="100%" y2="215" stroke="#34d399" strokeWidth="1.5" />
              <line x1="180" y1="0"   x2="175"  y2="100%" stroke="#34d399" strokeWidth="2" />
              <line x1="420" y1="0"   x2="415"  y2="100%" stroke="#34d399" strokeWidth="1.5" />
              <line x1="680" y1="0"   x2="670"  y2="100%" stroke="#34d399" strokeWidth="2" />
            </svg>

            {/* Heat zones */}
            {[
              { x: "22%", y: "35%", size: 100, opacity: 0.25, color: "#f97316" },
              { x: "55%", y: "55%", size: 140, opacity: 0.20, color: "#34d399" },
              { x: "75%", y: "30%", size: 90,  opacity: 0.22, color: "#a855f7" },
              { x: "40%", y: "70%", size: 80,  opacity: 0.18, color: "#22d3ee" },
            ].map((z, i) => (
              <div
                key={i}
                className="absolute rounded-full blur-3xl animate-pulse"
                style={{
                  left: z.x, top: z.y,
                  width: z.size, height: z.size,
                  background: z.color,
                  opacity: z.opacity,
                  transform: "translate(-50%,-50%)",
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: "3s",
                }}
              />
            ))}

            {/* Pin markers */}
            {[
              { x: "22%", y: "35%", label: "Upper West",  value: "$2.1M", up: true  },
              { x: "55%", y: "55%", label: "Midtown",     value: "$3.4M", up: true  },
              { x: "75%", y: "30%", label: "Brooklyn",    value: "$1.1M", up: false },
            ].map((pin, i) => (
              <div
                key={i}
                className="absolute flex flex-col items-center gap-1"
                style={{ left: pin.x, top: pin.y, transform: "translate(-50%,-100%)" }}
              >
                <GlassCard className="px-3 py-1.5 whitespace-nowrap">
                  <p className="text-[10px] text-slate-400">{pin.label}</p>
                  <p className={`text-xs font-bold ${pin.up ? "text-emerald-400" : "text-orange-400"}`}>{pin.value}</p>
                </GlassCard>
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              </div>
            ))}

            {/* Layer controls */}
            <div className="absolute top-4 right-4 space-y-2">
              {["Heat Map", "Transactions", "Zoning"].map(layer => (
                <GlassCard key={layer} className="px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-white/[0.08] transition-colors">
                  <Layers size={10} className="text-emerald-400" />
                  <span className="text-[10px] text-slate-300">{layer}</span>
                </GlassCard>
              ))}
            </div>
          </div>
        </GlassCard>
      </Reveal>
    </div>
  </section>
);

// ── How it works ──────────────────────────────────────────────────────────────
const HowItWorksSection = () => (
  <section className="py-24 relative overflow-hidden">
    <div aria-hidden className="absolute right-0 top-1/3 w-[400px] h-[400px] rounded-full bg-green-700/12 blur-[100px] pointer-events-none" />

    <div className="max-w-5xl mx-auto px-6">
      <Reveal className="text-center mb-16 space-y-4">
        <Badge>Getting Started</Badge>
        <h2 className="font-display text-4xl font-bold text-white">
          From data to insight<br />
          <span className="text-emerald-400">in three steps</span>
        </h2>
      </Reveal>

      <div className="relative grid md:grid-cols-3 gap-6">
        {/* Connector line */}
        <div aria-hidden className="hidden md:block absolute top-10 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-emerald-500/60 via-green-500/40 to-emerald-500/60" />

        {STEPS.map((step, i) => (
          <Reveal key={step.num} delay={i * 120}>
            <GlassCard hover className="p-6 space-y-4 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-600/20 border border-emerald-400/20 flex items-center justify-center">
                <span className="font-display text-2xl font-black text-emerald-400">{step.num}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ── CTA section ───────────────────────────────────────────────────────────────
const CTASection = ({ onNavigate }) => (
  <section className="py-28 relative overflow-hidden">
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-green-600/15 blur-[100px]" />
    </div>

    <div className="max-w-4xl mx-auto px-6 text-center">
      <Reveal className="space-y-8">
        <Badge>Early Access</Badge>
        <h2 className="font-display text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          Ready to invest<br />
          <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-300 bg-clip-text text-transparent">
            one step ahead?
          </span>
        </h2>
        <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
          Join 400+ analysts and fund managers already using TerrAIn to find tomorrow's opportunities today.
          Free 14-day trial. No card required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <GlassCard className="flex items-center gap-3 px-4 py-3 w-full sm:w-80">
            <Search size={16} className="text-slate-500 shrink-0" />
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-transparent text-sm text-white placeholder-slate-500 outline-none flex-1 min-w-0"
            />
          </GlassCard>
          <button
            onClick={() => onNavigate?.("osm")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-[0_6px_32px_rgba(16,185,129,0.4)] hover:shadow-[0_8px_48px_rgba(16,185,129,0.6)] hover:scale-[1.02] transition-all duration-200 whitespace-nowrap"
          >
            Explore Platform <ArrowUpRight size={16} />
          </button>
        </div>

        <p className="text-slate-600 text-xs">
          No spam. No credit card. Cancel anytime.
        </p>
      </Reveal>
    </div>
  </section>
);

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="border-t border-white/[0.06] py-10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center">
          <Globe2 size={14} className="text-white" />
        </div>
        <span className="font-display text-base font-bold text-white">
          Detect<span className="text-emerald-400">Trend AI</span>
        </span>
      </div>
      <p className="text-slate-600 text-xs text-center">
        © {new Date().getFullYear()} DetectTrend. Powered by OpenStreetMap contributors.
      </p>
      <div className="flex gap-5">
        {["Privacy", "Terms", "API"].map(l => (
          <a key={l} href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{l}</a>
        ))}
      </div>
    </div>
  </footer>
);

// ─── Root page ────────────────────────────────────────────────────────────────
export default function LandingPage({ onNavigate }) {
  return (
    <>
      {/* Google Fonts – injected once at root */}
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-[#040f07] text-white">
        <main>
          <HeroSection onNavigate={onNavigate} />
          <StatsBar />
          <FeaturesSection onNavigate={onNavigate} />
          <TrendSection />
          <MapPreviewSection />
          <HowItWorksSection />
          <CTASection onNavigate={onNavigate} />
        </main>
        <Footer />
      </div>
    </>
  );
}
