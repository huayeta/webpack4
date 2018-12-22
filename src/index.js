import React from 'react';
import ReactDom from 'react-dom';
import App from './App.js';

ReactDom.render(
    <App />,
    document.getElementById('root')
)

if(module.hot && process.env.NODE_ENV !== 'production'){
    module.hot.accept('./App',function(){
        const NextApp = require('./App').default;
        ReactDom.render(
            <NextApp />,
            document.getElementById('root')
        )
    })
}
