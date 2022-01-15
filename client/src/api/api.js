
export default class Api{
    constructor(endpoint , dispatch, contentType) {
        Object.assign(this, {
            endpoint, dispatch, contentType
        })
        this.tokenManager = new TokenManager()
        // dispatch is a reference to the state 
    }

    async get(dispatchPayload){
         return await this.errorHandler("get" , null , dispatchPayload)
    }

    async post(body,  dispatchPayload){
        return await this.errorHandler("post" , body ,  dispatchPayload)
    }

    async delete(body,  dispatchPayload){
        return await this.errorHandler("delete" , body ,  dispatchPayload)
    }

    async patch(body, dispatchPayload){
        return await this.errorHandler("patch" , body , dispatchPayload)
    }


    async errorHandler(method, body ,dispatchPayload){
        const {successStateMessage , failureStateMessage, ...statePayload} = dispatchPayload
        try{
            const data = await generateRequest(this.endpoint, method , body, this.tokenManager.getCookie())
            this.tokenManager.setCookie(data.token)
            this.dispatch({type : successStateMessage , data ,...statePayload}) // state payload is if we want to parse some state
            // data will be the data parsed from the backend and easily dispatched
            return data
        }catch(er){
        console.log(er.message)
           this.dispatch({type : failureStateMessage, errorMessage : er.message , ...statePayload})
           throw new Error(er.message)
            // this will be changed with redux
        }
    }
}


class TokenManager{

    setCookie(value) {
        let expires = "";
        var date = new Date();
        date.setTime(date.getTime() + (60*1000*2000));
        expires = "; expires=" + date.toUTCString();
        document.cookie = "accessToken" + "=" + (value || "")  + expires + "; path=/" + "; secure=true";
    }

    getCookie () {
        let value = `; ${document.cookie}`;
        let parts = value.split(`; accessToken=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
}


const errorStatuses = [404 , 401 , ]




// this function will look for error codes from the server
async function generateRequest(endpoint , method, body , token){
    let options = {
        method,
    }

    let headers  = {
        "Content-Type" : "application/json",
        "Access-Control-Allow-Origin" : "*"
    }
    if(body){
        Object.assign(options , {body : JSON.stringify(body)})
    }
    if(token){
        Object.assign(headers , {"Authorization" : "Bearer " + token})
    }

    Object.assign(options , {headers})
    const res = await fetch(endpoint , options)
    
    const data = await res.json() // my api will return status and errorMessage property every time
    if(errorStatuses.includes(res.status)){
        throw new Error(data.errorMessage)
    }
    return data
}
