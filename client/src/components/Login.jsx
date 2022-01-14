import "../styles/LoginAndRegister.css"
import Api from "../api/api.js"
import { useDispatch } from "react-redux"
export default function Login(){
    const dispatch = useDispatch()
    const api = new Api()
    return (
        <div className="Login">
            <h1>Login</h1>
            <form action="" className="form">
                <input type="text" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
               <button onClick={(ev) => api.post(retrieveData(ev.target.parentNode))}>Submit</button>
            </form>
        </div>
    )
}

function retrieveData(form){
    return [...Object.entries(new FormData(form)).reduce((acc , [k , v]) => Object.assign(acc , {[k] : v}))]
}
