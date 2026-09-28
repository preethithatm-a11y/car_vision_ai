import React, { useState } from 'react';
import { DamageItem, DamageSeverity } from '../types';
import { AlertCircle, AlertTriangle, CheckCircle, Info, Maximize2 } from 'lucide-react';

interface DamageHotspotOverlayProps {
  imageUrl: string;
  damageItems: DamageItem[];
  selectedItem?: DamageItem | null;
  onSelectItem?: (item: DamageItem) => void;
}

export const DamageHotspotOverlay: React.FC<DamageHotspotOverlayProps> = ({
  imageUrl,
  damageItems,
  selectedItem,
  onSelectItem,
}) => {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [showPins, setShowPins] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const getStatusColor = (status: DamageSeverity) => {
    switch (status) {
      case 'Critical':
        return {
          bg: 'bg-rose-500',
          border: 'border-rose-400',
          text: 'text-rose-400',
          glow: 'shadow-[0_0_15px_rgba(244,63,94,0.8)]',
          badge: 'bg-rose-950/80 text-rose-300 border-rose-500/40',
        };
      case 'Attention':
        return {
          bg: 'bg-amber-500',
          border: 'border-amber-400',
          text: 'text-amber-400',
          glow: 'shadow-[0_0_15px_rgba(245,158,11,0.8)]',
          badge: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
        };
      case 'Good':
      default:
        return {
          bg: 'bg-emerald-500',
          border: 'border-emerald-400',
          text: 'text-emerald-400',
          glow: 'shadow-[0_0_15px_rgba(16,185,129,0.8)]',
          badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
        };
    }
  };

  const getStatusIcon = (status: DamageSeverity) => {
    switch (status) {
      case 'Critical':
        return <AlertCircle className="w-3.5 h-3.5 text-rose-400" />;
      case 'Attention':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />;
      case 'Good':
      default:
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50 rounded-3xl' : 'w-full'}`}>
      {/* Top HUD Controls overlay */}
      <div className="absolute top-3 inset-x-3 z-30 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/30 shadow-lg pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono text-cyan-300 tracking-wider">AI VISION HUD</span>
          <span className="text-[10px] text-slate-400">({damageItems.length} inspection points)</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => setShowPins(!showPins)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium backdrop-blur-md border transition-all duration-200 flex items-center gap-1.5 ${
              showPins 
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]' 
                : 'bg-slate-900/80 text-slate-400 border-slate-700'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            {showPins ? 'HUD Overlay: ON' : 'HUD Overlay: OFF'}
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 backdrop-blur-md transition-colors"
            title={isFullscreen ? 'Exit Expand' : 'Expand Image'}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center bg-slate-950 overflow-hidden">
        <img
          src={imageUrl}
          alt="Analyzed Vehicle"
          className="w-full h-full object-contain"
        />

        {/* Subtle HUD Grid Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(34, 211, 238, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(34, 211, 238, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Interactive Damage Pins & Bounding Boxes */}
        {showPins && damageItems.map((item) => {
          const loc = item.locationOnCar || { x: 50, y: 50 };
          const colors = getStatusColor(item.status);
          const isSelected = selectedItem?.id === item.id;
          const isHovered = activeHoverId === item.id;

          return (
            <div
              key={item.id}
              className="absolute z-20"
              style={{
                left: `${loc.x}%`,
                top: `${loc.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Optional Bounding Box */}
              {loc.width && (
                <div
                  className={`absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 border-2 rounded-lg transition-all duration-300 ${
                    isSelected || isHovered
                      ? `${colors.border} bg-white/10 ${colors.glow}`
                      : 'border-cyan-400/40 border-dashed'
                  }`}
                  style={{
                    width: `${Math.max(48, loc.width * 5)}px`,
                    height: `${Math.max(36, (loc.height || loc.width) * 4)}px`,
                    left: '50%',
                    top: '50%',
                  }}
                />
              )}

              {/* Pulsing Target Pin */}
              <button
                type="button"
                onClick={() => onSelectItem?.(item)}
                onMouseEnter={() => setActiveHoverId(item.id)}
                onMouseLeave={() => setActiveHoverId(null)}
                className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 transform group ${
                  isSelected || isHovered
                    ? `scale-125 ${colors.bg} ${colors.border} ${colors.glow} text-white`
                    : `bg-slate-900/90 ${colors.border} ${colors.text} hover:scale-110`
                }`}
                aria-label={`Inspect ${item.label}`}
              >
                {/* Ping wave */}
                <span className={`absolute -inset-1 rounded-full opacity-75 animate-ping ${colors.bg}`} />
                {getStatusIcon(item.status)}
              </button>

              {/* Hover / Active Floating Tooltip */}
              {(isHovered || isSelected) && (
                <div 
                  className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 bg-slate-900/95 backdrop-blur-md rounded-xl p-3 border border-slate-700 shadow-2xl z-40 text-left pointer-events-none animate-fadeIn"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-semibold text-xs text-white truncate">{item.label}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase border ${colors.badge}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2 mb-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="text-[10px] text-cyan-300 font-mono flex items-center gap-1 border-t border-slate-800 pt-1.5">
                    <Info className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                    <span>Rec: {item.recommendation}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Hint */}
      <div className="bg-slate-900/90 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          Click or hover any target pin to inspect specific damage details
        </span>
        <span className="font-mono text-[11px] text-cyan-400/80">AI CONFIDENCE: HIGH</span>
      </div>
    </div>
  );
};
