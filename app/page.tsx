'use client';

import React, { useState, useRef } from 'react';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { QuickInfoCards } from '@/components/dashboard/QuickInfoCards';
import { SampleMessages } from '@/components/dashboard/SampleMessages';
import { MessageChecker } from '@/components/checker/MessageChecker';
import { ResultsView } from '@/components/results/ResultsView';
import { AnalysisResult, SampleMessage } from '@/types/analysis';

export default function DashboardPage() {
  const [activeText, setActiveText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const resultsRef = useRef<HTMLDivElement>(null);
  const checkerRef = useRef<HTMLDivElement>(null);

  const handleSelectSample = (sample: SampleMessage) => {
    setActiveText(sample.text);
    setAnalysisResult(null);

    // Smooth scroll to message checker card
    const el = document.getElementById('checker');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);

    // Smooth scroll down to results section
    setTimeout(() => {
      const el = document.getElementById('results');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleResetAnalysis = () => {
    setAnalysisResult(null);
    const el = document.getElementById('checker');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Welcome Section */}
      <WelcomeSection />

      {/* 2. Quick Information Cards */}
      <QuickInfoCards />

      {/* 3. Sample Test Messages */}
      <SampleMessages onSelectSample={handleSelectSample} />

      {/* 4. Message Checker Component */}
      <div ref={checkerRef}>
        <MessageChecker
          initialText={activeText}
          onAnalysisComplete={handleAnalysisComplete}
          isAnalyzing={isAnalyzing}
          setIsAnalyzing={setIsAnalyzing}
        />
      </div>

      {/* 5. Analysis Results Section (When available) */}
      {analysisResult && (
        <div ref={resultsRef}>
          <ResultsView
            result={analysisResult}
            onReset={handleResetAnalysis}
          />
        </div>
      )}
    </div>
  );
}
