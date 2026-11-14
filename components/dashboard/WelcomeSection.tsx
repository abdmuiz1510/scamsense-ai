import React from 'react';
import { Shield, Sparkles, Lock, CheckCircle2 } from 'lucide-react';

export function WelcomeSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/80 p-8 sm:p-10 mb-8 shadow-2xl">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-0 -z-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl">
        {/* Malaysian Context Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hybrid Detection: Heuristic Rules + Google Gemini AI</span>
        </div>

        {/* Primary Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Stay one step ahead of scammers.
        </h1>

        {/* Supporting Subtext */}
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          Check suspicious messages and understand the warning signs before taking action. Built specifically to protect Malaysian users from banking impersonation, TAC theft, fake government notices, and courier scams.
        </p>

        {/* Highlights Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Bahasa Malaysia & English</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Shield className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>NSRC 997 & PDRM Aligned</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Lock className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span>Zero Credential Storage</span>
          </div>
        </div>
      </div>
    </div>
  );
}
