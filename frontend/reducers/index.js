import Rx from 'rxjs/Rx';
import authReducer$ from './authReducer';
import ingredientReducer$ from './ingredientReducer';
import accountReducer$ from './accountReducer';
import deliveryReducer$ from './deliveryReducer';
import errorReducer$ from './errorReducer';
import globalReducer$ from './globalReducer';
import menuReducer$ from './menuReducer';
import orderReducer$ from './orderReducer';
import kitchenReducer$ from './kitchenReducer';
import cartReducer$ from './cartReducer';

const reducer$ = Rx.Observable.merge(
  authReducer$.map(reducer => ['auth', reducer]),
  ingredientReducer$.map(reducer => ['ingredient', reducer]),
  accountReducer$.map(reducer => ['account', reducer]),
  deliveryReducer$.map(reducer => ['delivery', reducer]),
  errorReducer$.map(reducer => ['error', reducer]),
  globalReducer$.map(reducer => ['global', reducer]),
  menuReducer$.map(reducer => ['menu', reducer]),
  orderReducer$.map(reducer => ['order', reducer]),
  kitchenReducer$.map(reducer => ['kitchen', reducer]),
  cartReducer$.map(reducer => ['cart', reducer]),
);

export default reducer$;
