import { ScanResult, UserSettings } from '../types';

const STORAGE_KEYS = {
  SCANS: 'carvision_scans_history_v1',
  SETTINGS: 'carvision_user_settings_v1',
};

const DEFAULT_SETTINGS: UserSettings = {
  geminiApiKey: '',
  useSimulatedAI: false, // Default to true if no key provided in code logic
  soundEffects: true,
  theme: 'dark',
  saveScansLocally: true,
};

export const storageService = {
  // Scans History
  getScans(): ScanResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SCANS);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Failed to load scans from localStorage:', e);
      return [];
    }
  },

  saveScan(scan: ScanResult): boolean {
    try {
      const scans = this.getScans();
      // Prepend the new scan so latest is first
      const updated = [scan, ...scans.filter(s => s.id !== scan.id)];
      // Keep up to 30 latest scans to avoid quota exhaustion with base64 images
      const trimmed = updated.slice(0, 30);
      localStorage.setItem(STORAGE_KEYS.SCANS, JSON.stringify(trimmed));
      return true;
    } catch (e) {
      console.error('Failed to save scan to localStorage:', e);
      // If quota exceeded, try removing old images
      try {
        const scans = this.getScans();
        const trimmed = scans.slice(0, 5);
        localStorage.setItem(STORAGE_KEYS.SCANS, JSON.stringify([scan, ...trimmed]));
        return true;
      } catch {
        return false;
      }
    }
  },

  getScanById(id: string): ScanResult | null {
    const scans = this.getScans();
    return scans.find(s => s.id === id) || null;
  },

  deleteScan(id: string): boolean {
    try {
      const scans = this.getScans();
      const updated = scans.filter(s => s.id !== id);
      localStorage.setItem(STORAGE_KEYS.SCANS, JSON.stringify(updated));
      return true;
    } catch (e) {
      console.error('Failed to delete scan:', e);
      return false;
    }
  },

  clearAllScans(): boolean {
    try {
      localStorage.removeItem(STORAGE_KEYS.SCANS);
      return true;
    } catch (e) {
      console.error('Failed to clear scans:', e);
      return false;
    }
  },

  // User Settings
  getSettings(): UserSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) return DEFAULT_SETTINGS;
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch (e) {
      console.error('Failed to load settings:', e);
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: Partial<UserSettings>): UserSettings {
    try {
      const current = this.getSettings();
      const updated = { ...current, ...settings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to save settings:', e);
      return DEFAULT_SETTINGS;
    }
  },

  exportDataJson(): string {
    const scans = this.getScans();
    const settings = this.getSettings();
    return JSON.stringify({ scans, settings, exportedAt: new Date().toISOString() }, null, 2);
  }
};
