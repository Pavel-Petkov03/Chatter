import "../styles/LoginAndRegister.css"
import Api from "../api/api.js"
import { useDispatch } from "react-redux"
import {LOGIN_FAILURE, LOGIN_SUCCESS} from "../reducers/auth/actionTypes.js"
export default function Login(){
    const dispatch = useDispatch()
    const api = new Api("http://localhost:5000/login", dispatch, "application/json", null , "/profile")
    const payload = {successStateMessage : LOGIN_SUCCESS, failureStateMessage : LOGIN_FAILURE}
    return (
        <div className="Login">
            <h1>Login</h1>
            <form action="" className="form">
                <input type="text" placeholder="Email" name="email"/>
                <input type="password" placeholder="Password" name="password"/>
               <button onClick={(ev) => {
                   ev.preventDefault()
                   api.post(retrieveData(ev.target.parentNode), payload)
            }}>Submit</button>
            </form>
        </div>
    )
}

function retrieveData(form){
    return [...(new FormData(form).entries())].reduce((acc , [k ,v ]) => Object.assign(acc , {[k] : v}), {})
}

function clear(){
    
}