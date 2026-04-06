import { useState } from "react";
import {
  Globe2, MapPin, TrendingUp, Building2, Layers,
  BarChart3, Bell, Database, ChevronRight, Menu, X, Home,
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
  { id: "home", label: "Landing", icon: Home, component: null },
  { id: "osm", label: "OSM Extraction", icon: Globe2, component: OSMExtraction, badge: "Live" },
  { id: "proximity", label: "Proximity Engineering", icon: MapPin, component: ProximityEngineering },
  { id: "prediction", label: "Price Prediction", icon: TrendingUp, component: PricePrediction, badge: "ML" },
  { id: "neighborhoods", label: "Neighborhood Scoring", icon: Building2, component: NeighborhoodScoring },
  { id: "landuse", label: "Land Use Analysis", icon: Layers, component: LandUseAnalysis },
  { id: "dashboard", label: "Trend Dashboard", icon: BarChart3, component: TrendDashboard },
  { id: "alerts", label: "Alerts & Monitoring", icon: Bell, component: AlertMonitoring },
  { id: "data", label: "Import & Export", icon: Database, component: DataImportExport },
];

export default function App() {
  const [active, setActive] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const current = NAV_ITEMS.find((n) => n.id === active);
  const Component = current?.component ?? null;

  return (
    <div className="min-h-screen bg-[#060e1a] text-white flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0a1628] border-r border-white/5 z-30 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:flex`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/5">
          <div>
            <span className="text-base font-bold text-white tracking-tight">RealTrend</span>
            <span className="text-xs text-sky-400 ml-1 font-mono">OSM</span>
          </div>
          <button
            className="lg:hidden text-white/40 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActive(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${
                  isActive
                    ? "bg-sky-600/20 text-white border border-sky-500/30"
                    : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon size={16} className={isActive ? "text-sky-400" : "text-white/30 group-hover:text-white/60"} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="text-xs bg-sky-500/20 text-sky-400 px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight size={14} className="text-sky-400" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/5">
          <p className="text-xs text-white/20">v1.0.0 · OSM Powered</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-[#060e1a]/80 backdrop-blur-sm">
          <button
            className="lg:hidden text-white/50 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-sm font-semibold text-white">{current?.label ?? "Home"}</h1>
            <p className="text-xs text-white/30">RealTrend OSM · Real Estate Trend Prediction</p>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {Component ? (
            <div className="p-6 max-w-6xl mx-auto">
              <Component />
            </div>
          ) : (
            <LandingPage onNavigate={(id) => setActive(id)} />
          )}
        </main>
      </div>
    </div>
  );
}
