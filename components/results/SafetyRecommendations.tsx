import React from 'react';
import { SafetyRecommendation } from '@/types/analysis';
import { Card, CardContent } from '@/components/ui/card';
import {
  ShieldAlert,
  KeyRound,
  Landmark,
  PhoneCall,
  Radio,
  SearchCheck,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

interface SafetyRecommendationsProps {
  recommendations: SafetyRecommendation[];
}

export function SafetyRecommendations({ recommendations }: SafetyRecommendationsProps) {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'KeyRound':
        return <KeyRound className="w-5 h-5 text-amber-400" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-indigo-400" />;
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5 text-blue-400" />;
      case 'Radio':
        return <Radio className="w-5 h-5 text-emerald-400" />;
      case 'SearchCheck':
        return <SearchCheck className="w-5 h-5 text-cyan-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Recommended Safety Actions (Zero-Harm Protocol)
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => (
          <Card
            key={rec.id}
            className="border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 transition-all"
          >
            <CardContent className="p-4 sm:p-5 flex gap-3.5">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex-shrink-0 h-fit">
                {getIcon(rec.icon)}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white tracking-tight">
                  {rec.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {rec.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Hotline Malaysian Card */}
      <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-200">
        <div className="flex items-center gap-2.5">
          <Radio className="w-4 h-4 text-blue-400 animate-pulse flex-shrink-0" />
          <span>
            <strong>Victim of a scam or unauthorized transfer?</strong> Call the <strong>National Scam Response Centre (NSRC) at 997</strong> immediately within 24 hours.
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-bold bg-blue-600 text-white px-2.5 py-1 rounded-md text-xs">
            Dial 997
          </span>
        </div>
      </div>
    </div>
  );
}
