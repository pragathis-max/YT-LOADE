import { Sliders, Volume2, ShieldAlert, Sparkles, RefreshCw, Zap, Moon, Cpu, LayoutGrid, Check } from "lucide-react";
import { AppSettings } from "../types";

interface SettingsTabProps {
  settings: AppSettings;
  onUpdateSettings: (updates: Partial<AppSettings>) => void;
}

export default function SettingsTab({
  settings,
  onUpdateSettings,
}: SettingsTabProps) {

  const getAccentText = () => {
    switch (settings.neonThemeAccent) {
      case "cyan": return "text-cyan-400";
      case "rose": return "text-rose-400";
      case "emerald": return "text-emerald-400";
      default: return "text-purple-400";
    }
  };

  const getAccentBorder = () => {
    switch (settings.neonThemeAccent) {
      case "cyan": return "border-cyan-500";
      case "rose": return "border-rose-500";
      case "emerald": return "border-emerald-500";
      default: return "border-purple-500";
    }
  };

  const themes: { id: AppSettings["neonThemeAccent"]; label: string; color: string }[] = [
    { id: "purple", label: "Neon Amethyst", color: "bg-purple-600 shadow-purple-500/20" },
    { id: "cyan", label: "Laser Cyan", color: "bg-cyan-500 shadow-cyan-500/20" },
    { id: "rose", label: "Plasma Rose", color: "bg-rose-500 shadow-rose-500/20" },
    { id: "emerald", label: "Emerald Matrix", color: "bg-emerald-500 shadow-emerald-500/20" },
  ];

  return (
    <div id="settings-panel-body" className="max-w-4xl mx-auto py-8 px-4">
      
      {/* Tab block */}
      <div className="mb-8">
        <h2 className="font-sans font-extrabold text-3xl text-white mb-2 tracking-tight">
          System Config
        </h2>
        <p className="font-sans text-slate-400 text-sm">
          Fine tune the decoding pipelines, spatial caching engines, active UI themes, and stream formats.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left column configuration blocks */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          {/* General extraction guidelines */}
          <div className="bg-zinc-900/40 border border-white/10 p-5 sm:p-6 rounded-[32px] flex flex-col gap-5 backdrop-blur-md">
            <div className="flex items-center gap-2 pb-3 border-b border-white/5">
              <Sliders className={`w-4 h-4 ${getAccentText()}`} />
              <h3 className="font-sans font-bold text-sm text-white">
                Transcoding Preset Directives
              </h3>
            </div>

            {/* Default extraction settings radio cards */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold">
                Default Output Specifications
              </label>
              
              <div id="default-output-quality-grid" className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["1080p", "720p", "360p", "mp3"] as const).map((q) => {
                  const isActive = settings.defaultQuality === q;
                  return (
                    <button
                      key={q}
                      id={`preset-quality-${q}`}
                      onClick={() => onUpdateSettings({ defaultQuality: q })}
                      className={`p-3 rounded-xl border text-center font-mono text-xs font-bold transition-all cursor-pointer
                        ${isActive 
                          ? `${getAccentBorder()} text-white bg-white/5` 
                          : "border-white/5 hover:border-white/10 hover:bg-white/[0.01] text-zinc-400 bg-transparent"}`}
                    >
                      {q.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggle switch for auto triggers */}
            <div className="flex items-center justify-between pb-1.5 pt-1.5">
              <div className="flex flex-col">
                <span className="text-xs font-sans font-bold text-white mb-0.5">
                  Accelerated Automatic Pipe
                </span>
                <span className="text-[10px] font-sans text-zinc-500">
                  Begin decoding instantly upon metadata acquisition.
                </span>
              </div>

              <button
                id="toggle-auto-download-preset"
                onClick={() => onUpdateSettings({ autoDownload: !settings.autoDownload })}
                className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer duration-200
                  ${settings.autoDownload ? "bg-emerald-500" : "bg-white/10"}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200
                  ${settings.autoDownload ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>

            {/* Stream multiplexing channels setup */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-sans font-bold text-white mb-0.5">
                    Live Stream Concurrency Range
                  </span>
                  <span className="text-[10px] font-sans text-zinc-500">
                    Defines the pool size of concurrently analyzed items.
                  </span>
                </div>
                <span className="font-mono text-xs text-white border border-white/5 px-2.5 py-1 rounded bg-zinc-950">
                  {settings.maxSimultaneousLoads} Slots
                </span>
              </div>
              
              <input
                id="concurrency-range-slider"
                type="range"
                min="1"
                max="5"
                value={settings.maxSimultaneousLoads}
                onChange={(e) => onUpdateSettings({ maxSimultaneousLoads: parseInt(e.target.value) })}
                className="w-full accent-indigo-500 bg-white/5 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

          </div>

          {/* Aesthetics Theme options */}
          <div className="bg-zinc-900/40 border border-white/10 p-5 sm:p-6 rounded-[32px] flex flex-col gap-5 backdrop-blur-md">
            
            <div className="flex items-center gap-2 pb-3 border-b border-white/5">
              <Moon className={`w-4 h-4 ${getAccentText()}`} />
              <h3 className="font-sans font-bold text-sm text-white">
                Fluid Visual Presets
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold">
                Laser Neon Glow Accent
              </label>

              <div id="visual-accent-grid" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {themes.map((t) => {
                  const isActive = settings.neonThemeAccent === t.id;
                  return (
                    <button
                      key={t.id}
                      id={`theme-accent-${t.id}`}
                      onClick={() => onUpdateSettings({ neonThemeAccent: t.id })}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between h-24 relative overflow-hidden transition-all duration-300 cursor-pointer
                        ${isActive 
                          ? `${getAccentBorder()} bg-zinc-900/60 shadow-md` 
                          : "border-white/5 hover:border-white/10 hover:bg-white/[0.01]"}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className={`w-5 h-5 rounded-full ${t.color} flex items-center justify-center text-white border border-white/10`}>
                          {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <span className="text-xs font-sans font-bold text-white block">
                        {t.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Right column sidebar stats details */}
        <div className="flex flex-col gap-6">
          
          {/* Hardware analytics panel info */}
          <div className="bg-zinc-900/40 border border-white/10 p-5 rounded-[24px] flex flex-col gap-4 backdrop-blur-md">
            <div className="flex items-center gap-2 pb-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span className="font-sans font-bold text-xs text-zinc-300 uppercase">Engine Architecture</span>
            </div>

            <div className="flex flex-col gap-3 font-mono text-[11px] text-zinc-500">
              <div className="flex justify-between items-center py-1 border-b border-white/[0.03]">
                <span>Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/[0.03]">
                <span>Bypass Core:</span>
                <span className="text-white">v3.9-Node</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/[0.03]">
                <span>Multiplex Codecs:</span>
                <span className="text-white">FFmpeg C++</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Memory Cache:</span>
                <span className="text-white">128 MB Alloc</span>
              </div>
            </div>
          </div>

          {/* Warning disclaimer panel strictly on target boundaries */}
          <div className="bg-zinc-900/40 border border-red-500/10 bg-red-950/5 p-5 rounded-[24px] flex flex-col gap-3 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span className="font-sans font-bold text-xs text-red-300 uppercase">Usage Guidelines</span>
            </div>
            <p className="font-sans text-[11px] text-zinc-400 leading-relaxed">
              NEODL is built strictly for non-commercial archiving purposes. Always respect and honor copyrights of media owners before compiling streams.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
