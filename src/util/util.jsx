import "whatwg-fetch";
import msgAlert from "../components/msgalert/msgalert.jsx";

function fetchRequest(payload){//fetch请求封装
    function setOptions(payload){
        let headers = payload.headers ? payload.headers : {
                "Content-Type": "application/json;charset=utf-8"
            },
            body = payload.body || {};
        return {
            url: payload.url,
            method: payload.type || "post",
            credentials: "include",
            headers,
            body:(payload.type==="get" ||payload.type==="head") ? undefined : JSON.stringify(body)
        }
    }
    function checkStatus(response){
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            // msgAlert.showMsg(response.statusText);
            let error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }
    function parseJSON(response) {
        return response.json()
    }
    const options = setOptions(payload);
    return fetch(options.url,options)
        .then(checkStatus)
        .then(parseJSON)
        .then((data)=>{
            return data.success ? data.result : Promise.reject(data)
        }).catch((data)=>{
            return (msgAlert.showMsg(data.msg || data.errorMsg || "网络异常，稍后再试"),console.log("request failed"),Promise.reject(data));
        })
}

export {fetchRequest}

