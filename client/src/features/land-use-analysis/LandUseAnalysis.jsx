import { useState } from "react";
import { Layers, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { LAND_USE_ZONES, URBAN_CHANGE_EVENTS } from "../../constants";

const glass = "bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl";

const SEVERITY_STYLES = {
  high: "bg-red-500/10 text-red-400 border-red-500/30",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  low: "bg-green-500/10 text-green-400 border-green-500/30",
};

export default function LandUseAnalysis() {
  const [hoveredZone, setHoveredZone] = useState(null);

  const pieData = LAND_USE_ZONES.map((z) => ({ name: z.type, value: z.percentage }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
          <Layers size={20} className="text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Land Use Analysis</h2>
          <p className="text-sm text-white/50">Zoning characteristics & urban change detection from OSM tags</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Zoning pie + legend */}
        <div className={`${glass} p-5`}>
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-4">Zoning Distribution</h3>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {LAND_USE_ZONES.map((z, i) => (
                    <Cell
                      key={z.type}
                      fill={z.color}
                      opacity={hoveredZone === null || hoveredZone === z.type ? 1 : 0.3}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#0d1b2a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                  formatter={(v) => [`${v}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-2 flex-1">
              {LAND_USE_ZONES.map((z) => (
                <div
                  key={z.type}
                  className="flex items-center gap-2 cursor-pointer"
                  onMouseEnter={() => setHoveredZone(z.type)}
                  onMouseLeave={() => setHoveredZone(null)}
                >
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: z.color }} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/80">{z.type}</span>
                      <span className="text-sm font-bold text-white">{z.percentage}%</span>
                    </div>
                    <div className="text-xs text-white/30">{z.area_km2} km² · <span className="font-mono">{z.tag}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Zone cards */}
        <div className={`${glass} p-5`}>
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-4">Zone Details</h3>
          <div className="space-y-2">
            {LAND_USE_ZONES.map((z) => (
              <div
                key={z.type}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="w-2 h-10 rounded-full" style={{ background: z.color }} />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{z.type}</div>
                  <div className="text-xs text-white/40 font-mono">{z.tag}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{z.area_km2} km²</div>
                  <div className="text-xs text-white/40">{z.percentage}% of city</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Urban change events */}
      <div className={`${glass} p-5`}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-emerald-400" />
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest">Urban Change Events</h3>
          <span className="ml-auto text-xs text-white/30">Leading price indicators</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-white/40 border-b border-white/5">
                <th className="text-left pb-2">Date</th>
                <th className="text-left pb-2">Area</th>
                <th className="text-left pb-2">Event Type</th>
                <th className="text-left pb-2">Price Impact</th>
                <th className="text-left pb-2">Severity</th>
              </tr>
            </thead>
            <tbody>
              {URBAN_CHANGE_EVENTS.map((e) => (
                <tr key={e.date + e.area} className="border-b border-white/5 hover:bg-white/3 transition-all">
                  <td className="py-2.5 text-white/50 font-mono text-xs">{e.date}</td>
                  <td className="py-2.5 text-white/80">{e.area}</td>
                  <td className="py-2.5 text-white/60">{e.type}</td>
                  <td className="py-2.5 text-green-400 font-semibold">{e.impact}</td>
                  <td className="py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${SEVERITY_STYLES[e.severity]}`}>
                      {e.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
