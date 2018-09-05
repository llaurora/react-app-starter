import React from "react";
import ReactDOM from "react-dom";
import "./msgalert.scss";


class AlertBox extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        setTimeout(()=>{
            document.body.removeChild(document.getElementById(this.props.parentID))
        },1500)
    }
    render(){
        return(
            <div className="modalOuter">
                <div>
                    <p>
                        <img src={require("../../asset/images/waning.png")}/>
                        {this.props.msg}
                    </p>
                </div>
            </div>
        )
    }
}

const msgAlert=class{
    static showMsg(msg){
        let parentDOM=document.createElement("div");
        let parentID=parseInt(Math.random()*10).toString();
        parentDOM.id=parentID;
        document.body.appendChild(parentDOM);
        ReactDOM.render(
            <AlertBox msg={msg} parentID={parentID}/>,
            document.getElementById(parentID)
        );
    }
};
export default msgAlert
