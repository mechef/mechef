// @flow

import Rx from 'rxjs/Rx';
import cartActions from '../actions/cartActions';

const initialState = {
  // TODO Paipo: Change the naming to 'dishes' -> cuz it's dishes..
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
    const dishFound = state.orders.some(
      storeOrder => storeOrder.dishId === order.dishId,
    );
    const orders = dishFound
      ? state.orders.map(storeOrder => {
          const quantity =
            storeOrder.dishId === order.dishId
              ? storeOrder.quantity + order.quantity
              : storeOrder.quantity;
          return {
            ...storeOrder,
            quantity,
          };
        })
      : [
          ...state.orders,
          {
            ...order,
            kitchen,
          },
        ];
    const newCart = {
      orders,
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
  cartActions.removeFromCart$.map(({ kitchenName, dishId }) => state => {
    const newCart = {
      ...state,
      orders: state.orders.filter(dish => dish.dishId !== dishId),
    };
    window.localStorage.setItem(
      `${encodeURIComponent(kitchenName)}_cart`,
      JSON.stringify(newCart),
    );
    return newCart;
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
