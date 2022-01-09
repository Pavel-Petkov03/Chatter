
export default class Api{
    constructor(dispatch) {
        this.dispatch = dispatch
        // dispatch is reference to state 
    }

    async get(endpoint, token, dispatchPayload){
         return await this.errorHandler(endpoint , "get" , null , token, dispatchPayload)
    }

    async post(endpoint , body, token, dispatchPayload){
        return await this.errorHandler(endpoint , "post" , body , token, dispatchPayload)
    }

    async delete(endpoint , body, token, dispatchPayload){
        return await this.errorHandler(endpoint , "delete" , body , token, dispatchPayload)
    }

    async patch(endpoint , body, token, dispatchPayload){
        return await this.errorHandler(endpoint , "patch" , body , token, dispatchPayload)
    }


    async errorHandler(endpoint, method, body , token, dispatchPayload){
        const {successStateMessage , failureStateMessage, ...statePayload} = dispatchPayload
        try{
            const data = await requestManager(endpoint , method, body , token)
            this.dispatch({type : successStateMessage , ...statePayload}) // state payload is if we want to parse some state
            console.log(data)
            return data
        }catch(er){
            
           this.dispatch({type : failureStateMessage, errorMessage : er.message})
        }
    }
}


const errorStatuses = [404 , 401 , ]

async function requestManager(endpoint ,method ,  body , token){
    
    const data = await generateRequest(endpoint, method , body , token )
    return data
    // if generateRequest throws error it will be handeled by 
}


// this function will look for error codes from the server
async function generateRequest(endpoint , method, body , token){
    let options = {
        method,
    }

    let headers  = {
        "Content-Type" : "application/json",
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
