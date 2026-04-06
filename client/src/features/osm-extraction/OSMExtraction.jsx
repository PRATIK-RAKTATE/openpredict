import { useState } from "react";
import { Globe2, Download, RefreshCw, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { POI_CATEGORIES, EXTRACTION_LOG, ROAD_DENSITY } from "../../constants";

const glass = "bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl";

export default function OSMExtraction() {
  const [selected, setSelected] = useState(new Set(["schools", "hospitals", "bus_stops"]));
  const [bbox, setBbox] = useState("18.45,73.75,18.62,73.96");
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleRun = () => {
    setRunning(true);
    setDone(false);
    setTimeout(() => { setRunning(false); setDone(true); }, 2200);
  };

  const statusIcon = (s) => {
    if (s === "success") return <CheckCircle size={14} className="text-green-400" />;
    if (s === "warning") return <AlertTriangle size={14} className="text-amber-400" />;
    return <Clock size={14} className="text-blue-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
          <Globe2 size={20} className="text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">OSM Data Extraction</h2>
          <p className="text-sm text-white/50">Fetch real-time geospatial features via Overpass API</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Config panel */}
        <div className={`${glass} p-5 space-y-5`}>
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest">Query Config</h3>

          <div>
            <label className="text-xs text-white/50 mb-1 block">Bounding Box (south,west,north,east)</label>
            <input
              value={bbox}
              onChange={(e) => setBbox(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label className="text-xs text-white/50 mb-2 block">POI Categories</label>
            <div className="grid grid-cols-2 gap-2">
              {POI_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => toggle(cat.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all ${
                    selected.has(cat.id)
                      ? "border-emerald-500/60 bg-emerald-500/10 text-white"
                      : "border-white/10 text-white/40 hover:border-white/20"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span className="truncate">{cat.label}</span>
                  {selected.has(cat.id) && (
                    <span className="ml-auto text-xs text-emerald-400">{cat.count}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRun}
            disabled={running}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all disabled:opacity-50"
          >
            {running ? (
              <><RefreshCw size={15} className="animate-spin" /> Extracting…</>
            ) : (
              <><Download size={15} /> Run Extraction</>
            )}
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {/* Log */}
          <div className={`${glass} p-5`}>
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-3">Extraction Log</h3>
            <div className="space-y-2 font-mono text-xs">
              {EXTRACTION_LOG.map((l, i) => (
                <div key={i} className="flex items-center gap-2 text-white/60">
                  {statusIcon(l.status)}
                  <span className="text-white/30">{l.time}</span>
                  <span className={l.status === "warning" ? "text-amber-300" : "text-white/70"}>{l.message}</span>
                </div>
              ))}
              {done && (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle size={14} />
                  <span className="text-white/30">Now</span>
                  <span>Extraction complete — {selected.size} categories fetched</span>
                </div>
              )}
            </div>
          </div>

          {/* Road density */}
          <div className={`${glass} p-5`}>
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-3">Road Density Scores</h3>
            <div className="space-y-3">
              {ROAD_DENSITY.map((r) => (
                <div key={r.area}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/70">{r.area}</span>
                    <span className="text-white/40">{r.length_km} km</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600"
                      style={{ width: `${r.density}%` }}
                    />
                  </div>
                  <div className="text-right text-xs text-emerald-400 mt-0.5">{r.density}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
