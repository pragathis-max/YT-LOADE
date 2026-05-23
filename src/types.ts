export type ActiveTab = "home" | "downloads" | "history" | "settings" | "about";

export interface VideoFormat {
  quality: string;
  type: "mp4" | "mp3";
  size: string;
  fps: number | null;
  scale: number;
}

export interface VideoMetadata {
  videoId: string;
  platform: string;
  title: string;
  author: string;
  thumbnailUrl: string;
  duration: string;
  views: string;
  formats: VideoFormat[];
}

export type DownloadStatus = "idle" | "analyzing" | "fetching" | "transcoding" | "multiplexing" | "serving" | "completed" | "failed";

export interface ActiveDownload {
  id: string; // unique download instance ID
  videoUrl: string;
  metadata: VideoMetadata;
  selectedFormat: VideoFormat;
  status: DownloadStatus;
  progress: number; // 0 to 100
  downloadSpeed: string; // e.g. "8.4 MB/s"
  eta: string; // e.g. "12s"
  downloadedBytes: string; // e.g. "24.1 MB"
  errorMessage?: string;
}

export interface HistoryItem {
  id: string;
  videoUrl: string;
  title: string;
  author: string;
  thumbnailUrl: string;
  duration: string;
  quality: string;
  type: "mp4" | "mp3";
  size: string;
  timestamp: string; // datetime string
  fileUrl?: string;
}

export interface AppSettings {
  defaultQuality: "1080p" | "720p" | "360p" | "mp3";
  autoDownload: boolean;
  maxSimultaneousLoads: number;
  neonThemeAccent: "purple" | "cyan" | "rose" | "emerald";
  enableAudioNotifications: boolean;
}
