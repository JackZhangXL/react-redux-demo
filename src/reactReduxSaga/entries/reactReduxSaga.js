import React, { Component } from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose } from 'redux';
// import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import reducer from '../reducers/index';
import Sample from '../containers/sample/sample';
import rootSaga from '../sagas';

// const logger = createLogger();
const saga = createSagaMiddleware();

const store = createStore(reducer, compose(
    applyMiddleware(saga),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f,
));

saga.run(rootSaga);

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
