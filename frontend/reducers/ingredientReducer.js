// @flow

import Rx from 'rxjs/Rx';
import ingredientActions from '../actions/ingredientActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import { API_MEMO } from '../utils/constants';

const initialState = {
  memos: [],
  currentMemoId: -1,
  updatedMemo: {},
  ingredientName: '',
  ingredientAmount: 0,
};

const ingredientReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    ingredientActions.fetchMemos$.flatMap(() => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_MEMO,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
    }).map(data => {
      globalActions.showSpinner$.next(false);
      return state => ({ ...state, memos: data.response.memos, updatedMemo: {}, });
    }).catch((error) => {
        globalActions.showSpinner$.next(false);
        errorActions.setError$.next({ isShowModal: true, title: 'Login Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
    ingredientActions.setCurrentMemoId$.map(memoId => state => ({
      ...state,
      currentMemoId: memoId,
    })),
    ingredientActions.setFields$.map(payload => state => ({
      ...state,
      updatedMemo: {
        ...state.updatedMemo,
        ...payload,
      }
    })),
    ingredientActions.createMemo$.flatMap(reqbody => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_MEMO,
        method: 'POST',
        body: reqbody,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(data => (
        state => ({
          ...state,
          memos: [...state.memos, data.response.memo],
          updatedMemo: {},
        })
      )).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Create Memo Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
    ingredientActions.updateMemo$.flatMap(reqbody => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: `${API_MEMO}/${reqbody._id}`,
        method: 'PATCH',
        body: reqbody,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(() => (
        state => ({ ...state,
          memos: state.memos.map((memo) => {
            if (memo._id === reqbody._id) {
              return { ...memo, ...reqbody };
            }
            return memo;
          }),
          updatedMemo: {},
        })
      )).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Create Memo Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
    ingredientActions.deleteMemo$.flatMap(memoId => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: `${API_MEMO}/${memoId}`,
        method: 'DELETE',
        body: {},
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(() => {
        return state => ({ ...state, memos: state.memos.filter(memo => memo._id !== memoId) });
      }).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Delete Memo Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
  );

export default ingredientReducer$;
