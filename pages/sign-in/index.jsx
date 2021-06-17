import { getSession } from 'next-auth/client';

// components
import SignIn from 'layout/sign-in';

export default function SignInPage() {
  return (<SignIn />);
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log('session', session);
  return {
    props: ({}),
  };
}
