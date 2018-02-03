// @flow

import Rx from 'rxjs/Rx';
import accountActions from '../actions/accountActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import { API_ACCOUNT, API_IMAGE } from '../utils/constants';

const initialState = {
  currentAccount: {
    name: '',
    kitchenName: '',
    kitchenDescription: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    coverPhoto: '',
    profileImage: '',
  },
  updatedFields: {},
};

const accountReducer$ = Rx.Observable.of(() => initialState).merge(
  accountActions.fetchAccountDetail$.flatMap(() =>
    Rx.Observable.ajax({
      crossDomain: true,
      url: API_ACCOUNT,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: window.localStorage.getItem('jwt'),
      },
      responseType: 'json',
    })
      .map(data => state => ({ ...state, currentAccount: data.response.seller }))
      .catch((error) => {
        errorActions.setError$.next({
          isShowModal: true,
          title: 'Get Account Detail Error',
          message: error.message,
        });
        return Rx.Observable.of(state => state);
      }),
  ),
  accountActions.updateAccountDetail$.flatMap(reqbody =>
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
    })
      .map(() => {
        globalActions.toggleBackArrow$.next('');
        return state => state;
      })
      .catch((error) => {
        errorActions.setError$.next({
          isShowModal: true,
          title: 'Update Account Detail Error',
          message: error.message,
        });
        return Rx.Observable.of(state => state);
      }),
  ),
  accountActions.setFields$.map(payload => state => ({
    ...state,
    updatedFields: {
      ...state.updatedFields,
      ...payload,
    },
  })),
  accountActions.createCoverPhoto$
    .map((file) => {
      if (file.size > 1000000) {
        errorActions.setError$.next({
          isShowModal: true,
          title: 'Create Cover Image Error',
          message: 'File size can‘t be over 1 MB !',
        });
      } else {
        const formData = new FormData();
        formData.append('image', file);
        return formData;
      }
    })
    .flatMap(formData =>
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_IMAGE,
        method: 'POST',
        body: formData,
        headers: {
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      })
        .map(data => state => ({
          ...state,
          updatedFields: { ...state.updatedFields, coverPhoto: data.response.image },
        }))
        .catch((error) => {
          errorActions.setError$.next({
            isShowModal: true,
            title: 'Create Cover Image Error',
            message: 'File size can‘t be over 1 MB !',
          });
          return Rx.Observable.of(state => state);
        }),
    )
    .catch((error, source$) => {
      errorActions.setError$.next({
        isShowModal: true,
        title: 'Create Profile Photo Error',
        message: error.message,
      });
      return source$;
    }),
  accountActions.createProfileImage$
    .map((file) => {
      if (file.size > 1000000) {
        throw new Error('File size can‘t be over 1 MB !');
        // errorActions.setError$.next({ isShowModal: true, title: 'Create Profile Image Error', message: 'File size can‘t be over 1 MB !' });
      } else {
        const formData = new FormData();
        formData.append('image', file);
        return formData;
      }
    })
    .flatMap(formData =>
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_IMAGE,
        method: 'POST',
        body: formData,
        headers: {
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      })
        .map(data => state => ({
          ...state,
          updatedFields: { ...state.updatedFields, profileImage: data.response.image },
        }))
        .catch((error) => {
          errorActions.setError$.next({
            isShowModal: true,
            title: 'Create Profile Photo Error',
            message: error.message,
          });
          return Rx.Observable.of(state => state);
        }),
    )
    .catch((error, source$) => {
      errorActions.setError$.next({
        isShowModal: true,
        title: 'Create Profile Photo Error',
        message: error.message,
      });
      return source$;
    }),
);

export default accountReducer$;
