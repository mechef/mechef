import Rx from 'rxjs';
import authReducer$ from './authReducer';
import ingredientReducer$ from './ingredientReducer';
import accountReducer$ from './accountReducer';
import deliveryReducer$ from './deliveryReducer';
import errorReducer$ from './errorReducer';
import globalReducer$ from './globalReducer';

const reducer$ = Rx.Observable.merge(
  authReducer$.map(reducer => ['auth', reducer]),
  ingredientReducer$.map(reducer => ['ingredient', reducer]),
  accountReducer$.map(reducer => ['account', reducer]),
  deliveryReducer$.map(reducer => ['delivery', reducer]),
  errorReducer$.map(reducer => ['error', reducer]),
  globalReducer$.map(reducer => ['global', reducer]),
);

export default reducer$;
