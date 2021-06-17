import {
  WRIAPI,
} from 'utils/axios';

export const signIn = (userCredentials = {}) => WRIAPI.post('/auth/login', userCredentials)
  .then((response) => {
    if (response.status >= 400) throw Error(response.status);
    return response;
  });

export const signOut = (userToken) => WRIAPI.get('/auth/logout', {
  headers: {
    Authorization: userToken,
  },
})
  .then(({ status, statusText, data }) => {
    if (status >= 400) throw Error(statusText);
    return data;
  });
