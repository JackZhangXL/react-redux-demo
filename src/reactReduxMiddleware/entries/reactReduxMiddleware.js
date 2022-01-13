import React, { Component } from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers/index';
import Sample from '../containers/sample/sample';
import {
    middleware1,
    middleware2,
    loggerAction,
    loggerState,
    applyMiddleware,
    applyMiddlewarePlus,
    compose,
} from '../lib/middleware';

// Step0 - 手写 console.log
// const store = createStore(reducer);

// Step1 - 自定义中间件
// const store = createStore(reducer);
// store.dispatch = middleware1(store.dispatch);
// store.dispatch = middleware2(store.dispatch);

// Step2 - 用 applyMiddleware 将中间件更优雅地链接起来
// let store = createStore(reducer);
// store = applyMiddleware(store, [loggerAction, loggerState]);

// Step3 - 更优雅的 applyMiddleware
// const store = applyMiddlewarePlus(loggerAction, loggerState)(createStore)(reducer);

// Step4 - 增加 compose 绑定插件功能
const store = createStore(reducer, compose(
    applyMiddlewarePlus(loggerAction, loggerState),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
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
