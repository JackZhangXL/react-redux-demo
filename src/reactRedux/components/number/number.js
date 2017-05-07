import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './number.pcss';

export default class Number extends Component {

    render() {
        const {
            value,
            handleClickAdd,
            handleClickMinux,
            handleClickClear,
        } = this.props;

        return (
            <div>
                Current Number: <span className="numValue">{value}</span>
                <div>
                    <Button size="large" className="numBtn" onClick={handleClickAdd}>+</Button>
                    <Button size="large" className="numBtn" onClick={handleClickMinux}>-</Button>
                    <Button size="large" className="numBtn" onClick={handleClickClear}>clear</Button>
                </div>
            </div>
        );
    }
}
