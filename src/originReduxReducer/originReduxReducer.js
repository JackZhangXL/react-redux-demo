import React, { Component } from 'react';
import { createStore } from 'redux';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import reducer from './reducers/number';
import * as actions from './actions/number';
import './originRedux.pcss';

const store = createStore(reducer);

const update = () => {
    const valueEl = document.getElementsByClassName('numValue');
    valueEl[0].innerHTML = store.getState().number;
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
                <h3>origin Redux reducer</h3>
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
