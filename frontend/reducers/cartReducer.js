// @flow

import Rx from 'rxjs/Rx';
import cartActions from '../actions/cartActions';

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

const cartReducer$ = Rx.Observable.of(() => initialState).merge(
  cartActions.setLoading$.map(isLoading => state => ({
    ...state,
    isLoading,
  })),
  cartActions.restoreCart$.map(kitchen => state => {
    const orderJson = window.localStorage.getItem(
      `${encodeURIComponent(kitchen)}_cart`,
    );
    const orders = orderJson ? JSON.parse(orderJson).orders : [];
    return {
      ...state,
      orders,
    };
  }),
  cartActions.addToCart$.map(({ kitchen, ...order }) => state => {
    const newCart = {
      orders: [
        ...state.orders,
        {
          ...order,
          kitchen,
          _id: Date.now(),
        },
      ],
    };
    window.localStorage.setItem(
      `${encodeURIComponent(kitchen)}_cart`,
      JSON.stringify(newCart),
    );
    return {
      ...state,
      orders: [...newCart.orders],
    };
  }),
  cartActions.removeFromCart$.map(({ kitchen, id }) => state => {
    const newCart = {
      orders: state.orders.reduce(
        (orders, order) => (order._id === id ? orders : [...orders, order]),
        [],
      ),
    };
    window.localStorage.setItem(
      `${encodeURIComponent(kitchen)}_cart`,
      JSON.stringify(newCart),
    );
    return {
      ...state,
      orders: [...newCart.orders],
    };
  }),
  cartActions.modifyOrderInCart$.map(({ kitchen, ...order }) => state => {
    const newCart = {
      orders: state.orders.map(
        currentOrder =>
          currentOrder._id === order._id
            ? { ...currentOrder, ...order }
            : currentOrder,
      ),
    };
    window.localStorage.setItem(
      `${encodeURIComponent(kitchen)}_cart`,
      JSON.stringify(newCart),
    );
    return {
      ...state,
      orders: [...newCart.orders],
    };
  }),
);

export default cartReducer$;
