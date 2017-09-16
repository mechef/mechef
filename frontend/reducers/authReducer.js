import Rx from 'rxjs';
import Router from 'next/router';
import authActions from '../actions/authActions';
import errorActions from '../actions/errorActions';
import { API_LOGIN } from '../utils/constants';

const initialState = {
  email: '',
  password: '',
};

const authReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    authActions.setLoginField$.map(payload => state => ({ ...state, ...payload })),
    authActions.login$.flatMap(reqbody => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_LOGIN,
        method: 'POST',
        body: reqbody,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        responseType: 'json',
      }).map((data) => {
        window.localStorage.setItem('jwt', data.response.token);
        Router.push({
          pathname: '/dashboard',
        });
        return state => state;
      }).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Login Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
  );

export default authReducer$;
