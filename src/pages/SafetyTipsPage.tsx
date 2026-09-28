import React, { useState } from 'react';
import { SAFETY_CATEGORIES, PRE_TRIP_CHECKLIST } from '../data/safetyTipsData';
import { 
  ShieldCheck, 
  Disc, 
  Gauge, 
  Sun, 
  Eye, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Navigation, 
  Search, 
  CheckSquare, 
  Square, 
  Sparkles
} from 'lucide-react';
import { audioService } from '../services/audioService';

export const SafetyTipsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Navigation':
        return <Navigation className="w-5 h-5 text-cyan-400" />;
      case 'Disc':
        return <Disc className="w-5 h-5 text-blue-400" />;
      case 'Gauge':
        return <Gauge className="w-5 h-5 text-emerald-400" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-400" />;
      case 'Eye':
        return <Eye className="w-5 h-5 text-purple-400" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-cyan-300" />;
      case 'CheckCircle':
        return <CheckCircle className="w-5 h-5 text-emerald-300" />;
      case 'AlertTriangle':
      default:
        return <AlertTriangle className="w-5 h-5 text-rose-400" />;
    }
  };

  const toggleCheckItem = (id: string) => {
    audioService.playClick();
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedChecklistCount = Object.values(checkedItems).filter(Boolean).length;
  const checklistPercent = Math.round((completedChecklistCount / PRE_TRIP_CHECKLIST.length) * 100);

  const filteredCategories = SAFETY_CATEGORIES.filter((cat) => {
    if (activeCategory !== 'all' && cat.id !== activeCategory) return false;
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    const matchesCat = cat.title.toLowerCase().includes(query) || cat.summary.toLowerCase().includes(query);
    const matchesTip = cat.tips.some(
      (t) => t.title.toLowerCase().includes(query) || t.description.toLowerCase().includes(query)
    );
    return matchesCat || matchesTip;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          AUTOMOTIVE SAFETY ARCHIVE
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Vehicle Safety Tips
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Comprehensive, practical vehicle safety guidelines to ensure peak roadworthiness and prevent highway emergencies.
        </p>
      </div>

      {/* Interactive 60-Second Pre-Trip Walkaround Checklist Card */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">
                Interactive Pre-Trip Safety Checklist
              </h2>
              <p className="text-xs text-slate-400">
                Perform this 60-second perimeter check before taking off
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Readiness</span>
              <div className="text-base font-bold font-mono text-cyan-300">
                {checklistPercent}% Complete
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-slate-800 flex items-center justify-center font-mono text-xs font-bold text-cyan-400" style={{ borderColor: checklistPercent === 100 ? '#10b981' : '#06b6d4' }}>
              {completedChecklistCount}/{PRE_TRIP_CHECKLIST.length}
            </div>
          </div>
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRE_TRIP_CHECKLIST.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleCheckItem(item.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  isChecked
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="mt-0.5">
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500" />
                  )}
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 block font-semibold">
                    {item.category}
                  </span>
                  <span className={`text-xs leading-snug block ${isChecked ? 'line-through opacity-70' : ''}`}>
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search safety topics & tips..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              All Categories (8)
            </button>
            {SAFETY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Categories Cards (All 8 categories) */}
      <div className="space-y-8">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="rounded-3xl bg-slate-900/85 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6"
          >
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700">
                  {getCategoryIcon(category.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {category.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
                    {category.summary}
                  </p>
                </div>
              </div>

              <span className="self-start sm:self-auto px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-950 text-cyan-300 border border-cyan-500/30">
                {category.badge}
              </span>
            </div>

            {/* Tip Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {category.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-sm text-white leading-snug">
                        {tip.title}
                      </h4>
                      {tip.critical && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40 uppercase">
                          Must Do
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {tip.description}
                    </p>

                    {tip.checkSteps && (
                      <div className="pt-2 border-t border-slate-800 space-y-1.5">
                        <span className="text-[10px] font-mono uppercase text-slate-500 block">
                          Inspection Steps:
                        </span>
                        <ul className="space-y-1 text-[11px] text-slate-400">
                          {tip.checkSteps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1.5">
                              <span className="text-cyan-400 mt-0.5">•</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>INTERVAL:</span>
                    <span className="text-cyan-300">{tip.frequency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
