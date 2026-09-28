import React from 'react';
import { PageRoute } from '../types';
import { ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';
import { audioService } from '../services/audioService';

interface FooterProps {
  onRouteChange: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onRouteChange }) => {
  const handleLink = (route: PageRoute) => {
    audioService.playClick();
    onRouteChange(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050811] border-t border-slate-800/80 pt-12 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <img src="/logo.svg" alt="CarVision Logo" className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                CarVision <span className="text-cyan-400">AI</span>
              </span>
            </div>
            
            <p className="text-sm font-medium text-cyan-300 font-sans tracking-wide">
              &ldquo;See Your Car. Understand Your Car. Drive Safer.&rdquo;
            </p>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Intelligent computer vision assistant designed to empower drivers with instant exterior bodywork analysis, damage classification, and practical preventative safety recommendations.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                NEURAL ENGINE: ONLINE
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-[11px] font-mono">
                <Cpu className="w-3 h-3 text-cyan-400" />
                LOCAL FIRST PRIVACY
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => handleLink('home')} 
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1"
                >
                  Home Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('scanner')} 
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1"
                >
                  AI Car Scanner <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('history')} 
                  className="hover:text-cyan-300 transition-colors"
                >
                  Scan History
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('safety')} 
                  className="hover:text-cyan-300 transition-colors"
                >
                  Vehicle Safety Tips
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLink('about')} 
                  className="hover:text-cyan-300 transition-colors"
                >
                  About Technology
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Safety Standards */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-4">
              Safety Pillars
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                Visual Exterior Diagnostics
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                Tire & Lighting Integrity
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                Pre-Trip Walkaround Guides
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                Structural Glass Awareness
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed mb-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono uppercase font-bold flex-shrink-0">
            Official Disclaimer
          </div>
          <p>
            CarVision AI provides visual estimates for informational purposes only. It does not replace a certified mechanic, professional vehicle inspection, or emergency service. Always adhere to state and local road safety regulations.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 CarVision AI. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Built with precision for automotive safety</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-cyan-400">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
