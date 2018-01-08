// @flow

import Rx from 'rxjs/Rx';
import kitchenActions from '../actions/kitchenActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import { API_ACCOUNT, API_MENU, API_GET_DELIVERY_LIST } from '../utils/constants';

const initialState = {
  kitchenName: '',
  kitchenDescription: '',
  email: '',
  coverPhoto: '',
  profileImage: '',
  dishes: [],
  isLoading: false,
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

const kitchenReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    kitchenActions.setLoading$.map((isLoading) => (state) => ({
      ...state,
      isLoading,
    })),
    kitchenActions.fetchKitchen$.flatMap((kitchen) => (
      Rx.Observable.forkJoin(
        Rx.Observable.ajax({
          crossDomain: true,
          url: API_ACCOUNT, // TODO: use the kitchen argument
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: window.localStorage.getItem('jwt'),
          },
          responseType: 'json',
        }),
        Rx.Observable.ajax({
          crossDomain: true,
          url: API_MENU,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: window.localStorage.getItem('jwt'),
          },
          responseType: 'json',
        }),
        Rx.Observable.ajax({
          crossDomain: true,
          url: API_GET_DELIVERY_LIST,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: window.localStorage.getItem('jwt'),
          },
          responseType: 'json',
        }),
      )
      .map((data) => (
        state => ({
        ...state,
        ...data[0].response.seller,
        dishes: data[1].response.menuList.map(menu => ({
          ...menu,
          deliveryList: menu.deliveryIdList
            .map((deliveryId) => {
              const meetup = data[2].response.deliveryList.meetupList.find(meetup => meetup._id === deliveryId);
              const shipping = data[2].response.deliveryList.shippingList.find(shipping => shipping._id === deliveryId);
              const delivery = meetup || shipping;
              return delivery ? { ...delivery } : undefined;
            })
            .filter(delivery => Boolean(delivery)),
        })),
        isLoading: false,
      })))
      .catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Get Kitchen Error', message: error.message });
        return Rx.Observable.of(state => ({
          ...state,
          dishes: [],
          isLoading: false,
        }));
      })
    )),
  );

export default kitchenReducer$;
