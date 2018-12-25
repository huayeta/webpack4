import {join} from 'lodash';
import './style.css';
import myImage from './image.png';
// import PrientMe from './prientMe';
import axios from 'axios';

axios.get('/posts').then(res=>{
    console.log(res.data);
})

function component(){
    var ele=document.createElement('div');
    var btn= document.createElement('button');

    ele.innerHTML = join(['Hello', 'webpack'], ' ');
    ele.innerHTML='sadasda';
    ele.classList.add('hello');

    var image= new Image();
    image.src=myImage;
    image.width=200;
    ele.appendChild(image);

    btn.onclick=(e)=>import('./prientMe.js').then(module=>{
        const PrientMe = module.default;
        PrientMe();
    });
    btn.innerHTML='Click me and check the console!';
    ele.appendChild(btn);

    return ele;
}

document.body.appendChild(component());

if(module.hot && process.env.NODE_DEV!='production'){
    module.hot.accept('./prientMe.js',function(){
        console.log('已更新!');
    })
}
