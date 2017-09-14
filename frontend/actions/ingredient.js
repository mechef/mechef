export const FETCH_INGREDIENT_BEGIN = 'FETCH_INGREDIENT_BEGIN';
export const FETCH_INGREDIENT_SUCCESS = 'FETCH_INGREDIENT_SUCCESS';
export const FETCH_INGREDIENT_ERROR = 'FETCH_INGREDIENT_ERROR';

export const fetchIngredientBegin = () => ({ type: FETCH_INGREDIENT_BEGIN });
export const fetchIngredientSuccess = payload => ({ type: FETCH_INGREDIENT_SUCCESS, payload });
export const fetchIngredientError = payload => ({ type: FETCH_INGREDIENT_ERROR, payload });
