import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import JWT from 'jsonwebtoken';
import {
  signIn,
  signOut,
} from 'services/auth';

const MAX_AGE = 2 * 60 * 60; // 2 hours
const SESSION_BUFFER_TIME = 10 * 60; // 10 minutes

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
  /**
   * Defining custom pages
   * By default Next-Auth provides /api/auth/signin
   */
  pages: {
    signIn: '/sign-in',
  },

  session: {
    jwt: true,
    maxAge: MAX_AGE,
  },

  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Resource Watch',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // credentials: {
      //   username: { label: 'Email', type: 'email', placeholder: 'username@domain.com' },
      //   password: { label: 'Password', type: 'password' },
      // },
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
    // Assigning encoded token from API to token created in the session
    async jwt(token, user) {
      console.log('token', token);
      const newToken = { ...token };

      if (user) {
        const { token: userToken } = user;
        newToken.accessToken = userToken;
      }

      // Use custom JWT decode, otherwise "exp date" will be increasing beyond the infinite
      // const { exp } = JWT.decode(newToken.accessToken);
      const { exp } = token;

      const expDate = new Date(exp * 1000);

      // Return previous token if the access token has not expired yet
      const remainingTime = expDate.getTime() - Date.now();
      const shouldRefresh = remainingTime < SESSION_BUFFER_TIME * 1000 && remainingTime > 0;

      console.log('expDate', expDate)
      console.log('shouldRefresh', shouldRefresh);

      // Refresh token
      // if (shouldRefresh) return refreshAccessToken(newToken);

      return newToken;
    },

    // Extending session object
    async session(session, token) {
      console.log('session!!!', session);
      const newSession = session;
      newSession.accessToken = token.accessToken;
      return newSession;
    },

    async redirect(callbackUrl) {
      // By default it should be redirect to /
      if (callbackUrl.includes('/sign-in') || callbackUrl.includes('/sign-up')) {
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
