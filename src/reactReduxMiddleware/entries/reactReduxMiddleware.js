import React, { Component } from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers/index';
import Sample from '../containers/sample/sample';
import { loggerAction, loggerState, applyMiddleware } from '../lib/middleware';

// Step3
// let store = createStore(reducer);
// store = applyMiddleware(store, [loggerAction, loggerState]);

// final Step
const createStoreWithMiddleware = applyMiddleware(loggerAction, loggerState)(createStore);
const store = createStoreWithMiddleware(reducer);

render(
    <AppContainer>
        <Provider store={store}>
            <Sample />
        </Provider>
    </AppContainer>,
    document.getElementById('app'),
);

if (module.hot) {
    module.hot.accept('../containers/sample/sample', () => {
        const newDemo = require('../containers/sample/sample').default;
        render(
            <AppContainer>
                <Provider store={store}>
                    {React.createElement(newDemo)}
                </Provider>
            </AppContainer>,
            document.getElementById('app'),
        );
    });
}
