/**
 * ScamSense AI - Scoring Logic & Safety Recommendations Generator
 */

import {
  RiskCategory,
  DetectedScamType,
  WarningSign,
  SafetyRecommendation,
  AnalysisResult
} from '@/types/analysis';
import { ExtractedFinding } from './rules';

/**
 * Checks if the text has explicit protective security notice from a legitimate organization
 */
export function hasProtectiveContext(text: string): boolean {
  const protectiveRegex = /\b(tidak\s*akan\s*meminta|never\s*ask\s*for|jangan\s*kongsikan|never\s*share|peringatan\s*keselamatan|security\s*reminder|simpan\s*secara\s*sulit|keep\s*confidential)\b/i;
  return protectiveRegex.test(text);
}

/**
 * Calculates risk score and evaluates threat category
 */
export function evaluateScoring(findings: ExtractedFinding[], rawText: string): {
  score: number;
  category: RiskCategory;
  explanation: string;
  scamTypes: DetectedScamType[];
  warningSigns: WarningSign[];
  recommendations: SafetyRecommendation[];
} {
  if (findings.length === 0) {
    return {
      score: 5,
      category: 'LOW',
      explanation: 'No known high-risk scam keywords or manipulation patterns were identified in this message. However, always remain vigilant.',
      scamTypes: ['Unknown / Insufficient Evidence'],
      warningSigns: [],
      recommendations: buildSafetyRecommendations([], 'LOW')
    };
  }

  // 1. Calculate raw score with category decay
  let rawScore = 0;
  const categoriesSeen = new Set<string>();
  const scamTypesSet = new Set<DetectedScamType>();
  let hasCriticalSeverity = false;

  for (const finding of findings) {
    const { rule } = finding;
    scamTypesSet.add(rule.scamType);

    if (rule.severity === 'CRITICAL') {
      hasCriticalSeverity = true;
    }

    // Dampen score for repeated hits in the same category
    const catSeenCount = Array.from(categoriesSeen).filter(c => c === rule.category).length;
    const decay = catSeenCount === 0 ? 1.0 : (catSeenCount === 1 ? 0.35 : 0.15);

    rawScore += rule.weight * decay;
    categoriesSeen.add(rule.category);
  }

  // 2. Compound Multipliers
  // If 3 or more distinct suspicious categories are present, attacker is orchestrating a full phishing funnel
  if (categoriesSeen.size >= 3) {
    rawScore *= 1.25;
  }
  if (hasCriticalSeverity && categoriesSeen.size >= 2) {
    rawScore = Math.max(rawScore, 75);
  }

  // 3. Contextual Mitigation for Legitimate Anti-Fraud Notices
  // Example: "Maybank will never ask for your password or TAC"
  const isProtective = hasProtectiveContext(rawText);
  if (isProtective) {
    // If the message merely cites "TAC" or "password" in the context of warning the user, discount the penalty
    rawScore = Math.max(5, rawScore - 40);
  }

  // 4. Standalone Brand Reference Check
  // If the ONLY finding is a brand name (e.g. "Pos Malaysia" or "Maybank") without urgency, links, or demands
  const nonBrandFindings = findings.filter(f => !f.rule.id.startsWith('IMP_MALAYSIAN_'));
  if (nonBrandFindings.length === 0 && findings.length > 0) {
    rawScore = Math.min(rawScore, 20); // Keep in Low Risk
  }

  // Cap score between 0 and 100
  const finalScore = Math.min(100, Math.max(0, Math.round(rawScore)));

  // 5. Determine Application-Defined Risk Category
  let category: RiskCategory = 'LOW';
  let explanation = '';

  if (finalScore >= 70) {
    category = 'HIGH';
    explanation = 'High concentration of active scam indicators detected (e.g., credential harvesting, urgency pressure, or suspicious links). Do not reply, click links, or proceed with requested actions.';
  } else if (finalScore >= 30) {
    category = 'MEDIUM';
    explanation = 'Moderate risk indicators identified. The message exhibits warning signs commonly associated with deceptive communications. Independent verification is strongly advised.';
  } else {
    category = 'LOW';
    explanation = 'Low risk indicators observed. The text does not exhibit typical coercive phishing signatures, but automated analysis cannot verify authenticity. Never share credentials.';
  }

  // 6. Build structured warning signs
  const warningSigns: WarningSign[] = findings.map((f, index) => ({
    id: `ws_${index}_${f.rule.id}`,
    title: f.rule.title,
    excerpt: f.excerpt,
    explanation: f.rule.explanation,
    severity: f.rule.severity,
    category: f.rule.category
  }));

  // 7. Generate targeted recommendations
  const recommendations = buildSafetyRecommendations(warningSigns, category);

  return {
    score: finalScore,
    category,
    explanation,
    scamTypes: Array.from(scamTypesSet),
    warningSigns,
    recommendations
  };
}

/**
 * Builds tailored, safe recommendations for Malaysian users
 */
export function buildSafetyRecommendations(
  warningSigns: WarningSign[],
  category: RiskCategory
): SafetyRecommendation[] {
  const list: SafetyRecommendation[] = [];

  // Core Rule 1: Stop and Do Not Click
  list.push({
    id: 'rec_stop_action',
    title: 'Do Not Act on This Message or Click Embedded Links',
    description: 'Do not click shortened links, tap download buttons, or dial telephone numbers contained inside the message. Scammers construct urgent scenarios to force rapid, unverified decisions.',
    priority: 1,
    icon: 'ShieldAlert'
  });

  // Rule 2: TAC / OTP Confidentiality
  const hasCredentialRisk = warningSigns.some(w => w.category === 'Credential Harvesting' || w.title.includes('TAC'));
  if (hasCredentialRisk || category === 'HIGH') {
    list.push({
      id: 'rec_tac_secrecy',
      title: 'Never Disclose Your TAC, OTP, or Password',
      description: 'Bank officers, police personnel, and government agents will NEVER ask for your 6-digit TAC/OTP or banking password. Anyone asking for an SMS code is attempting to authorize an unauthorized action on your account.',
      priority: 2,
      icon: 'KeyRound'
    });
  }

  // Rule 3: Safe Account Fraud Warning
  const hasSafeAccountRisk = warningSigns.some(w => w.title.includes('Safe Account'));
  if (hasSafeAccountRisk) {
    list.push({
      id: 'rec_no_safe_accounts',
      title: 'Banks in Malaysia Do Not Have "Safe Accounts"',
      description: 'Bank Negara Malaysia and commercial banks do NOT operate "safe accounts", "audit accounts", or "reserve vaults". Any demand to transfer funds to protect your money is 100% fraudulent.',
      priority: 2,
      icon: 'Landmark'
    });
  }

  // Rule 4: Out-of-band verification
  list.push({
    id: 'rec_independent_verify',
    title: 'Verify via Independently Obtained Official Channels',
    description: 'Check your real account status by launching your official mobile banking app (e.g. MAE, CIMB OCTO) or dial the customer service hotline printed directly on the back of your physical ATM/credit card.',
    priority: 3,
    icon: 'PhoneCall'
  });

  // Rule 5: Malaysian Reporting Channel (NSRC 997 & SemakMule)
  list.push({
    id: 'rec_malaysia_nsrc',
    title: 'Report to National Scam Response Centre (NSRC 997)',
    description: 'If you have mistakenly transferred funds or disclosed banking details, contact the National Scam Response Centre (NSRC) immediately at hotline 997 (8:00 AM – 8:00 PM daily) to initiate fund blocking.',
    priority: 4,
    icon: 'Radio'
  });

  // Rule 6: PDRM CCID SemakMule Verification
  list.push({
    id: 'rec_check_semakmule',
    title: 'Check Suspect Bank Accounts & Numbers via SemakMule',
    description: 'Before making any transfer, check the recipient bank account number or phone number through the official PDRM CCID SemakMule portal (semakmule.rmp.gov.my).',
    priority: 5,
    icon: 'SearchCheck'
  });

  return list;
}
