// @flow

import Rx from 'rxjs/Rx';
import accountActions from '../actions/accountActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import { API_ACCOUNT, API_IMAGE } from '../utils/constants';

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
    accountActions.createCoverPhoto$.map((file) => {
      const formData = new FormData();
      formData.append('image', file);
      return formData;
    }).flatMap(formData => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_IMAGE,
        method: 'POST',
        body: formData,
        headers: {
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(data => state => ({ ...state, coverPhoto: data.response.image }))
        .catch((error) => {
          errorActions.setError$.next({ isShowModal: true, title: 'Create Cover Image Error', message: error.message });
          return Rx.Observable.of(state => state);
        })
    )),
    accountActions.createProfileImage$.map((file) => {
      const formData = new FormData();
      formData.append('image', file);
      return formData;
    }).flatMap(formData => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_IMAGE,
        method: 'POST',
        body: formData,
        headers: {
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(data => state => ({ ...state, profileImage: data.response.image }))
        .catch((error) => {
          errorActions.setError$.next({ isShowModal: true, title: 'Create Profile Photo Error', message: error.message });
          return Rx.Observable.of(state => state);
        })
    )),
  );

export default accountReducer$;
