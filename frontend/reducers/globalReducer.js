import Rx from 'rxjs';
import globalActions from '../actions/globalActions';

const initialState = {
  backArrow: {
    isShow: false,
    title: '',
  },
};

const globalReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    globalActions.toggleBackArrow$.map(() => state => ({ ...state, backArrow: { ...state.backArrow, isShow: !state.showBackArrow } })),
  );

export default globalReducer$;
