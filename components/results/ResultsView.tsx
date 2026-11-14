'use client';

import React from 'react';
import { AnalysisResult } from '@/types/analysis';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RiskGauge } from './RiskGauge';
import { WarningSignCard } from './WarningSignCard';
import { SafetyRecommendations } from './SafetyRecommendations';
import {
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Copy,
  Printer,
  FileCheck,
  Cpu,
  Layers
} from 'lucide-react';

interface ResultsViewProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function ResultsView({ result, onReset }: ResultsViewProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyReport = () => {
    const textReport = `ScamSense AI Analysis Report
--------------------------------------
Risk Score: ${result.riskScore}/100 (${result.riskCategory} Risk)
Detection Method: ${result.detectionMethod === 'HYBRID' ? 'Hybrid (Gemini AI + Rule Heuristics)' : 'Rule-Based Offline Engine'}
Scam Types: ${result.detectedScamTypes.join(', ')}

Summary:
${result.riskExplanation}

Warning Signs Detected (${result.warningSigns.length}):
${result.warningSigns.map((w, i) => `${i + 1}. [${w.severity}] ${w.title}${w.excerpt ? ` ("${w.excerpt}")` : ''} - ${w.explanation}`).join('\n')}

Safety Recommendations:
${result.recommendations.map((r, i) => `${i + 1}. ${r.title}: ${r.description}`).join('\n')}

Timestamp: ${result.timestamp}
Disclaimer: Educational analysis tool. Always verify independently through official bank/agency hotlines.
`;

    navigator.clipboard.writeText(textReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="results" className="scroll-mt-24 space-y-8 mb-16 animate-in fade-in duration-300">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Analysis Report Generated
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Method:</span>
              <Badge variant="outline" className="text-[11px] font-mono">
                {result.detectionMethod === 'HYBRID' ? (
                  <span className="flex items-center gap-1 text-blue-400">
                    <Sparkles className="w-3 h-3" /> Hybrid (Gemini AI + Rules)
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-slate-300">
                    <Cpu className="w-3 h-3" /> Rule-Based Engine
                  </span>
                )}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyReport}
            className="text-xs border-slate-700 hover:bg-slate-800"
          >
            <Copy className="w-3.5 h-3.5 mr-1.5" />
            {copied ? 'Copied!' : 'Copy Summary'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="text-xs border-slate-700 hover:bg-slate-800"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5" />
            Print Report
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={onReset}
            className="text-xs bg-blue-600 hover:bg-blue-500 text-white"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Analyse Another Message
          </Button>
        </div>
      </div>

      {/* A. Overall Risk Assessment */}
      <Card className="border-slate-800 bg-slate-900 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-blue-400" />
              <span>Overall Risk Assessment</span>
            </CardTitle>
            <Badge variant="secondary" className="text-xs font-mono">
              ID: {result.id}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <RiskGauge score={result.riskScore} category={result.riskCategory} />

          {/* Assessment Summary */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Assessment Summary
            </span>
            <p className="text-sm text-slate-200 leading-relaxed">
              {result.riskExplanation}
            </p>
          </div>

          {/* Original Submitted Message (Read-only reference) */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Submitted Message Snippet
            </span>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 font-mono italic max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              &quot;{result.originalMessage}&quot;
            </div>
          </div>
        </CardContent>
      </Card>

      {/* B. Detected Scam Types */}
      <Card className="border-slate-800 bg-slate-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Identified Threat Profiles & Scam Types</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {result.detectedScamTypes.map((type, idx) => (
              <Badge
                key={idx}
                variant="destructive"
                className="text-xs py-1 px-3 bg-indigo-950/60 border-indigo-700/50 text-indigo-300"
              >
                {type}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* C. Warning Signs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Detected Warning Signs ({result.warningSigns.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Hover or review exact excerpts
          </span>
        </div>

        {result.warningSigns.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 text-center text-sm text-slate-400">
            ✅ No explicit high-risk phrases or threat vectors were triggered by this message.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.warningSigns.map((sign) => (
              <WarningSignCard key={sign.id} sign={sign} />
            ))}
          </div>
        )}
      </div>

      {/* D. Safety Recommendations */}
      <SafetyRecommendations recommendations={result.recommendations} />

      {/* E. Return Button at Bottom */}
      <div className="flex justify-center pt-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onReset}
          className="border-slate-700 hover:bg-slate-800 text-slate-200"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Analyse Another Message
        </Button>
      </div>
    </section>
  );
}
