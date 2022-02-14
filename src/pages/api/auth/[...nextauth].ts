import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

import spotifyApi, { loginURL } from '../../../lib/spotify';

//extensión del tipo de JWT con los parámetros personalizados míos
type MyJWT = JWT & {
  accessToken: string;
  refreshToken: string;
  username: string;
  accessTokenExpires: number;
};

const {
  SPOTIFY_CLIENT_ID: clientId,
  SPOTIFY_CLIENT_SECRET: clientSecret,
  JWT_SECRET: jwtSecret,
} = process.env;

async function refreshAccessToken(token: MyJWT) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      //1000 para que se comporte como una hora
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1_000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (err) {
    return { ...token, error: 'RefreshTokenError' };
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: clientId ?? 'IdNotFoundInEnv',
      clientSecret: clientSecret ?? 'SecretNotFoundInEnv',
      authorization: loginURL,
    }),
  ],
  secret: jwtSecret ?? 'JWTSecretNotFoundInEnv',
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      //cuando se loguea por primera vez
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at && account.expires_at * 1_000,
        };
      }
      //devuelve el token previo si no ha expirado
      if (Date.now() < (token as MyJWT).accessTokenExpires) {
        return token;
      }
      //si el token ha expirado, refresca el token y lo devuelve
      return await refreshAccessToken(token as MyJWT);
    },
    async session({ session, token }) {
      const newUserInfo = {
        ...session.user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        username: token.username,
      };
      session.user = newUserInfo;
      return session;
    },
  },
});
