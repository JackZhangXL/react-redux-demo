import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Provider extends Component {
    static contextTypes = {
        store: PropTypes.object,
        children: PropTypes.any,
    };

    static childContextTypes = {
        store: PropTypes.object,
    };

    getChildContext = () => {
        return { store: this.props.store, };
    };

    render() {
        return (<div>{this.props.children}</div>);
    }
}
