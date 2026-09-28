import React, { useState, useRef, useEffect } from 'react';
import { 
  ScanResult, 
  DamageItem, 
  DamageSeverity, 
  PresetDemoVehicle 
} from '../types';
import { analyzeVehicleImage, ScanProgressUpdate } from '../services/aiVisionService';
import { storageService } from '../services/storageService';
import { audioService } from '../services/audioService';
import { CameraCaptureModal } from '../components/CameraCaptureModal';
import { DamageHotspotOverlay } from '../components/DamageHotspotOverlay';
import { 
  Upload, 
  Camera, 
  Trash2, 
  Sparkles, 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  ShieldCheck, 
  RotateCcw, 
  Bookmark, 
  Printer, 
  FileText, 
  Gauge, 
  Car, 
  ShieldAlert, 
  Activity,
  Layers
} from 'lucide-react';

interface ScannerPageProps {
  selectedPreset?: PresetDemoVehicle | null;
  onClearPreset?: () => void;
  onScanCompleted?: (scan: ScanResult) => void;
}

export const ScannerPage: React.FC<ScannerPageProps> = ({
  selectedPreset,
  onClearPreset,
  onScanCompleted,
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [progressUpdate, setProgressUpdate] = useState<ScanProgressUpdate | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [selectedDamageItem, setSelectedDamageItem] = useState<DamageItem | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  // Load preset if passed from Home page
  useEffect(() => {
    if (selectedPreset) {
      setImageUri(selectedPreset.thumbnail);
      setImageFileName(`${selectedPreset.title}.jpg`);
      setScanResult({
        ...selectedPreset.presetResult,
        id: `scan-${Date.now()}`,
        timestamp: new Date().toISOString(),
        imageUrl: selectedPreset.thumbnail,
        imageFileName: `${selectedPreset.title}.jpg`,
      });
      setIsSaved(false);
      onClearPreset?.();
    }
  }, [selectedPreset]);

  // Scroll to results when scan completes
  useEffect(() => {
    if (scanResult && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, [scanResult]);

  const validateAndSetFile = (file: File) => {
    setErrorMsg(null);
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMsg('Unsupported format. Please upload a JPG, JPEG, PNG, or WEBP image.');
      audioService.playWarningAlert();
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('Image file size exceeds 15MB. Please upload a smaller image.');
      audioService.playWarningAlert();
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImageUri(dataUrl);
      setImageFileName(file.name);
      setScanResult(null);
      setSelectedDamageItem(null);
      setIsSaved(false);
      audioService.playClick();
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleCameraCapture = (dataUrl: string) => {
    setImageUri(dataUrl);
    setImageFileName(`camera-snapshot-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.jpg`);
    setScanResult(null);
    setSelectedDamageItem(null);
    setIsSaved(false);
  };

  const handleRemoveImage = () => {
    audioService.playClick();
    setImageUri(null);
    setImageFileName(null);
    setScanResult(null);
    setSelectedDamageItem(null);
    setErrorMsg(null);
    setIsSaved(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!imageUri) return;

    setIsAnalyzing(true);
    setErrorMsg(null);
    audioService.playRadarSweep();

    try {
      const result = await analyzeVehicleImage(
        imageUri, 
        imageFileName || undefined, 
        (update) => {
          setProgressUpdate(update);
          audioService.playScanBeep(500 + update.percent * 5);
        }
      );

      setScanResult(result);
      setIsSaved(false);
      audioService.playSuccessChime();
      
      // Auto-save scan
      const saved = storageService.saveScan(result);
      if (saved) {
        setIsSaved(true);
        onScanCompleted?.(result);
      }
    } catch (err) {
      console.error('Scan analysis error:', err);
      setErrorMsg('An error occurred during AI analysis. Please try again.');
      audioService.playWarningAlert();
    } finally {
      setIsAnalyzing(false);
      setProgressUpdate(null);
    }
  };

  const handleSaveToHistory = () => {
    if (!scanResult) return;
    const saved = storageService.saveScan(scanResult);
    if (saved) {
      setIsSaved(true);
      audioService.playSuccessChime();
      onScanCompleted?.(scanResult);
    }
  };

  const handlePrintReport = () => {
    audioService.playClick();
    window.print();
  };

  const getStatusBadge = (status: DamageSeverity) => {
    switch (status) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40">
            <AlertCircle className="w-3 h-3 text-rose-400" />
            Critical
          </span>
        );
      case 'Attention':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            Attention
          </span>
        );
      case 'Good':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            Good
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          NEURAL OPTICAL SCANNER
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Scan Your Car
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Upload a clear image of your car for AI-powered visual analysis.
        </p>
      </div>

      {/* Upload / Image Selection Area */}
      {!scanResult && (
        <div className="max-w-3xl mx-auto">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-3 animate-fadeIn">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {!imageUri ? (
            /* Large Drag & Drop Box */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 p-8 sm:p-12 text-center flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-md ${
                isDragging
                  ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_35px_rgba(6,182,212,0.35)] scale-[1.01]'
                  : 'border-slate-700/80 hover:border-cyan-500/60 hover:bg-slate-900/90'
              }`}
            >
              {/* Background HUD accents */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.2)] mb-5 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Drop your car photo here or browse
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
                Take a straight-on or angled 3/4 exterior photo in daylight. Supports JPG, JPEG, PNG, or WEBP (Max 15MB).
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Image</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audioService.playClick();
                    setIsCameraOpen(true);
                  }}
                  className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4 text-cyan-400" />
                  <span>Use Camera</span>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          ) : (
            /* Selected Image Preview Box */
            <div className="rounded-3xl bg-slate-900 border border-cyan-500/30 p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-sm text-white truncate max-w-[200px] sm:max-w-md">
                    {imageFileName || 'Vehicle Image Ready'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={isAnalyzing}
                  className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove Image</span>
                </button>
              </div>

              {/* Image Viewport with Animated Laser Scan when Analyzing */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[16/10] flex items-center justify-center border border-slate-800">
                <img
                  src={imageUri}
                  alt="Vehicle Preview"
                  className="w-full h-full object-contain"
                />

                {/* Processing Overlay State */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30">
                    {/* Laser Radar Line */}
                    <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 animate-scan-line pointer-events-none" />

                    {/* Spinning HUD Radar Ring */}
                    <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                      <div className="w-16 h-16 rounded-full border border-dashed border-cyan-400/40 flex items-center justify-center">
                        <Car className="w-8 h-8 text-cyan-400 animate-pulse" />
                      </div>
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold text-white mb-2 font-mono">
                      {progressUpdate?.label || 'Analyzing your vehicle...'}
                    </h4>

                    <p className="text-xs text-slate-400 max-w-sm mb-4 font-mono">
                      Neural segmentation models processing optical exterior telemetry...
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full max-w-xs h-2 rounded-full bg-slate-800 overflow-hidden border border-cyan-500/30">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                        style={{ width: `${progressUpdate?.percent || 20}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 mt-2">
                      {progressUpdate?.percent || 20}% COMPLETED
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {!isAnalyzing && (
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm tracking-wide shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Analyze Car</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ANALYSIS RESULT DASHBOARD */}
      {scanResult && (
        <div ref={resultsRef} className="space-y-10 animate-fadeIn">
          {/* Top Result Action Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-xl backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {scanResult.modelUsed}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(scanResult.timestamp).toLocaleString()}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Vehicle Diagnostic Dashboard
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleRemoveImage}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span>Scan Again</span>
              </button>

              <button
                type="button"
                onClick={handleSaveToHistory}
                disabled={isSaved}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  isSaved
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                    : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border-cyan-500/50'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isSaved ? 'Saved to History' : 'Save Scan'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrintReport}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                title="Print Diagnostic Report"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Visual Overlay with Pins */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                OPTICAL DAMAGE SEGMENTATION MAP
              </span>
              <span>{scanResult.damageItems.length} ANOMALIES PINPOINTED</span>
            </div>
            <DamageHotspotOverlay
              imageUrl={scanResult.imageUrl}
              damageItems={scanResult.damageItems}
              selectedItem={selectedDamageItem}
              onSelectItem={(item) => setSelectedDamageItem(item)}
            />
          </div>

          {/* Two-Column Overview & Condition Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Col: Vehicle Overview (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Vehicle Overview</h3>
                    <p className="text-xs text-slate-400">Classified specifications</p>
                  </div>
                </div>

                {/* Confidence Badge */}
                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Confidence</div>
                  <div className="text-base font-extrabold font-mono text-cyan-300">
                    {scanResult.vehicleOverview.confidenceScore}%
                  </div>
                </div>
              </div>

              {/* Key Specs Table */}
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-slate-400">Estimated Make & Model</span>
                  <span className="font-bold text-white text-right">
                    {scanResult.vehicleOverview.estimatedMakeModel}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-slate-400">Vehicle Type</span>
                  <span className="font-semibold text-cyan-300">
                    {scanResult.vehicleOverview.vehicleType}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-slate-400">Dominant Color</span>
                  <span className="font-medium text-slate-200 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
                    {scanResult.vehicleOverview.vehicleColor}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-slate-400">Vehicle Category</span>
                  <span className="font-medium text-slate-200">
                    {scanResult.vehicleOverview.vehicleCategory}
                  </span>
                </div>

                {scanResult.vehicleOverview.estimatedYearRange && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <span className="text-slate-400">Estimated Era</span>
                    <span className="font-mono text-slate-300">
                      {scanResult.vehicleOverview.estimatedYearRange}
                    </span>
                  </div>
                )}
              </div>

              {/* Summary Notes box */}
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-200/90 leading-relaxed">
                <div className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5 font-mono text-[11px] uppercase">
                  <FileText className="w-3.5 h-3.5" />
                  Optical Analysis Notes
                </div>
                {scanResult.summaryNotes}
              </div>
            </div>

            {/* Right Col: Visible Condition & Gauges (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Visible Condition</h3>
                    <p className="text-xs text-slate-400">Overall exterior physical health metrics</p>
                  </div>
                </div>

                {/* Big Score Dial */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Health Score</div>
                    <div className={`text-2xl font-black font-mono ${
                      scanResult.visibleCondition.overallScore >= 85 
                        ? 'text-emerald-400' 
                        : scanResult.visibleCondition.overallScore >= 65 
                        ? 'text-amber-400' 
                        : 'text-rose-400'
                    }`}>
                      {scanResult.visibleCondition.overallScore}/100
                    </div>
                  </div>
                </div>
              </div>

              {/* Condition Matrix Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Exterior Grade</span>
                  <div className="text-sm font-bold text-white flex items-center justify-between">
                    <span>{scanResult.visibleCondition.exteriorCondition}</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Tire Profile</span>
                  <div className="text-sm font-bold text-white flex items-center justify-between">
                    <span className="truncate">{scanResult.visibleCondition.tireVisibility}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Lighting Clusters</span>
                  <div className="text-sm font-bold text-white flex items-center justify-between">
                    <span className="truncate">{scanResult.visibleCondition.lightingCondition}</span>
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Glass & Windshield</span>
                  <div className="text-sm font-bold text-white flex items-center justify-between">
                    <span className="truncate">{scanResult.visibleCondition.glassIntegrity}</span>
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                  </div>
                </div>
              </div>

              {/* Visible Damage Level Bar */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">Visible Damage Index</span>
                  <span className="font-mono font-bold text-cyan-300">
                    {scanResult.visibleCondition.visibleDamageScore}%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      scanResult.visibleCondition.visibleDamageScore > 50 
                        ? 'bg-rose-500' 
                        : scanResult.visibleCondition.visibleDamageScore > 20 
                        ? 'bg-amber-500' 
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.max(5, scanResult.visibleCondition.visibleDamageScore)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* DAMAGE DETECTION SECTION */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Damage Detection Breakdown
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Segmented exterior body, glass, lighting, and bumper observations.
                </p>
              </div>

              <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
                {scanResult.damageItems.length} Items Classified
              </span>
            </div>

            {scanResult.damageItems.length === 0 ? (
              <div className="p-8 rounded-3xl bg-slate-900/80 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-base">No Visible Exterior Defects Detected</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Vehicle paint, lenses, glass, and lower panels appear free of noticeable abrasions, denting, or fracture.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {scanResult.damageItems.map((item) => {
                  const isSelected = selectedDamageItem?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        audioService.playClick();
                        setSelectedDamageItem(item);
                      }}
                      className={`p-5 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-sm text-white leading-snug">
                            {item.label}
                          </span>
                          {getStatusBadge(item.status)}
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                          <span>SEVERITY INDEX</span>
                          <span className="font-bold text-white">{item.severityScore}/100</span>
                        </div>

                        <div className="text-[11px] text-cyan-300 bg-cyan-950/30 p-2.5 rounded-xl border border-cyan-500/20 leading-tight">
                          <span className="font-semibold block text-cyan-400 mb-0.5">Recommendation:</span>
                          {item.recommendation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* AI SAFETY RECOMMENDATIONS */}
          <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  AI Safety Recommendations
                </h3>
                <p className="text-xs text-slate-400">
                  Proactive preventative maintenance and roadworthiness guidance
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scanResult.safetyInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex gap-3.5 items-start"
                >
                  <div className={`p-2 rounded-xl flex-shrink-0 mt-0.5 ${
                    insight.priority === 'High'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      : insight.priority === 'Medium'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  }`}>
                    <ShieldCheck className="w-4 h-4" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-white">
                        {insight.title}
                      </h4>
                      {insight.priority === 'High' && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold font-mono bg-rose-950 text-rose-300 border border-rose-500/40">
                          PRIORITY
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {insight.advice}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Standard Safety Checklist Advice */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-2">
              <span className="font-semibold text-white block">Standard Driver Safety Check:</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-slate-300">
                <li>Check visible tire condition before long distance journeys.</li>
                <li>Inspect damaged lights before driving at night.</li>
                <li>Consider professional inspection for significant visible damage.</li>
                <li>Keep windshield, mirrors, and camera sensors clear.</li>
                <li>Follow local vehicle safety and registration requirements.</li>
              </ul>
            </div>
          </div>

          {/* MANDATORY OFFICIAL DISCLAIMER */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-xs text-slate-400 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-amber-300">Disclaimer:</strong> Clearly note that image analysis is an AI estimate and is not a professional mechanical inspection. CarVision AI does not inspect brake hydraulics, engine internals, electronics, or chassis sub-frames. Consult a certified mechanic for official road safety certificates.
            </p>
          </div>

          {/* Bottom Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={handleRemoveImage}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Scan Another Vehicle</span>
            </button>

            <button
              type="button"
              onClick={handleSaveToHistory}
              disabled={isSaved}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <Bookmark className="w-4 h-4 text-cyan-400" />
              <span>{isSaved ? 'Scan Saved in History' : 'Save Scan to History'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Camera Capture Modal */}
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
};
