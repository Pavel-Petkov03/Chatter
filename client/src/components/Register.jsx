import "../styles/LoginAndRegister.css"
export default function Register(){
    return (
        <div className="Register">
            <h1>Register</h1>
            <form action="" className="form">
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <input type="password" placeholder="Confirm Password"/>
               <button>Submit</button>
            </form>
        </div> 
    )
}