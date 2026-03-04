import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const timezone = request.headers.get('x-vercel-ip-timezone') ?? 'America/New_York';

  const response = NextResponse.next();
  response.headers.set('x-timezone', timezone);
  return response;
}
