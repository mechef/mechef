// @flow

import Rx from 'rxjs/Rx';
import kitchenActions from '../actions/kitchenActions';
import errorActions from '../actions/errorActions';
import {
  API_KITCHEN,
  API_MENU,
} from '../utils/constants';

const defaultKitchen = {
  kitchenName: '',
  kitchenDescription: '',
  email: '',
  coverPhoto: '',
  profileImage: '',
  menuList: [],
};

const defaultDish = {
  images: [],
  deliveryIdList: [],
  deliveryList: [],
  ingredients: [],
  category: [],
  serving: 0,
  cookingBuffer: '',
  description: '',
  quantity: 0,
  unitPrice: '',
  dishName: '',
};

const initialState = {
  kitchen: {
    kitchen: { ...defaultKitchen },
    selectedDish: null,
  },
  isLoading: false,
};

const kitchenReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    kitchenActions.setLoading$.map(isLoading => state => ({
      ...state,
      isLoading,
    })),
    kitchenActions.fetchKitchen$.flatMap(kitchen => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: `${API_KITCHEN}/${encodeURIComponent(kitchen)}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      })
        .map(data => state => ({
          ...state,
          kitchen: { ...data.response.kitchen },
          isLoading: false,
        }))
        .catch((error) => {
          errorActions.setError$.next({ isShowModal: true, title: 'Get Kitchen Error', message: error.message });
          return Rx.Observable.of(state => ({
            ...state,
            kitchen: { kitchen: { ...defaultKitchen } },
            isLoading: false,
          }));
        })
    )),
    kitchenActions.fetchDish$.flatMap(dishId => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: `${API_MENU}/${dishId}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      })
        .map(data => state => ({
          ...state,
          selectedDish: { ...data.response.menu },
          isLoading: false,
        }))
        .catch((error) => {
          errorActions.setError$.next({ isShowModal: true, title: 'Get Dish Error', message: error.message });
          return Rx.Observable.of(state => ({
            ...state,
            selectedDish: { ...defaultDish },
            isLoading: false,
          }));
        })
    )),
  );

export default kitchenReducer$;
