import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
// import { createStore } from 'redux';
// import { middleware1, middleware2, applyMiddleware, compose } from '../lib/common';
import { Button, Alert } from 'antd';
import 'antd/dist/antd.css';
import reducer from '../reducers/index';
import actions from '../actions/index';
import './originRedux.pcss';

let store = createStore(reducer, compose(
    // applyMiddleware(middleware1, middleware2),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f,
));

const update = () => {
    const valueEl = document.getElementsByClassName('numValue');
    valueEl[0].innerHTML = store.getState().changeNumber.number;

    const alertEl = document.getElementsByClassName('alert');
    if (store.getState().toggleAlert.showAlert) {
        alertEl[0].style.display = 'block';
    } else {
        alertEl[0].style.display = 'none';
    }
};

store.subscribe(update);
// store.dispatch = middleware1(store);
// store.dispatch = middleware2(store);
// store.dispatch = applyMiddleware(middleware1, middleware2)(store);

export default class Number extends Component {

    addNum = () => {
        store.dispatch(actions.number.incrementNum());
    };

    minusNum = () => {
        store.dispatch(actions.number.decrementNum());
    };

    clearNum = () => {
        store.dispatch(actions.number.clearNum());
    };

    toggleAlert = () => {
        store.dispatch(actions.alert.toggleAlert());
    };

    render() {
        return (
            <div className="wrap">
                <h3>origin Redux combine reducer</h3>
                Current Number: <span className="numValue">0</span>
                <div>
                    <Button size="large" className="numBtn" onClick={this.addNum}>+</Button>
                    <Button size="large" className="numBtn" onClick={this.minusNum}>-</Button>
                    <Button size="large" className="numBtn" onClick={this.clearNum}>clear</Button>
                </div>
                <div>
                    <Button size="large" className="numBtn" onClick={this.toggleAlert}>Alert</Button>
                    <Alert className="alert" message="Hello Redux" type="success" style={{ display: 'none' }} />
                </div>
            </div>
        );
    }
}

render(
    <Number />,
    document.getElementById('app'),
);
