import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import spotifyApi from '../lib/spotify';
import { MyAuthSession } from '../types/authTypes';

/**
 * Wrapper para la spotifyApi donde siempre nos aseguramos de que
 * tengamos un token de acceso válido.
 * @returns
 */
function useSpotify() {
  //información del inicio de sesión en spotify
  const { data: session } = useSession();

  const mySession = session ? (session as MyAuthSession) : null;

  useEffect(() => {
    if (mySession) {
      //falla al refrescar el token, redirigimos a la pantalla de iniciar sesión
      if (mySession.error === 'RefreshTokenError') signIn();
      //refrescamos el nuevo accesstoken
      spotifyApi.setAccessToken(mySession.user.accessToken);
      /*
      spotifyApi.setClientId(
        process.env.SPOTIFY_CLIENT_ID ?? 'IdNotFoundInEnv'
      );
      spotifyApi.setClientSecret(
        process.env.SPOTIFY_CLIENT_SECRET ?? 'SecretNotFoundInEnv'
      );
      */
    }
  }, [mySession]);

  return spotifyApi;
}

export default useSpotify;
