import React, { Component } from 'react';
import PropTypes from 'prop-types';

const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object,
        };

        constructor() {
            super();
            this.state = { finalProps: {} };
            // this.finalDispatchToProps = {};
        }

        componentWillMount() {
            const { store } = this.context;
            // const tempDispatchToProps = {};
            // if (typeof mapDispatchToProps === 'object') {
            //     const keys = Object.keys(mapDispatchToProps);
            //     keys.forEach((key) => {
            //         const actionCreator = mapDispatchToProps[key];
            //         tempDispatchToProps[key] = () => store.dispatch(actionCreator());
            //     });
            //     this.finalDispatchToProps = () => tempDispatchToProps;
            // } else {
            //     this.finalDispatchToProps = () => mapDispatchToProps(store.dispatch);
            // }
            this.updateProps();
            store.subscribe(this.updateProps);
        }

        updateProps = () => {
            const { store } = this.context;
            const stateProps = mapStateToProps(store.getState());
            const dispatchProps = mapDispatchToProps(store.dispatch);
            // const dispatchProps = this.finalDispatchToProps();

            const finalProps = {
                ...stateProps,
                ...dispatchProps,
                ...this.props,
            };

            this.setState({
                finalProps,
            });
        };

        render() {
            const { finalProps } = this.state;
            return (<WrappedComponent {...finalProps} />);
        }
    }

    return Connect;
};

export default connect;
