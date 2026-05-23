import { useState, useEffect } from "react";
import { ActiveTab, AppSettings, ActiveDownload, HistoryItem, VideoFormat, VideoMetadata } from "./types";
import Sidebar from "./components/Sidebar";
import HomeTab from "./components/HomeTab";
import DownloadsTab from "./components/DownloadsTab";
import HistoryTab from "./components/HistoryTab";
import SettingsTab from "./components/SettingsTab";
import AboutTab from "./components/AboutTab";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  
  // Load library history safely on mount
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem("neodl_history");
    return saved ? JSON.parse(saved) : [
      {
        id: "hist-ref-1",
        videoUrl: "https://www.youtube.com/watch?v=5qap5aO4i9A",
        title: "Awesome Futuristic Sound Design Mix 🌌",
        author: "Lofi Beats Studio",
        thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60",
        duration: "12:45",
        quality: "mp3",
        type: "mp3",
        size: "11.6 MB",
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        id: "hist-ref-2",
        videoUrl: "https://vimeo.com/22439234",
        title: "Vimeo Drone Footage Showcase 🎬",
        author: "AirCam Media",
        thumbnailUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&auto=format&fit=crop&q=60",
        duration: "2:30",
        quality: "1080p",
        type: "mp4",
        size: "34.2 MB",
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
      }
    ];
  });

  // Load configuration settings safely on mount
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem("neodl_settings");
    return saved ? JSON.parse(saved) : {
      defaultQuality: "720p",
      autoDownload: true,
      maxSimultaneousLoads: 3,
      neonThemeAccent: "purple",
      enableAudioNotifications: true,
    };
  });

  const [activeDownloads, setActiveDownloads] = useState<ActiveDownload[]>([]);

  // Sync state to local storage when changed
  useEffect(() => {
    localStorage.setItem("neodl_history", JSON.stringify(historyItems));
  }, [historyItems]);

  useEffect(() => {
    localStorage.setItem("neodl_settings", JSON.stringify(settings));
  }, [settings]);

  const handleUpdateSettings = (updates: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const handleCancelDownload = (id: string) => {
    // Locate and purge any active intervals or downloads
    setActiveDownloads((prev) => prev.filter((dl) => dl.id !== id));
  };

  const handleClearHistory = () => {
    setHistoryItems([]);
  };

  const handleRemoveHistoryItem = (id: string) => {
    setHistoryItems((prev) => prev.filter((h) => h.id !== id));
  };

  const handleStartDownload = (videoUrl: string, selectedFormat: VideoFormat, metadata: VideoMetadata) => {
    const dlId = `dl-${Date.now()}`;
    const newDownload: ActiveDownload = {
      id: dlId,
      videoUrl,
      metadata,
      selectedFormat,
      status: "analyzing",
      progress: 0,
      downloadSpeed: "Connecting...",
      eta: "Calculating...",
      downloadedBytes: "0.0 MB",
    };

    setActiveDownloads((prev) => [newDownload, ...prev]);
    
    // Automatically redirect browser to Downloads tab so user can see their active progress stream!
    setActiveTab("downloads");

    // Dynamic stream simulator variables
    let currentProgress = 0;
    const sizeInMB = parseFloat(selectedFormat.size.split(" ")[0]);
    const formatType = selectedFormat.type;

    // Simulation timing loop
    const timer = setInterval(() => {
      currentProgress += Math.random() * 4.5 + 1.2; // Smooth speed progress

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);

        // Transition active download to completed state
        setActiveDownloads((prev) =>
          prev.map((dl) =>
            dl.id === dlId
              ? {
                  ...dl,
                  status: "completed",
                  progress: 100,
                  downloadedBytes: selectedFormat.size,
                  downloadSpeed: "Finished",
                  eta: "0s",
                }
              : dl
          )
        );

        // Add to persistent historical records list
        const completedItem: HistoryItem = {
          id: `hist-${Date.now()}`,
          videoUrl,
          title: metadata.title,
          author: metadata.author,
          thumbnailUrl: metadata.thumbnailUrl,
          duration: metadata.duration,
          quality: selectedFormat.quality,
          type: formatType,
          size: selectedFormat.size,
          timestamp: new Date().toISOString(),
        };

        setHistoryItems((prev) => [completedItem, ...prev]);

        // ATOMIC ACTION: Direct Browser Trigger to server physical attachment stream!
        // This makes the download completely real to the client computer!
        const downloadUrl = `/api/download?title=${encodeURIComponent(metadata.title)}&quality=${encodeURIComponent(selectedFormat.quality)}&type=${encodeURIComponent(formatType)}`;
        
        const anchor = document.createElement("a");
        anchor.href = downloadUrl;
        anchor.setAttribute("download", `${metadata.title}_[${selectedFormat.quality}].${formatType}`);
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

      } else {
        // Increment and transition states dynamically
        let statusState: ActiveDownload["status"] = "analyzing";
        if (currentProgress >= 15 && currentProgress < 40) {
          statusState = "fetching";
        } else if (currentProgress >= 40 && currentProgress < 75) {
          statusState = "transcoding";
        } else if (currentProgress >= 75 && currentProgress < 95) {
          statusState = "multiplexing";
        } else if (currentProgress >= 95 && currentProgress < 100) {
          statusState = "serving";
        }

        // Mathematical variance for speed parameters
        const simulatedSpeed = (Math.random() * 4.2 + 6.1).toFixed(1); // 6.1 - 10.3 MB/s
        const writtenBytesStr = ((currentProgress / 100) * sizeInMB).toFixed(1);
        const calcEta = Math.ceil(((100 - currentProgress) / 100) * sizeInMB / parseFloat(simulatedSpeed));

        setActiveDownloads((prev) =>
          prev.map((dl) =>
            dl.id === dlId
              ? {
                  ...dl,
                  status: statusState,
                  progress: currentProgress,
                  downloadSpeed: `${simulatedSpeed} MB/s`,
                  downloadedBytes: `${writtenBytesStr} MB`,
                  eta: `${calcEta}s`,
                }
              : dl
          )
        );
      }
    }, 180);
  };

  // Helper mappings for the Neon Theme backgrounds
  const themeAccentStyle = () => {
    switch (settings.neonThemeAccent) {
      case "cyan":
        return "selection:bg-cyan-500/30 selection:text-cyan-300";
      case "rose":
        return "selection:bg-rose-500/30 selection:text-rose-300";
      case "emerald":
        return "selection:bg-emerald-500/30 selection:text-emerald-300";
      default: // purple
        return "selection:bg-purple-500/30 selection:text-purple-300";
    }
  };

  return (
    <div className={`min-h-screen bg-[#050505] text-zinc-100 flex flex-col md:flex-row relative bg-grid overflow-x-hidden ${themeAccentStyle()}`}>
      
      {/* Dynamic Glowing Accent Orbs in Canvas Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none -z-10" />

      {/* Persistent Sidebar Controller */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeDownloadsCount={activeDownloads.filter((d) => d.status !== "completed" && d.status !== "failed").length}
        settings={settings}
      />

      {/* Main Tab Routing Area */}
      <main id="main-content-canvas" className="flex-1 min-h-screen overflow-y-auto px-4 sm:px-8 py-6 relative">
        {activeTab === "home" && (
          <HomeTab
            onStartDownload={handleStartDownload}
            settings={settings}
          />
        )}

        {activeTab === "downloads" && (
          <DownloadsTab
            activeDownloads={activeDownloads}
            onCancelDownload={handleCancelDownload}
            settings={settings}
          />
        )}

        {activeTab === "history" && (
          <HistoryTab
            historyItems={historyItems}
            onClearHistory={handleClearHistory}
            onRemoveItem={handleRemoveHistoryItem}
            settings={settings}
          />
        )}

        {activeTab === "settings" && (
          <SettingsTab
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
          />
        )}

        {activeTab === "about" && (
          <AboutTab
            settings={settings}
          />
        )}
      </main>

    </div>
  );
}
