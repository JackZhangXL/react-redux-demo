import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Button, Alert } from 'antd';
import 'antd/dist/antd.css';
import reducer from '../reducers/index';
import * as actions from '../actions/number';
import './originRedux.pcss';
import Sample from '../containers/sample/sample';

const store = createStore(reducer);

const update = () => {
    const valueEl = document.getElementsByClassName('numValue');
    valueEl[0].innerHTML = store.getState().changeNumber.number;

    const alertEl = document.getElementsByClassName('alert');
    if (store.getState().toggleAlert.showAlert) {
        alertEl[0].style.display = 'none';
    } else {
        alertEl[0].style.display = 'block';
    }
};

store.subscribe(update);

export default class Number extends Component {

    addNum = () => {
        store.dispatch(actions.incrementNum());
    };

    minusNum = () => {
        store.dispatch(actions.decrementNum());
    };

    clearNum = () => {
        store.dispatch(actions.clearNum());
    };

    toggleAlert = () => {
        if (store.getState().toggleAlert.showAlert) {
            store.dispatch(actions.hideAlert());
        } else {
            store.dispatch(actions.showAlert());
        }
    };

    render() {
        return (
            <Sample />
        );
    }
}

render(
    <Number />,
    document.getElementById('app'),
);
