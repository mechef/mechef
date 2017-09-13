import { createStore, applyMiddleware, combineReducers } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

import auth from './auth';

const reducers = combineReducers({ auth });


const initStore = (/* initialState = exampleInitialState */) =>
  createStore(reducers, /* initialState */{}, composeWithDevTools(applyMiddleware()));


export default initStore;
