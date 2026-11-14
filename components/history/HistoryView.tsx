'use client';

import React, { useState, useEffect } from 'react';
import { HistoryEntry, AnalysisResult } from '@/types/analysis';
import { getHistory, deleteHistoryItem, clearAllHistory } from '@/lib/storage/history';
import { getRiskColor, formatDate } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResultsView } from '@/components/results/ResultsView';
import {
  History,
  Trash2,
  Eye,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Layers,
  Inbox
} from 'lucide-react';

export function HistoryView() {
  const [historyItems, setHistoryItems] = useState<HistoryEntry[]>([]);
  const [selectedResult, setSelectedResult] = useState<AnalysisResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setHistoryItems(getHistory());
    setIsLoaded(true);
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteHistoryItem(id);
    setHistoryItems(updated);
    if (selectedResult?.id === id) {
      setSelectedResult(null);
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear your entire local analysis history?')) {
      clearAllHistory();
      setHistoryItems([]);
      setSelectedResult(null);
    }
  };

  if (!isLoaded) {
    return (
      <div className="py-20 text-center text-slate-400">
        Loading local history...
      </div>
    );
  }

  // If viewing a past report
  if (selectedResult) {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedResult(null)}
          className="border-slate-800 text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to History List
        </Button>
        <ResultsView result={selectedResult} onReset={() => setSelectedResult(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Privacy Warning */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
        <div>
          <strong>Local Storage Privacy Note:</strong> History records are saved exclusively inside your browser&apos;s localStorage and never transmitted to external servers. Avoid submitting active OTPs, passwords, or personal banking information.
        </div>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Analysis History
            </h1>
            <p className="text-xs text-slate-400">
              {historyItems.length} saved inspection report{historyItems.length === 1 ? '' : 's'} on this device
            </p>
          </div>
        </div>

        {historyItems.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClearAll}
            className="text-xs bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-300"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            Clear All History
          </Button>
        )}
      </div>

      {/* History Items List */}
      {historyItems.length === 0 ? (
        <Card className="border-slate-800 bg-slate-900/60 py-16 text-center">
          <CardContent className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-white">
              No History Recorded Yet
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Whenever you analyze a suspicious message on the dashboard, the result report will appear here for your reference.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {historyItems.map((item) => {
            const riskColors = getRiskColor(item.riskCategory);
            return (
              <Card
                key={item.id}
                onClick={() => setSelectedResult(item.fullResult)}
                className="border-slate-800 bg-slate-900/80 hover:bg-slate-900 hover:border-slate-700 transition-all cursor-pointer group"
              >
                <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        className={`text-[10px] font-bold uppercase tracking-wider ${riskColors.badge}`}
                      >
                        {item.riskCategory} Risk ({item.riskScore}/100)
                      </Badge>

                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{formatDate(item.timestamp)}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 font-mono italic line-clamp-2">
                      &quot;{item.messageSnippet}&quot;
                    </p>

                    <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-400">
                      <Layers className="w-3 h-3 text-slate-500" />
                      <span>{item.detectedScamTypes.join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedResult(item.fullResult)}
                      className="text-xs border-slate-700 hover:bg-slate-800 text-slate-300"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                      View Report
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDelete(item.id, e)}
                      title="Delete Entry"
                      className="text-slate-400 hover:text-red-400 hover:bg-slate-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
