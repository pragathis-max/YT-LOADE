import { Download, AlertCircle, XCircle, RefreshCw, Layers, Hourglass, CheckCircle2, ChevronRight, Ban } from "lucide-react";
import { AppSettings, ActiveDownload } from "../types";

interface DownloadsTabProps {
  activeDownloads: ActiveDownload[];
  onCancelDownload: (id: string) => void;
  settings: AppSettings;
}

export default function DownloadsTab({
  activeDownloads,
  onCancelDownload,
  settings,
}: DownloadsTabProps) {

  const getAccentText = () => {
    switch (settings.neonThemeAccent) {
      case "cyan": return "text-cyan-400";
      case "rose": return "text-rose-400";
      case "emerald": return "text-emerald-400";
      default: return "text-purple-400";
    }
  };

  const getProgressBg = () => {
    switch (settings.neonThemeAccent) {
      case "cyan": return "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]";
      case "rose": return "bg-gradient-to-r from-rose-500 to-pink-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]";
      case "emerald": return "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]";
      default: return "bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]";
    }
  };

  const getAccentBorder = () => {
    switch (settings.neonThemeAccent) {
      case "cyan": return "border-cyan-500/20";
      case "rose": return "border-rose-500/20";
      case "emerald": return "border-emerald-500/20";
      default: return "border-purple-500/20";
    }
  };

  // Maps download stage state string to a friendly human message
  const getStageLabel = (status: ActiveDownload["status"]) => {
    switch (status) {
      case "analyzing": return "Decrypting cyphers & grabbing raw streams...";
      case "fetching": return "Streaming media packets down to multiplexer...";
      case "transcoding": return "Optimizing spatial and temporal bitrates...";
      case "multiplexing": return "Injecting audio streams and interleaving tracks...";
      case "serving": return "Finalizing output package container...";
      case "completed": return "File ready. Check local storage folder!";
      case "failed": return "Extraction failed. YouTube IP blocked or restricted link.";
      default: return "Initializing engine components...";
    }
  };

  return (
    <div id="downloads-panel-body" className="max-w-4xl mx-auto py-8 px-4">
      
      {/* Tab Heading info */}
      <div className="mb-8">
        <h2 className="font-sans font-extrabold text-3xl text-white mb-2 tracking-tight">
          Active Live Queue
        </h2>
        <p className="font-sans text-slate-400 text-sm">
          Track running and finalized transcodes. Downloads trigger instantly upon container packaging.
        </p>
      </div>

      {activeDownloads.length === 0 ? (
        /* Empty queue view with beautiful graphics */
        <div id="empty-queue-alert" className="bg-zinc-900/40 backdrop-blur-md rounded-[32px] p-12 text-center border border-white/10 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 mb-5">
            <Download className="w-7 h-7" />
          </div>
          <h3 className="font-sans font-bold text-lg text-white mb-2">
            No Active Transcodes
          </h3>
          <p className="font-sans text-zinc-400 text-sm max-w-sm leading-relaxed mb-6">
            Paste a video url inside the Home tab or select one of our trending links to kickstart a high speed media extraction.
          </p>
        </div>
      ) : (
        /* Downloads queue list details */
        <div id="active-queue-list-wrapper" className="flex flex-col gap-5">
          {activeDownloads.map((dl) => {
            const isDone = dl.status === "completed";
            const isFail = dl.status === "failed";
            const percent = Math.round(dl.progress);

            return (
              <div
                key={dl.id}
                id={`download-card-${dl.id}`}
                className={`bg-zinc-900/40 border transition-all duration-300 relative overflow-hidden flex flex-col gap-4 p-5 rounded-[24px] backdrop-blur-md
                  ${isDone ? "border-emerald-500/20 bg-emerald-950/10" : isFail ? "border-rose-500/20 bg-rose-950/10" : `border-white/5 ${getAccentBorder()}`}`}
              >
                
                {/* Horizontal flow */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  
                  {/* Thumbnail snippet */}
                  <div className="w-24 h-14 rounded-lg overflow-hidden relative border border-white/5 bg-slate-950 flex-shrink-0">
                    <img
                      src={dl.metadata.thumbnailUrl}
                      alt={dl.metadata.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute bottom-1 right-1 font-mono text-[8px] bg-slate-950/90 text-white px-1 py-0.2 rounded font-semibold">
                      {dl.metadata.duration}
                    </div>
                  </div>

                  {/* Descriptions block */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                      <span className="font-mono text-[9px] bg-white/5 border border-white/5 text-slate-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                        {dl.metadata.platform}
                      </span>
                      <span className={`font-mono text-[9px] border bg-linear-to-r px-2 py-0.5 rounded font-bold uppercase tracking-wider
                        ${isDone 
                          ? "border-emerald-400/20 text-emerald-400" 
                          : isFail 
                            ? "border-rose-400/25 text-rose-400" 
                            : "border-cyan-400/20 text-cyan-400"}`}>
                        {dl.selectedFormat.quality.toUpperCase()} • {dl.selectedFormat.type.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="font-sans font-bold text-sm text-white line-clamp-1">
                      {dl.metadata.title}
                    </h4>
                    
                    <span className="font-sans text-[11px] text-slate-500 block mt-0.5">
                      by {dl.metadata.author}
                    </span>
                  </div>

                  {/* Actions / Control Buttons */}
                  <div className="w-full sm:w-auto flex items-center justify-end flex-shrink-0">
                    {!isDone && !isFail ? (
                      <button
                        id={`cancel-dl-btn-${dl.id}`}
                        onClick={() => onCancelDownload(dl.id)}
                        className="py-1.5 px-3 rounded-lg border border-white/5 bg-white/5 hover:bg-rose-500/10 hover:border-rose-500/25 text-slate-400 hover:text-rose-400 text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        <span>CANCEL</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        {isDone ? (
                          <div className="flex items-center gap-1.5 text-emerald-400 font-sans text-xs font-bold bg-emerald-500/10 border border-emerald-500/15 py-1.5 px-3 rounded-lg">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>COMPLETED</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-rose-400 font-sans text-xs font-bold bg-rose-500/10 border border-rose-500/15 py-1.5 px-3 rounded-lg">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>FAILED</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </div>

                {/* Grid stats & loading pipeline (Only show if actively working) */}
                {!isFail && (
                  <div className="flex flex-col gap-2 mt-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
                        <span className="font-semibold text-slate-100 italic">
                          {getStageLabel(dl.status)}
                        </span>
                      </span>
                      <span className="text-white font-extrabold">{percent}%</span>
                    </div>

                    {/* The glowing progress line */}
                    <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden relative">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${getProgressBg()}`}
                        style={{ width: `${dl.progress}%` }}
                      />
                    </div>

                    {/* Performance metrics dashboard */}
                    {!isDone && (
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                        <div className="flex items-center gap-4">
                          <span>SPEED: <strong className="text-slate-300">{dl.downloadSpeed}</strong></span>
                          <span>PROCESSED: <strong className="text-slate-300">{dl.downloadedBytes} / {dl.selectedFormat.size}</strong></span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Hourglass className="w-3 h-3 text-slate-500 animate-pulse" />
                          ETA: <strong className="text-slate-300">{dl.eta}</strong>
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Fail Explanation Output */}
                {isFail && dl.errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono text-xs flex items-center gap-2 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                    <span>ERROR: {dl.errorMessage}</span>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
