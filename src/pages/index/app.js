import {join} from 'lodash';
import './style.css';
import myImage from './image.png';
// import PrientMe from './prientMe';

function component(){
    var ele=document.createElement('div');
    var btn= document.createElement('button');

    ele.innerHTML = join(['Hello', 'webpack'], ' ');
    ele.innerHTML='sadasda1343';
    ele.classList.add('hello');

    var image= new Image();
    image.src=myImage;
    image.width=700;
    ele.appendChild(image);

    btn.onclick=(e)=>import('./prientMe.js').then(module=>{
        const PrientMe = module.default;
        PrientMe();
    });
    btn.innerHTML='Click me and check the console!';
    ele.appendChild(btn);

    return ele;
}

export default component;
