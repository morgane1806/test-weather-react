// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { i18nReducer, loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';

import './index.css';
import App from './App';
import pagesReducer from './pages/pagesReducer';
import translations from './i18n/translations';

const store = createStore(
  combineReducers({
    pages: pagesReducer,
    form: formReducer,
    i18n: i18nReducer,
  }),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale('en'));


/* eslint-disable react/jsx-filename-extension */
function wrapApp(RootComponent, reduxStore) {
  return (
    <Provider store={reduxStore}>
      <BrowserRouter basename="/">
        <Switch>
          <Route component={App} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}


/* eslint-enable no-underscore-dangle */
ReactDOM.render(wrapApp(App, store), document.getElementById('root'));

