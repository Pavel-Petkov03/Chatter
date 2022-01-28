
export default class Api{
    constructor(endpoint,  contentType) {
        Object.assign(this, {
            endpoint , contentType
        })
        this.tokenManager = new TokenManager()
        // dispatch is a reference to the state 
    }

    async get(){
         return await this.errorHandler("get" , null)
    }

    async post(body){ // params are optional
        return await this.errorHandler("post" , body)
    }

    async delete(){
        return  await this.errorHandler("delete")
    }

    async patch(body){
        return await this.errorHandler("patch" , body)
    }


    async errorHandler(method, body){
        try{
            const data =  await generateRequest(this.endpoint, method , body, this.tokenManager.getCookie())
            this.tokenManager.setCookie(data.token)
            return data
        }catch(er){
            throw new Error(er.message)
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
