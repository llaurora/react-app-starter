import React from "react";

class PageTwo extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            count:0
        }
    }
    add=()=>{
        this.setState({
            count:this.state.count+1
        })
    };
    render(){
        const {count}=this.state;
        return(
            <div>
                <h1>这是第二页22222</h1>
                <hr/>
                <h2>现在计数为{count}</h2>
                <button onClick={this.add}>Count+</button>
                <h2>dffl</h2>
            </div>
        )
    }
}

export default PageTwo;