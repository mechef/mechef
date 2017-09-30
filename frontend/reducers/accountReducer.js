// @flow

import Rx from 'rxjs';
import accountActions from '../actions/accountActions';
import errorActions from '../actions/errorActions';
import { API_ACCOUNT } from '../utils/constants';

const initialState = {
  name: '',
  kitchenDescription: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  coverPhoto: '',
  profileImage: '',
};

const accountReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    accountActions.fetchAccountDetail$.flatMap(() => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_ACCOUNT,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(data => state => ({ ...state, ...data.response.seller }))
        .catch((error) => {
          errorActions.setError$.next({ isShowModal: true, title: 'Get Account Detail Error', message: error.message });
          return Rx.Observable.of(state => state);
        })
    )),
    accountActions.updateAccountDetail$.flatMap(reqbody => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_ACCOUNT,
        method: 'PATCH',
        body: reqbody,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(() => (
        state => ({ ...state, ...reqbody })
      )).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Update Account Detail Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
  );

export default accountReducer$;
