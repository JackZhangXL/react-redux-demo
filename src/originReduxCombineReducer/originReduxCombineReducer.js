import React, { Component } from 'react';
import { createStore, compose } from 'redux';
import { Button, Alert } from 'antd';
import 'antd/dist/antd.css';
import reducer from './reducers/index';
import actions from './actions/index';
import './originRedux.pcss';

const store = createStore(reducer, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
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
