import React, { Component } from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import { thunk } from '../lib/common';
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
