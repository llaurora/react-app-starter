import React from "react";

class PageOne extends React.Component{
    constructor(props){
        super(props);
        this.state={
            num:1,
            text:"初始文字"
        };
        this.addNum=this.addNum.bind(this);
    }
    addNum(){
        this.setState({
            num:2,
            text:"改变的文字"
        });
        this.setState({
            num:3
        })
    }
    render(){
        console.log(1);
        let {num,text}=this.state;
        return(
            <div>
                <h1>这是第一页11111</h1>
                <button onClick={this.addNum}>点击</button>——现在数字是：{num}
                <p>{text}</p>
            </div>
        )
    }
}

export default PageOne;