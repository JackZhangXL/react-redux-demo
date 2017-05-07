import React, { Component } from 'react';
import { render } from 'react-dom';
import { Alert } from 'antd';
import 'antd/dist/antd.css';
import './alert.pcss';

export default class AlertComponent extends Component {

    render() {
        const {
            showAlert,
        } = this.props;

        return (
            <div>
            {
                showAlert ? <Alert message="Hello Redux" type="success" /> : null
            }
            </div>
        );
    }
}
