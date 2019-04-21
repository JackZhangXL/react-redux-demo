import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import LoadingComponent from '../loading/loading';
import './fetchData.pcss';

export default class FetchDataComponent extends Component {
    render() {
        const {
            showloading,
            handleClickFetchData,
        } = this.props;

        return (
            <div>
                <Button size="large" className="numBtn" onClick={handleClickFetchData}>fetch data</Button>
                <LoadingComponent show={showloading} />
            </div>
        );
    }
}
