export const SET_LOGIN_FIELD = 'SET_LOGIN_FIELD';
export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CLOSE_ERROR_MODAL = 'CLOSE_ERROR_MODAL';

export const setLoginField = (field, value) => ({
  type: SET_LOGIN_FIELD,
  payload: {
    [field]: value,
  },
});

export const loginBegin = () => ({ type: LOGIN_BEGIN });
export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
export const loginError = payload => ({ type: LOGIN_ERROR, payload });

export const closeErrorModal = () => ({ type: CLOSE_ERROR_MODAL });
