import React from 'react';
import { RiskCategory } from '@/types/analysis';
import { getRiskColor } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

interface RiskGaugeProps {
  score: number;
  category: RiskCategory;
}

export function RiskGauge({ score, category }: RiskGaugeProps) {
  const riskColors = getRiskColor(category);

  const getCategoryLabel = () => {
    switch (category) {
      case 'HIGH':
        return 'High Risk';
      case 'MEDIUM':
        return 'Medium Risk';
      case 'LOW':
      default:
        return 'Low Risk';
    }
  };

  const getIcon = () => {
    switch (category) {
      case 'HIGH':
        return <ShieldAlert className="w-6 h-6 text-red-400" />;
      case 'MEDIUM':
        return <AlertTriangle className="w-6 h-6 text-amber-400" />;
      case 'LOW':
      default:
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
    }
  };

  const getProgressBarColor = () => {
    switch (category) {
      case 'HIGH':
        return 'bg-red-500';
      case 'MEDIUM':
        return 'bg-amber-500';
      case 'LOW':
      default:
        return 'bg-emerald-500';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl bg-slate-950/80 border border-slate-800">
      {/* Visual Circle Gauge */}
      <div
        className="w-28 h-28 rounded-full flex flex-col items-center justify-center border-4 flex-shrink-0 relative shadow-inner"
        style={{ borderColor: riskColors.hex }}
      >
        <span className="text-3xl font-black text-white tracking-tight leading-none">
          {score}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-1">
          out of 100
        </span>
      </div>

      {/* Details */}
      <div className="flex-1 w-full space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getIcon()}
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                Risk Classification
              </span>
              <span
                className={`text-xl font-extrabold tracking-tight ${riskColors.text}`}
              >
                {getCategoryLabel()}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">Assessment Scale</span>
            <span className="text-xs font-mono font-medium text-slate-300">
              {category === 'HIGH' && '70 – 100 (High)'}
              {category === 'MEDIUM' && '30 – 69 (Medium)'}
              {category === 'LOW' && '0 – 29 (Low)'}
            </span>
          </div>
        </div>

        {/* Linear Progress Meter */}
        <Progress value={score} indicatorColor={getProgressBarColor()} className="h-2.5" />

        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
          <span className="text-emerald-400">0 (Safe)</span>
          <span className="text-amber-400">30 (Caution)</span>
          <span className="text-orange-400">70 (High)</span>
          <span className="text-red-400">100 (Critical)</span>
        </div>
      </div>
    </div>
  );
}
