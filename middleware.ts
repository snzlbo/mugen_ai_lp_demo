import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/improvement-result')) {
    const basicAuth = req.headers.get('authorization');
    const USER = 'DDAM';
    const PASS = 'V7b$kR!q2FYp#dEz';
    const validAuth =
      'Basic ' + Buffer.from(`${USER}:${PASS}`).toString('base64');

    if (basicAuth === validAuth) {
      return NextResponse.next();
    }

    return new NextResponse('Auth Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/improvement-result/:path*'],
};