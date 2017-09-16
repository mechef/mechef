import Rx from 'rxjs';
import authReducer$ from './authReducer';
import ingredientReducer$ from './ingredientReducer';

const reducer$ = Rx.Observable.merge(
  authReducer$.map(reducer => ['auth', reducer]),
  ingredientReducer$.map(reducer => ['ingredient', reducer]),
);

export default reducer$;
