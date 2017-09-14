import { ajax } from 'rxjs/observable/dom/ajax';

import { FETCH_INGREDIENT_BEGIN,
  FETCH_INGREDIENT_SUCCESS,
  FETCH_INGREDIENT_ERROR,
  fetchIngredientSuccess,
} from '../actions/ingredient';
import { setError } from '../actions/errorModal';
import { API_GET_INGREDIENT_LIST } from '../utils/constants';

const initialState = {
  ingredientList: [],
};

// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENT_BEGIN:
      return state;
    case FETCH_INGREDIENT_SUCCESS:
      return Object.assign({}, state, {
        ingredientList: action.payload,
      });
    case FETCH_INGREDIENT_ERROR:
      return state;
    default:
      return state;
  }
};

export const ingredientEpic = action$ =>
  action$.ofType(FETCH_INGREDIENT_BEGIN)
    .mergeMap(() =>
      ajax({
        crossDomain: true,
        url: API_GET_INGREDIENT_LIST,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: window.localStorage.getItem('jwt'),
        },
      }).map(data => fetchIngredientSuccess(data.response.ingredientLists))
        .catch(error => Observable.of(
          setError('Getting Ingredients Error', error.response.reason, true),
        )),
    );

export default reducer;
