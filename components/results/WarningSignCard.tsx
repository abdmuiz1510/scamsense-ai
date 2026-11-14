import React from 'react';
import { WarningSign } from '@/types/analysis';
import { getSeverityBadge } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Quote } from 'lucide-react';

interface WarningSignCardProps {
  sign: WarningSign;
}

export function WarningSignCard({ sign }: WarningSignCardProps) {
  return (
    <Card className="border border-slate-800 bg-slate-900/80 hover:border-slate-700 transition-colors">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              {sign.title}
            </h4>
          </div>
          <Badge
            className={`text-[10px] font-bold uppercase tracking-wider ${getSeverityBadge(
              sign.severity
            )}`}
          >
            {sign.severity}
          </Badge>
        </div>

        {/* Text Excerpt from Original Message */}
        {sign.excerpt && (
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
            <Quote className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
            <span className="font-mono italic text-slate-200 break-all">
              &quot;{sign.excerpt}&quot;
            </span>
          </div>
        )}

        {/* Analytical Explanation */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {sign.explanation}
        </p>

        <div className="text-[11px] text-slate-400 font-medium">
          Category: <span className="text-slate-300">{sign.category}</span>
        </div>
      </CardContent>
    </Card>
  );
}
