import Rx from 'rxjs';
import errorActions from '../actions/errorActions';

const initialState = {
  isShowModal: false,
  title: '',
  message: '',
};

const errorReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    errorActions.setError$.map(payload => state => ({ ...state, ...payload })),
  );

export default errorReducer$;
