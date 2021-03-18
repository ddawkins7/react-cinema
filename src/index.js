import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import * as Sentry from '@sentry/browser';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import './index.scss';
import App from './App';
import store from './redux/store.dev';

/*
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    beforeBreadcrumb(breadcrumb, hint) {
      return breadcrumb.category === 'ui.click' ? null : breadcrumb;
    },
  });
} */

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [
      new Integrations.BrowserTracing({ routingInstrumentation: Sentry.reactRouterV5Instrumentation(history) }),
    ],
    /*   beforeBreadcrumb(breadcrumb, hint) {
    return breadcrumb.category === 'ui.click' ? null : breadcrumb;
  }, */
    environment: process.env.NODE_ENV,
    normalizeDepth: 5,
    release: 'my-project-name@' + process.env.NPM_PACKAGE_NAME,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
