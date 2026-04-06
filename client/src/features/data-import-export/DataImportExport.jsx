import { useState } from "react";
import { Upload, Download, Database, Code, CheckCircle, XCircle } from "lucide-react";
import { IMPORT_HISTORY, EXPORT_TEMPLATES, API_ENDPOINTS } from "../../constants";

const glass = "bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl";

const STATUS_STYLES = {
  success: { icon: <CheckCircle size={13} className="text-green-400" />, text: "text-green-400" },
  error: { icon: <XCircle size={13} className="text-red-400" />, text: "text-red-400" },
};

const METHOD_STYLES = {
  GET: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  POST: "bg-green-500/10 text-green-400 border-green-500/30",
};

export default function DataImportExport() {
  const [dragging, setDragging] = useState(false);
  const [activeTab, setActiveTab] = useState("import");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
          <Database size={20} className="text-amber-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Data Import & Export</h2>
          <p className="text-sm text-white/50">CSV / JSON import, prediction export & REST API endpoints</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 p-1 bg-white/5 border border-white/10 rounded-xl w-fit">
        {[
          { key: "import", label: "Import", icon: Upload },
          { key: "export", label: "Export", icon: Download },
          { key: "api", label: "REST API", icon: Code },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === key ? "bg-amber-600 text-white" : "text-white/40 hover:text-white/60"
            }`}
          >
            <Icon size={13} /> {label}
          </button>
        ))}
      </div>

      {/* Import tab */}
      {activeTab === "import" && (
        <div className="space-y-5">
          {/* Drop zone */}
          <div
            className={`${glass} p-10 flex flex-col items-center justify-center gap-3 border-2 border-dashed transition-all cursor-pointer ${
              dragging ? "border-amber-500/60 bg-amber-500/5" : "border-white/10 hover:border-white/20"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={() => setDragging(false)}
          >
            <Upload size={32} className={dragging ? "text-amber-400" : "text-white/20"} />
            <p className="text-white/60 text-sm">Drop CSV or JSON file here</p>
            <p className="text-white/30 text-xs">or</p>
            <button className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold transition-all">
              Browse File
            </button>
            <p className="text-white/25 text-xs mt-1">Supports Zillow, MagicBricks, 99acres formats</p>
          </div>

          {/* History */}
          <div className={`${glass} p-5`}>
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-3">Import History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-white/40 border-b border-white/5">
                    <th className="text-left pb-2">File</th>
                    <th className="text-left pb-2">Rows</th>
                    <th className="text-left pb-2">Source</th>
                    <th className="text-left pb-2">Date</th>
                    <th className="text-left pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {IMPORT_HISTORY.map((r) => (
                    <tr key={r.id} className="border-b border-white/5 hover:bg-white/3 transition-all">
                      <td className="py-2.5">
                        <span className="text-white/80 font-mono text-xs">{r.filename}</span>
                      </td>
                      <td className="py-2.5 text-white/60">{r.rows.toLocaleString()}</td>
                      <td className="py-2.5">
                        <span className="text-xs bg-white/5 px-2 py-0.5 rounded text-white/50">{r.source}</span>
                      </td>
                      <td className="py-2.5 text-white/40 font-mono text-xs">{r.date}</td>
                      <td className="py-2.5">
                        <span className={`flex items-center gap-1 ${STATUS_STYLES[r.status].text}`}>
                          {STATUS_STYLES[r.status].icon}
                          <span className="capitalize text-xs">{r.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Export tab */}
      {activeTab === "export" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EXPORT_TEMPLATES.map((t) => (
            <div key={t.format} className={`${glass} p-5 flex items-start gap-4`}>
              <span className="text-3xl">{t.icon}</span>
              <div className="flex-1">
                <div className="text-base font-bold text-white">{t.format}</div>
                <div className="text-xs text-white/50 mt-0.5 mb-3">{t.desc}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/30">{t.size}</span>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-all">
                    <Download size={11} /> Export
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* REST API tab */}
      {activeTab === "api" && (
        <div className={`${glass} p-5`}>
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-4">REST API Endpoints</h3>
          <div className="space-y-2 font-mono text-sm">
            {API_ENDPOINTS.map((e) => (
              <div key={e.path} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-all">
                <span className={`text-xs px-2 py-0.5 rounded border font-bold ${METHOD_STYLES[e.method]}`}>
                  {e.method}
                </span>
                <span className="text-white/80">{e.path}</span>
                <span className="text-white/30 text-xs ml-auto">{e.desc}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-xl bg-black/20 border border-white/5">
            <p className="text-xs text-white/40 mb-2 font-sans">Example request</p>
            <pre className="text-xs text-green-300 overflow-x-auto">{`curl https://api.realtrend.io/v1/predict \\
  -H "Authorization: Bearer <token>" \\
  -G --data-urlencode "lat=18.5362" \\
      --data-urlencode "lng=73.8937"`}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
