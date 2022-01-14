
export default class Api extends Me{
    constructor(endpoint , dispatch, contentType, redirectPlace) {
        this.dispatch = dispatch
        this.endpoint = endpoint
        this.contentType = contentType
        this.redirectPlace = redirectPlace
        this.tokenManager = new TokenManager()
        // dispatch is reference to state 
    }

    async get(token, dispatchPayload){
         return await this.errorHandler("get" , null , token, dispatchPayload)
    }

    async post(body, token, dispatchPayload){
        return await this.errorHandler("post" , body , token, dispatchPayload)
    }

    async delete(body, token, dispatchPayload){
        return await this.errorHandler("delete" , body , token, dispatchPayload)
    }

    async patch(body, token, dispatchPayload){
        return await this.errorHandler("patch" , body , token, dispatchPayload)
    }


    async errorHandler(method, body , token, dispatchPayload){
        const {successStateMessage , failureStateMessage, ...statePayload} = dispatchPayload
        try{
            const data = await this.requestManager(method, body , token)
            this.dispatch({type : successStateMessage , ...statePayload}) // state payload is if we want to parse some state
            return data
        }catch(er){
            
           this.dispatch({type : failureStateMessage, errorMessage : er.message , ...statePayload})
        }
    }

    async requestManager(method ,  body , token){
        const data = await generateRequest(this.endpoint, method , body , token)
        return data
        // if generateRequest throws error it will be handeled by 
    }
}


class TokenManager{
    constructor(){
        this.token = this.retrieveCookie()
    }

    setCookie(){

    }

    removeCookie(){

    }


    validateCookie(){

    }

    retrieveCookie(){

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
        Object.assign(options , body)
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
