import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  //cast por problemas de typing
  const adaptedRequest = req as unknown as NextApiRequest;
  const token = await getToken({
    req: adaptedRequest,
    secret: process.env.JWT_SECRET,
  });
  const { pathname: pathName } = req.nextUrl;
  //si es una petición para autenticarse o existe un token de autenticación dejamos ir
  if (pathName.includes('/api/auth') || token) return NextResponse.next();
  //en cualquiuer otro caso redireccionamos a la pantalla de login
  if (!token && pathName !== '/login') return NextResponse.redirect('/login');
}
