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
    globalActions.toggleBackArrow$.map(title => state => ({ ...state, backArrow: { title, isShow: !state.backArrow.isShow } })),
  );

export default globalReducer$;
