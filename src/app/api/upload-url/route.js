import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: 'No URL provided' }, { status: 400 });

    const response = await fetch(url, {
      // Usamos un user-agent genérico por si la página bloquea fetch
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) throw new Error('Failed to fetch the image from remote server');

    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    return new NextResponse(arrayBuffer, { 
      headers: { 'Content-Type': contentType } 
    });
  } catch (error) {
    console.error("Image proxy error: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
