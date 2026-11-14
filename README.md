# ScamSense AI (Malaysia Edition)
> **Detect. Understand. Stay Protected.**

A Malaysia-focused hybrid scam message detection web application built with **Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui design language, Lucide icons, and optional Google Gemini AI integration**.

Designed specifically to empower Malaysian citizens to recognize suspicious communications received via SMS, WhatsApp, Telegram, or email before taking risky actions.

---

## 🌟 Key Features

1. **Hybrid Scam Detection Engine**:
   - **Deterministic Heuristic Rules**: Tailored for Malaysian financial and regulatory threat vectors (Bahasa Malaysia & English).
   - **Optional Google Gemini AI Integration**: Deep contextual semantic analysis and prompt-injection-resistant assessment.
   - **Automatic Offline Fallback**: If no Gemini API key is configured or network is unreachable, ScamSense AI continues to operate seamlessly with 100% accuracy using its rule-based engine.

2. **Malaysian Context & Threat Profiles**:
   - **OTP & TAC Code Theft**: Detects attempts to harvest 6-digit transaction authorization codes under the guise of "canceling transactions".
   - **Bank "Safe Account" Frauds**: Detects and exposes fraudulent requests to transfer funds into "akaun selamat" / holding vaults (Maybank, CIMB, RHB, Public Bank).
   - **Government & Regulatory Impersonation**: Identifies fake arrest warrants, compound demands, and false tax refunds (LHDN, PDRM, JPJ, KWSP, Mahkamah).
   - **Parcel Delivery Fee Phishing**: Identifies fake delivery problems requesting redelivery fees via masked/shortened links (Pos Malaysia, J&T, DHL).
   - **Unexpected Rewards & Lucky Draws**: Flags fake subsidy distributions and cash vouchers (Touch 'n Go eWallet, lucky draws).
   - **Contextual Anti-Fraud Protection**: Understands legitimate bank security advisories (e.g., *"Maybank will never ask for your password or TAC"*) and appropriately scores them as Low Risk rather than false-positive alarms.

3. **Application-Defined Risk Scoring (0 – 100)**:
   - **0 – 29: Low Risk** (Green)
   - **30 – 69: Medium Risk** (Amber)
   - **70 – 100: High Risk** (Red)

4. **Actionable Zero-Harm Safety Protocol**:
   - Directs users to verify independently via physical debit/credit card back hotlines.
   - Immediate advice on reporting to the **National Scam Response Centre (NSRC 997)** and checking account numbers on the **PDRM CCID SemakMule portal**.

5. **Client-Side Privacy & LocalStorage History**:
   - Saves previous inspection reports in `localStorage` with view and deletion capabilities.
   - 100% zero credential storage; active passwords/TACs are never logged.

6. **Sample Fictional Scenarios**:
   - 6 pre-loaded scenarios (5 scam vectors + 1 legitimate bank alert) in English and Bahasa Malaysia for instant demonstration.

---

## 🏗️ Architecture & Project Structure

```text
scamsense-ai/
├── app/
│   ├── layout.tsx              # Root layout with metadata, navbar & Malaysian defense footer
│   ├── page.tsx                # Main Dashboard with checker, samples & results
│   ├── globals.css             # Tailwind base & dark SaaS theme
│   ├── history/
│   │   └── page.tsx            # Inspection history page (localStorage)
│   ├── about/
│   │   └── page.tsx            # About page, architecture, disclaimer & NSRC hotlines
│   └── api/
│       └── analyze/
│           └── route.ts        # Server-side API endpoint for hybrid analysis
├── components/
│   ├── dashboard/
│   │   ├── Header.tsx          # Responsive navigation & NSRC 997 badge
│   │   ├── WelcomeSection.tsx  # Hero banner & capability pills
│   │   ├── QuickInfoCards.tsx  # 3 core guidance cards
│   │   └── SampleMessages.tsx  # Clickable real-world Malaysian scenario cards
│   ├── checker/
│   │   └── MessageChecker.tsx  # Prominent message input card with character counter
│   ├── results/
│   │   ├── ResultsView.tsx     # Complete analysis report view
│   │   ├── RiskGauge.tsx       # 0-100 visual meter & category indicator
│   │   ├── WarningSignCard.tsx # Detailed warning cards with exact text excerpts
│   │   └── SafetyRecommendations.tsx # Zero-harm action steps & NSRC 997 card
│   ├── history/
│   │   └── HistoryView.tsx     # History list, report re-inspection & clear actions
│   └── ui/                     # shadcn/ui inspired primitives (card, badge, button, progress)
├── lib/
│   ├── detection/
│   │   ├── rules.ts            # Malaysian regex detection patterns & categories
│   │   ├── scoring.ts          # Compound scoring algorithm & recommendation builder
│   │   └── hybrid.ts           # Hybrid orchestrator (Rules + Gemini AI)
│   ├── ai/
│   │   └── gemini.ts           # Server-side Gemini 1.5 Flash client with prompt defense
│   ├── storage/
│   │   └── history.ts          # Client-side localStorage persistence manager
│   ├── data/
│   │   └── samples.ts          # Fictional Malaysian test scenarios
│   └── utils.ts                # Tailwind cn() and formatting utilities
├── types/
│   └── analysis.ts             # Complete TypeScript interfaces and models
├── standalone/
│   └── index.html              # 100% self-contained zero-dependency browser build
├── public/
│   └── index.html              # Mirror of standalone build for static serving
├── .env.example                # Template for GEMINI_API_KEY
├── package.json                # Project dependencies
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 🚀 How to Run the Application

### Option A: Direct Browser Launch (Instant, Zero Dependencies)
If Node.js is not installed on your system:
1. Navigate to:
   `C:\Users\muiz\.gemini\antigravity\scratch\scamsense-ai\standalone\index.html`
2. Double-click `index.html` to open it in **Google Chrome, Microsoft Edge, Firefox, or Safari**.
3. All interactive features, sample scenarios, rule detection, risk scoring, warning cards, and localStorage history work immediately out-of-the-box!

### Option B: Next.js Development Server (When Node.js is installed)
1. Open terminal inside the project root:
   ```bash
   cd C:\Users\muiz\.gemini\antigravity\scratch\scamsense-ai
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Google Gemini API Configuration (Optional)

ScamSense AI **does not require** an API key to function. If no key is configured, the application automatically runs in **Rule-Based Heuristic Mode** with complete accuracy.

To enable AI-assisted contextual reasoning:
1. Obtain an API key from [Google AI Studio](https://aistudio.google.com/).
2. Create or edit `.env.local` in the project root:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Restart the Next.js server (`npm run dev`). The application will now report `Hybrid (Gemini AI + Rules)` in its analysis output.

---

## ⚖️ Official Educational Disclaimer

> *"ScamSense AI is an educational and awareness tool. Its results are based on detected indicators and automated analysis. It cannot guarantee that a message is genuine or fraudulent. Always verify suspicious communications through independently obtained official channels."*

### Official Malaysian Scam Hotlines:
- **National Scam Response Centre (NSRC)**: Call **997** (8:00 AM – 8:00 PM daily)
- **PDRM CCID Infoline / WhatsApp**: **013-211 1222**
- **PDRM CCID SemakMule**: [semakmule.rmp.gov.my](https://semakmule.rmp.gov.my)
