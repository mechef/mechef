import Router from 'next/router';
import { ajax } from 'rxjs/observable/dom/ajax';

import {
  SET_LOGIN_FIELD,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  loginSuccess,
  loginError,
} from '../actions/auth';
import { setError } from '../actions/errorModal';
import { API_LOGIN } from '../utils/constants';

const initialState = {
  login: {
    email: '',
    password: '',
  },
};

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
        responseType: 'json',
      }).map((data) => {
        window.localStorage.setItem('jwt', data.response.token);
        Router.push({
          pathname: '/dashboard',
        });
        return loginSuccess();
      }).catch(error => Observable.of(
        setError('Login Error', error.message, true),
      )),
    );


export default reducer;
