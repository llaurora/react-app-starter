import React from "react";
import ReactDOM from "react-dom";
import Routers from "./route/route.jsx";

//在项目入口处将整个项目的要被webpack编译的文件都设置为接受热更新，不然每次更改JS会浏览器会重新刷新页面
if(module.hot){
    module.hot.accept(() => {
        ReactDom.render(
            <Routers/>,
            document.getElementById('root')
        )
    })
}

ReactDOM.render(<Routers/>,document.getElementById("root"));


