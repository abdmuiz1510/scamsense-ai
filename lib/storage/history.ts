/**
 * ScamSense AI - Browser LocalStorage History Manager
 */

import { AnalysisResult, HistoryEntry } from '@/types/analysis';

const STORAGE_KEY = 'scamsense_ai_history_v1';
const MAX_HISTORY_ITEMS = 30;

/**
 * Retrieves history entries from localStorage (client-side only)
 */
export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to parse analysis history from localStorage:', error);
    return [];
  }
}

/**
 * Saves a new analysis result to localStorage
 */
export function saveToHistory(result: AnalysisResult): HistoryEntry[] {
  if (typeof window === 'undefined') return [];

  try {
    const existing = getHistory();

    // Create snippet (first 120 chars)
    const snippet =
      result.originalMessage.length > 120
        ? `${result.originalMessage.substring(0, 120)}...`
        : result.originalMessage;

    const newEntry: HistoryEntry = {
      id: result.id,
      timestamp: result.timestamp,
      messageSnippet: snippet,
      riskScore: result.riskScore,
      riskCategory: result.riskCategory,
      detectedScamTypes: result.detectedScamTypes,
      fullResult: result
    };

    // Filter out if duplicate ID already exists, prepend new entry
    const updated = [newEntry, ...existing.filter(item => item.id !== result.id)].slice(
      0,
      MAX_HISTORY_ITEMS
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to save analysis result to localStorage:', error);
    return [];
  }
}

/**
 * Deletes a single history entry by ID
 */
export function deleteHistoryItem(id: string): HistoryEntry[] {
  if (typeof window === 'undefined') return [];

  try {
    const existing = getHistory();
    const updated = existing.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to delete history item:', error);
    return [];
  }
}

/**
 * Clears all analysis history
 */
export function clearAllHistory(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear analysis history:', error);
  }
}
