import React from 'react';
import './style.css';

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
            <h1 onClick={this.handleClick}>{count}</h1>
        )
    }
}

export default App;
