// @flow

import Rx from 'rxjs/Rx';
import kitchenActions from '../actions/kitchenActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import { API_KITCHEN, API_ACCOUNT, API_MENU, API_GET_DELIVERY_LIST } from '../utils/constants';

const defaultKitchen = {
  kitchenName: '',
  kitchenDescription: '',
  email: '',
  coverPhoto: '',
  profileImage: '',
  menuList: [],
  currentDish: null
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
  ...defaultKitchen,
  isLoading: false,
};

const kitchenReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    kitchenActions.setLoading$.map((isLoading) => (state) => ({
      ...state,
      isLoading,
    })),
    kitchenActions.fetchKitchen$.flatMap((kitchen) => (
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
      .map((data) => (state) => ({
        ...state,
        ...data.response.kitchen,
        isLoading: false,
      }))
      .catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Get Kitchen Error', message: error.message });
        return Rx.Observable.of(state => ({
          ...state,
          ...defaultKitchen,
          isLoading: false,
        }));
      })
    )),
    kitchenActions.fetchDish$.flatMap((dishId) => (
      Rx.Observable.forkJoin(
        Rx.Observable.ajax({
          crossDomain: true,
          url: `${API_MENU}/${dishId}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: window.localStorage.getItem('jwt'),
          },
          responseType: 'json',
        }),
        Rx.Observable.ajax({
          crossDomain: true,
          url: `${API_GET_DELIVERY_LIST}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: window.localStorage.getItem('jwt'),
          },
          responseType: 'json',
        }),
      )
      .map((data) => (state) => ({
        ...state,
        currentDish: {
          ...data[0].response.menu,
          deliveryList: data[0].response.menu.deliveryIdList.map((deliveryId) => {
            const meetup = data[1].response.deliveryList.meetupList.find(meetup => meetup._id === deliveryId);
            const shipping = data[1].response.deliveryList.shippingList.find(shipping => shipping._id === deliveryId);
            const delivery = meetup || shipping;
            return delivery ? { ...delivery } : undefined;
          })
          .filter(delivery => Boolean(delivery)),
        },
        isLoading: false,
      }))
      .catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Get Dish Error', message: error.message });
        return Rx.Observable.of(state => ({
          ...state,
          currentDish: { ...defaultDish },
          isLoading: false,
        }));
      })
    )),
  );

export default kitchenReducer$;
