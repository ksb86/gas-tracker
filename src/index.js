import React from 'react';
import { render } from 'react-dom'
import App from './app/app';
import 'whatwg-fetch';
import data from './data';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

const store = createStore(data);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('appRoot')
);