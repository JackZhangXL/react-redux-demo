import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';         // 引入 react-redux
import reducer from '../reducers/index';
import Sample from '../containers/sample/sample';
import { logger1, logger2 } from '../lib/middleware';

const store = createStore(reducer, compose(
    applyMiddleware(logger1, logger2),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f,
));

render(
    <Provider store={store}>
        <Sample />
    </Provider>,
    document.getElementById('app'),
);
