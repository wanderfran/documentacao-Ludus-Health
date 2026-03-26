import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

function sanitizePath(filePath: string): string | null {
  const resolved = path.resolve(contentDir, filePath);
  if (!resolved.startsWith(contentDir)) {
    return null;
  }
  return resolved;
}

export async function GET(request: NextRequest) {
  const filePath = request.nextUrl.searchParams.get('filePath');

  if (!filePath) {
    return Response.json({ error: 'filePath is required' }, { status: 400 });
  }

  const safePath = sanitizePath(filePath);
  if (!safePath) {
    return Response.json({ error: 'Invalid file path' }, { status: 403 });
  }

  if (!fs.existsSync(safePath)) {
    return Response.json({ error: 'File not found' }, { status: 404 });
  }

  const content = fs.readFileSync(safePath, 'utf-8');
  return Response.json({ content, filePath: filePath });
}

export async function PUT(request: NextRequest) {
  const filePath = request.nextUrl.searchParams.get('filePath');

  if (!filePath) {
    return Response.json({ error: 'filePath is required' }, { status: 400 });
  }

  const safePath = sanitizePath(filePath);
  if (!safePath) {
    return Response.json({ error: 'Invalid file path' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { content } = body;

    if (typeof content !== 'string') {
      return Response.json({ error: 'content must be a string' }, { status: 400 });
    }

    // Ensure directory exists
    const dir = path.dirname(safePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(safePath, content, 'utf-8');
    return Response.json({ success: true, filePath: filePath });
  } catch {
    return Response.json({ error: 'Failed to write file' }, { status: 500 });
  }
}
