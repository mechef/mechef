import Rx from 'rxjs/Rx';
import orderActions from '../actions/orderActions';
import errorActions from '../actions/errorActions';
import { API_ORDER } from '../utils/constants';

const initialState = {
  orderList: [],
  isLoading: false,
};

const orderReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    orderActions.setLoading$.map(isLoading => state => ({
      ...state,
      isLoading,
    })),
    orderActions.fetchOrders$.flatMap(() => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_ORDER,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(data => state => ({
        ...state,
        orderList: data.response.orders,
        isLoading: false,
      })).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Get Menu List Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
    orderActions.updateOrderState$.flatMap(reqbody => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: `${API_ORDER}/${reqbody.id}`,
        method: 'PATCH',
        body: { state: reqbody.state },
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(() => (
        state => ({
          ...state,
          orderList: state.orderList.map((order) => {
            if (order._id === reqbody.id) {
              return { ...order, state: reqbody.state };
            }
            return order;
          }),
        })
      )).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Create Memo Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
  );

export default orderReducer$;
