import React, { Component } from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Demo from '../originRedux';

render(
    <AppContainer>
        <Demo />
    </AppContainer>,
    document.getElementById('app'),
);

if (module.hot) {
    module.hot.accept('../originRedux', () => {
        const newDemo = require('../originRedux').default;
        render(
            <AppContainer>
                {React.createElement(newDemo)}
            </AppContainer>,
            document.getElementById('app'),
        );
    });
}
