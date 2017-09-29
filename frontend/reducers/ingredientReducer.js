// @flow

import Rx from 'rxjs';
import Router from 'next/router';
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
    ingredientActions.setCurrentMemoId$.map(payload => state => ({
      ...state,
      currentMemoId: payload.memoId,
    })),
    ingredientActions.addIngredient$.map(payload => state => ({
      ...state,
      memos: [...state.memos, ingredients: { name: payload.ingredientName, amount: payload.ingredientAmount }],
      ingredientName: '',
      ingredientAmount: 0,
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
      }).map(() => {
        // Router.push({
        //   pathname: '/dashboard/ingredient',
        // });
        return state => state;
      }).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Create Memo Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
  );

export default ingredientReducer$;
