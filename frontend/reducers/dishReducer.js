import Rx from 'rxjs/Rx';
import dishActions from '../actions/dishActions';
import errorActions from '../actions/errorActions';
import { API_MENU } from '../utils/constants';

const initialState = {
  currentDish: null,
  isLoading: false,
};

const dishReducer$ = Rx.Observable.of(() => initialState).merge(
  dishActions.setLoading$.map(isLoading => state => ({
    ...state,
    isLoading,
  })),
  dishActions.fetchDish$.flatMap(dishId =>
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
        currentDish: data.response.menu,
        isLoading: false,
      }))
      .catch(error => {
        errorActions.setError$.next({
          isShowModal: true,
          title: 'Get Dish Error',
          message: error.message,
        });
        return Rx.Observable.of(state => ({
          ...state,
          currentDish: null,
          isLoading: false,
        }));
      }),
  ),
);

export default dishReducer$;
