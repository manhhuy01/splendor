/* global */
import constants from '../constants';

export const post = (path, body) => fetch(`${constants.server}/${path}`, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  method: 'POST',
  body: JSON.stringify(body),
});
