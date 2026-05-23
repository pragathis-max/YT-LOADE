import { Home, Download, History, Settings, Menu, X, Youtube, MonitorPlay, Sparkles, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ActiveTab, AppSettings } from "../types";

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeDownloadsCount: number;
  settings: AppSettings;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  activeDownloadsCount,
  settings,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const tabs: { id: ActiveTab; label: string; icon: any }[] = [
    { id: "home", label: "Home Base", icon: Home },
    { id: "downloads", label: "Live Queue", icon: Download },
    { id: "history", label: "My Library", icon: History },
    { id: "settings", label: "System Config", icon: Settings },
    { id: "about", label: "About & Office", icon: Info },
  ];

  // Helper theme mappings
  const getAccentColor = () => {
    switch (settings.neonThemeAccent) {
      case "cyan":
        return "from-cyan-400 to-blue-500 shadow-cyan-500/20";
      case "rose":
        return "from-rose-400 to-pink-500 shadow-rose-500/20";
      case "emerald":
        return "from-emerald-400 to-teal-500 shadow-emerald-500/20";
      default: // purple
        return "from-indigo-500 via-purple-500 to-pink-500 shadow-indigo-500/20";
    }
  };

  const getBorderColor = () => {
    switch (settings.neonThemeAccent) {
      case "cyan":
        return "border-white/10";
      default:
        return "border-white/10";
    }
  };

  const getHighlightText = () => {
    switch (settings.neonThemeAccent) {
      case "cyan":
        return "text-cyan-400";
      case "rose":
        return "text-rose-400";
      case "emerald":
        return "text-emerald-400";
      default:
        return "text-indigo-400";
    }
  };



  return (
    <>
      {/* Mobile Header */}
      <div id="mobile-sidebar-header" className="md:hidden bg-zinc-900/40 backdrop-blur-xl w-full h-16 flex items-center justify-between px-6 border-b border-white/5 z-50 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <Youtube className="w-5 h-5 text-white animate-pulse" />
          </div>
          <span className="font-sans font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            YT <span className="text-indigo-400 ml-0.5">LOADE</span>
          </span>
        </div>
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-zinc-900/40 border-r border-white/5 pt-6 pb-4 flex flex-col justify-between transform md:translate-x-0 transition-transform duration-300 md:sticky md:top-0 md:h-screen backdrop-blur-xl
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex flex-col gap-8 px-6">
          {/* Logo Heading (Desktop-Only) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <MonitorPlay className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
                YT <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 ml-0.5">LOADE</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-0.5 flex items-center gap-1.5">
                v1.2.0-STABLE
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold mb-1 pl-2">
              Navigation
            </span>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  id={`tab-btn-${tab.id}`}
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsOpen(false);
                  }}
                  className={`group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all duration-300 select-none
                    ${isActive 
                      ? `${getHighlightText()} bg-white/5 border border-white/5` 
                      : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110
                    ${isActive ? getHighlightText() : "text-zinc-500 group-hover:text-white"}`} />
                  
                  <span className="flex-1 text-left">{tab.label}</span>

                  {tab.id === "downloads" && activeDownloadsCount > 0 && (
                    <span className="flex items-center justify-center bg-indigo-500 text-white font-mono text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {activeDownloadsCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info box */}
        <div className="px-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1 text-[9px] font-mono text-zinc-500 px-2 pt-2">
            <div className="flex items-center justify-between">
              <span>PING: 14ms</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>LIVE CORE</span>
              </div>
            </div>
            <div className="text-center text-[8px] text-zinc-600 mt-1 uppercase tracking-wider">
              © MVH production
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          id="mobile-sidebar-overlay"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 md:hidden"
        />
      )}
    </>
  );
}
