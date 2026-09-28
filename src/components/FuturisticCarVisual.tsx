import React from 'react';

export const FuturisticCarVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-[#070b14] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] flex items-center justify-center p-6 group">
      {/* Background Cyber Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(34, 211, 238, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(34, 211, 238, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Radial Glow Center */}
      <div className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Radar Sweep Arc */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border border-cyan-500/20 flex items-center justify-center">
          <div className="w-[200px] h-[200px] rounded-full border border-dashed border-cyan-400/30" />
          <div className="absolute w-[320px] sm:w-[420px] h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-radar-sweep origin-center" />
        </div>
      </div>

      {/* Vertical Scanning Laser Beam */}
      <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 pointer-events-none animate-scan-line" />

      {/* HUD Corner Accents */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400/80" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400/80" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400/80" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400/80" />

      {/* HUD Top Stats bar */}
      <div className="absolute top-4 inset-x-12 flex justify-between items-center text-[10px] sm:text-xs font-mono text-cyan-400/70 border-b border-cyan-500/20 pb-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          CV_NEURAL_VISION_v3.4
        </span>
        <span className="hidden sm:inline-block">RESOLUTION: 4K OPTICAL HUD</span>
        <span>LATENCY: 12ms</span>
      </div>

      {/* 3D Wireframe / Sleek Automotive Silhouette SVG */}
      <svg
        viewBox="0 0 800 400"
        className="relative z-10 w-full max-w-lg h-auto drop-shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-transform duration-700 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="carGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Chassis Body Curves */}
        <path
          d="M 120 270 
             L 160 270 
             C 180 230, 240 230, 260 270 
             L 540 270 
             C 560 230, 620 230, 640 270 
             L 710 270 
             C 730 270, 750 250, 740 220 
             C 730 190, 680 180, 640 175 
             L 530 135 
             C 490 120, 360 120, 310 140 
             L 210 185 
             L 110 205 
             C 80 215, 75 250, 100 265 
             Z"
          stroke="url(#carGrad)"
          strokeWidth="3.5"
          fill="rgba(6, 182, 212, 0.05)"
        />

        {/* Roofline & Greenhouse Glass */}
        <path
          d="M 230 180 
             L 320 142 
             C 365 126, 480 126, 520 140 
             L 620 180 
             Z"
          stroke="#38bdf8"
          strokeWidth="2.5"
          fill="rgba(56, 189, 248, 0.15)"
        />

        {/* B-Pillar & Window Dividers */}
        <line x1="420" y1="130" x2="420" y2="180" stroke="#22d3ee" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="330" y1="140" x2="330" y2="180" stroke="#22d3ee" strokeWidth="1.5" />

        {/* Aerodynamic Body Contour Lines */}
        <path d="M 110 205 C 240 200, 520 190, 710 210" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
        <path d="M 220 230 C 350 225, 480 225, 600 230" stroke="#38bdf8" strokeWidth="1.5" opacity="0.5" />

        {/* Front Left Wheel Assembly */}
        <g>
          <circle cx="210" cy="270" r="42" stroke="#38bdf8" strokeWidth="3" fill="#0b1329" />
          <circle cx="210" cy="270" r="28" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="6 4" />
          <circle cx="210" cy="270" r="10" fill="#22d3ee" />
          {/* Wheel Spokes */}
          <line x1="210" y1="242" x2="210" y2="298" stroke="#0284c7" strokeWidth="2" />
          <line x1="182" y1="270" x2="238" y2="270" stroke="#0284c7" strokeWidth="2" />
        </g>

        {/* Rear Right Wheel Assembly */}
        <g>
          <circle cx="590" cy="270" r="42" stroke="#38bdf8" strokeWidth="3" fill="#0b1329" />
          <circle cx="590" cy="270" r="28" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="6 4" />
          <circle cx="590" cy="270" r="10" fill="#22d3ee" />
          {/* Wheel Spokes */}
          <line x1="590" y1="242" x2="590" y2="298" stroke="#0284c7" strokeWidth="2" />
          <line x1="562" y1="270" x2="618" y2="270" stroke="#0284c7" strokeWidth="2" />
        </g>

        {/* Headlight Laser Matrix */}
        <polygon points="95,210 135,210 120,230 90,225" fill="#22d3ee" opacity="0.9" />
        <path d="M 95 215 L 20 225" stroke="url(#neonGlow)" strokeWidth="6" opacity="0.8" />

        {/* Taillight LED Lightbar */}
        <polygon points="725,215 745,220 735,235 715,230" fill="#f43f5e" opacity="0.9" />
        <path d="M 735 225 L 780 230" stroke="#f43f5e" strokeWidth="3" opacity="0.6" />

        {/* AI Detection Target Boxes / Pins */}
        <g className="animate-pulse">
          {/* Windshield Target Box */}
          <rect x="360" y="132" width="70" height="36" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          <circle cx="395" cy="150" r="3" fill="#22d3ee" />

          {/* Front Bumper Sensor Box */}
          <rect x="85" y="225" width="45" height="35" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          <circle cx="107" cy="242" r="3" fill="#10b981" />

          {/* Rear Quarter Target */}
          <rect x="650" y="200" width="50" height="40" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          <circle cx="675" cy="220" r="3" fill="#38bdf8" />
        </g>
      </svg>

      {/* Floating HUD Tags */}
      <div className="absolute bottom-3 left-6 sm:bottom-4 sm:left-8 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-cyan-500/30 text-xs text-cyan-300 font-mono shadow-lg">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        360° STRUCTURAL SCAN
      </div>

      <div className="absolute bottom-3 right-6 sm:bottom-4 sm:right-8 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/30 text-xs text-emerald-300 font-mono shadow-lg">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        DAMAGE SEGMENTATION ACTIVE
      </div>
    </div>
  );
};
