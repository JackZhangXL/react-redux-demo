import React, { Component } from 'react';
import './loading.pcss';

export default class Loading extends Component {
    render() {
        const {
            show,
        } = this.props;

        return (
            <div className={`loading${show ? '' : ' hide'}`} />
        );
    }
}
