import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Server-side proxy for Google Drive images.
 * Fetches the image from Google Drive and streams it back,
 * avoiding browser CORS / referrer restrictions.
 *
 * Usage: /api/drive-image?id=DRIVE_FILE_OR_FOLDER_ID
 */
export async function GET(request: NextRequest) {
  const driveId = request.nextUrl.searchParams.get('id');

  if (!driveId) {
    return NextResponse.json({ error: 'Missing id param' }, { status: 400 });
  }

  // Try multiple Google Drive image endpoints in order of reliability
  const urls = [
    `https://drive.google.com/thumbnail?id=${driveId}&sz=w400`,
    `https://lh3.googleusercontent.com/d/${driveId}=s400`,
    `https://drive.google.com/uc?export=view&id=${driveId}`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        redirect: 'follow',
      });

      if (!res.ok) continue;

      const contentType = res.headers.get('content-type') || '';

      // Skip HTML responses (Google login pages, error pages)
      if (contentType.includes('text/html')) continue;

      const buffer = await res.arrayBuffer();
      if (buffer.byteLength < 100) continue; // skip empty/tiny responses

      return new NextResponse(Buffer.from(buffer), {
        status: 200,
        headers: {
          'Content-Type': contentType || 'image/png',
          'Cache-Control': 'public, max-age=86400, s-maxage=86400',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch {
      continue;
    }
  }

  // All attempts failed — return a transparent 1x1 PNG
  return new NextResponse(null, { status: 404 });
}
