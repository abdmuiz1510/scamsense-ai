import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/dashboard/Header';

export const metadata: Metadata = {
  title: 'ScamSense AI | Malaysia Hybrid Scam Message Detection Tool',
  description:
    'Detect suspicious messages, understand warning signs, and stay protected from banking impersonation, TAC theft, fake government notices, and courier scams in Malaysia.',
  keywords: [
    'scam detection',
    'Malaysia scam',
    'TAC theft',
    'Maybank scam',
    'CIMB scam',
    'LHDN impersonation',
    'phishing checker',
    'NSRC 997'
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <p className="font-medium text-slate-400">
              ScamSense AI • Detect. Understand. Stay Protected.
            </p>
            <p className="max-w-2xl mx-auto leading-relaxed text-slate-400">
              Educational and awareness tool designed for Malaysian cyber defense. Results reflect automated pattern detection and do not guarantee message authenticity. Always verify via independent official hotlines.
            </p>
            <p className="text-[11px] text-slate-400">
              Incident Reporting: Call the National Scam Response Centre (NSRC) at <span className="text-blue-400 font-bold">997</span> • Check Accounts on <span className="text-blue-400 font-bold">CCID SemakMule</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
