
export default class Api{
    constructor(dispatch) {
        this.dispatch = dispatch
        // this is reference to dispatch function in order to connect to the state
    }

    get(endpoint, token, dispatchPayload){
         this.errorHandler(endpoint , "get" , null , token, dispatchPayload)
    }

    post(endpoint , body, token, dispatchPayload){
        this.errorHandler(endpoint , "post" , body , token, dispatchPayload)
    }

    delete(endpoint , body, token, dispatchPayload){
        this.errorHandler(endpoint , "delete" , body , token, dispatchPayload)
    }

    patch(endpoint , body, token, dispatchPayload){
        this.errorHandler(endpoint , "patch" , body , token, dispatchPayload)
    }


    errorHandler(endpoint, method, body , token, dispatchPayload){
        const {successStateMessage , failureStateMessage, ...statePayload} = dispatchPayload
        try{
            requestManager(endpoint , method, body , token)
            this.dispatch({type : successStateMessage , ...statePayload}) // state payload is if we want to parse some state
        }catch(er){
           this.dispatch({type : failureStateMessage})
        }
    }
}




async function requestManager(endpoint ,method ,  body , token){
    const errorStatuses = [404 , 401 , ]
    const data = await generateRequest(endpoint, method , body , token )
    // if generateRequest throws error it will be handeled by 
    if(errorStatuses.includes(data.status)){
        throw new Error(data.errorMessage)
    }
}


// this function will look for error codes from the server
async function generateRequest(endpoint , method, body , token){
    let options = {
        method
    }

    let headers  = {
        "content-type" : "application/json",
    }

    if(body){
        Object.assign(options , body)
    }
    if(token){
        Object.assign(headers , {"Authorization Bearer" : token})
    }

    Object.assign(options , headers)

    const res = await fetch(endpoint , options)
    const data = await res.json() // my api will return status and errorMessage property every time
}
