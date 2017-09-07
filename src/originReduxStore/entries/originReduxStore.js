import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
// import { applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { Button, Alert } from 'antd';
import 'antd/dist/antd.css';
import reducer from '../reducers/index';
import actions from '../actions/index';
// import { createStore } from '../lib/common';
import './originRedux.pcss';

const logger = createLogger();
const store = createStore(reducer, compose(
    applyMiddleware(logger),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f,
));

// const store = createStore(reducer);

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

const cancelUpdate = store.subscribe(update);

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
                <h3>origin Redux store</h3>
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
                <div>
                    <Button size="large" className="numBtn" onClick={cancelUpdate}>unsubscribe</Button>
                </div>
            </div>
        );
    }
}
