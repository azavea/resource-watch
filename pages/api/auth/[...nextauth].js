import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import {
  signIn,
  signOut,
} from 'services/auth';

// time the session will be active if the user is inactive.
const MAX_AGE = 12 * 60 * 60; // 12 hours

/**
 * Takes a token, and returns a new token
 */
// async function refreshAccessToken(token) {
//   try {
//     const refreshTokenResponse = await AUTHENTICATION.request({
//       url: '/refresh-token',
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token.accessToken}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     const { data, status } = refreshTokenResponse;

//     if (status !== 201) {
//       throw new Error(data);
//     }

//     return {
//       ...token,
//       accessToken: data.accessToken,
//     };
//   } catch (error) {
//     return {
//       ...token,
//       error: 'RefreshAccessTokenError',
//     };
//   }
// }

const options = {
  pages: {
    signIn: '/sign-in',
  },
  session: {
    jwt: true,
    maxAge: MAX_AGE,
  },
  providers: [
    Providers.Credentials({
      name: 'Resource Watch',
      async authorize(credentials) {
        const {
          email,
          password,
        } = credentials;

        const { status, data } = await signIn(({ email, password }));
        if (status === 200) return data.data;
        throw new Error(data.data);
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      return ({
        ...token,
        ...user?.token && {
          accessToken: user.token,
        },
      });
    },
    async session(session, token) {
      const newSession = session;
      newSession.accessToken = token.accessToken;
      return newSession;
    },
    async redirect(callbackUrl, baseUrl) {
      console.log('callbackUrl--', callbackUrl);
      console.log('baseUrl', baseUrl);
      // By default it should be redirect to /
      if (['/sign-in', '/sign-up'].includes(callbackUrl)) {
        return '/';
      }
      return callbackUrl;
    },
  },

  events: {
    async signOut(session) {
      // After sign-out expire token in the API
      if (session) await signOut(session.accessToken);
    },
  },
};

export default NextAuth(options);
