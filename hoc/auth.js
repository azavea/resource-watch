import { getSession } from 'next-auth/client';

// services
import {
  fetchUser,
} from 'services/user';
import {
  useMe,
} from 'hooks/user';

export function withAuthentication(getServerSidePropsFunc) {
  return async (context) => {
    const session = await getSession(context);
    const { resolvedUrl } = context;

    console.log('withAuthentication', session);

    if (!session) {
      return {
        redirect: {
          destination: `/sign-in?callbackUrl=${resolvedUrl}`,
          permanent: false,
        },
      };
    }

    if (getServerSidePropsFunc) {
      const SSPF = await getServerSidePropsFunc(context, session);

      return {
        props: {
          session,
          ...SSPF.props,
        },
      };
    }

    return {
      props: {
        session,
      },
    };
  };
}

export function withUser(Component) {
  return () => {
    const {
      data: user,
    } = useMe();

    console.log('user', user);
    return (<Component user={user} />);
  };
}

export default withAuthentication;
