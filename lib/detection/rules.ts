/**
 * ScamSense AI - Rule Definitions and Pattern Matcher
 * Tailored for Malaysian Cyber Threats & Support/Agency Impersonation
 */

import { WarningSign, SeverityLevel, DetectedScamType } from '@/types/analysis';

export interface DetectionRule {
  id: string;
  category: string;
  title: string;
  scamType: DetectedScamType;
  severity: SeverityLevel;
  weight: number;
  regex: RegExp;
  explanation: string;
}

export const DETECTION_RULES: DetectionRule[] = [
  // 1. SENSITIVE CREDENTIALS & TAC / OTP HARVESTING (Highest Threat in Malaysia)
  {
    id: 'CRED_TAC_OTP_REQUEST',
    category: 'Credential Harvesting',
    title: 'Request for TAC or OTP Code',
    scamType: 'OTP & TAC Theft',
    severity: 'CRITICAL',
    weight: 45,
    regex: /\b(tac\s*code|nombor\s*tac|no[\.\s]*tac|6[\s-]?digit\s*tac|otp\s*code|nombor\s*otp|verification\s*code|kod\s*pengesahan|kod\s*keselamatan|auth\s*code|one[\s-]?time[\s-]?pin)\b/i,
    explanation: 'Scammers frequently request your 6-digit TAC/OTP under the pretense of "canceling a transaction" or "verifying your identity" to authorize fraudulent transfers from your bank account.'
  },
  {
    id: 'CRED_PASSWORD_PIN_REQUEST',
    category: 'Credential Harvesting',
    title: 'Request for Passwords or Card PIN',
    scamType: 'Phishing',
    severity: 'CRITICAL',
    weight: 45,
    regex: /\b(kata\s*laluan|password|card\s*pin|nombor\s*pin|atm\s*pin|cvv|cvc|security\s*code|nombor\s*kad\s*(kredit|debit)|card\s*number)\b/i,
    explanation: 'Demanding confidential authentication secrets such as banking passwords, ATM PINs, or card CVVs is a clear sign of credential phishing.'
  },
  {
    id: 'CRED_IC_PERSONAL_DATA',
    category: 'Identity Data Harvesting',
    title: 'Request for IC / Identity Card Number',
    scamType: 'Phishing',
    severity: 'MEDIUM',
    weight: 20,
    regex: /\b(no[\.\s]*ic|nombor\s*kad\s*pengenalan|mykad|salinan\s*ic|identity\s*card\s*number)\b/i,
    explanation: 'Unsolicited requests for personal identification (MyKad number) can be exploited for identity theft, unauthorized SIM swaps, or fraudulent loan applications.'
  },

  // 2. FINANCIAL DIVERSION & "SAFE ACCOUNT" SCAMS
  {
    id: 'FIN_SAFE_ACCOUNT_TRANSFER',
    category: 'Financial Trap',
    title: 'Safe Account / Holding Vault Transfer Trap',
    scamType: 'Banking Impersonation',
    severity: 'CRITICAL',
    weight: 50,
    regex: /\b(akaun\s*(selamat|sementara|perlindungan|keselamatan|holding|audit)|safe\s*account|safety\s*account|secure\s*vault|escrow\s*account|reserve\s*account|pindah(?:kan)?\s*wang\s*anda\s*ke\s*akaun|transfer\s*funds\s*to\s*safe\s*account)\b/i,
    explanation: 'Scammers impersonating bank fraud investigators falsely claim your balance is at risk and instruct you to transfer money to a "safe account" or "audit account". Banks in Malaysia NEVER maintain safe accounts for customers to transfer funds into.'
  },
  {
    id: 'FIN_UNEXPECTED_FEES',
    category: 'Financial Demand',
    title: 'Unsolicited Processing Fee or Penalty Payment',
    scamType: 'Financial & Investment Scam',
    severity: 'HIGH',
    weight: 30,
    regex: /\b(yuran\s*(pemprosesan|pengaktifan|pelepasan|duti\s*setem|redelivery)|processing\s*fee|clearance\s*fee|release\s*fee|bayaran\s*pendahuluan|wang\s*jaminan|upfront\s*payment|caj\s*tambahan)\b/i,
    explanation: 'Demands for upfront "processing fees", "clearance fees", or "stamp duty" before releasing a loan, prize, or package are a hallmark of advance-fee fraud.'
  },
  {
    id: 'FIN_CRYPTOCURRENCY_OR_GIFT_CARDS',
    category: 'Untraceable Payment',
    title: 'Payment via Crypto, Reload Pins, or Gift Cards',
    scamType: 'Financial & Investment Scam',
    severity: 'CRITICAL',
    weight: 40,
    regex: /\b(tng\s*reload\s*pin|pin\s*tng|razer\s*gold|google\s*play\s*card|itunes\s*card|crypto|bitcoin|usdt|kad\s*hadiah)\b/i,
    explanation: 'Demanding payment via reload PINs or cryptocurrency prevents transaction reversal and hides recipient identity.'
  },

  // 3. MALAYSIAN INSTITUTION IMPERSONATION
  {
    id: 'IMP_MALAYSIAN_BANKS',
    category: 'Impersonation Indicator',
    title: 'Bank Name Reference with Account Urgency',
    scamType: 'Banking Impersonation',
    severity: 'HIGH',
    weight: 25,
    regex: /\b(maybank|maybank2u|mae\s*app|cimb|cimb\s*clicks|octo|rhb|public\s*bank|pbe|hong\s*leong|hlb|ambank|bank\s*islam|bank\s*rakyat|bsn)\b/i,
    explanation: 'The message refers to a prominent Malaysian financial institution. While banks send notifications, unsolicited messages claiming security breaches often represent brand spoofing.'
  },
  {
    id: 'IMP_MALAYSIAN_GOVERNMENT',
    category: 'Government Impersonation',
    title: 'Government Agency Reference (LHDN / PDRM / JPJ / KWSP)',
    scamType: 'Government Impersonation (LHDN/PDRM/JPJ)',
    severity: 'HIGH',
    weight: 30,
    regex: /\b(lhdn|lembaga\s*hasil\s*dalam\s*negeri|pdrm|polis\s*diraja\s*malaysia|bukit\s*aman|jpj|jabatan\s*pengangkutan\s*jalan|kwsp|epf|sprm|mahkamah|kkm|kementerian\s*kewangan|mof)\b/i,
    explanation: 'Scammers frequently invoke regulatory or enforcement bodies like LHDN or PDRM to intimidate recipients with fake warrants or fabricated tax refund notices.'
  },
  {
    id: 'IMP_MALAYSIAN_COURIERS',
    category: 'Courier Impersonation',
    title: 'Courier & Parcel Delivery Reference (Pos Malaysia / J&T / DHL)',
    scamType: 'Courier & Delivery Scam',
    severity: 'HIGH',
    weight: 25,
    regex: /\b(pos\s*malaysia|poslaju|j&t(?:\s*express)?|ninja\s*van|dhl(?:\s*express)?|shopee\s*express|flash\s*express|gdex|parcel\s*delivery|bungkusan\s*anda)\b/i,
    explanation: 'Fake delivery notifications claim a package is held due to incomplete address details or outstanding customs duties to lure recipients into clicking phishing links.'
  },

  // 4. SUSPICIOUS URLS & SHORTENERS
  {
    id: 'URL_SHORTENED_LINK',
    category: 'Deceptive Links',
    title: 'Shortened or Masked URL',
    scamType: 'Phishing',
    severity: 'HIGH',
    weight: 30,
    regex: /(https?:\/\/(?:bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly|rb\.gy|shorturl\.at|s\.id|linktr\.ee)[^\s]*)/i,
    explanation: 'Shortened URLs deliberately conceal the true destination domain, commonly redirecting victims to cloned mobile login portals.'
  },
  {
    id: 'URL_SUSPICIOUS_TLD_OR_LOOKALIKE',
    category: 'Deceptive Links',
    title: 'Suspicious Domain Extension or Hyphenated Brand URL',
    scamType: 'Phishing',
    severity: 'CRITICAL',
    weight: 35,
    regex: /(https?:\/\/[^\s]+(?:\.top|\.xyz|\.click|\.support|\.site|\.online|\.vip|\.info|-secure|-login|-verify|-update|-maybank|-cimb|-lhdn|-pos)[^\s]*)/i,
    explanation: 'The link contains suspicious top-level domains (.top, .xyz) or hyphenated brand lookalikes designed to deceive mobile users into entering their credentials.'
  },
  {
    id: 'URL_IP_ADDRESS',
    category: 'Deceptive Links',
    title: 'Direct Numeric IP Address URL',
    scamType: 'Phishing',
    severity: 'CRITICAL',
    weight: 40,
    regex: /(https?:\/\/(?:[0-9]{1,3}\.){3}[0-9]{1,3}[^\s]*)/i,
    explanation: 'Links pointing directly to numerical IP addresses rather than official registered domains are strongly associated with malicious phishing hosts.'
  },
  {
    id: 'URL_GENERIC_CLICK_PROMPT',
    category: 'Deceptive Links',
    title: 'Generic Click Here Prompt',
    scamType: 'Phishing',
    severity: 'MEDIUM',
    weight: 15,
    regex: /\b(klik\s*(di\s*sini|pautan|link|sini)|click\s*(here|the\s*link|this\s*link)|tekan\s*link|layari\s*pautan|kemaskini\s*di)\b/i,
    explanation: 'Generic urgency prompts urging the recipient to immediately follow an unverified link.'
  },

  // 5. URGENCY & THREATENING LANGUAGE (Psychological Manipulation)
  {
    id: 'URG_COERCIVE_DEADLINE',
    category: 'Psychological Manipulation',
    title: 'Urgent Time Pressure & Deadlines',
    scamType: 'Suspicious Customer Support Message',
    severity: 'HIGH',
    weight: 25,
    regex: /\b(tindakan\s*segera|segera|dalam\s*tempoh\s*(1|2|5|10|15|24|48)\s*jam|immediate|immediately|immediate\s*action|urgent|urgently|act\s*now|asap|within\s*(1|2|5|10|15|24|48)\s*hours?|expires?\s*soon|tamat\s*tempoh|sebelum\s*tengah\s*malam)\b/i,
    explanation: 'Manufactured deadlines induce cognitive panic and prevent the recipient from conducting independent verification.'
  },
  {
    id: 'URG_ACCOUNT_LOCK_THREAT',
    category: 'Psychological Manipulation',
    title: 'Threat of Account Suspension or Legal Arrest',
    scamType: 'Suspicious Customer Support Message',
    severity: 'HIGH',
    weight: 25,
    regex: /\b(akaun\s*(anda\s*)?(disekat|digantung|ditutup|dibekukan)|account\s*(will\s*be\s*)?(suspended|terminated|deactivated|frozen|locked)|tindakan\s*undang[\s-]?undang|waran\s*tangkap|arrest\s*warrant|mahkamah|disaman|legal\s*action)\b/i,
    explanation: 'Fabricated threats of police arrest, court action, or immediate account closure exploit fear to force compliant responses.'
  },

  // 6. FAKE REWARDS, PRIZES & TAX REFUNDS
  {
    id: 'REW_LUCKY_DRAW_PRIZE',
    category: 'Unexpected Rewards',
    title: 'Unsolicited Prize, Bonus or Subsidy Claim',
    scamType: 'Prize & Lucky Draw Scam',
    severity: 'HIGH',
    weight: 30,
    regex: /\b(tahniah|congratulations|cabutan\s*bertuah|lucky\s*draw|pemenang|hadiah\s*lumayan|bantuan\s*(kewangan|khas|e-dompet)|subsidi|claim\s*your\s*reward|bonus\s*percuma)\b/i,
    explanation: 'Unsolicited notifications claiming you have won prizes, cash assistance, or e-wallet subsidies are classic bait for phishing and advance fee fraud.'
  },
  {
    id: 'REW_LHDN_TAX_REFUND',
    category: 'Government Impersonation',
    title: 'Unsolicited LHDN Tax Refund Notice',
    scamType: 'Government Impersonation (LHDN/PDRM/JPJ)',
    severity: 'HIGH',
    weight: 35,
    regex: /\b(lebihan\s*bayaran\s*cukai|cukai\s*tertunggak|tax\s*refund|pemulangan\s*cukai|tebus\s*lebihan\s*cukai|refund\s*lhdn)\b/i,
    explanation: 'Scammers send fake notices from the Inland Revenue Board (LHDN) claiming you are owed a tax refund to steal banking credentials.'
  },

  // 7. REMOTE MALWARE & APK INSTALLATION
  {
    id: 'MAL_APK_REMOTE_TOOL',
    category: 'Malware Installation',
    title: 'Request to Download Third-Party Tool or APK File',
    scamType: 'Suspicious Customer Support Message',
    severity: 'CRITICAL',
    weight: 45,
    regex: /\b(\.apk|download\s*app|muat\s*turun\s*aplikasi|anydesk|teamviewer|quickassist|screen\s*share|pasang\s*aplikasi|install\s*profile)\b/i,
    explanation: 'Instructing users to install an APK file or remote control software (AnyDesk, TeamViewer) is a critical indicator of Android malware or full remote device compromise.'
  },

  // 8. OFF-PLATFORM REDIRECTION
  {
    id: 'OFF_REDIRECT_CHAT',
    category: 'Off-Platform Redirection',
    title: 'Redirect to WhatsApp or Telegram Agent',
    scamType: 'Suspicious Customer Support Message',
    severity: 'MEDIUM',
    weight: 20,
    regex: /\b(whatsapp|wasap|wasap\.my|chat\s*di\s*whatsapp|telegram|t\.me|hubungi\s*pegawai\s*di\s*whatsapp|contact\s*officer\s*on\s*whatsapp)\b/i,
    explanation: 'Moving communications from official portals to private chat apps (WhatsApp/Telegram) allows scammers to operate without institutional oversight and easily delete traces.'
  }
];

export interface ExtractedFinding {
  rule: DetectionRule;
  excerpt: string;
  startIndex: number;
  endIndex: number;
}

/**
 * Executes rule patterns on text and returns deduplicated findings
 */
export function scanMessageRules(text: string): ExtractedFinding[] {
  if (!text || typeof text !== 'string') return [];

  const findings: ExtractedFinding[] = [];
  const seenRuleIds = new Set<string>();

  for (const rule of DETECTION_RULES) {
    const regex = new RegExp(rule.regex.source, 'gi');
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (!seenRuleIds.has(rule.id)) {
        seenRuleIds.add(rule.id);
        findings.push({
          rule,
          excerpt: match[0],
          startIndex: match.index,
          endIndex: match.index + match[0].length
        });
      }
    }
  }

  return findings;
}
