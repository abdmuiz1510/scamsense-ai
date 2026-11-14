/**
 * ScamSense AI - Hybrid Detection Engine
 * Merges Rule-Based Heuristics with Gemini AI Contextual Insights
 */

import {
  AnalysisResult,
  DetectedScamType,
  WarningSign,
  SafetyRecommendation,
  GeminiAnalysisResponse
} from '@/types/analysis';
import { scanMessageRules } from './rules';
import { evaluateScoring } from './scoring';
import { analyzeWithGemini } from '../ai/gemini';

/**
 * Runs the complete Hybrid Analysis pipeline
 */
export async function performHybridAnalysis(message: string): Promise<AnalysisResult> {
  const trimmed = message.trim();
  const id = `scan_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const timestamp = new Date().toISOString();

  // 1. Mandatory Rule-Based Detection
  const ruleFindings = scanMessageRules(trimmed);
  const ruleEvaluation = evaluateScoring(ruleFindings, trimmed);

  // 2. Optional AI-Powered Analysis (Gemini)
  let aiResponse: GeminiAnalysisResponse | null = null;
  try {
    aiResponse = await analyzeWithGemini(trimmed);
  } catch (err) {
    console.warn('[HybridEngine] AI inference skipped:', err);
  }

  // 3. Fallback: If AI is not available, return pure rule-based results
  if (!aiResponse) {
    return {
      id,
      timestamp,
      originalMessage: trimmed,
      riskScore: ruleEvaluation.score,
      riskCategory: ruleEvaluation.category,
      riskExplanation: ruleEvaluation.explanation,
      detectionMethod: 'RULE_BASED_FALLBACK',
      detectedScamTypes: ruleEvaluation.scamTypes,
      warningSigns: ruleEvaluation.warningSigns,
      recommendations: ruleEvaluation.recommendations,
      isAiAssisted: false
    };
  }

  // 4. Merge Engine Findings (Hybrid Mode)
  // Reconcile Risk Scores: 55% Rule + 45% AI, capped at 100
  let combinedScore = Math.round(ruleEvaluation.score * 0.55 + aiResponse.risk_score * 0.45);

  // If either engine detected critical credential theft or safe account trap, elevate
  if (ruleEvaluation.score >= 75 || aiResponse.risk_score >= 80) {
    combinedScore = Math.max(combinedScore, 75);
  }

  // Ensure score stays within 0 - 100
  combinedScore = Math.min(100, Math.max(0, combinedScore));

  // Determine Category based on application-defined thresholds (0-29, 30-69, 70-100)
  let finalCategory: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  if (combinedScore >= 70) {
    finalCategory = 'HIGH';
  } else if (combinedScore >= 30) {
    finalCategory = 'MEDIUM';
  } else {
    finalCategory = 'LOW';
  }

  // Merge Detected Scam Types (deduplicated)
  const scamTypesSet = new Set<DetectedScamType>(ruleEvaluation.scamTypes);
  if (Array.isArray(aiResponse.detected_scam_type)) {
    for (const t of aiResponse.detected_scam_type) {
      if (t && typeof t === 'string') {
        scamTypesSet.add(t as DetectedScamType);
      }
    }
  }

  // Merge Warning Signs without duplicate concepts
  const mergedWarnings: WarningSign[] = [...ruleEvaluation.warningSigns];
  const existingTitles = new Set(ruleEvaluation.warningSigns.map(w => w.title.toLowerCase()));

  if (Array.isArray(aiResponse.warning_signs)) {
    aiResponse.warning_signs.forEach((aiSign, idx) => {
      if (aiSign.title && !existingTitles.has(aiSign.title.toLowerCase())) {
        existingTitles.add(aiSign.title.toLowerCase());
        mergedWarnings.push({
          id: `ai_sign_${idx}`,
          title: aiSign.title,
          excerpt: aiSign.excerpt || undefined,
          explanation: aiSign.explanation || 'Contextual pattern identified by AI analysis.',
          severity: aiSign.severity || 'MEDIUM',
          category: 'AI Contextual Insight'
        });
      }
    });
  }

  // Merge Recommendations
  const mergedRecommendations: SafetyRecommendation[] = [...ruleEvaluation.recommendations];
  if (Array.isArray(aiResponse.recommendations)) {
    aiResponse.recommendations.forEach((aiRec, idx) => {
      if (aiRec.title && !mergedRecommendations.some(r => r.title.toLowerCase() === aiRec.title.toLowerCase())) {
        mergedRecommendations.push({
          id: `ai_rec_${idx}`,
          title: aiRec.title,
          description: aiRec.description,
          priority: 6 + idx,
          icon: 'ShieldCheck'
        });
      }
    });
  }

  return {
    id,
    timestamp,
    originalMessage: trimmed,
    riskScore: combinedScore,
    riskCategory: finalCategory,
    riskExplanation: aiResponse.summary || ruleEvaluation.explanation,
    detectionMethod: 'HYBRID',
    detectedScamTypes: Array.from(scamTypesSet),
    warningSigns: mergedWarnings,
    recommendations: mergedRecommendations,
    aiSummary: aiResponse.explanations,
    isAiAssisted: true
  };
}
