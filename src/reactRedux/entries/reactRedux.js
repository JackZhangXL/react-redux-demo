import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducer from '../reducers/index';
import Sample from '../containers/sample/sample';

const store = createStore(reducer);

render(
    <Provider store={store}>
        <Sample />
    </Provider>,
    document.getElementById('app'),
);
