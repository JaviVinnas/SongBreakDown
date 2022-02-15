export type MyAuthSession = {
  expires: string;
  user: {
    accessToken: string;
    refreshToken: string;
    username?: string;
    email?: string;
    image?: string;
    name?: string;
  };
  error?: string;
};
