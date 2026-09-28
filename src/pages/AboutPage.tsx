import React from 'react';
import { PageRoute } from '../types';
import { 
  Info, 
  Eye, 
  ShieldAlert, 
  Car, 
  Layers, 
  History, 
  Cpu, 
  AlertTriangle,
  ArrowRight,
  Zap,
  Lock,
  Sparkles
} from 'lucide-react';
import { audioService } from '../services/audioService';

interface AboutPageProps {
  onRouteChange: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onRouteChange }) => {
  const pillars = [
    {
      icon: <Eye className="w-6 h-6 text-cyan-400" />,
      title: 'AI-Powered Image Analysis',
      description: 'Leveraging neural computer vision models to parse complex automotive angles, lighting conditions, and body panel reflections in milliseconds.'
    },
    {
      icon: <Car className="w-6 h-6 text-blue-400" />,
      title: 'Vehicle Recognition',
      description: 'Identifies body styles (Sedan, SUV, Hatchback, Coupe), vehicle category, paint finish, and estimated make/model heuristics from visual cues.'
    },
    {
      icon: <Layers className="w-6 h-6 text-amber-400" />,
      title: 'Visible Damage Detection',
      description: 'Pinpoints and classifies scratches, dents, bumper misalignments, lighting lens fractures, and windshield star chips.'
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-emerald-400" />,
      title: 'Safety Insights',
      description: 'Translates visual cosmetic defects into actionable preventative maintenance items, protecting highway roadworthiness.'
    },
    {
      icon: <History className="w-6 h-6 text-purple-400" />,
      title: 'Local Scan History',
      description: 'Zero external cloud tracking. All diagnostics and captured images are stored securely on your device via browser LocalStorage.'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          SYSTEM OVERVIEW
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About CarVision AI
        </h1>
        <p className="text-base sm:text-lg text-cyan-200 font-medium max-w-2xl mx-auto leading-relaxed">
          &ldquo;CarVision AI is an AI-powered visual assistant designed to help users understand visible aspects of their vehicle through computer vision.&rdquo;
        </p>
      </div>

      {/* Mission & Overview Hero Box */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30 p-8 sm:p-12 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Next-Generation Visual Vehicle Intelligence
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Modern vehicles are complex machines, but many critical safety and cosmetic issues begin with visible exterior clues—a subtle bumper clip detachment, a rock chip propagating through windshield laminate, or hazed projector headlights reducing nighttime visibility.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            CarVision AI bridges the gap between everyday drivers and automotive diagnostics. By simply uploading or snapping a photo directly in your browser, our intelligent vision pipeline processes exterior telemetry, highlights potential risk zones, and provides clear, non-technical safety guidance.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-cyan-300 relative z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            100% Client-Side Privacy
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            Vite + React + TypeScript
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Zero-Install PWA Ready
          </div>
        </div>
      </div>

      {/* Core Technology Pillars */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight text-center sm:text-left">
          Core Capabilities & Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/85 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors"
            >
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 w-fit">
                {p.icon}
              </div>
              <h3 className="font-bold text-base text-white">{p.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}

          {/* Call-to-Action Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-tr from-cyan-950/40 to-blue-950/40 border border-cyan-500/40 flex flex-col justify-between space-y-4">
            <div>
              <Sparkles className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-bold text-base text-white mb-1">Ready to Test?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Try scanning your car right now or explore one of our realistic vehicle demo scenarios.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                audioService.playClick();
                onRouteChange('scanner');
              }}
              className="py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Launch Car Scanner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* MANDATORY OFFICIAL DISCLAIMER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/40 shadow-xl space-y-3">
        <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
          <AlertTriangle className="w-5 h-5" />
          <h3>Legal & Diagnostic Disclaimer</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          &ldquo;CarVision AI provides visual estimates for informational purposes only. It does not replace a certified mechanic, professional vehicle inspection, or emergency service.&rdquo;
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          The software relies upon photographic optical inputs which cannot assess internal engine components, brake line hydraulic pressure, electronic control module (ECM) fault codes, structural chassis rust underneath the underbody, or airbag readiness. Always follow your vehicle manufacturers official maintenance manual.
        </p>
      </div>
    </div>
  );
};
