import Rx from 'rxjs';
import authReducer$ from './authReducer';
import ingredientReducer$ from './ingredientReducer';
import deliveryReducer$ from './deliveryReducer';
import errorReducer$ from './errorReducer';

const reducer$ = Rx.Observable.merge(
  authReducer$.map(reducer => ['auth', reducer]),
  ingredientReducer$.map(reducer => ['ingredient', reducer]),
  deliveryReducer$.map(reducer => ['delivery', reducer]),
  errorReducer$.map(reducer => ['error', reducer]),
);

export default reducer$;
