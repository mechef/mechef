import Rx from 'rxjs';
import ingredientActions from '../actions/ingredientActions';
import errorActions from '../actions/errorActions';
import { API_GET_INGREDIENT_LIST } from '../utils/constants';

const initialState = {
  ingredientList: [],
};

const ingredientReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    ingredientActions.fetchIngredient$.flatMap(() => (
      Rx.Observable.ajax({
        crossDomain: true,
        url: API_GET_INGREDIENT_LIST,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
        responseType: 'json',
      }).map(data => state => ({ ...state, ingredientList: data.response.ingredientLists }))
        .catch((error) => {
          errorActions.setError$.next({ isShowModal: true, title: 'Login Error', message: error.message });
          return Rx.Observable.of(state => state);
        })
    )),
  );

export default ingredientReducer$;
