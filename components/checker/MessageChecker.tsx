'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnalysisResult } from '@/types/analysis';
import { performHybridAnalysis } from '@/lib/detection/hybrid';
import { saveToHistory } from '@/lib/storage/history';
import {
  Search,
  Trash2,
  Loader2,
  AlertCircle,
  ShieldAlert,
  Sparkles,
  FileText
} from 'lucide-react';

interface MessageCheckerProps {
  initialText?: string;
  onAnalysisComplete: (result: AnalysisResult) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (loading: boolean) => void;
}

export function MessageChecker({
  initialText = '',
  onAnalysisComplete,
  isAnalyzing,
  setIsAnalyzing
}: MessageCheckerProps) {
  const [message, setMessage] = useState(initialText);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync if parent updates initialText (e.g. user selected a sample)
  React.useEffect(() => {
    if (initialText) {
      setMessage(initialText);
      setErrorMessage(null);
    }
  }, [initialText]);

  const charCount = message.length;
  const MAX_CHARS = 5000;

  const handleClear = () => {
    setMessage('');
    setErrorMessage(null);
  };

  const handleAnalyze = async () => {
    const trimmed = message.trim();
    if (!trimmed) {
      setErrorMessage('Please paste or type a message before analyzing. Empty submissions cannot be inspected.');
      return;
    }

    if (trimmed.length > MAX_CHARS) {
      setErrorMessage(`Message exceeds maximum limit of ${MAX_CHARS} characters. Please shorten the snippet.`);
      return;
    }

    setErrorMessage(null);
    setIsAnalyzing(true);

    try {
      // 1. Try server-side API route first
      let result: AnalysisResult | null = null;

      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed })
        });

        if (response.ok) {
          result = await response.json();
        } else {
          console.warn('API returned non-200, falling back to client-side rule evaluation.');
        }
      } catch (networkErr) {
        console.warn('Network call failed, using client-side rule evaluation fallback:', networkErr);
      }

      // 2. Client-side fallback if server was unreachable
      if (!result) {
        result = await performHybridAnalysis(trimmed);
      }

      // 3. Save to localStorage history
      saveToHistory(result);

      // 4. Deliver result to parent view
      onAnalysisComplete(result);
    } catch (err) {
      console.error('Fatal analysis error:', err);
      setErrorMessage('Failed to analyze the message. Please check the text and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div id="checker" className="scroll-mt-24 mb-10">
      <Card className="border-slate-800 bg-slate-900 shadow-2xl relative overflow-hidden">
        {/* Accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400" />

        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-xl">Message Checker</CardTitle>
                <CardDescription className="text-xs sm:text-sm mt-0.5">
                  Paste any SMS, WhatsApp, Telegram, or email message in English or Bahasa Malaysia
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Hybrid Engine Ready</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Privacy Notice Banner */}
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
            <div>
              <strong>Privacy Notice:</strong> For your personal safety, never submit real active OTP codes, passwords, ATM PINs, or confidential banking credentials. The tool evaluates linguistic and technical patterns.
            </div>
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              rows={7}
              placeholder="Contoh: 'MAYBANK ALERT: Transaksi RM1,890.00 telah dikesan. Balas dengan nombor TAC 6-digit anda untuk membatalkan atau klik https://maybank2u-security-update.xyz/login...'"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-sans resize-y leading-relaxed transition-all"
              aria-label="Suspicious Message Input"
              disabled={isAnalyzing}
            />
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Footer controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>{charCount} / {MAX_CHARS} characters</span>
              </span>
              <span className="text-slate-600">•</span>
              <span>English & BM Supported</span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClear}
                disabled={!message || isAnalyzing}
                className="text-xs border-slate-700 hover:bg-slate-800 text-slate-300"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Clear
              </Button>

              <Button
                type="button"
                variant="default"
                size="default"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm px-6 shadow-lg shadow-blue-600/30"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing Indicators...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Analyse Message
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
