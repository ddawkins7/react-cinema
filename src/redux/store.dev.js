import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as Sentry from '@sentry/react';

import rootReducers from './reducers';

const reduxLogging = createLogger({
  collapsed: true,
});

const initialState = {};
const middleware = [require('redux-immutable-state-invariant').default(), thunk, reduxLogging];
const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  // Optionally pass options
});

export const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware), sentryReduxEnhancer)
);

export default store;
