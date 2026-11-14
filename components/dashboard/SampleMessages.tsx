'use client';

import React from 'react';
import { SAMPLE_MESSAGES } from '@/lib/data/samples';
import { SampleMessage } from '@/types/analysis';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlayCircle, ShieldCheck, AlertOctagon, Sparkles } from 'lucide-react';

interface SampleMessagesProps {
  onSelectSample: (sample: SampleMessage) => void;
}

export function SampleMessages({ onSelectSample }: SampleMessagesProps) {
  return (
    <section className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Test with Real-World Malaysian Scenarios
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Click any fictional demonstration scenario to load it into the checker and inspect its warning indicators.
          </p>
        </div>
        <div className="text-[11px] text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex-shrink-0">
          ⚠️ Fictional samples for educational testing
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SAMPLE_MESSAGES.map((sample) => {
          const isSafe = sample.badge === 'Safe Example';
          return (
            <Card
              key={sample.id}
              className="border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge
                      variant={isSafe ? 'success' : 'destructive'}
                      className="text-[10px] uppercase font-bold tracking-wider"
                    >
                      {isSafe ? (
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Safe Pattern
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <AlertOctagon className="w-3 h-3" /> {sample.category}
                        </span>
                      )}
                    </Badge>
                    <span className="text-[11px] font-medium text-slate-400">
                      {sample.language}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white mb-1.5 line-clamp-1">
                    {sample.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                    {sample.description}
                  </p>

                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 mb-4">
                    <p className="text-xs text-slate-300 font-mono line-clamp-3 italic">
                      &quot;{sample.text}&quot;
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectSample(sample)}
                  className="w-full flex items-center justify-center gap-2 text-xs border-slate-700 hover:border-blue-500 hover:text-blue-400"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  Load This Sample
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
