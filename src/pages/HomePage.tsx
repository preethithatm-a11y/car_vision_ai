import React from 'react';
import { PageRoute, PresetDemoVehicle } from '../types';
import { FuturisticCarVisual } from '../components/FuturisticCarVisual';
import { DEMO_VEHICLES } from '../data/demoCars';
import { 
  Scan, 
  ShieldCheck, 
  Car, 
  Info, 
  AlertTriangle, 
  History, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  Sparkles,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { audioService } from '../services/audioService';

interface HomePageProps {
  onRouteChange: (route: PageRoute) => void;
  onSelectPresetVehicle: (vehicle: PresetDemoVehicle) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onRouteChange,
  onSelectPresetVehicle,
}) => {
  const handleScanClick = () => {
    audioService.playClick();
    onRouteChange('scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSafetyClick = () => {
    audioService.playClick();
    onRouteChange('safety');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featureCards = [
    {
      icon: <Car className="w-6 h-6 text-cyan-400" />,
      title: 'AI Car Detection',
      description: 'Detect and identify the vehicle body style, profile, and geometric orientation from any uploaded or captured image.',
      tag: 'Neural Vision',
    },
    {
      icon: <Info className="w-6 h-6 text-blue-400" />,
      title: 'Vehicle Information',
      description: 'Show estimated car type, make/model when possible, paint color, category, and other key visible details.',
      tag: 'Specs Extraction',
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
      title: 'Damage Detection',
      description: 'Identify visible scratches, dents, broken lights, damaged bumpers, windshield flaws, and assign severity ratings.',
      tag: 'Defect Segmentation',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'Safety Analysis',
      description: 'Provide proactive safety observations and preventative recommendations based on visible exterior conditions.',
      tag: 'Safety Scoring',
    },
    {
      icon: <History className="w-6 h-6 text-purple-400" />,
      title: 'Scan History',
      description: 'Save previous scans locally in browser storage so you can track your vehicle condition changes over time.',
      tag: 'Local Persistence',
    },
    {
      icon: <Zap className="w-6 h-6 text-cyan-300" />,
      title: 'Fast Analysis',
      description: 'High-speed analysis engine with animated multi-stage telemetry and visual inspection pins in under 3 seconds.',
      tag: '< 3s Latency',
    },
  ];

  return (
    <div className="w-full space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-8 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-[0_0_20px_rgba(6,182,212,0.25)] animate-pulse-slow">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>NEXT-GEN AUTOMOTIVE COMPUTER VISION</span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight font-sans">
              AI-Powered <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(34,211,238,0.35)]">
                Car Vision
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Analyze your vehicle with intelligent computer vision and get instant insights about your car.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={handleScanClick}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(6,182,212,0.5)] transform hover:scale-[1.03] active:scale-[0.98] transition-all"
              >
                <Scan className="w-5 h-5" />
                <span>Scan Your Car</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                type="button"
                onClick={handleSafetyClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 hover:border-cyan-500/50 backdrop-blur-md transition-all shadow-lg"
              >
                <ShieldAlert className="w-5 h-5 text-cyan-400" />
                <span>View Safety Tips</span>
              </button>
            </div>

            {/* Key Value Micro Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                No Mechanical Tools Required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Damage Pinpoint HUD
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Runs Directly in Browser
              </span>
            </div>
          </div>

          {/* Futuristic Car Illustration Visual */}
          <div className="mt-12 sm:mt-16">
            <FuturisticCarVisual />
          </div>
        </div>
      </section>

      {/* Preset Demo Vehicles Section (Instant 1-Click Testing) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">
              <Eye className="w-4 h-4" />
              Instant Interactive Showcase
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Test CarVision AI on Demo Scenarios
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select any sample car to inspect realistic AI damage segmentation and safety reports immediately.
            </p>
          </div>

          <button
            type="button"
            onClick={handleScanClick}
            className="self-start md:self-auto flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Upload custom image instead</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DEMO_VEHICLES.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => {
                audioService.playClick();
                onSelectPresetVehicle(vehicle);
              }}
              className="group relative rounded-2xl bg-slate-900/75 border border-slate-800 hover:border-cyan-500/50 p-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-slate-950">
                <img
                  src={vehicle.thumbnail}
                  alt={vehicle.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm">
                  {vehicle.category}
                </span>

                {/* Condition Score Tag */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-900/90 text-white border border-slate-700">
                  Health: <span className={vehicle.presetResult.visibleCondition.overallScore >= 90 ? 'text-emerald-400' : vehicle.presetResult.visibleCondition.overallScore >= 70 ? 'text-amber-400' : 'text-rose-400'}>
                    {vehicle.presetResult.visibleCondition.overallScore}%
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-1 mb-3">
                <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors truncate">
                  {vehicle.title}
                </h3>
                <p className="text-xs text-slate-400 truncate">{vehicle.subtitle}</p>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed pt-1">
                  {vehicle.description}
                </p>
              </div>

              {/* Action Button */}
              <button
                type="button"
                className="w-full py-2 px-3 rounded-xl bg-slate-800/80 group-hover:bg-cyan-500 group-hover:text-black text-slate-300 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>Run AI Analysis</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards Section (All 6 core features) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">
            INTELLIGENT CAPABILITIES
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Complete Automotive Vision Suite
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Engineered with deep computer vision heuristics to detect exterior defects and protect road safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card, index) => (
            <div
              key={index}
              className="relative p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group flex flex-col justify-between"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-tr-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-colors">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                    {card.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {card.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs text-cyan-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
                SYSTEM ACTIVE
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works 3-Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              How CarVision AI Works
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              From raw snapshot to actionable vehicle diagnostics in three streamlined steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="space-y-3 text-center md:text-left">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-mono font-bold text-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] mx-auto md:mx-0">
                01
              </div>
              <h4 className="font-bold text-base text-white">Capture or Upload</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Take a clear exterior photo with your smartphone or upload existing vehicle imagery in JPG, PNG, or WEBP.
              </p>
            </div>

            <div className="space-y-3 text-center md:text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-mono font-bold text-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] mx-auto md:mx-0">
                02
              </div>
              <h4 className="font-bold text-base text-white">Neural Processing</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our vision pipeline classifies body style, isolates cosmetic defects, and measures glass, tire, and light integrity.
              </p>
            </div>

            <div className="space-y-3 text-center md:text-left">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-mono font-bold text-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] mx-auto md:mx-0">
                03
              </div>
              <h4 className="font-bold text-base text-white">Insights & Safety Plan</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review interactive damage pins, severity status (Good / Attention / Critical), and save reports directly to your local history.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={handleScanClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
            >
              <Scan className="w-4 h-4" />
              <span>Launch AI Scanner Now</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
