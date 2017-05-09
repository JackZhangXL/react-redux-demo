import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import action from '../../actions/index';
import NumberComponent from '../../components/number/number';
import AlertComponent from '../../components/alert/alert';
import FetchDataComponent from '../../components/fetchData/fetchData';
import './sample.pcss';

class Sample extends Component {

    handleClickAdd = () => {
        this.props.incrementNum();
    };

    handleClickMinux = () => {
        this.props.decrementNum();
    };

    handleClickClear = () => {
        this.props.clearNum();
    };

    handleClickAlert = () => {
        this.props.toggleAlert();
    };

    handleClickFetchData = () => {
        this.props.fetchDataAction();
    };

    render() {
        const {
            number,
            showAlert,
            fetching,
            data,
        } = this.props;

        return (
            <div className="wrap">
                <h3>recat redux async</h3>
                <NumberComponent
                    value={number}
                    handleClickAdd={this.handleClickAdd}
                    handleClickMinux={this.handleClickMinux}
                    handleClickClear={this.handleClickClear}
                />
                <AlertComponent
                    showAlert={showAlert}
                    handleClickAlert={this.handleClickAlert}
                />
                <FetchDataComponent
                    showloading={fetching}
                    handleClickFetchData={this.handleClickFetchData}
                />
                <p>{ data !== null ? data.msg : '' }</p>
            </div>
        );
    }
}

export default connect((state) => ({
    number: state.changeNumber.number,
    showAlert: state.toggleAlert.showAlert,
    fetching: state.fetchData.fetching,
    data: state.fetchData.data,
}), {
    incrementNum: action.number.incrementNum,
    decrementNum: action.number.decrementNum,
    clearNum: action.number.clearNum,
    toggleAlert: action.alert.toggleAlert,
    fetchDataAction: action.fetchDataAction.fetchDataAction,
})(Sample);
