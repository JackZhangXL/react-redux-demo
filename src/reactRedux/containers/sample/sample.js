import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import action from '../../actions/index';
import NumberComponent from '../../components/number/number';
import AlertComponent from '../../components/alert/alert';
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

    render() {
        const {
            number,
            showAlert,
        } = this.props;

        return (
            <div className="wrap">
                <h3>recat redux</h3>
                <NumberComponent
                    value={number}
                    handleClickAdd={this.handleClickAdd}
                    handleClickMinux={this.handleClickMinux}
                    handleClickClear={this.handleClickClear}
                />
                <div>
                    <AlertComponent
                        showAlert={showAlert}
                        handleClickAlert={this.handleClickAlert}
                    />
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    console.log('connect state: ', state);
    return {
        number: state.changeNumber.number,
        showAlert: state.toggleAlert.showAlert,
    };
}, {
    incrementNum: action.number.incrementNum,
    decrementNum: action.number.decrementNum,
    clearNum: action.number.clearNum,
    toggleAlert: action.alert.toggleAlert,
})(Sample);
