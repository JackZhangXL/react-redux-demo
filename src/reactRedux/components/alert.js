import React, { Component } from 'react';
import { render } from 'react-dom';
import { Alert } from 'antd';
import 'antd/dist/antd.css';
import './originRedux.pcss';

export default class Alert extends Component {

    render() {
        const {
            showAlert,
        } = this.props;

        return (
            <div>
            {
                showAlert ? <Alert className="alert" message="Hello Redux" type="success" /> : null
            }
            </div>
        );
    }
}
