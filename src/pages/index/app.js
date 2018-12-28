import React from 'react';
import './style.css';
import {DatePicker} from 'antd';

class App extends React.Component {
    constructor() {
        super();
        this.state={
            count:1
        }
    }
    handleClick=()=>{
        this.setState(prevState=>{
            return {
                count:++prevState.count
            }
        })
    }
    render() {
        const {count}=this.state;
        return (
            <div>
                <h1 onClick={this.handleClick}>点击{count}次</h1>
                <DatePicker />
            </div>
        )
    }
}

export default App;
