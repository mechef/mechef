// @flow

import Rx from 'rxjs/Rx';
import kitchenActions from '../actions/kitchenActions';
import errorActions from '../actions/errorActions';
import { API_KITCHEN, API_MENU } from '../utils/constants';

const initialState = {
  currentKitchen: null,
  isLoading: false,
};

const kitchenReducer$ = Rx.Observable.of(() => initialState).merge(
  kitchenActions.setLoading$.map(isLoading => state => ({
    ...state,
    isLoading,
  })),
  kitchenActions.fetchKitchen$.flatMap(kitchenName =>
    Rx.Observable.ajax({
      crossDomain: true,
      url: `${API_KITCHEN}/${encodeURIComponent(kitchenName)}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: window.localStorage.getItem('jwt'),
      },
      responseType: 'json',
    })
      .map(data => state => ({
        ...state,
        currentKitchen: data.response.kitchen,
        isLoading: false,
      }))
      .catch(error => {
        errorActions.setError$.next({
          isShowModal: true,
          title: 'Get Kitchen Error',
          message: error.message,
        });
        return Rx.Observable.of(state => ({
          ...state,
          kitchen: null,
          isLoading: false,
        }));
      }),
  ),
);

export default kitchenReducer$;
