import Router from 'next/router';
import { ajax } from 'rxjs/observable/dom/ajax';
import { SET_LOGIN_FIELD, LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_ERROR, CLOSE_ERROR_MODAL, loginSuccess, loginError } from '../actions/auth';
import { API_LOGIN } from '../utils/constants';

const initialState = {
  login: {
    email: '',
    password: '',
  },
  errorModal: {
    isShow: false,
    title: '',
    message: '',
  },
};

// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_FIELD:
      return Object.assign({}, state, {
        login: {
          ...state.login,
          ...action.payload,
        },
      });
    case LOGIN_BEGIN:
      return state;
    case LOGIN_SUCCESS:
      return state;
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        errorModal: {
          isShow: true,
          title: action.payload.title,
          message: action.payload.message,
        },
      });
    case CLOSE_ERROR_MODAL:
      return Object.assign({}, state, {
        errorModal: {
          isShow: false,
          title: '',
          message: '',
        },
      });
    default:
      return state;
  }
};

export const authEpic = (action$, store) =>
  action$.ofType(LOGIN_BEGIN)
    .mergeMap(() =>
      ajax({
        crossDomain: true,
        url: API_LOGIN,
        method: 'POST',
        body: { ...store.getState().auth.login },
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }).map((response) => {
        window.localStorage.setItem('jwt', response.token);
        Router.push({
          pathname: '/dashboard',
        });
        return loginSuccess();
      }).catch(error => Observable.of(
        loginError({
          title: `Login Error: ${error}`,
          message: 'Something wrong',
        }),
      )),
    );


export default reducer;
