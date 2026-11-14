import React from 'react';
import { Search, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function QuickInfoCards() {
  const infoCards = [
    {
      title: 'Identify Suspicious Messages',
      description:
        'Analyze unexpected SMS, WhatsApp, or email notifications claiming to be from Malaysian banks, LHDN, PDRM, or delivery couriers asking for rapid action.',
      icon: Search,
      accentColor: 'text-blue-400',
      bgColor: 'bg-blue-950/30 border-blue-800/40'
    },
    {
      title: 'Understand Scam Warning Signs',
      description:
        'Learn why specific requests—like 6-digit TAC numbers, transfers to "safe accounts", or shortened links (bit.ly)—are immediate red flags of cyber fraud.',
      icon: AlertTriangle,
      accentColor: 'text-amber-400',
      bgColor: 'bg-amber-950/30 border-amber-800/40'
    },
    {
      title: 'Learn How to Protect Yourself',
      description:
        'Follow practical defensive protocols: call your bank via the number on your physical card, verify accounts on SemakMule, and report urgent scams to NSRC 997.',
      icon: ShieldCheck,
      accentColor: 'text-emerald-400',
      bgColor: 'bg-emerald-950/30 border-emerald-800/40'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
      {infoCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card
            key={index}
            className={`border ${card.bgColor} hover:border-slate-600 transition-all duration-300`}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${card.accentColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {card.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
