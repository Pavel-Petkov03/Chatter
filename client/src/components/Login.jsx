import "../styles/LoginAndRegister.css"
export default function Login(){
    return (
        <div className="Register">
            <h1>Login</h1>
            <form action="" className="form">
                <input type="text" placeholder="Email"/>
                <input type="text" placeholder="Password"/>
               <button>Submit</button>
            </form>
        </div>
    )
}