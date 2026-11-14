/**
 * ScamSense AI - Utility Functions
 */

import { RiskCategory, SeverityLevel } from '@/types/analysis';

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-MY', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return isoString;
  }
}

export function getRiskColor(category: RiskCategory): {
  text: string;
  bg: string;
  border: string;
  badge: string;
  hex: string;
} {
  switch (category) {
    case 'HIGH':
      return {
        text: 'text-red-500',
        bg: 'bg-red-950/40',
        border: 'border-red-500/40',
        badge: 'bg-red-500/20 text-red-400 border-red-500/40',
        hex: '#ef4444'
      };
    case 'MEDIUM':
      return {
        text: 'text-amber-500',
        bg: 'bg-amber-950/40',
        border: 'border-amber-500/40',
        badge: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
        hex: '#f59e0b'
      };
    case 'LOW':
    default:
      return {
        text: 'text-emerald-500',
        bg: 'bg-emerald-950/40',
        border: 'border-emerald-500/40',
        badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        hex: '#10b981'
      };
  }
}

export function getSeverityBadge(severity: SeverityLevel): string {
  switch (severity) {
    case 'CRITICAL':
      return 'bg-red-600/30 text-red-300 border-red-500/50';
    case 'HIGH':
      return 'bg-orange-600/30 text-orange-300 border-orange-500/50';
    case 'MEDIUM':
      return 'bg-amber-600/30 text-amber-300 border-amber-500/50';
    case 'LOW':
    default:
      return 'bg-blue-600/30 text-blue-300 border-blue-500/50';
  }
}
