import Rx from 'rxjs';
import ingredientActions from '../actions/ingredientActions';
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
      })
    )).map(data => state => ({ ingredientList: data.response.ingredientLists }))
      .catch(error => console.error(error)),
  );

export default ingredientReducer$;
