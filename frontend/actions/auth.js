export const SET_LOGIN_FIELD = 'SET_LOGIN_FIELD';
export const LOGIN_BEGIN = 'LOGIN_BEGIN';

export const setLoginField = (field, value) => ({
  type: SET_LOGIN_FIELD,
  payload: {
    [field]: value,
  },
});
