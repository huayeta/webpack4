import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './App.js';

const render=Component=>{
    ReactDom.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    )
}

render(App)

if(module.hot && process.env.NODE_ENV !== 'production'){
    module.hot.accept('./App',function(){
        const NextApp = require('./App').default;
        render(App);
    })
}
