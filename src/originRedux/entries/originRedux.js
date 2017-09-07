import React, { Component } from 'react';
import { createStore } from 'redux';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './originRedux.pcss';

const reducer = (state, action) => {
    if (typeof state === 'undefined') {
        return 0;
    }

    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        case 'CLEAR_NUM':
            return 0;
        default:
            return state;
    }
};

const store = createStore(reducer);

const update = () => {
    const valueEl = document.getElementsByClassName('numValue');
    valueEl[0].innerHTML = store.getState().toString();
};

store.subscribe(update);

export default class Number extends Component {

    addNum = () => {
        store.dispatch({ type: 'INCREMENT' });
    };

    minusNum = () => {
        store.dispatch({ type: 'DECREMENT' });
    };

    clearNum = () => {
        store.dispatch({ type: 'CLEAR_NUM' });
    };

    render() {
        return (
            <div className="wrap">
                <h3>origin Redux</h3>
                Current Number: <span className="numValue">0</span>
                <div>
                    <Button size="large" className="numBtn" onClick={this.addNum}>+</Button>
                    <Button size="large" className="numBtn" onClick={this.minusNum}>-</Button>
                    <Button size="large" className="numBtn" onClick={this.clearNum}>clear</Button>
                </div>
            </div>
        );
    }
}
