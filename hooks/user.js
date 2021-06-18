import { useQuery } from 'react-query';
import { useSession } from 'next-auth/client';

// services
import {
  fetchUser,
} from 'services/user';

const useFetchUser = (userToken, queryConfig) => useQuery(
  ['fetch-user', userToken],
  () => fetchUser(userToken),
  { ...queryConfig },
);

export const useMe = (queryConfig = {}) => {
  const [session, loading] = useSession();

  console.log('session', session)

  return useFetchUser(
    [`Bearer ${session?.accessToken}`],
    {
      enabled: (session?.accessToken && !loading),
      refetchOnWindowFocus: false,
      initialData: null,
      initialStale: true,
      ...queryConfig,
    },
  );
};

export default useMe;
