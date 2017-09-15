import Rx from 'rxjs';
import ingredientActions from '../actions/ingredientActions';

const initialState = {
  ingredientList: [],
};

const ingredientReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    ingredientActions.fetchIngredient$.flatMap(() => {
      return Rx.Observable.ajax({
        crossDomain: true,
        url: API_GET_INGREDIENT_LIST,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
      })
      .map(data => data.response.ingredientLists)
      .catch(error => console.error(error));
    })
  );

export default ingredientReducer$;
