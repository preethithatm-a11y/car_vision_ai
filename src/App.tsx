import React, { useState, useEffect } from 'react';
import { PageRoute, PresetDemoVehicle, ScanResult } from './types';
import { storageService } from './services/storageService';
import { audioService } from './services/audioService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SettingsModal } from './components/SettingsModal';
import { HomePage } from './pages/HomePage';
import { ScannerPage } from './pages/ScannerPage';
import { HistoryPage } from './pages/HistoryPage';
import { SafetyTipsPage } from './pages/SafetyTipsPage';
import { AboutPage } from './pages/AboutPage';

export const App: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState<PageRoute>('home');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [historyCount, setHistoryCount] = useState<number>(0);
  const [selectedPreset, setSelectedPreset] = useState<PresetDemoVehicle | null>(null);

  // Initialize settings & history count
  useEffect(() => {
    const settings = storageService.getSettings();
    setSoundEnabled(settings.soundEffects);
    audioService.setEnabled(settings.soundEffects);
    updateHistoryCount();
  }, []);

  const updateHistoryCount = () => {
    const scans = storageService.getScans();
    setHistoryCount(scans.length);
  };

  const handleToggleSound = () => {
    const newVal = !soundEnabled;
    setSoundEnabled(newVal);
    audioService.setEnabled(newVal);
    storageService.saveSettings({ soundEffects: newVal });
    if (newVal) {
      audioService.playClick();
    }
  };

  const handleSelectPresetVehicle = (vehicle: PresetDemoVehicle) => {
    setSelectedPreset(vehicle);
    setActiveRoute('scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewScanDetails = (scan: ScanResult) => {
    // Wrap the scan as a preset vehicle to open in Scanner Page dashboard
    setSelectedPreset({
      id: scan.id,
      title: scan.vehicleOverview.estimatedMakeModel,
      subtitle: scan.vehicleOverview.vehicleColor,
      category: scan.vehicleOverview.vehicleType,
      thumbnail: scan.imageUrl,
      description: scan.summaryNotes,
      presetResult: {
        vehicleOverview: scan.vehicleOverview,
        visibleCondition: scan.visibleCondition,
        damageItems: scan.damageItems,
        safetyInsights: scan.safetyInsights,
        summaryNotes: scan.summaryNotes,
        modelUsed: scan.modelUsed,
      }
    });
    setActiveRoute('scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScanCompleted = () => {
    updateHistoryCount();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 cyber-grid-bg selection:bg-cyan-500 selection:text-black font-sans">
      {/* Top Header Navbar */}
      <Navbar
        activeRoute={activeRoute}
        onRouteChange={setActiveRoute}
        onOpenSettings={() => setIsSettingsOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        historyCount={historyCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeRoute === 'home' && (
          <HomePage
            onRouteChange={setActiveRoute}
            onSelectPresetVehicle={handleSelectPresetVehicle}
          />
        )}

        {activeRoute === 'scanner' && (
          <ScannerPage
            selectedPreset={selectedPreset}
            onClearPreset={() => setSelectedPreset(null)}
            onScanCompleted={handleScanCompleted}
          />
        )}

        {activeRoute === 'history' && (
          <HistoryPage
            onRouteChange={setActiveRoute}
            onViewScanDetails={handleViewScanDetails}
          />
        )}

        {activeRoute === 'safety' && <SafetyTipsPage />}

        {activeRoute === 'about' && (
          <AboutPage onRouteChange={setActiveRoute} />
        )}
      </main>

      {/* Footer */}
      <Footer onRouteChange={setActiveRoute} />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSettingsSaved={() => {
          const s = storageService.getSettings();
          setSoundEnabled(s.soundEffects);
          updateHistoryCount();
        }}
      />
    </div>
  );
};

export default App;
