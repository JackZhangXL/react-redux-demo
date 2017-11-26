import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import action from '../../actions/index';
import NumberComponent from '../../components/number/number';
import AlertComponent from '../../components/alert/alert';
import './sample.pcss';

class Sample extends Component {

    // static contextTypes = {
    //     store: PropTypes.object,
    // };

    handleClickAdd = () => {
        // console.log('prevState: ', this.context.store.getState());
        // console.log('action: ', action.number.incrementNum());
        this.props.incrementNum();
        // console.log('currentState: ', this.context.store.getState());
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
                <h3>recat redux middleware</h3>
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        number: state.changeNumber.number,
        showAlert: state.toggleAlert.showAlert,
    };
};

const mapDispatchToProps = {
    incrementNum: action.number.incrementNum,
    decrementNum: action.number.decrementNum,
    clearNum: action.number.clearNum,
    toggleAlert: action.alert.toggleAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Sample);
