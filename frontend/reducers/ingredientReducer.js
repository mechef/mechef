// @flow

import Rx from 'rxjs';
import ingredientActions from '../actions/ingredientActions';
import errorActions from '../actions/errorActions';
import { API_MEMO } from '../utils/constants';

const initialState = {
  memos: [],
  currentMemoId: -1,
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
      }).map(data => state => ({ ...state, memos: data.response.memos }))
        .catch((error) => {
          errorActions.setError$.next({ isShowModal: true, title: 'Login Error', message: error.message });
          return Rx.Observable.of(state => state);
        })
    )),
    ingredientActions.setCurrentMemoId$.map(memoId => state => ({
      ...state,
      currentMemoId: memoId,
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
      }).map((data) => {
        return state => ({ ...state, memos: [...state.memos, data.response.memo] });
      }).catch((error) => {
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
