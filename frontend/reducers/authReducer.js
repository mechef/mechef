import Rx from 'rxjs';
import Router from 'next/router';
import authActions from '../actions/authActions';
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
      })
    )).map(data => (state) => {
      window.localStorage.setItem('jwt', data.response.token);
      Router.push({
        pathname: '/dashboard',
      });
      return {
        ...state,
        isFetching: false,
      };
    }).catch(error => console.error(error)),
  );

export default authReducer$;