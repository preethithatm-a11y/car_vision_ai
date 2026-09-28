import React, { useState, useEffect } from 'react';
import { ScanResult, PageRoute } from '../types';
import { storageService } from '../services/storageService';
import { audioService } from '../services/audioService';
import { 
  History, 
  Trash2, 
  Eye, 
  Search, 
  Calendar, 
  Car, 
  Sparkles
} from 'lucide-react';

interface HistoryPageProps {
  onRouteChange: (route: PageRoute) => void;
  onViewScanDetails: (scan: ScanResult) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  onRouteChange,
  onViewScanDetails,
}) => {
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Good' | 'Attention' | 'Critical'>('all');
  const [previewModalScan, setPreviewModalScan] = useState<ScanResult | null>(null);

  const loadHistory = () => {
    const list = storageService.getScans();
    setScans(list);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDeleteScan = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this scan from your history?')) {
      audioService.playClick();
      storageService.deleteScan(id);
      loadHistory();
      if (previewModalScan?.id === id) {
        setPreviewModalScan(null);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete ALL vehicle scan history? This action cannot be undone.')) {
      audioService.playWarningAlert();
      storageService.clearAllScans();
      loadHistory();
      setPreviewModalScan(null);
    }
  };

  const handleView = (scan: ScanResult) => {
    audioService.playClick();
    onViewScanDetails(scan);
  };

  // Filtered scans
  const filteredScans = scans.filter((scan) => {
    const matchesSearch = 
      scan.vehicleOverview.estimatedMakeModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.vehicleOverview.vehicleType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.vehicleOverview.vehicleColor.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'all') return true;
    if (filterStatus === 'Critical') return scan.damageItems.some(d => d.status === 'Critical');
    if (filterStatus === 'Attention') return scan.damageItems.some(d => d.status === 'Attention');
    if (filterStatus === 'Good') return scan.damageItems.every(d => d.status === 'Good');

    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-2">
            <History className="w-3.5 h-3.5 text-cyan-400" />
            LOCAL VEHICLE LOGS
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Scan History
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review previous visual diagnostics, damage progress, and condition reports.
          </p>
        </div>

        {scans.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClearAll}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold border border-rose-800/50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All History</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter & Search Controls */}
      {scans.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by make, model, type..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Status Filter Chips */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {(['all', 'Good', 'Attention', 'Critical'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  filterStatus === status
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {status === 'all' ? 'All Scans' : status}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {scans.length === 0 ? (
        <div className="p-12 sm:p-16 rounded-3xl bg-slate-900/60 border border-slate-800 text-center max-w-xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <History className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">No scans yet</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              No scans yet. Scan your car to start building your vehicle history.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              audioService.playClick();
              onRouteChange('scanner');
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Scan Your Car Now</span>
          </button>
        </div>
      ) : filteredScans.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-slate-400 text-xs">
          No history items match your search & filter query.
        </div>
      ) : (
        /* History Items Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScans.map((scan) => {
            const hasCritical = scan.damageItems.some(d => d.status === 'Critical');
            const hasAttention = scan.damageItems.some(d => d.status === 'Attention');
            const statusLabel = hasCritical ? 'Critical' : hasAttention ? 'Attention' : 'Good';
            const healthScore = scan.visibleCondition.overallScore;

            return (
              <div
                key={scan.id}
                onClick={() => handleView(scan)}
                className="group rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail and Header */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 mb-4 border border-slate-800">
                    <img
                      src={scan.imageUrl}
                      alt={scan.vehicleOverview.estimatedMakeModel}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Condition Badge */}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border ${
                        statusLabel === 'Critical'
                          ? 'bg-rose-950/80 text-rose-300 border-rose-500/50'
                          : statusLabel === 'Attention'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                          : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                      }`}>
                        {statusLabel}
                      </span>
                    </div>

                    {/* Overall Score Badge */}
                    <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-lg bg-slate-900/90 border border-slate-700 text-xs font-mono font-bold text-cyan-300">
                      Score: {healthScore}/100
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{new Date(scan.timestamp).toLocaleDateString()} at {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors truncate">
                      {scan.vehicleOverview.estimatedMakeModel}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Car className="w-3.5 h-3.5 text-slate-500" />
                      <span>{scan.vehicleOverview.vehicleType}</span>
                      <span>·</span>
                      <span>{scan.vehicleOverview.vehicleColor}</span>
                    </div>

                    {/* Stats summary row */}
                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                      <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                        <span className="text-[10px] text-slate-500 uppercase block font-mono">Detected Issues</span>
                        <span className="font-bold text-white">{scan.damageItems.length} items</span>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                        <span className="text-[10px] text-slate-500 uppercase block font-mono">Exterior Grade</span>
                        <span className="font-bold text-cyan-300">{scan.visibleCondition.exteriorCondition}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleView(scan)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 group-hover:bg-cyan-500 group-hover:text-black text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleDeleteScan(scan.id, e)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-800 transition-colors"
                    title="Delete this scan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
