import { useState } from "react";
import { TrendingUp, Cpu, ChevronUp } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import { PRICE_HISTORY, FORECAST_DATA, MODEL_METRICS } from "../../constants";

const glass = "bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d1a0f] border border-white/10 rounded-xl p-3 text-xs space-y-1">
      <p className="text-white/60 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: ₹{p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function PricePrediction() {
  const [activeModel, setActiveModel] = useState("XGBoost");
  const [lat, setLat] = useState("18.5362");
  const [lng, setLng] = useState("73.8937");

  const lineKey = activeModel === "XGBoost" ? "xgb" : activeModel === "Random Forest" ? "rf" : "predicted";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
          <TrendingUp size={20} className="text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Price Trend Prediction</h2>
          <p className="text-sm text-white/50">ML models trained on OSM-enriched historical data</p>
        </div>
      </div>

      {/* Model selector */}
      <div className={`${glass} p-5`}>
        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-3">Model Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {MODEL_METRICS.map((m) => (
            <button
              key={m.model}
              onClick={() => setActiveModel(m.model)}
              className={`p-4 rounded-xl border text-left transition-all ${
                activeModel === m.model
                  ? "border-emerald-500/60 bg-emerald-500/10"
                  : "border-white/5 hover:border-white/15"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">{m.model}</span>
                {activeModel === m.model && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Active</span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-white/40">R²</p>
                  <p className="text-white font-bold">{m.r2}</p>
                </div>
                <div>
                  <p className="text-white/40">RMSE</p>
                  <p className="text-white font-bold">{m.rmse}</p>
                </div>
                <div>
                  <p className="text-white/40">MAE</p>
                  <p className="text-white font-bold">{m.mae}</p>
                </div>
              </div>
              <p className="text-xs text-white/30 mt-2">Training: {m.training_time}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className={`${glass} p-5 lg:col-span-2`}>
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-4">
            Price History vs Prediction ({activeModel})
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={PRICE_HISTORY}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }} />
              <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} dot={false} name="Actual" />
              <Line type="monotone" dataKey={lineKey} stroke="#34d399" strokeWidth={2} strokeDasharray="4 2" dot={false} name="Predicted" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Forecast */}
        <div className="space-y-4">
          {/* Coordinate input */}
          <div className={`${glass} p-4`}>
            <h3 className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-3">
              <Cpu size={12} className="inline mr-1" />Predict for Location
            </h3>
            <div className="space-y-2">
              <input
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="Latitude"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500/50"
              />
              <input
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="Longitude"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500/50"
              />
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                <p className="text-xs text-white/40">Estimated Value</p>
                <p className="text-2xl font-bold text-emerald-300 mt-1">₹8,720<span className="text-base">/sqft</span></p>
              </div>
            </div>
          </div>

          {/* Forecast */}
          <div className={`${glass} p-4`}>
            <h3 className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-3">Price Forecast</h3>
            <div className="space-y-3">
              {FORECAST_DATA.map((f) => (
                <div key={f.period} className="p-3 rounded-xl bg-white/3 border border-white/5">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-white/60">{f.period}</span>
                    <span className="text-xs text-green-400 flex items-center gap-0.5">
                      <ChevronUp size={12} />+{((f.mid - 8720) / 8720 * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white">₹{f.mid.toLocaleString()}</div>
                  <div className="text-xs text-white/30">Range: ₹{f.low.toLocaleString()} – ₹{f.high.toLocaleString()}</div>
                  <div className="text-xs text-emerald-400 mt-1">Confidence: {f.confidence}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
