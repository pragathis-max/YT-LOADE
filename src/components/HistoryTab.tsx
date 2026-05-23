import { Trash2, Search, Video, Music, ExternalLink, RefreshCcw, Library, Copy, Check } from "lucide-react";
import { useState } from "react";
import { AppSettings, HistoryItem } from "../types";

interface HistoryTabProps {
  historyItems: HistoryItem[];
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
  settings: AppSettings;
}

export default function HistoryTab({
  historyItems,
  onClearHistory,
  onRemoveItem,
  settings,
}: HistoryTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getAccentText = () => {
    switch (settings.neonThemeAccent) {
      case "cyan": return "text-cyan-400";
      case "rose": return "text-rose-400";
      case "emerald": return "text-emerald-400";
      default: return "text-purple-400";
    }
  };

  const getAccentBg = () => {
    switch (settings.neonThemeAccent) {
      case "cyan": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      case "rose": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "emerald": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default: return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    }
  };

  const filteredHistory = historyItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyLink = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const executeDirectReDownload = (item: HistoryItem) => {
    const downloadUrl = `/api/download?title=${encodeURIComponent(item.title)}&quality=${encodeURIComponent(item.quality)}&type=${encodeURIComponent(item.type)}`;
    
    const tokenAnchor = document.createElement("a");
    tokenAnchor.href = downloadUrl;
    tokenAnchor.setAttribute("download", `${item.title}_[${item.quality}].${item.type}`);
    document.body.appendChild(tokenAnchor);
    tokenAnchor.click();
    document.body.removeChild(tokenAnchor);
  };

  return (
    <div id="history-panel-body" className="max-w-4xl mx-auto py-8 px-4">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-sans font-extrabold text-3xl text-white mb-2 tracking-tight">
            Transcode Library
          </h2>
          <p className="font-sans text-slate-400 text-sm">
            Review completed links. Local cache triggers instantly with your cached quality files.
          </p>
        </div>

        {historyItems.length > 0 && (
          <button
            id="clear-all-history"
            onClick={onClearHistory}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/20 text-rose-400 font-sans text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>PURGE LIBRARY</span>
          </button>
        )}
      </div>

      {historyItems.length === 0 ? (
        /* Empty history display */
        <div id="empty-history-alert-box" className="bg-zinc-900/40 border border-white/10 rounded-[32px] p-12 text-center backdrop-blur-md flex flex-col items-center justify-center min-h-[400px] shadow-lg">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 mb-5">
            <Library className="w-7 h-7" />
          </div>
          <h3 className="font-sans font-bold text-lg text-white mb-2">
            Library is Vacant
          </h3>
          <p className="font-sans text-zinc-400 text-sm max-w-sm leading-relaxed">
            Your historic streams will be organized here for lightning fast physical re-download or sharing. No links have been processed yet.
          </p>
        </div>
      ) : (
        /* History lists display cards */
        <div className="flex flex-col gap-4">
          
          {/* Internal search filter */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-2.5 flex items-center gap-2.5 focus-within:border-white/20 transition-all">
            <Search className="w-4 h-4 text-zinc-500 ml-2" />
            <input
              id="library-filter-search"
              type="text"
              placeholder="Search by title, artist, or platform..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white border-none outline-none text-xs font-sans w-full placeholder:text-zinc-600"
            />
          </div>

          <div id="library-results-grid" className="grid grid-cols-1 gap-4.5">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                id={`history-row-${item.id}`}
                className="bg-zinc-900/40 border border-white/5 hover:border-white/10 p-4 rounded-2xl transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative group backdrop-blur-md"
              >
                
                {/* Image thumb */}
                <div className="w-20 h-12 rounded-lg overflow-hidden relative border border-white/5 bg-slate-950 flex-shrink-0">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-1 right-1 font-mono text-[8px] bg-slate-950/90 text-white px-1 py-0.2 rounded font-semibold">
                    {item.duration}
                  </span>
                </div>

                {/* Details text block */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className="text-[9px] font-mono text-slate-500 font-bold">
                      {new Date(item.timestamp).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                    <span className="text-slate-700">•</span>
                    <span className={`inline-flex items-center gap-1 text-[8.5px] font-mono font-bold tracking-widest uppercase px-1.5 py-0.2 rounded border ${getAccentBg()}`}>
                      {item.quality} • {item.type}
                    </span>
                  </div>

                  <h4 className="font-sans font-bold text-xs text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-sans text-slate-400 block mt-0.5">
                    by {item.author}
                  </span>
                </div>

                {/* Info block files size and physical trigger */}
                <div className="flex items-center gap-2.5 ml-auto flex-shrink-0 w-full sm:w-auto justify-end border-t border-white/5 pt-3 sm:pt-0 sm:border-t-0">
                  
                  <span className="font-mono text-[10px] font-semibold text-slate-400 px-1">
                    {item.size}
                  </span>

                  <button
                    id={`copy-history-link-${item.id}`}
                    onClick={() => handleCopyLink(item.videoUrl, item.id)}
                    title="Copy streaming source address"
                    className="p-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-4.5 h-4.5 text-emerald-400 animate-scale-in" />
                    ) : (
                      <Copy className="w-4.5 h-4.5" />
                    )}
                  </button>

                  <button
                    id={`redownload-link-${item.id}`}
                    onClick={() => executeDirectReDownload(item)}
                    title="Start stream re-download"
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border font-mono text-[10px] font-extrabold cursor-pointer transition-all active:scale-95 ${getAccentBg()}`}
                  >
                    <RefreshCcw className="w-3.5 h-3.5" />
                    <span>FETCH ATTACHMENT</span>
                  </button>

                  <button
                    id={`delete-history-btn-${item.id}`}
                    onClick={() => onRemoveItem(item.id)}
                    title="Delete history log"
                    className="p-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-rose-500/10 hover:border-rose-500/20 text-slate-500 hover:text-rose-400 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
