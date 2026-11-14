/**
 * ScamSense AI - Server-Side Analysis API Endpoint
 * POST /api/analyze
 */

import { NextRequest, NextResponse } from 'next/server';
import { performHybridAnalysis } from '@/lib/detection/hybrid';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body.message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: "message" text is required.' },
        { status: 400 }
      );
    }

    const trimmed = body.message.trim();

    if (trimmed.length === 0) {
      return NextResponse.json(
        { error: 'Please enter a message to analyze. Empty messages cannot be inspected.' },
        { status: 400 }
      );
    }

    if (trimmed.length > 5000) {
      return NextResponse.json(
        { error: 'Message exceeds maximum supported length (5,000 characters). Please submit a shorter snippet.' },
        { status: 400 }
      );
    }

    // Execute Hybrid Analysis
    const result = await performHybridAnalysis(trimmed);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('API /api/analyze execution error:', error);
    return NextResponse.json(
      {
        error: 'An internal error occurred while processing the analysis. Please try again.',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
