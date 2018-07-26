import Rx from 'rxjs/Rx';
import globalActions from '../actions/globalActions';

const initialState = {
  backArrow: {
    isShow: false,
    title: '',
  },
  isShowSpinner: false,
};

const globalReducer$ = Rx.Observable.of(() => initialState).merge(
  globalActions.toggleBackArrow$.map(title => state => ({
    ...state,
    backArrow: { title, isShow: !state.backArrow.isShow },
  })),
  globalActions.showSpinner$.map(isShowSpinner => state => ({
    ...state,
    isShowSpinner,
  })),
);

export default globalReducer$;
