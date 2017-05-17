import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';         // 引入 react-redux
import reducer from '../reducers/index';
import Sample from '../containers/sample/sample';
import { loggerAction, loggerState, applyMiddleware } from '../lib/middleware';

// Step2
// const store = createStore(reducer);
// loggerAction(store);
// loggerState(store);

// Step3
// let store = createStore(reducer);
// store = applyMiddleware(store, [loggerAction, loggerState]);

// final Step
const createStoreWithMiddleware = applyMiddleware(loggerAction, loggerState)(createStore);
const store = createStoreWithMiddleware(reducer);

render(
    <Provider store={store}>
        <Sample />
    </Provider>,
    document.getElementById('app'),
);
