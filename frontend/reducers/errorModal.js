import {
  SET_ERROR,
  CLOSE_ERROR_MODAL,
} from '../actions/errorModal';

const initialState = {
  isShow: false,
  title: '',
  message: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return Object.assign({}, state, {
        title: action.payload.title,
        message: action.payload.message,
        isShow: action.payload.isShow,
      });
    case CLOSE_ERROR_MODAL:
      return Object.assign({}, state, {
        isShow: false,
        title: '',
        message: '',
      });
    default:
      return state;
  }
};

export default reducer;
