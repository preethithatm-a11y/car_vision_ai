import React, { useState, useEffect } from 'react';
import { X, Key, Volume2, VolumeX, Cpu, ShieldCheck, Download, Trash2, CheckCircle2 } from 'lucide-react';
import { storageService } from '../services/storageService';
import { audioService } from '../services/audioService';
import { UserSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsSaved?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onSettingsSaved,
}) => {
  const [settings, setSettings] = useState<UserSettings>(storageService.getSettings());
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setSettings(storageService.getSettings());
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveSettings(settings);
    audioService.setEnabled(settings.soundEffects);
    if (settings.soundEffects) {
      audioService.playSuccessChime();
    }
    setSavedSuccess(true);
    onSettingsSaved?.();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleExportData = () => {
    const jsonStr = storageService.exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carvision_ai_data_export_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    if (settings.soundEffects) audioService.playClick();
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to delete all saved scan history? This action cannot be undone.')) {
      storageService.clearAllScans();
      if (settings.soundEffects) audioService.playClick();
      alert('Scan history successfully cleared.');
      onSettingsSaved?.();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">System Settings</h3>
              <p className="text-xs text-slate-400">Vision engine and system preferences</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* AI Vision Engine Mode */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              AI Vision Engine Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSettings({ ...settings, useSimulatedAI: false })}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  !settings.useSimulatedAI
                    ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-xs text-cyan-300 mb-1">Live AI / Auto</div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  Uses Gemini Vision API if key is present, with smart fallback.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSettings({ ...settings, useSimulatedAI: true })}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  settings.useSimulatedAI
                    ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-xs text-cyan-300 mb-1">Smart Neural Demo</div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  High-speed offline simulation engine with damage segmentation.
                </div>
              </button>
            </div>
          </div>

          {/* Gemini API Key */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-cyan-400" />
                Optional Google Gemini API Key
              </span>
              <span className="text-[10px] text-slate-500">Stored locally only</span>
            </label>
            <input
              type="password"
              value={settings.geminiApiKey}
              onChange={(e) => setSettings({ ...settings, geminiApiKey: e.target.value })}
              placeholder="AIzaSy..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <p className="text-[11px] text-slate-400 leading-relaxed">
              If left blank, CarVision AI automatically utilizes its built-in automotive neural heuristic engine.
            </p>
          </div>

          {/* Sound Feedback */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-800 text-cyan-400">
                {settings.soundEffects ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Synthesized UI Audio Effects</div>
                <div className="text-[11px] text-slate-400">Subtle futuristic laser radar chimes & scan pulses</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, soundEffects: !settings.soundEffects })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.soundEffects ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.soundEffects ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Data Management & Export */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Data & Local Storage
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleExportData}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                Export Scans (JSON)
              </button>

              <button
                type="button"
                onClick={handleClearHistory}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-medium border border-rose-800/40 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Scans
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 flex items-center gap-3">
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  Settings Applied!
                </>
              ) : (
                'Save Preferences'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
