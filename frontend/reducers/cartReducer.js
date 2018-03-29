// @flow

import Rx from 'rxjs/Rx';
import cartActions from '../actions/cartActions';
import errorActions from '../actions/errorActions';
import globalActions from '../actions/globalActions';
import { API_ACCOUNT, API_MENU, API_GET_DELIVERY_LIST } from '../utils/constants';

const initialState = {
  orders: [],
};

const defaultOrder = {
  buyerName: '',
  buyerEmail: '',
  quantity: 1,
  amount: 1,
  orderTime: '',
  deliveryAddress: '',
  deliveryTime: '',
  deliveryLatitude: 0,
  deliveryLongitude: 0,
  messageFromBuyer: '',
  dishName: '',
  image: '',
};

const cartReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    cartActions.setLoading$.map((isLoading) => (state) => ({
      ...state,
      isLoading,
    })),
    cartActions.addToCart$.map((order) => (state) => {
      const newCart = {
        orders: [
          ...state.orders,
          {
            ...order,
            _id: Date.now(),
          },
        ]
      };
      window.localStorage.setItem('cart', JSON.stringify(newCart));
      return {
        ...state,
        orders: [ ...newCart.orders ],
      };
    }),
    cartActions.removeFromCart$.map((id) => (state) => {
      const newCart = {
        orders: state.orders.reduce((orders, order) => (
          order._id === id ? orders : [ ...orders, order ]
        ), []),
      };
      window.localStorage.setItem('cart', JSON.stringify(newCart));
      return {
        ...state,
        orders: [ ...newCart.orders ],
      }
    }),
    cartActions.modifyOrderInCart$.map((orderUpdate) => (state) => {
      const newCart = {
        orders: state.orders.map((order) => order._id === orderUpdate._id ? { ...order, ...orderUpdate } : order),
      };
      window.localStorage.setItem('cart', JSON.stringify(newCart));
      return {
        ...state,
        orders: [ ...newCart.orders ],
      };
    }),
  );

export default cartReducer$;
