import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
// import { bindActionCreators } from '../../lib/common';
import { render } from 'react-dom';
import { connect } from 'react-redux';
// import connect from '../../lib/connect';
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

// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         incrementNum: bindActionCreators(action.number.incrementNum, dispatch),
//         decrementNum: bindActionCreators(action.number.decrementNum, dispatch),
//         clearNum: bindActionCreators(action.number.clearNum, dispatch),
//         toggleAlert: bindActionCreators(action.alert.toggleAlert, dispatch),
//     };
// };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Sample);

// const mergeProps = (stateProps, dispatchProps, ownProps) => {
//     return {
//         ...ownProps,
//         ...stateProps,
//         incrementNum: dispatchProps.incrementNum,   // 只暴露出 incrementNum
//     };
// };
//
// const mergeProps = (stateProps, dispatchProps, ownProps) => {
//     return {
//         ...ownProps,
//         state: stateProps,
//         actions: {
//             ...dispatchProps,
//             ...ownProps.actions,
//         },
//     };
// };
//
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
//     mergeProps,
// )(Sample);
