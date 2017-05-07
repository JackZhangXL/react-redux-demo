import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Alert } from 'antd';
import 'antd/dist/antd.css';
import './alert.pcss';

export default class AlertComponent extends Component {
    render() {
        const {
            showAlert,
            handleClickAlert,
        } = this.props;

        return (
            <div>
                <Button size="large" className="numBtn" onClick={handleClickAlert}>Alert</Button>
                {
                    showAlert ? <Alert message="Hello Redux" type="success" /> : null
                }
            </div>
        );
    }
}
