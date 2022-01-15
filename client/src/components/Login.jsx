import "../styles/LoginAndRegister.css"
import Api from "../api/api.js"
import { useDispatch } from "react-redux"
import {LOGIN_FAILURE, LOGIN_SUCCESS} from "../reducers/auth/actionTypes.js"
import { useNavigate } from "react-router-dom"
export default function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const api = new Api("http://localhost:5000/login", dispatch, "application/json",)
    const payload = {successStateMessage : LOGIN_SUCCESS, failureStateMessage : LOGIN_FAILURE}
    return (
        <div className="Login">
            <h1>Login</h1>
            <form action="" className="form">
                <input type="text" placeholder="Email" name="email"/>
                <input type="password" placeholder="Password" name="password"/>
               <button onClick={async (ev) => {
                   try{
                    ev.preventDefault()
                    await api.post(retrieveData(ev.target.parentNode), payload)
                    navigate("/profile")
                   }catch(er){
                        console.log(er)
                   }
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