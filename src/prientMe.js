import {join} from 'lodash';

export default function prientMe(){
    console.log(join(['Hello', 'webpack','222'], ' '));
}

export function add(){
    console.log('add');
}
