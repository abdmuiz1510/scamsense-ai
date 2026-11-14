import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ShieldAlert,
  Cpu,
  Sparkles,
  AlertOctagon,
  PhoneCall,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';

export const metadata = {
  title: 'About ScamSense AI | Cyber Defense & Fraud Awareness',
  description:
    'Learn how ScamSense AI helps Malaysian citizens recognise phishing, TAC theft, and support impersonation using a hybrid detection engine.'
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Page Header */}
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Malaysian Scam Analytics & Awareness</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          About ScamSense AI
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          ScamSense AI was conceived to address the surge of digital impersonation, phishing attacks, and credential theft targeting everyday Malaysians.
        </p>
      </div>

      {/* 1. What ScamSense AI Does */}
      <Card className="border-slate-800 bg-slate-900/80">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-400" />
            <span>What ScamSense AI Does</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <p>
            ScamSense AI serves as an immediate, friction-free verification assistant for any message received across SMS, WhatsApp, Telegram, or email. By pasting the text into the analyzer, users receive:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-200">
            <li>An immediate threat risk score (0 – 100) and clear tier categorization (Low, Medium, High).</li>
            <li>Specific highlighting of psychological coercion triggers, manufactured urgency, and spoofed authority.</li>
            <li>Detection of credential harvesting targeting 6-digit TAC/OTP codes, banking passwords, and MyKad numbers.</li>
            <li>Actionable, zero-harm recommendations aligned with Bank Negara Malaysia and PDRM guidelines.</li>
          </ul>
        </CardContent>
      </Card>

      {/* 2. Why Suspicious Message Detection Matters */}
      <Card className="border-slate-800 bg-slate-900/80">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-400" />
            <span>Why Suspicious Message Detection Matters in Malaysia</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <p>
            According to statistics from the Royal Malaysia Police (PDRM) and the National Scam Response Centre (NSRC), Malaysians lose hundreds of millions of Ringgit annually to social engineering scams.
          </p>
          <p>
            Scammers rarely break technical encryption; instead, they exploit <strong>cognitive panic</strong>. By impersonating trusted entities such as Maybank, CIMB, LHDN, PDRM, or Pos Malaysia, they frighten victims into disclosing verification codes or wiring funds to so-called &quot;safe accounts&quot;. Equipping users with an instant, objective analysis tool interrupts the impulsive reaction cycle.
          </p>
        </CardContent>
      </Card>

      {/* 3. How the Hybrid Detection System Works */}
      <Card className="border-slate-800 bg-slate-900/80">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <span>How the Hybrid Detection Engine Operates</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Cpu className="w-4 h-4" />
                <span>1. Rule-Based Heuristic Engine</span>
              </div>
              <p className="text-xs text-slate-400">
                A deterministic TypeScript rule system analyzing regex patterns for TAC/OTP theft, lookalike URLs, advance fee phrasing, and Malaysian organizational brand spoofing in both English and Bahasa Malaysia. Runs 100% locally with zero latency.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>2. Google Gemini AI Analysis</span>
              </div>
              <p className="text-xs text-slate-400">
                When configured, Google Gemini provides deep contextual inference. It analyzes semantic subtleties, tone manipulation, and evasion techniques while treating the input strictly as untrusted data to defend against prompt injection.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            If external AI services are unavailable or unconfigured, the application gracefully maintains full operational defense through the rule-based heuristic engine.
          </p>
        </CardContent>
      </Card>

      {/* 4. Limitations & Educational Disclaimer */}
      <Card className="border-amber-500/30 bg-amber-950/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-amber-300">
            <AlertOctagon className="w-5 h-5 text-amber-400" />
            <span>Limitations of Automated Detection & Official Disclaimer</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-amber-200/90 leading-relaxed">
          <p>
            Automated tools evaluate patterns, keywords, and linguistic structures. However, sophisticated cybercriminals continually evolve their phrasing, use compromised real accounts, or craft novel deception scenarios.
          </p>
          <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-500/30 text-xs text-slate-300 space-y-2">
            <strong className="text-amber-400 block uppercase tracking-wider text-[11px]">
              Official Disclaimer
            </strong>
            <p className="italic">
              &quot;ScamSense AI is an educational and awareness tool. Its results are based on detected indicators and automated analysis. It cannot guarantee that a message is genuine or fraudulent. Always verify suspicious communications through independently obtained official channels.&quot;
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 5. Essential Malaysian Hotlines */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/50 to-indigo-950/50 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-blue-400" />
            <span>Emergency Scam Response</span>
          </h4>
          <p className="text-xs text-slate-300">
            National Scam Response Centre (NSRC): Call <strong>997</strong> (8am – 8pm daily)
          </p>
          <p className="text-xs text-slate-300">
            PDRM CCID Scam Response Center: <strong>013-211 1222</strong> (WhatsApp)
          </p>
        </div>
        <div className="flex-shrink-0">
          <a
            href="https://semakmule.rmp.gov.my"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            Visit CCID SemakMule
          </a>
        </div>
      </div>
    </div>
  );
}
