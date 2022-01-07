
class Api{
    constructor(dispatch) {
        this.dispatch = dispatch
        // this is reference to dispatch function in order to connect to the state
    }

    get(endpoint, token, successStateMessage , failureStateMessage){
         this.errorHandler(endpoint , "get" , null , token, successStateMessage , failureStateMessage)
    }

    post(endpoint , body, token, successStateMessage , failureStateMessage){
        this.errorHandler(endpoint , "post" , body , token, successStateMessage , failureStateMessage)
    }

    delete(endpoint , body, token, successStateMessage , failureStateMessage){
        this.errorHandler(endpoint , "delete" , body , token, successStateMessage , failureStateMessage)
    }
    
    patch(endpoint , body, token, successStateMessage , failureStateMessage){
        this.errorHandler(endpoint , "delete" , body , token, successStateMessage , failureStateMessage)
    }


    errorHandler(endpoint, method, body , token, successStateMessage , failureStateMessage, ){
        try{
            requestManager(endpoint , method, body , token)
            this.dispatch(successStateMessage)
        }catch(er){
           this.dispatch(failureStateMessage)
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
