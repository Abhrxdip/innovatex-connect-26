import { NextResponse } from 'next/server';

const WORKER_URL = 'https://partners.piyalic290.workers.dev';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch(WORKER_URL, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'InnovateX-Server/1.0',
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Worker returned ${res.status}` },
        { status: res.status }
      );
    }

    const text = await res.text();

    return new NextResponse(text, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[partners/route] fetch error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch partner data' },
      { status: 500 }
    );
  }
}
