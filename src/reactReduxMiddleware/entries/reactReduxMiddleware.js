import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';         // 引入 react-redux
import reducer from '../reducers/index';
import Sample from '../containers/sample/sample';
import { loggerAction, loggerState, useApplyMiddleware } from '../lib/middleware';

// Step2
// const store = createStore(reducer);
// loggerAction(store);
// loggerState(store);

// Step3
let store = createStore(reducer);
store = useApplyMiddleware(store, [loggerAction, loggerState]);

render(
    <Provider store={store}>
        <Sample />
    </Provider>,
    document.getElementById('app'),
);
