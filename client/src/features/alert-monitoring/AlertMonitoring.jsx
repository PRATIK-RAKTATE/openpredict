import { useState } from "react";
import { Bell, Plus, Activity, CheckCircle, Clock, Wifi } from "lucide-react";
import { ACTIVE_ALERTS, OSM_DIFF_FEED } from "../../constants";

const glass = "bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl";

const STATUS_STYLES = {
  triggered: "text-red-400 bg-red-500/10 border-red-500/30",
  active: "text-green-400 bg-green-500/10 border-green-500/30",
};

const CHANNEL_ICONS = { email: "📧", webhook: "🔗", slack: "💬" };

export default function AlertMonitoring() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    neighborhood: "Baner",
    type: "Price Threshold",
    condition: "",
    channel: "email",
  });

  const handleChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
          <Bell size={20} className="text-rose-400" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white">Alert & Monitoring System</h2>
          <p className="text-sm text-white/50">Price threshold alerts and OSM change feed monitoring</p>
        </div>
        <button
          onClick={() => setShowForm((p) => !p)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold transition-all"
        >
          <Plus size={14} /> New Alert
        </button>
      </div>

      {/* New alert form */}
      {showForm && (
        <div className={`${glass} p-5 border-rose-500/20`}>
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-4">Create Alert</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/40 block mb-1">Neighborhood</label>
              <select
                value={form.neighborhood}
                onChange={(e) => handleChange("neighborhood", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500/50"
              >
                {["Koregaon Park", "Baner", "Hinjewadi", "Viman Nagar", "Kothrud", "Wagholi"].map((n) => (
                  <option key={n} value={n} className="bg-[#0d1b2a]">{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-white/40 block mb-1">Alert Type</label>
              <select
                value={form.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500/50"
              >
                {["Price Threshold", "Infrastructure Change", "OSM Change Feed"].map((t) => (
                  <option key={t} value={t} className="bg-[#0d1b2a]">{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-white/40 block mb-1">Condition</label>
              <input
                value={form.condition}
                onChange={(e) => handleChange("condition", e.target.value)}
                placeholder="e.g. Avg price > ₹10,000/sqft"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500/50"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 block mb-1">Notification Channel</label>
              <div className="flex gap-2">
                {["email", "webhook", "slack"].map((c) => (
                  <button
                    key={c}
                    onClick={() => handleChange("channel", c)}
                    className={`flex-1 py-2 rounded-lg text-xs border transition-all capitalize ${
                      form.channel === c
                        ? "border-rose-500/60 bg-rose-500/10 text-white"
                        : "border-white/10 text-white/40"
                    }`}
                  >
                    {CHANNEL_ICONS[c]} {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowForm(false)}
            className="mt-4 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold transition-all"
          >
            Save Alert
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active alerts */}
        <div className={`${glass} p-5`}>
          <div className="flex items-center gap-2 mb-4">
            <Bell size={14} className="text-rose-400" />
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest">Active Alerts</h3>
          </div>
          <div className="space-y-3">
            {ACTIVE_ALERTS.map((a) => (
              <div key={a.id} className="p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <span className="text-sm font-semibold text-white">{a.neighborhood}</span>
                    <span className="text-xs text-white/40 ml-2">{a.id}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border capitalize flex-shrink-0 ${STATUS_STYLES[a.status]}`}>
                    {a.status}
                  </span>
                </div>
                <p className="text-xs text-white/50 mb-1">{a.condition}</p>
                <div className="flex items-center gap-3 text-xs text-white/30">
                  <span className="flex items-center gap-1">
                    {a.status === "triggered" ? <CheckCircle size={10} className="text-red-400" /> : <Clock size={10} />}
                    {a.triggered_at ?? "Monitoring…"}
                  </span>
                  <span>{CHANNEL_ICONS[a.channel]} {a.channel}</span>
                  <span className="bg-white/5 px-1.5 py-0.5 rounded">{a.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OSM diff feed */}
        <div className={`${glass} p-5`}>
          <div className="flex items-center gap-2 mb-4">
            <Wifi size={14} className="text-emerald-400 animate-pulse" />
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest">OSM Change Feed</h3>
            <span className="ml-auto text-xs text-emerald-400">Live</span>
          </div>
          <div className="space-y-3">
            {OSM_DIFF_FEED.map((d, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Activity size={14} className="text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-white/60">{d.changeset}</span>
                    <span className="text-xs bg-white/5 px-1.5 py-0.5 rounded text-white/40">{d.type}</span>
                  </div>
                  <p className="text-xs text-white/70 mt-0.5 font-mono">{d.tag}</p>
                  <div className="flex items-center gap-2 text-xs text-white/30 mt-0.5">
                    <span>{d.area}</span>
                    <span>·</span>
                    <span>{d.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
