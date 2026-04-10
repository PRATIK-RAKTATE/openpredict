import { useState } from "react";
import {
  Globe2, MapPin, TrendingUp, Building2, Layers,
  BarChart3, Bell, Database, Menu, X, Home,
} from "lucide-react";
import LandingPage from "./LandingPage";
import OSMExtraction from "./features/osm-extraction/OSMExtraction";
import ProximityEngineering from "./features/proximity-engineering/ProximityEngineering";
import PricePrediction from "./features/price-prediction/PricePrediction";
import NeighborhoodScoring from "./features/neighborhood-scoring/NeighborhoodScoring";
import LandUseAnalysis from "./features/land-use-analysis/LandUseAnalysis";
import TrendDashboard from "./features/trend-dashboard/TrendDashboard";
import AlertMonitoring from "./features/alert-monitoring/AlertMonitoring";
import DataImportExport from "./features/data-import-export/DataImportExport";

const NAV_ITEMS = [
  { id: "home",          label: "Home",           icon: Home,      component: null },
  { id: "osm",           label: "OSM Extraction", icon: Globe2,    component: OSMExtraction,       badge: "Live" },
  { id: "proximity",     label: "Proximity",      icon: MapPin,    component: ProximityEngineering },
  { id: "prediction",    label: "Prediction",     icon: TrendingUp,component: PricePrediction,     badge: "ML" },
  { id: "neighborhoods", label: "Neighborhoods",  icon: Building2, component: NeighborhoodScoring },
  { id: "landuse",       label: "Land Use",       icon: Layers,    component: LandUseAnalysis },
  { id: "dashboard",     label: "Dashboard",      icon: BarChart3, component: TrendDashboard },
  { id: "alerts",        label: "Alerts",         icon: Bell,      component: AlertMonitoring },
  { id: "data",          label: "Import/Export",  icon: Database,  component: DataImportExport },
];

export default function App() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const current = NAV_ITEMS.find((n) => n.id === active);
  const Component = current?.component ?? null;

  const handleNav = (id) => {
    setActive(id);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050f07] text-white flex flex-col">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-[#091a0d]/95 border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-5 py-3 grid grid-cols-[auto_1fr_auto] items-center gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Globe2 size={15} className="text-emerald-400" />
            </div>
            <span className="text-sm font-bold text-white tracking-tight">
              Land Intel<span className="text-emerald-400 font-mono ml-1">OSM</span>
            </span>
          </div>

          {/* Desktop nav — centered */}
          <nav className="hidden lg:flex items-center justify-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-emerald-600/20 text-white border border-emerald-500/30"
                      : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon size={13} className={isActive ? "text-emerald-400" : "text-white/30"} />
                  {item.label}
                  {item.badge && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full leading-none">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right slot */}
          <div className="flex items-center justify-end gap-3">
            <span className="hidden lg:block text-xs text-white/20 font-mono">v1.0.0</span>
            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white/50 hover:text-white p-1"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-white/5 bg-[#091a0d] px-3 py-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-emerald-600/15 text-white"
                      : "text-white/50 active:bg-white/5"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive ? "bg-emerald-500/20" : "bg-white/5"
                  }`}>
                    <Icon size={14} className={isActive ? "text-emerald-400" : "text-white/40"} />
                  </div>
                  <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* ── Page content ── */}
      <main className="flex-1 overflow-y-auto">
        {Component ? (
          <div className="p-6 max-w-6xl mx-auto">
            <Component />
          </div>
        ) : (
          <LandingPage onNavigate={handleNav} />
        )}
      </main>
    </div>
  );
}
