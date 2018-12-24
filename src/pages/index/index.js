import component from './app';

let ele=component();

document.body.appendChild(ele);

if(module.hot && process.env.NODE_DEV!='production'){
    module.hot.accept('./app.js',function(){
        document.body.removeChild(ele);
        ele=component();
        document.body.appendChild(ele);
    })
}
