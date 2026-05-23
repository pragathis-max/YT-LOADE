import { motion } from "motion/react";
import { useState, FormEvent } from "react";
import { AppSettings } from "../types";
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  FileText, 
  Globe, 
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Zap,
  Youtube,
  Handshake
} from "lucide-react";

interface AboutProps {
  settings: AppSettings;
}

export default function AboutTab({ settings }: AboutProps) {
  // Theme Helper Mappings
  const getAccentText = () => {
    switch (settings.neonThemeAccent) {
      case "cyan": return "text-cyan-400";
      case "rose": return "text-rose-400";
      case "emerald": return "text-emerald-400";
      default: return "text-indigo-400";
    }
  };

  const getAccentBg = () => {
    switch (settings.neonThemeAccent) {
      case "cyan": return "bg-cyan-500 hover:bg-cyan-400 text-slate-950";
      case "rose": return "bg-rose-500 hover:bg-rose-400 text-white";
      case "emerald": return "bg-emerald-500 hover:bg-emerald-400 text-slate-950";
      default: return "bg-indigo-600 hover:bg-indigo-500 text-white";
    }
  };

  const getAccentBorder = () => {
    switch (settings.neonThemeAccent) {
      case "cyan": return "border-cyan-500/20 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/20";
      case "rose": return "border-rose-500/20 focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/20";
      case "emerald": return "border-emerald-500/20 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/20";
      default: return "border-indigo-500/20 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/20";
    }
  };

  const getGlowBg = () => {
    switch (settings.neonThemeAccent) {
      case "cyan": return "bg-cyan-500/5";
      case "rose": return "bg-rose-500/5";
      case "emerald": return "bg-emerald-500/5";
      default: return "bg-indigo-500/5";
    }
  };

  // Form Submission Simulator State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("General Support Request");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormName("");
      setFormEmail("");
      setFormMessage("");
      setTimeout(() => setSubmitSuccess(false), 5000); // Hide alert after 5s
    }, 1200);
  };

  return (
    <div id="about-tab-container" className="max-w-5xl mx-auto flex flex-col gap-8 pb-16 animate-fade-in select-none">
      
      {/* Top Welcome Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
            Developer & <span className={getAccentText()}>System Details</span>
          </h1>
          <p className="text-xs text-zinc-400 font-sans mt-1.5 leading-relaxed">
            Discover the creative minds, development house, and corporate office details powering the advanced NEODL framework.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-zinc-300 uppercase tracking-widest font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Verified Author
          </span>
        </div>
      </div>

      {/* Primary Bio Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Creator Identity Block */}
        <div className={`md:col-span-2 p-6 sm:p-8 rounded-[32px] bg-zinc-900/40 border border-white/10 relative overflow-hidden flex flex-col justify-between backdrop-blur-md ${getGlowBg()}`}>
          <div className="absolute top-0 right-0 p-3">
            <Sparkles className={`w-5 h-5 animate-pulse ${getAccentText()}`} />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
                <User className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-black">Lead System Engineer</span>
                <h2 className="font-sans font-black text-xl sm:text-2xl text-white tracking-tight mt-0.5">
                  PRAGATHISWARAN.B
                </h2>
              </div>
            </div>

            <div className="h-px bg-white/5 my-2" />

            <p className="font-sans text-sm text-zinc-300 leading-relaxed">
              Designed and engineered with absolute structural precision, NEODL reflects Pragathiswaran's high-performance standard in building clean, client-centered media pipeline applications. Utilizing modern React, advanced virtual rendering states, and optimized local metadata parsers.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-mono text-zinc-400 border border-white/5">React 18</span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-mono text-zinc-400 border border-white/5">TypeScript</span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-mono text-zinc-400 border border-white/5">Tailwind v4</span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-mono text-zinc-400 border border-white/5">Media UX</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-zinc-600" />
              <span>Developer Group: <strong>Global Engineering</strong></span>
            </div>
            <div className="hidden sm:block text-zinc-700">|</div>
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-zinc-600" />
              <span>Active Releases: <strong>v1.2.0-STABLE</strong></span>
            </div>
          </div>
        </div>

        {/* Production House Block */}
        <div className="p-6 sm:p-8 rounded-[32px] bg-zinc-900/40 border border-white/10 relative overflow-hidden flex flex-col justify-between backdrop-blur-md">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Building2 className="w-6 h-6 text-zinc-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold">Production Studio / Publisher</span>
              <h2 className="font-sans font-black text-xl text-white tracking-tight mt-0.5">
                MVH production
              </h2>
            </div>
            <div className="h-px bg-white/5 my-1" />
            <p className="font-sans text-xs text-zinc-400 leading-relaxed">
              MVH Production stands as a signature label of reliable, sleek, digital media infrastructure outputs. Focusing on modern media tooling, container integrations, and custom system proxies.
            </p>
          </div>

          <div className="mt-8">
            <span className="inline-block font-mono text-[9px] uppercase tracking-widest text-zinc-500 border border-white/5 bg-zinc-950 px-2.5 py-1 rounded-md">
              A Division of MVH Group
            </span>
          </div>
        </div>

        {/* Official YouTuber Partnership Block */}
        <div className="md:col-span-3 p-6 sm:p-8 rounded-[32px] bg-zinc-900/40 border border-white/10 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 backdrop-blur-md">
          {/* subtle ambient gradient bg */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-red-500/5 blur-3xl pointer-events-none" />
          
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 flex-shrink-0">
              <Youtube className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-black flex items-center gap-1.5">
                <Handshake className="w-3.5 h-3.5 text-red-500" />
                OFFICIAL WEBSITE PARTNERS
              </span>
              <h3 className="font-sans font-black text-lg text-white tracking-tight mt-1 font-sans">
                YouTuber Creative Network
              </h3>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed mt-1 max-w-xl">
                We are incredibly proud to be official partners of lead YouTube content creators. High-speed media caching and advanced rendering standards are engineered to support active community hubs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full lg:w-auto lg:min-w-[440px] flex-shrink-0">
            {/* Darko Anime Lover */}
            <a
              href="https://youtube.com/@darkoanimelover?si=XXH6zMylyIZphUwj"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-zinc-950/40 border border-white/5 flex items-center gap-3 hover:border-red-500/40 hover:bg-zinc-900/60 transition-all group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center font-bold text-sm tracking-wider group-hover:scale-105 transition-transform font-mono">
                D
              </div>
              <div>
                <p className="font-sans font-black text-xs text-zinc-200 group-hover:text-red-400 transition-colors">Darko Anime Lover</p>
                <p className="text-[9px] font-mono text-rose-400 uppercase tracking-widest font-bold mt-0.5">Youtuber Partner ↗</p>
              </div>
            </a>

            {/* SRIEXPLAINER OFFICIAL */}
            <a
              href="https://youtube.com/@sriexplainerofficial?si=m6W2GkVDvBhmFfXo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-zinc-950/40 border border-white/5 flex items-center gap-3 hover:border-red-500/40 hover:bg-zinc-900/60 transition-all group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center font-bold text-sm tracking-wider group-hover:scale-105 transition-transform font-mono">
                S
              </div>
              <div>
                <p className="font-sans font-black text-xs text-zinc-200 group-hover:text-red-400 transition-colors">SRIEXPLAINER OFFICIAL</p>
                <p className="text-[9px] font-mono text-red-400 uppercase tracking-widest font-bold mt-0.5">Youtuber Partner ↗</p>
              </div>
            </a>
          </div>

        </div>

      </div>

      {/* Office Details & Interactive Dispatch Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full mt-2">
        
        {/* Office details panel - 5 wide */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="bg-zinc-900/40 border border-white/10 p-6 sm:p-8 rounded-[32px] flex flex-col gap-6 backdrop-blur-md">
            <div>
              <h3 className="font-sans font-bold text-sm text-white uppercase tracking-wider mb-1">
                Office Coordinates
              </h3>
              <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">
                Reach out to our head offices, support desk or direct inquiries channel.
              </p>
            </div>

            <div className="h-px bg-white/5" />

            <div className="flex flex-col gap-5">
              
              {/* Direct Mailing Channels */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-white/5 text-zinc-400 mt-0.5 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col font-sans">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black">Official Mail Dispatch</span>
                  <span className="text-sm text-zinc-200 mt-0.5 font-medium">appua26145@gmail.com</span>
                  <span className="text-xs text-zinc-400">Direct creator messaging inbox</span>
                </div>
              </div>

              {/* Directly Developer Helpline */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-white/5 text-zinc-400 mt-0.5 flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col font-sans">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black">Direct Helpline Support</span>
                  <span className="text-sm text-zinc-200 mt-0.5 font-medium">+91 99948 64754</span>
                  <span className="text-xs text-zinc-400">Voice & Technical Support</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Contact dispatch form - 7 wide */}
        <div className="md:col-span-7">
          <div className="bg-zinc-900/40 border border-white/10 p-6 sm:p-8 rounded-[32px] flex flex-col gap-5 backdrop-blur-md">
            <div>
              <h3 className="font-sans font-bold text-sm text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-zinc-400" />
                System Contact Terminal
              </h3>
              <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">
                Dispatch complaints or feedback about this website directly to our developer team at <strong className="text-zinc-300">appua26145@gmail.com</strong>.
              </p>
            </div>

            <div className="h-px bg-white/5" />

            {/* Simulated success alert info */}
            {submitSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10 flex items-start gap-3 text-emerald-400"
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-xs font-sans">
                  <p className="font-bold">Message Dispatched Successfully!</p>
                  <p className="text-emerald-500/70 mt-0.5">Your complaint/feedback has been sent to appua26145@gmail.com and our review queue.</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSendMessage} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Alexander Pierce"
                    className={`bg-zinc-950/60 text-white rounded-xl py-3 px-4 outline-none text-xs font-sans border transition-all ${getAccentBorder()}`}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Your Email Address</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="e.g. alex@corporate.com"
                    className={`bg-zinc-950/60 text-white rounded-xl py-3 px-4 outline-none text-xs font-sans border transition-all ${getAccentBorder()}`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Inquiry Subject</label>
                <select
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className={`bg-zinc-950/60 text-white rounded-xl py-3 px-4 outline-none text-xs font-sans border transition-all ${getAccentBorder()}`}
                >
                  <option value="General Support Request">General Support Request</option>
                  <option value="Business & Enterprise License">Business & Enterprise License</option>
                  <option value="Custom Media Transcoder Dev">Custom Media Transcoder Dev</option>
                  <option value="Copyright & Content Report">Copyright & Content Report</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Communication Content</label>
                <textarea
                  required
                  rows={4}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Detail your requirements, bugs or license requests here..."
                  className={`bg-zinc-950/60 text-white rounded-xl py-3 px-4 outline-none text-xs font-sans border transition-all resize-none ${getAccentBorder()}`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-xl font-bold font-sans text-xs transition-all duration-300 flex items-center justify-center gap-2 mt-2 cursor-pointer ${getAccentBg()}`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Connecting Core...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Send Encrypted Request
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
