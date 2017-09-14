export const SET_ERROR = 'SET_ERROR';
export const CLOSE_ERROR_MODAL = 'CLOSE_ERROR_MODAL';

export const setError = (title, message, isShow) => ({
  type: SET_ERROR,
  payload: {
    title,
    message,
    isShow,
  },
});

export const closeErrorModal = () => ({ type: CLOSE_ERROR_MODAL });
