import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import * as constant from '../configs/action';
import * as actions from '../actions/number';
import './originRedux.pcss';

const reducer = (state, action) => {
    if (typeof state === 'undefined') {
        return 0;
    }

    switch (action.type) {
        case constant.INCREMENT:
            return state + 1;
        case constant.DECREMENT:
            return state - 1;
        case constant.CLEAR_NUM:
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
        store.dispatch(actions.incrementNum());
    };

    minusNum = () => {
        store.dispatch(actions.decrementNum());
    };

    clearNum = () => {
        store.dispatch(actions.clearNum());
    };

    render() {
        return (
            <div className="wrap">
                <h3>origin Redux action</h3>
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

render(
    <Number />,
    document.getElementById('app'),
);
