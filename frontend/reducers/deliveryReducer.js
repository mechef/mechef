import Rx from 'rxjs/Rx';
import deliveryActions from '../actions/deliveryActions';
import errorActions from '../actions/errorActions';
import { API_GET_DELIVERY_LIST } from '../utils/constants';

const initialState = {
  meetupList: [],
  updatedMeetup: {},
  shippingList: [],
  currentMeetupId: -1,
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
        updatedMeetup: {},
        meetupList: data.response.deliveryList.meetupList,
        shippingList: data.response.deliveryList.shippingList,
      })).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Get Delivery List Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
    deliveryActions.setCurrentMeetupId$.map(meetupId => state => ({
      ...state,
      currentMeetupId: meetupId,
    })),
    deliveryActions.setMeetupFields$.map(payload => state => ({
      ...state,
      updatedMeetup: {
        ...state.updatedMeetup,
        ...payload,
      }
    })),
    deliveryActions.createMeetup$.flatMap(reqbody => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_GET_DELIVERY_LIST,
        method: 'POST',
        body: reqbody,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(data => (
        state => ({
          ...state,
          updatedMeetup: {},
          meetupList: [...state.meetupList, data.response.delivery]
        })
      )).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Create Memo Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
    deliveryActions.updateMeetup$.flatMap(reqbody => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: `${API_GET_DELIVERY_LIST}/${reqbody._id}`,
        method: 'PATCH',
        body: reqbody,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(() => (
        state => ({ ...state,
          meetupList: state.meetupList.map((meetup) => {
            if (meetup._id === reqbody._id) {
              return { ...meetup, ...reqbody };
            }
            return meetup;
          }),
          updatedMeetup: {},
        })
      )).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Create Memo Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
    deliveryActions.deleteMeetup$.flatMap(meetupId => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: `${API_GET_DELIVERY_LIST}/${meetupId}`,
        method: 'DELETE',
        body: {},
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(() => (
        state => ({
          ...state,
          meetupList: state.meetupList.filter(meetup => meetup._id !== meetupId),
        })
      )).catch((error) => {
        errorActions.setError$.next({ isShowModal: true, title: 'Delete Memo Error', message: error.message });
        return Rx.Observable.of(state => state);
      })
    )),
  );

export default deliveryReducer$;
