import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as Sentry from '@sentry/react';

import rootReducers from './reducers';

const initialState = {};
const middleware = [thunk];
const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  // Optionally pass options
});

export const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware), sentryReduxEnhancer)
);

export default store;
