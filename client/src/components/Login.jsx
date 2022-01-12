import "../styles/LoginAndRegister.css"
export default function Login(){
    return (
        <div className="Login">
            <h1>Login</h1>
            <form action="" className="form">
                <input type="password" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
               <button >Submit</button>
            </form>
        </div>
    )
}


