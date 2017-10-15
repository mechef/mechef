// @flow

import Rx from 'rxjs';
import accountActions from '../actions/accountActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import { API_ACCOUNT } from '../utils/constants';

const initialState = {
  name: '',
  kitchenDescription: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  coverPhoto: '',
  profileImage: '',
  update: {},
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
    accountActions.updateAccountDetail$.map((reqbody) => {
      const formData = new FormData();
      Object.keys(reqbody).forEach((key) => {
        formData.append(key, reqbody[key]);
      });
      return formData;
    }).flatMap(formData => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_ACCOUNT,
        method: 'PATCH',
        body: formData,
        headers: {
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(() => {
        globalActions.toggleBackArrow$.next('');
        return state => state;
      }).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Update Account Detail Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
    accountActions.setField$.map(payload => state => ({
      ...state,
      ...payload,
      update: { ...state.update, ...payload },
    })),
  );

export default accountReducer$;
