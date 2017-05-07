import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './sample.pcss';
import NumberComponent from '../../components/number/number';
import AlertComponent from '../../components/alert/alert';


export default class Sample extends Component {

    addNum = () => {
        // store.dispatch(actions.number.incrementNum());
    };

    minusNum = () => {
        // store.dispatch(actions.number.decrementNum());
    };

    clearNum = () => {
        // store.dispatch(actions.number.clearNum());
    };

    toggleAlert = () => {
        // if (store.getState().toggleAlert.showAlert) {
        //     store.dispatch(actions.alert.hideAlert());
        // } else {
        //     store.dispatch(actions.alert.showAlert());
        // }
    };

    render() {
        return (
            <div className="wrap">
                <h3>recat redux</h3>
                <NumberComponent value={10} />
                <div>
                    <Button size="large" className="numBtn" onClick={this.addNum}>+</Button>
                    <Button size="large" className="numBtn" onClick={this.minusNum}>-</Button>
                    <Button size="large" className="numBtn" onClick={this.clearNum}>clear</Button>
                </div>
                <div>
                    <Button size="large" className="numBtn" onClick={this.toggleAlert}>Alert</Button>
                    <AlertComponent showAlert={false} />
                </div>
            </div>
        );
    }
}
//
// export default connect((state) => ({}), {
//     // showToastAction: action.toast.showToast,
//     // hideToastAction: action.toast.hideToast,
//     // showProgressAction: action.progress.showProgress,
//     // hideProgressAction: action.progress.hideProgress,
//     // initializeData: action.shopList.initializeData,
// })(Number);


//
// render(
//     <Number />,
//     document.getElementById('app'),
// );
