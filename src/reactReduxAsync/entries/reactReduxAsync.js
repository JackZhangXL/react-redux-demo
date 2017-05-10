import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from '../reducers/index';
import Sample from '../containers/sample/sample';

const logger = createLogger();
const store = createStore(reducer, compose(
    applyMiddleware(thunk, logger),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f,
));

render(
    <Provider store={store}>
        <Sample />
    </Provider>,
    document.getElementById('app'),
);
