import Rx from 'rxjs';
import deliveryActions from '../actions/deliveryActions';
import errorActions from '../actions/errorActions';
import { API_GET_DELIVERY_LIST } from '../utils/constants';

const initialState = {
  shippingList: [],
  meetupList: [],
};

const deliveryReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    deliveryActions.fetchDelivery$.flatMap(() => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_GET_DELIVERY_LIST,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(data => state => ({
        ...state,
        shippingList: data.response.deliveryList.filter(delivery => delivery.type === 'shipping'),
        meetupList: data.response.deliveryList.filter(delivery => delivery.type === 'meetup'),
      })).catch((error) => {
          errorActions.setError$.next({ isShowModal: true, title: 'Get Delivery List Error', message: error.message });
          return Rx.Observable.of(state => state);
        })
    )),
  );

export default deliveryReducer$;
