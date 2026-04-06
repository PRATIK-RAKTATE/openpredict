import { useState } from "react";
import { MapPin, Navigation, Activity } from "lucide-react";
import { PROPERTY_SAMPLES, WALKABILITY_BREAKDOWN } from "../../constants";

const glass = "bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl";

function ScoreRing({ value, label, color = "#10b981" }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="72" height="72" className="-rotate-90">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
        <circle
          cx="36" cy="36" r={r} fill="none"
          stroke={color} strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="text-lg font-bold text-white -mt-12">{value}</span>
      <span className="text-xs text-white/40 mt-8">{label}</span>
    </div>
  );
}

export default function ProximityEngineering() {
  const [selectedProp, setSelectedProp] = useState(PROPERTY_SAMPLES[0]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
          <MapPin size={20} className="text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Proximity Feature Engineering</h2>
          <p className="text-sm text-white/50">Distances, walkability scores & neighborhood feature vectors</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property list */}
        <div className={`${glass} p-5 space-y-3`}>
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest">Properties</h3>
          {PROPERTY_SAMPLES.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProp(p)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                selectedProp.id === p.id
                  ? "border-emerald-500/60 bg-emerald-500/10"
                  : "border-white/5 hover:border-white/15 bg-white/3"
              }`}
            >
              <div className="text-sm font-medium text-white">{p.id}</div>
              <div className="text-xs text-white/40 mt-0.5 leading-snug">{p.address}</div>
              <div className="flex gap-3 mt-2">
                <span className="text-xs text-emerald-400">Walk {p.walkability}</span>
                <span className="text-xs text-white/30">{p.lat.toFixed(4)}, {p.lng.toFixed(4)}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="lg:col-span-2 space-y-4">
          {/* Scores */}
          <div className={`${glass} p-5`}>
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-4">
              {selectedProp.address}
            </h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <ScoreRing value={selectedProp.walkability} label="Walkability" color="#10b981" />
              <div className={`${glass} rounded-xl p-3 flex flex-col items-center justify-center`}>
                <Navigation size={16} className="text-amber-400 mb-1" />
                <span className="text-base font-bold text-white">{selectedProp.nearest_school_m}m</span>
                <span className="text-xs text-white/40">School</span>
              </div>
              <div className={`${glass} rounded-xl p-3 flex flex-col items-center justify-center`}>
                <Activity size={16} className="text-red-400 mb-1" />
                <span className="text-base font-bold text-white">{selectedProp.nearest_hospital_m}m</span>
                <span className="text-xs text-white/40">Hospital</span>
              </div>
              <div className={`${glass} rounded-xl p-3 flex flex-col items-center justify-center`}>
                <MapPin size={16} className="text-green-400 mb-1" />
                <span className="text-base font-bold text-white">{selectedProp.nearest_bus_m}m</span>
                <span className="text-xs text-white/40">Bus Stop</span>
              </div>
            </div>

            {/* Feature vector */}
            <div>
              <p className="text-xs text-white/40 mb-2">Feature Vector (normalized)</p>
              <div className="flex gap-2">
                {selectedProp.feature_vector.map((v, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div className="h-16 bg-white/5 rounded relative overflow-hidden">
                      <div
                        className="absolute bottom-0 w-full rounded bg-gradient-to-t from-blue-600 to-emerald-400 transition-all duration-500"
                        style={{ height: `${v * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-white/40">{v.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Walkability breakdown */}
          <div className={`${glass} p-5`}>
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-3">Walkability Breakdown</h3>
            <div className="space-y-3">
              {WALKABILITY_BREAKDOWN.map((w) => (
                <div key={w.factor}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/70">{w.factor}</span>
                    <span className="text-white/40">weight {w.weight}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                        style={{ width: `${w.score}%` }}
                      />
                    </div>
                    <span className="text-xs text-emerald-400 w-6 text-right">{w.score}</span>
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
