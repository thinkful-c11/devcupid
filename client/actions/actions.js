import * as ref from './refs';

export const login_request = () => ({
  type: ref.LOGIN_REQUEST
});

export const signup_handler = (key, value) => ({
  type: ref.SIGNUP_HANDLER,
  key,
  value
});