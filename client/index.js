import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import 'whatwg-fetch';
import fbConfigDev from '../fbConfig.json';

const initApp = (config) => {
    ReactDOM.render(
        <App fbConfig={config}/>,
        document.getElementById('appRoot')
    );
};

if (process.env.NODE_ENV === 'development') {
    // start app with local fb config info
    initApp(fbConfigDev);
} else {
    // get configs via ajax (instead os storing them in git)
    // start app with fb config info stored in heroku
    fetch('/api/fbconfig', {
        method: 'GET'
    }).then(
        response => response.json()
    ).then((response) => {
        initApp(response);
    });
}
