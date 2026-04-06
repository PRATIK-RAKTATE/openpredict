import { useState } from "react";
import { Building2, Star } from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { NEIGHBORHOODS, SCORE_DIMENSIONS } from "../../constants";

const glass = "bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl";

const DIMENSION_LABELS = {
  transit: "Transit",
  green_space: "Green Space",
  commercial: "Commercial",
  healthcare: "Healthcare",
};

function ScoreBadge({ score }) {
  const color = score >= 80 ? "text-green-400 bg-green-500/10 border-green-500/30"
    : score >= 65 ? "text-amber-400 bg-amber-500/10 border-amber-500/30"
    : "text-red-400 bg-red-500/10 border-red-500/30";
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${color}`}>{score}</span>
  );
}

export default function NeighborhoodScoring() {
  const [selected, setSelected] = useState(NEIGHBORHOODS[0]);

  const radarData = SCORE_DIMENSIONS.map((d) => ({
    subject: DIMENSION_LABELS[d],
    score: selected[d],
    fullMark: 100,
  }));

  const barData = NEIGHBORHOODS.map((n) => ({
    name: n.name.split(" ")[0],
    score: n.overall,
    fill: n.color,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
          <Building2 size={20} className="text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Neighborhood Scoring</h2>
          <p className="text-sm text-white/50">Livability scores across transit, green space, commerce & healthcare</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Neighborhood list */}
        <div className={`${glass} p-5 space-y-2`}>
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-1">Areas</h3>
          {NEIGHBORHOODS.map((n) => (
            <button
              key={n.name}
              onClick={() => setSelected(n)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all ${
                selected.name === n.name
                  ? "border-emerald-500/60 bg-emerald-500/10"
                  : "border-white/5 hover:border-white/15"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: n.color }} />
                <span className="text-sm text-white">{n.name}</span>
              </div>
              <ScoreBadge score={n.overall} />
            </button>
          ))}

          {/* Overall bar chart */}
          <div className="pt-4">
            <p className="text-xs text-white/40 mb-2">Overall Comparison</p>
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={barData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} />
                <YAxis domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ background: "#0d1a0f", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                />
                {NEIGHBORHOODS.map((n) => null)}
                <Bar dataKey="score" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-2 space-y-4">
          {/* Radar */}
          <div className={`${glass} p-5`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest">{selected.name}</h3>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold text-white">{selected.overall}/100</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} />
                <Radar
                  name={selected.name}
                  dataKey="score"
                  stroke={selected.color}
                  fill={selected.color}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Dimension breakdown */}
          <div className={`${glass} p-5`}>
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-3">Dimension Scores</h3>
            <div className="grid grid-cols-2 gap-3">
              {SCORE_DIMENSIONS.map((d) => (
                <div key={d} className="p-3 rounded-xl bg-white/3 border border-white/5">
                  <p className="text-xs text-white/40 mb-1">{DIMENSION_LABELS[d]}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-white">{selected[d]}</span>
                    <span className="text-xs text-white/30 pb-1">/ 100</span>
                  </div>
                  <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${selected[d]}%`, background: selected.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
