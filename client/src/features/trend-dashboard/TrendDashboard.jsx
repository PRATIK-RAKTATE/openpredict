import { useState } from "react";
import { BarChart3, Download, Map } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import { DASHBOARD_TREND_DATA, PRICE_ZONES } from "../../constants";

const glass = "bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl";

const PROPERTY_TYPES = [
  { key: "apartment", label: "Apartment", color: "#3b82f6" },
  { key: "villa", label: "Villa", color: "#8b5cf6" },
  { key: "plot", label: "Plot", color: "#10b981" },
  { key: "commercial", label: "Commercial", color: "#f59e0b" },
];

const TIER_STYLES = {
  Premium: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  High: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  Mid: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  Growth: "text-green-400 bg-green-500/10 border-green-500/30",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d1b2a] border border-white/10 rounded-xl p-3 text-xs space-y-1">
      <p className="text-white/60 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: ₹{p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function TrendDashboard() {
  const [activePeriod, setActivePeriod] = useState("8M");
  const [activeTypes, setActiveTypes] = useState(new Set(["apartment", "villa"]));

  const toggleType = (k) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(k) && next.size > 1) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <BarChart3 size={20} className="text-cyan-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Trend Visualization Dashboard</h2>
          <p className="text-sm text-white/50">Price trends by area, time & property type · Export charts</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 p-1 bg-white/5 border border-white/10 rounded-xl">
          {["3M", "6M", "8M"].map((p) => (
            <button
              key={p}
              onClick={() => setActivePeriod(p)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activePeriod === p ? "bg-cyan-600 text-white" : "text-white/40 hover:text-white/60"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          {PROPERTY_TYPES.map((t) => (
            <button
              key={t.key}
              onClick={() => toggleType(t.key)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs border transition-all ${
                activeTypes.has(t.key)
                  ? "border-transparent text-white"
                  : "border-white/10 text-white/30"
              }`}
              style={activeTypes.has(t.key) ? { background: t.color + "33", borderColor: t.color + "66" } : {}}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: t.color }} />
              {t.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex gap-2">
          {["PNG", "PDF", "GeoJSON"].map((fmt) => (
            <button
              key={fmt}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white/50 hover:text-white hover:border-white/20 transition-all"
            >
              <Download size={11} />
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className={`${glass} p-5`}>
        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-4">
          Price Trends — ₹/sqft by Property Type
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={DASHBOARD_TREND_DATA}>
            <defs>
              {PROPERTY_TYPES.map((t) => (
                <linearGradient key={t.key} id={`grad-${t.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={t.color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={t.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }} />
            {PROPERTY_TYPES.filter((t) => activeTypes.has(t.key)).map((t) => (
              <Area
                key={t.key}
                type="monotone"
                dataKey={t.key}
                stroke={t.color}
                fill={`url(#grad-${t.key})`}
                strokeWidth={2}
                name={t.label}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Price zones table */}
      <div className={`${glass} p-5`}>
        <div className="flex items-center gap-2 mb-4">
          <Map size={16} className="text-cyan-400" />
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest">Color-Coded Price Zones</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRICE_ZONES.map((z) => (
            <div key={z.zone} className="p-4 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/50">{z.zone.split("—")[0].trim()}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${TIER_STYLES[z.tier]}`}>{z.tier}</span>
              </div>
              <p className="text-sm text-white/70 mb-2">{z.zone.split("—")[1]?.trim()}</p>
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xl font-bold text-white">₹{z.avg_price.toLocaleString()}</span>
                  <span className="text-xs text-white/40">/sqft</span>
                </div>
                <span className="text-sm font-semibold text-green-400">{z.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
