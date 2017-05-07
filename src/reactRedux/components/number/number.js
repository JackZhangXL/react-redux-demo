import React, { Component } from 'react';
import { render } from 'react-dom';
import './number.pcss';

export default class Number extends Component {

    render() {
        const {
            value,
        } = this.props;

        return (
            <div>
                Current Number: <span className="numValue">{value}</span>
            </div>
        );
    }
}
