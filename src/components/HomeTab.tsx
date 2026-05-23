import { Search, Link as LinkIcon, Clock, Eye, Radio, ArrowRight, Play, CheckCircle2, Music, Video, AlertTriangle, HelpCircle, ClipboardCheck, Sparkles, RefreshCw } from "lucide-react";
import { useState } from "react";
import { AppSettings, VideoFormat, VideoMetadata } from "../types";

interface HomeTabProps {
  onStartDownload: (url: string, formatId: VideoFormat, metadata: VideoMetadata) => void;
  settings: AppSettings;
}

const RECOMMENDATIONS = [
  {
    title: "Awesome Futuristic Sound Design Mix 🌌",
    category: "Lofi Beats",
    url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
  },
  {
    title: "Nature Cinematics & Soundscapes 4K 🌲",
    category: "Travel Cinematics",
    url: "https://www.youtube.com/watch?v=9hk9S-C2Wk0",
  },
  {
    title: "Vimeo Drone Footage Showcase 🎬",
    category: "Aerial",
    url: "https://vimeo.com/22439234",
  }
];

export default function HomeTab({ onStartDownload, settings }: HomeTabProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Accent mappings
  const getGlowClass = () => {
    switch (settings.neonThemeAccent) {
      case "cyan": return "focus-within:border-cyan-500/80 focus-within:ring-2 focus-within:ring-cyan-500/20";
      case "rose": return "focus-within:border-rose-500/80 focus-within:ring-2 focus-within:ring-rose-500/20";
      case "emerald": return "focus-within:border-emerald-500/80 focus-within:ring-2 focus-within:ring-emerald-500/20";
      default: return "focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 font-medium";
    }
  };

  const getButtonBg = () => {
    switch (settings.neonThemeAccent) {
      case "cyan": return "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950";
      case "rose": return "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white";
      case "emerald": return "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950";
      default: return "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-500/10";
    }
  };

  const getAccentText = () => {
    switch (settings.neonThemeAccent) {
      case "cyan": return "text-cyan-400";
      case "rose": return "text-rose-400";
      case "emerald": return "text-emerald-400";
      default: return "text-indigo-400";
    }
  };

  const getBorderAccent = () => {
    switch (settings.neonThemeAccent) {
      case "cyan": return "border-cyan-500";
      case "rose": return "border-rose-500";
      case "emerald": return "border-emerald-500";
      default: return "border-indigo-500/50 bg-indigo-500/10 ring-1 ring-indigo-500/20 text-indigo-400";
    }
  };

  const handleFetchInfo = async (targetUrl: string) => {
    const checkUrl = targetUrl || url;
    if (!checkUrl) {
      setErrorMsg("Please paste a valid video URL first.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setMetadata(null);
    setSelectedFormat(null);

    try {
      const resp = await fetch(`/api/video-info?url=${encodeURIComponent(checkUrl)}`);
      const data = await resp.json();

      if (data.success) {
        setMetadata(data);
        // Pre-select default quality from settings if matching, otherwise 720p
        const matchesDefault = data.formats.find(
          (f: VideoFormat) => f.quality === settings.defaultQuality || (settings.defaultQuality === "mp3" && f.type === "mp3")
        );
        const autoSelected = matchesDefault || data.formats.find((f: VideoFormat) => f.quality === "720p") || data.formats[0];
        setSelectedFormat(autoSelected);
      } else {
        setErrorMsg(data.error || "Could not retrieve info. Video is blocked or private.");
      }
    } catch (err) {
      setErrorMsg("Connection to extraction server timed out. Check connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasteAndSearch = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.startsWith("http")) {
        setUrl(text);
        handleFetchInfo(text);
      } else {
        setErrorMsg("Clipboard content doesn't seem to be a valid URL. Paste manually.");
      }
    } catch (err) {
      // Fallback instruction
      setErrorMsg("Clipboard API permission block. Please manually paste the URL using Ctrl+V / Cmd+V.");
    }
  };

  const triggerDownloadAction = () => {
    if (!metadata || !selectedFormat) return;
    onStartDownload(url, selectedFormat, metadata);
    // Reset inputs
    setUrl("");
    setMetadata(null);
    setSelectedFormat(null);
  };

  return (
    <div id="home-panel-body" className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-8 px-4 relative">
      
      {/* Visual Ambient Globs */}
      <div id="glow-ambient-1" className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none -z-10" />
      <div id="glow-ambient-2" className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none -z-10" />

      {/* Hero Headline */}
      <div className="text-center mb-8 max-w-2xl px-2">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className={`w-5 h-5 ${getAccentText()} animate-pulse`} />
          <span className="font-mono text-xs tracking-widest text-slate-400 uppercase font-semibold">
            Next Generation Media Multiplexer
          </span>
        </div>
        <h1 className="font-sans font-extrabold text-4xl sm:text-5xl tracking-tight text-white mb-4 leading-tight">
          Superfast High Fidelity <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-500">
            Video & Audio Downloader
          </span>
        </h1>
        <p className="font-sans text-slate-400 text-sm sm:text-base leading-relaxed">
          Retrieve, transcode and stream high fidelity downloads from YouTube, Shorts, Vimeo, and modern media networks instantly.
        </p>
      </div>

      {/* Primary Input Container */}
      <div className="w-full mb-8 relative">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 pointer-events-none" />
        <div id="glowing-container-wrapper" className={`relative rounded-2xl p-2 flex flex-col md:flex-row items-center gap-2.5 bg-zinc-900 border border-white/10 transition-all duration-300 ${getGlowClass()}`}>
          
          <div className="w-full flex items-center gap-3 px-3 py-1 flex-1">
            <LinkIcon className="text-zinc-500 w-5 h-5 flex-shrink-0" />
            <input
              id="video-url-input"
              type="text"
              placeholder="Paste any YouTube video, Shorts or Vimeo link..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFetchInfo("")}
              className="bg-transparent text-white border-none outline-none w-full text-sm font-sans placeholder:text-zinc-600"
            />
            {url && (
              <button
                id="clear-url-trigger"
                onClick={() => setUrl("")}
                className="text-xs font-mono text-slate-500 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
              >
                CLEAR
              </button>
            )}
          </div>

          <div className="flex w-full md:w-auto items-center justify-end gap-2 flex-shrink-0">
            {/* Quick Clip Paste */}
            <button
              id="clipboard-paste-quick"
              onClick={handlePasteAndSearch}
              title="Paste from desktop clipboard"
              className="p-3 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-2"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span className="text-xs font-sans font-medium md:hidden">Paste Clip</span>
            </button>

            {/* Submit / Extract Link triggers */}
            <button
              id="extract-metadata-trigger"
              disabled={isLoading}
              onClick={() => handleFetchInfo("")}
              className={`w-full md:w-auto px-6 py-3 rounded-xl font-sans font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${getButtonBg()}`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>ANALYZING...</span>
                </>
              ) : (
                <>
                  <span>ANALYZE</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Error Messaging Output */}
        {errorMsg && (
          <div id="extraction-error-card" className="absolute left-0 right-0 mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 z-20 backdrop-blur-md">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span className="font-sans font-medium flex-1">{errorMsg}</span>
            <button id="dismiss-error-btn" onClick={() => setErrorMsg(null)} className="font-semibold text-rose-300 opacity-60 hover:opacity-100 uppercase px-1 font-mono">
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Render Metadata Preview Form & Output Options dynamically */}
      {metadata ? (
        <div id="metadata-preview-layout" className="w-full bg-zinc-900/40 border border-white/10 rounded-[32px] p-6 sm:p-8 backdrop-blur-md relative overflow-hidden animate-scale-in">
          
          <div className="absolute top-0 right-0 p-3">
            <span className="font-mono text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full uppercase font-bold tracking-widest flex items-center gap-1.5 animate-pulse">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
              Metadata Acquired
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Visual Media Thumbnail Area */}
            <div id="visual-thumbnail-overlay" className="w-full md:w-72 flex-shrink-0 aspect-video rounded-2xl overflow-hidden relative border border-white/5 bg-slate-950 group select-none shadow-lg">
              <img
                src={metadata.thumbnailUrl}
                alt={metadata.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-3.5 rounded-full glass border border-white/15 text-white/95 scale-95 group-hover:scale-105 transition-all shadow-xl bg-black/40">
                  <Play className="w-6 h-6 fill-current" />
                </div>
              </div>

              {/* Badges on video image */}
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-slate-950/85 border border-white/10 text-white font-mono text-[10px] px-2 py-1 rounded-md font-bold">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{metadata.duration}</span>
              </div>

              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-slate-950/85 border border-white/10 text-white font-mono text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">
                <span>{metadata.platform}</span>
              </div>
            </div>

            {/* Video Descriptions & Specs Form */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-sans font-bold text-lg text-white mb-2 leading-snug line-clamp-2 pr-12">
                  {metadata.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-400 text-xs font-sans mb-5">
                  <span className="font-medium text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${getAccentText()}`} />
                    {metadata.author}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="flex items-center gap-1 p-0.5">
                    <Eye className="w-3 h-3" />
                    {metadata.views}
                  </span>
                </div>
              </div>

              {/* Quality Preset / Transcode Form Selector */}
              <div className="mb-6 flex flex-col gap-2.5">
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold">
                  Format Specifications
                </span>
                
                <div id="format-specification-options" className="grid grid-cols-2 gap-2">
                  {metadata.formats.map((fm) => {
                    const isSelected = selectedFormat?.quality === fm.quality;
                    return (
                      <button
                        key={fm.quality}
                        id={`quality-selector-${fm.quality}`}
                        onClick={() => setSelectedFormat(fm)}
                        className={`p-3 rounded-xl border font-sans hover:transition-all text-left flex items-center justify-between cursor-pointer group/card select-none
                          ${isSelected 
                            ? `${getBorderAccent()} bg-linear-to-r from-white/[0.03] to-white/[0.08] shadow-[0_0_12px_rgba(255,255,255,0.02)]` 
                            : "border-white/5 hover:border-white/15 bg-transparent hover:bg-white/[0.01]"}`}
                      >
                        <div className="flex items-center gap-2.5">
                          {fm.type === "mp3" ? (
                            <Music className={`w-4 h-4 ${isSelected ? getAccentText() : "text-slate-500"}`} />
                          ) : (
                            <Video className={`w-4 h-4 ${isSelected ? getAccentText() : "text-slate-500"}`} />
                          )}
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {fm.quality.toUpperCase()}
                            </span>
                            <span className="text-[9px] font-mono text-slate-500 block">
                              {fm.fps ? `${fm.fps} FPS` : "Codec MP3"}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={`text-[10px] font-mono font-semibold ${isSelected ? getAccentText() : "text-slate-400"}`}>
                            {fm.size}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Trigger Download Stream Pipeline */}
              <button
                id="submit-download-preset"
                onClick={triggerDownloadAction}
                className={`w-full py-3.5 rounded-2xl font-sans font-extrabold tracking-wide text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 transform active:scale-98 relative overflow-hidden group/btn ${getButtonBg()}`}
              >
                <span>COMMENCE DOWLOAD METADATA STREAM</span>
                <ArrowRight className="w-4 h-5 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* Empty / Paste Helper Instructions display card */
        <div id="paste-instructions-card" className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {RECOMMENDATIONS.map((rec, i) => (
            <button
              id={`recommendation-${i}`}
              key={i}
              onClick={() => {
                setUrl(rec.url);
                handleFetchInfo(rec.url);
              }}
              className="p-4 rounded-2xl bg-zinc-900/40 hover:bg-zinc-800/40 border border-white/5 hover:border-white/10 text-left transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-1 bg-white/5 text-[9px] font-mono font-medium tracking-wide text-zinc-500 rounded-bl-lg">
                #0{i + 1}
              </div>
              <span className="inline-block px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-2 font-bold select-none">
                {rec.category}
              </span>
              <p className="font-sans text-xs font-semibold text-zinc-100 leading-snug group-hover:text-white transition-colors line-clamp-2">
                {rec.title}
              </p>
              <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 mt-3 group-hover:text-zinc-300">
                <span>Trigger Live Demo</span>
                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Guide details link footer */}
      <div className="mt-14 flex items-center gap-1.5 p-3 rounded-xl border border-white/5 bg-slate-950/25 text-[10px] font-mono text-slate-500">
        <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
        <span>Cannot connect? Copy Youtube url inside browser and click ANLYZE</span>
      </div>

    </div>
  );
}
