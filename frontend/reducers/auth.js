import { SET_LOGIN_FIELD, LOGIN_BEGIN } from '../actions/auth';

const initialState = {
  login: {
    email: '',
    password: '',
  },
};

// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_FIELD:
      return Object.assign({}, state, {
        ...state,
        login: {
          ...state.login,
          ...action.payload,
        },
      });
    case LOGIN_BEGIN:
      return state;
    default:
      return state;
  }
};

export default reducer;
