/**
 * ScamSense AI - Data Models and Type Definitions
 */

export type RiskCategory = 'LOW' | 'MEDIUM' | 'HIGH';

export type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type DetectedScamType =
  | 'Phishing'
  | 'Banking Impersonation'
  | 'Government Impersonation (LHDN/PDRM/JPJ)'
  | 'Courier & Delivery Scam'
  | 'Financial & Investment Scam'
  | 'Prize & Lucky Draw Scam'
  | 'Suspicious Customer Support Message'
  | 'OTP & TAC Theft'
  | 'Unknown / Insufficient Evidence';

export interface WarningSign {
  id: string;
  title: string;
  excerpt?: string;
  explanation: string;
  severity: SeverityLevel;
  category: string;
}

export interface SafetyRecommendation {
  id: string;
  title: string;
  description: string;
  priority: number;
  icon?: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  originalMessage: string;
  riskScore: number; // 0 - 100
  riskCategory: RiskCategory;
  riskExplanation: string;
  detectionMethod: 'HYBRID' | 'RULE_BASED_FALLBACK';
  detectedScamTypes: DetectedScamType[];
  warningSigns: WarningSign[];
  recommendations: SafetyRecommendation[];
  aiSummary?: string;
  isAiAssisted: boolean;
}

export interface HistoryEntry {
  id: string;
  timestamp: string;
  messageSnippet: string;
  riskScore: number;
  riskCategory: RiskCategory;
  detectedScamTypes: DetectedScamType[];
  fullResult: AnalysisResult;
}

export interface SampleMessage {
  id: string;
  title: string;
  category: string;
  language: 'English' | 'Bahasa Malaysia' | 'Bilingual';
  badge: 'Scam Example' | 'Safe Example';
  text: string;
  description: string;
}

export interface GeminiAnalysisResponse {
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  risk_score: number;
  summary: string;
  detected_scam_type: string[];
  warning_signs: Array<{
    title: string;
    excerpt?: string;
    explanation: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  }>;
  explanations: string;
  recommendations: Array<{
    title: string;
    description: string;
  }>;
}
