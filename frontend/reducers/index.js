import { createStore, applyMiddleware, combineReducers } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import 'rxjs';

import auth, { authEpic } from './auth';
import ingredient, { ingredientEpic } from './ingredient';
import errorModal from './errorModal';

const epics = combineEpics(
  authEpic,
  ingredientEpic,
);
const reducers = combineReducers({ auth, ingredient, errorModal });

const epicMiddleware = createEpicMiddleware(epics);

const initStore = (/* initialState = exampleInitialState */) =>
  createStore(reducers, /* initialState */{}, composeWithDevTools(applyMiddleware(epicMiddleware)));


export default initStore;
