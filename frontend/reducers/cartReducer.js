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
    cartActions.addToCart$.map((order) => (state) => ({
      ...state,
      orders: [
        ...state.orders,
        order,
      ],
    })),
  );

export default cartReducer$;
